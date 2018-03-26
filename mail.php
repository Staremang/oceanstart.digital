<?
$to     = "staremang@ya.ru"; //Почта получателя (заменить на нужную, если несколько - писать через запятую)
$from   = "Oceanstart <mail@oceanstart.digital>"; // Наименование и почта отправителя (заменить домен на нужный)



/*
 * Генерация html тегов
 * @param: title - string (тема письма)
 * @param: body - string (содержимое письма)
 *
 * @return: string (Тело письма)
 */
function getBody ($title, $body) {
    return '<html>
                <head>
                    <title>'.$title.'</title>
                    <style>
                        table {
                            border-collapse: collapse;
                            border-spacing: 0;
                        }
                        table, td {
                            border: solid 1px black;
                        }
                        td {
                            padding: 3px;
                        }
                        ul {
                            padding-left: 15px;
                            margin: 0;
                        }
                    </style>
                </head>
                <body>
                    '.$body.'
                </body>
            </html>';
}



/*
 * Отправка письма с несколькими вложениями.
 * @param: email - string (адрес получателя)
 * @param: subject - string (тема письма)
 * @param: message - string (тело документа с html тегами)
 * @param: from - string (подсталяется в поле от кого)
 * @param: files - array (массив с файлами)
 * Array
 *  (
 *      [0] => Array
 *          (
 *              [name] => filename.jpg
 *              [type] => image/jpeg
 *              [tmp_name] => /var/www/patch/mod-tmp/php8c4Gy0
 *              [error] => 0
 *              [size] => 0
 *          )
 *  
 *      [1] => Array
 *          (
 *              ...
 *          )
 *  )
 * 
 * @return: bool (результат работы ф-ции mail)
 */
function send_mail($email, $subject, $message, $from, $files) {
    $headers = '';
    $EOL = "\n"; // ограничитель строк, некоторые почтовые сервера требуют \n - подобрать опытным путём
    $boundary = "--".md5(uniqid(time()));  // строка разделитель.
    $filepart = '';
    //Заголовки.
    $headers   .= "MIME-Version: 1.0;$EOL";
    $headers   .= "Content-Type: multipart/mixed; boundary=\"$boundary\"$EOL";
    $headers   .= "From: $from".$EOL;
    $multipart  = "--$boundary$EOL";
    $multipart .= "Content-Type: text/html; charset=UTF-8$EOL";
    $multipart .= "Content-Transfer-Encoding: base64$EOL";
    $multipart .= $EOL; // раздел между заголовками и телом html-части
    $multipart .= chunk_split(base64_encode($message));
    /*
     * Работа с файлами.
     */
    if (!empty($files)) {
        foreach($files as $key => $filesData) {
            $path = $filesData['tmp_name'];
            if ($path) {
                $fp = fopen($path,"rb");
                if (!$fp) {
                    print "Cannot open file";
                    exit();
                }
                $file = fread($fp, filesize($path));
                fclose($fp);
                $name = $filesData['name'];
                $filetype = $filesData['type'];
                $filepart .= "$EOL--$boundary$EOL";
                $filepart .= "Content-Disposition: attachment; filename=\"$name\"$EOL";
                $filepart .= "Content-Type: $filetype; name=\"$name\"$EOL";
                $filepart .= "Content-Transfer-Encoding: base64$EOL";
                $filepart .= $EOL; // разделитель между заголовками и телом прикрепленного файла
                $filepart .= chunk_split(base64_encode($file));
            }
        }
    }
    //Добавляем в письмо файлы, если есть.
    $filepart .= "$EOL--$boundary--$EOL";
    $multipart .= $filepart;
    // Отправляем письмо.
    if(mail($email, $subject, $multipart, $headers)) return true;
    return false;
}



