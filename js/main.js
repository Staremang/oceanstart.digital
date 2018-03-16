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
	
    document.addEventListener("wheel", function (e) {
		var delta = e.deltaY,
			documentScroll = window.pageYOffset,
			scroll = document.querySelector('.section-works__scroll').scrollLeft;
		
		
		
		var box = document.querySelector('.section-works__scroll').getBoundingClientRect();
		
//		console.log(box.top + box.height/2);
		
		if (delta >= 0) { // Вниз
			if ((box.top + box.height/2) < screen.height/2 ) {

				document.querySelector('.section-works__scroll').scrollLeft += delta;
				if (scroll > 0 && scroll < worksSlider.maxOffset) {
					document.body.style.overflow = 'hidden';
				} else {
					document.body.style.overflow = '';
				}
			} else {
				document.body.style.overflow = '';
			}
		} else { // Вверх
			if ((box.top + box.height/2) >= screen.height/2 ) {

				document.querySelector('.section-works__scroll').scrollLeft += delta;
				if (scroll > 0 && scroll < worksSlider.maxOffset) {
					document.body.style.overflow = 'hidden';
				} else {
					document.body.style.overflow = '';
				}
			} else {
				document.body.style.overflow = '';
			}
		}
	});
	
	$('.section-works__scroll').scroll(function () {
		var maxOffset = $('.works-scrollbar').width() - $('.works-scrollbar__track').width(),
			ratio = document.querySelector('.section-works__scroll').scrollLeft / worksSlider.maxOffset;
		
		$('.works-scrollbar__track').css('left', maxOffset*ratio + 'px');
		
	})
//	$('.works-scrollbar__track').click(function (e) {
//		console.log(e)
//	})
	dragMaster.makeDraggable(document.querySelector('.works-scrollbar__track'))
	
})
function fixEvent(e) {
	// получить объект событие для IE
	e = e || window.event

	// добавить pageX/pageY для IE
	if ( e.pageX == null && e.clientX != null ) {
		var html = document.documentElement
		var body = document.body
		e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
		e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
	}

	// добавить which для IE
	if (!e.which && e.button) {
		e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
	}

	return e
}




var dragMaster = (function() {

	var dragObject;
	var mouseOffset;
	var maxOffsetTrack = document.querySelector('.works-scrollbar').getBoundingClientRect().width - document.querySelector('.works-scrollbar__track').getBoundingClientRect().width;

	// получить сдвиг target относительно курсора мыши
	function getMouseOffset(target, e) {
		return {
			x:e.clientX - target.offsetLeft
		};
	}

	function mouseUp(){
		dragObject = null;

		// очистить обработчики, т.к перенос закончен
		document.onmousemove = null;
		document.onmouseup = null;
		document.ondragstart = null;
		document.body.onselectstart = null;
	}

	function mouseMove(e){
		e = fixEvent(e);
		
		var offset = e.clientX - mouseOffset.x;
		console.log(maxOffsetTrack);
		
		if (offset >= 0 && offset <= maxOffsetTrack) {
			dragObject.style.left = (e.clientX - mouseOffset.x) + 'px';
		}
		return false;
	}

	function mouseDown(e) {
		e = fixEvent(e)
		if (e.which!=1) return;

		dragObject  = this;

		// получить сдвиг элемента относительно курсора мыши
		mouseOffset = getMouseOffset(this, e);

		// эти обработчики отслеживают процесс и окончание переноса
		document.onmousemove = mouseMove;
		document.onmouseup = mouseUp;

		// отменить перенос и выделение текста при клике на тексте
		document.ondragstart = function() { return false; }
		document.body.onselectstart = function() { return false; }

		return false;
	}

	return {
		makeDraggable: function(element) {
			element.onmousedown = mouseDown
		}
	}

}())

//function getPosition(e){
//	var left = 0;
//	var top  = 0;
//
//	while (e.offsetParent){
//		left += e.offsetLeft;
//		top  += e.offsetTop;
//		e	 = e.offsetParent;
//	}
//
//	left += e.offsetLeft;
//	top  += e.offsetTop;
//
//	return {x:left, y:top}
//}


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