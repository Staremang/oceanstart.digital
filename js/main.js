$(document).ready(function () {
	
	
	
	var headerTop = $('.header').offset().top;
	
	$(document).scroll(function () {
		if (window.pageYOffset > headerTop) {
			$('.header').addClass('fixed');
		} else {
			$('.header').removeClass('fixed');
		}
	})
	
	
	var screen = {
		height: document.documentElement.clientHeight,
		width: document.documentElement.clientWidth
	}
	
	var worksSlider = {
		top: getCoords(document.querySelector('.section-works__scroll')).top,
		maxOffset: t()
	}
	
//    document.addEventListener("wheel", function (e) {
//		var delta = e.deltaY,
//			documentScroll = window.pageYOffset,
//			scroll = document.querySelector('.section-works__scroll').scrollLeft;
//		
//		
//		
//		var box = document.querySelector('.section-works__scroll').getBoundingClientRect();
//		
////		console.log(box.top + box.height/2);
//		
//		if (delta >= 0) { // Вниз
//			if ((box.top + box.height/2) < screen.height/2 ) {
//
//				document.querySelector('.section-works__scroll').scrollLeft += delta;
//				if (scroll > 0 && scroll < worksSlider.maxOffset) {
//					document.body.style.overflow = 'hidden';
//				} else {
//					document.body.style.overflow = '';
//				}
//			} else {
//				document.body.style.overflow = '';
//			}
//		} else { // Вверх
//			if ((box.top + box.height/2) >= screen.height/2 ) {
//
//				document.querySelector('.section-works__scroll').scrollLeft += delta;
//				if (scroll > 0 && scroll < worksSlider.maxOffset) {
//					document.body.style.overflow = 'hidden';
//				} else {
//					document.body.style.overflow = '';
//				}
//			} else {
//				document.body.style.overflow = '';
//			}
//		}
//	});
	
//	$('.section-works__scroll').scroll(function () {
//		var maxOffset = $('.works-scrollbar').width() - $('.works-scrollbar__track').width(),
//			ratio = document.querySelector('.section-works__scroll').scrollLeft / worksSlider.maxOffset;
//		
//		$('.works-scrollbar__track').css('left', maxOffset*ratio + 'px');
//		
//	})
////	$('.works-scrollbar__track').click(function (e) {
////		console.log(e)
////	})
//	dragMaster.makeDraggable(document.querySelector('.works-scrollbar__track'))
//	
//	
	$( ".file-upload" ).each(function (i, e) {
		var wrapper = $(e),
			inp = wrapper.find( ".file-upload__input" ),
			btn = wrapper.find( ".file-upload__btn" ),
			lbl = wrapper.find( ".file-upload__note" );

	//    // Crutches for the :focus style:
	//    btn.focus(function(){
	//        wrapper.addClass( "focus" );
	//    }).blur(function(){
	//        wrapper.removeClass( "focus" );
	//    });

		// Yep, it works!
		btn.add( lbl ).click(function(){
			inp.click();
		});

		var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

		inp.change(function(){

			var file_name;
			if( file_api && inp[ 0 ].files[ 0 ] )
				file_name = inp[ 0 ].files[ 0 ].name;
			else
				file_name = inp.val().replace( "C:\\fakepath\\", '' );
			
			var fileSize = inp[ 0 ].files[ 0 ].size;
			
			if (fileSize > 10*1024*1024) {
				lbl.text('The file is too big!');
				lbl.removeClass('success');
				lbl.addClass('error');
				inp.val('');
				return;	
			}
			
			if( ! file_name.length ) {
				return;
			}

			if( lbl.is( ":visible" ) ){
				lbl.text( file_name );
				lbl.removeClass('error');
				lbl.addClass('success');
			} else {
				btn.text( file_name );
			}
		});
	})
	
	$('.section-works__scroll').mCustomScrollbar({
		axis:"x" // horizontal scrollbar
	});
	if (screen.width < 990) {
		$('.technologies-slider').slick({
			dots: true
		});
		$('.section-form__checkbox-block').slick({
			dots: true
		});
	}
})







function t () {
	var w = $('.works-item').outerWidth(true),
		c = $('.works-item').length,
		margin = w - $('.works-item').outerWidth(),
		padding = ($(document).width() - $('.container').width())/2,
		realWidth = w * c - margin;
	
	$('.section-works__slider').css({
		width:  (realWidth + padding * 2) + 'px',
		paddingLeft: padding + 'px',
		paddingRight: padding + 'px'
	})
	
	return realWidth - $('.container').width();
	
}
function getCoords(elem) {
	var box = elem.getBoundingClientRect();

	var body = document.body,
		docEl = document.documentElement;

	var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop,
		scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

	var clientTop = docEl.clientTop || body.clientTop || 0,
		clientLeft = docEl.clientLeft || body.clientLeft || 0;

	var top = box.top + scrollTop - clientTop,
		left = box.left + scrollLeft - clientLeft;

	return {
		top: top,
		left: left
	};
}