if( isset($_POST['form-type']) ) {
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: ".$from."\r\n"; 


    /*
     *  become-partner
     *   - name
     *   - tel
     *   - company
     *   - email
     *   - msg
     *  request-portfolio
     *   - name
     *   - tel
     *   - company
     *   - email
     *   - msg
     *  get-a-quote
     *   - services[]
     *   - first-name
     *   - last-name
     *   - company
     *   - tel
     *   - email
     *   - country
     *   - msg
     *   - file-1 (file)
     *   - file-2 (file)
     */
    
    if ($_POST['form-type'] == "become-partner") {

        if ((isset($_POST['name']) && $_POST['name'] != "") && 
            (isset($_POST['tel']) && $_POST['tel'] != "") &&
            (isset($_POST['company']) && $_POST['company'] != "") &&
            (isset($_POST['email']) && $_POST['email'] != "")
        ) {

            $subject = 'Become partner';
            $message = '<table>
                            <tr>
                                <td>Name:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['name']))).'</td>
                            </tr>
                            <tr>
                                <td>Phone:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['tel']))).'</td>
                            </tr>
                            <tr>
                                <td>Company:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['company']))).'</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['email']))).'</td>
                            </tr>';
            if ((isset($_POST['msg']) && $_POST['msg'] != "")) {
                $message .= '<tr>
                                <td>Message:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['msg']))).'</td>
                            </tr>';
            }

            $message .= '</table>';

            if (mail($to, $subject, getBody($subject, $message), $headers)) {
                echo json_encode(array('sended'=>true,'message'=>''));
            } else {
                echo json_encode(array('sended'=>false,'message'=>'Серверная ошибка'));
            }

        } else {
            echo json_encode(array('sended'=>false,'message'=>'Не все поля заполнены'));
        }

    } elseif ($_POST['form-type'] == "request-portfolio") {

        if ((isset($_POST['name']) && $_POST['name'] != "") && 
            (isset($_POST['tel']) && $_POST['tel'] != "") &&
            (isset($_POST['company']) && $_POST['company'] != "") &&
            (isset($_POST['email']) && $_POST['email'] != "")) {

            $subject = 'Request full portfolio';
            $message = '<table>
                            <tr>
                                <td>Name:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['name']))).'</td>
                            </tr>
                            <tr>
                                <td>Phone:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['tel']))).'</td>
                            </tr>
                            <tr>
                                <td>Company:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['company']))).'</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['email']))).'</td>
                            </tr>';
            if ((isset($_POST['msg']) && $_POST['msg'] != "")) {
                $message .= '<tr>
                                <td>Message:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['msg']))).'</td>
                            </tr>';
            }

            $message .= '</table>';

            if (mail($to, $subject, getBody($subject, $message), $headers)) {
                echo json_encode(array('sended'=>true, 'message'=>''));
            } else {
                echo json_encode(array('sended'=>false,'message'=>'Серверная ошибка'));
            }
        } else {
            echo json_encode(array('sended'=>false,'message'=>'Не все поля заполнены'));
        }

    } elseif ($_POST['form-type'] == "get-a-quote") {

    //  * services[]
    //  * first-name
    //  * last-name
    //  * company
    //  * tel
    //  * email
    //  * country
    //  * msg

        if ((isset($_POST['first-name']) && $_POST['first-name'] != "") && 
            (isset($_POST['last-name']) && $_POST['last-name'] != "") && 
            (isset($_POST['tel']) && $_POST['tel'] != "") &&
            (isset($_POST['company']) && $_POST['company'] != "") &&
            (isset($_POST['country']) && $_POST['country'] != "") &&
            (isset($_POST['email']) && $_POST['email'] != "")) {



            $subject = 'Get a quote';



            $directions = $_POST['services'];

            $chmsg = '';
            if (!empty($directions)) {
                $chmsg = '<ul>';

                foreach($_POST['services'] as $chkval) {
                    $chmsg .= '<li>';
                    $chmsg .= trim(urldecode(htmlspecialchars($chkval)));
                    $chmsg .= '</li>';
                }

                $chmsg .= '</ul>';
            } else {
                $chmsg = 'Не выбран ни один вариант';
            }


            $message = '<table>
                            <tr>
                                <td>First Name:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['first-name']))).'</td>
                            </tr>
                            <tr>
                                <td>Last Name:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['last-name']))).'</td>
                            </tr>
                            <tr>
                                <td>Phone:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['tel']))).'</td>
                            </tr>
                            <tr>
                                <td>Company:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['company']))).'</td>
                            </tr>
                            <tr>
                                <td>Country:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['country']))).'</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['email']))).'</td>
                            </tr>
                            <tr>
                                <td>Selected services:</td>
                                <td>'.$chmsg.'</td>
                            </tr>';



            if ((isset($_POST['msg']) && $_POST['msg'] != "")) {
                $message .= '<tr>
                                <td>Message:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['msg']))).'</td>
                            </tr>';
            }

            $message .= '</table>';



            if (!empty($_FILES['file-1']['tmp_name']) && !empty($_FILES['file-2']['tmp_name'])) {
                $files = array($_FILES['file-1'], $_FILES['file-2']);

                if (send_mail($to, $subject, getBody($subject, $message), $from, $files)) {
                    echo json_encode(array('sended'=>true, 'message'=>''));
                } else {
                    echo json_encode(array('sended'=>false,'message'=>'Серверная ошибка'));
                }
            } else {
                if (mail($to, $subject, getBody($subject, $message), $headers)) {
                    echo json_encode(array('sended'=>true, 'message'=>''));
                } else {
                    echo json_encode(array('sended'=>false,'message'=>'Серверная ошибка'));
                }
            }

        } else {
            echo json_encode(array('sended'=>false,'message'=>'Не все поля заполнены'));
        }
    } 
}





?>