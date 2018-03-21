/**
 * anchor.js - jQuery Plugin
 * Jump to a specific section smoothly
 *
 * @dependencies	jQuery v1.5.0 http://jquery.com
 * @author			Cornel Boppart <cornel@bopp-art.com>
 * @copyright		Author
 
 * @version		1.0.5 (02/11/2014)
 */

;(function ($) {
	
	window.anchor = {
		
		/**
		 * Default settings
		 *
		 */
		settings: {
			transitionDuration: 2000,
			transitionTimingFunction: 'swing',
			labels: {
				error: 'Couldn\'t find any section'
			}
		},

		/**
		 * Initializes the plugin
		 *
		 * @param	{object}	options	The plugin options (Merged with default settings)
		 * @return	{object}	this	The current element itself
		 */
		init: function (options) {
			// Apply merged settings to the current object
			$(this).data('settings', $.extend(anchor.settings, options));

			return this.each(function () {
				var $this = $(this);

				$this.unbind('click').click(function (event) {
					event.preventDefault();
					anchor.jumpTo(
						anchor.getTopOffsetPosition($this),
						$this.data('settings')
					);
				});
			});
		},

		/**
		 * Gets the top offset position
		 *
		 * @param	{object}	$object				The root object to get sections position from
		 * @return	{int}		topOffsetPosition	The top offset position
		 */
		getTopOffsetPosition: function ($object) {
			var href = $object.attr('href'),
				$section = $($(href).get(0)),
				documentHeight = $(document).height(),
				browserHeight = $(window).height();

			if (!$section || $section.length < 1) {
				throw new ReferenceError(anchor.settings.labels.error);
			}

			if (($section.offset().top + browserHeight) > documentHeight) {
				return documentHeight - browserHeight;
			} else {
				return $section.offset().top;
			}
		},
		
		/**
		 * Jumps to the specific position
		 *
		 * @param	{int}		topOffsetPosition	The top offset position
		 * @param	{object}	settings			The object specific settings
		 * @return	{void}
		 */
		jumpTo: function (topOffsetPosition, settings) {
			var $viewport = $('html, body');

			$viewport.animate(
				{scrollTop: topOffsetPosition - 80},
				settings.transitionDuration,
				settings.transitionTimingFunction
			);

				// Stop the animation immediately, if a user manually scrolls during the animation.
			$viewport.bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(event){
				if (event.which > 0 || event.type === 'mousedown' || event.type === 'mousewheel') {
					$viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup');
				}
			});
		}

	};

	$.fn.anchor = function (method) {
			// Method calling logic
		if (anchor[method]) {
			return anchor[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return anchor.init.apply(this, arguments);
		} else {
			return $.error('Method ' + method + ' does not exist on jQuery.anchor');
		}
	};

})(jQuery);







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

	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};

}

$(document).ready(function () {

	var worksSlider = {
		element: document.querySelector('.section-works__scroll'),
		top: getCoords(document.querySelector('.section-works__scroll')).top,
		scrollLeft: 0,
		maxOffset: t(),
		end: false,
		start: true
	}

	
	
	$('a[data-anchor]').anchor({
		transitionDuration : 1000
	});
	
	$("[data-fancybox]").fancybox({
		margin : [0, 0]
	});
//	new SimpleBar(worksSlider.element);
//	new PerfectScrollbar('body', {
//		handlers: ['click-rail', 'drag-thumb', 'touch']
//	});
	
	new PerfectScrollbar('.section-works__scroll', {
		suppressScrollY: true,
		handlers: ['click-rail', 'drag-thumb', 'touch']
	});
	worksSlider.element.addEventListener('ps-x-reach-end', function () {
		worksSlider.end = true;
		console.log('ps-x-reach-end');
    });
	worksSlider.element.addEventListener('ps-x-reach-start', function () {
		worksSlider.start = true;
		console.log('ps-x-reach-start');
    });
//	$(worksSlider.element).mCustomScrollbar({
//		axis:"x", // horizontal scrollbar
//		mouseWheel:{ enable: false },
//		callbacks: {
//			onCreate: function(){
//				document.getElementById('video-1').play();
//				document.getElementById('video-2').play();
//			},
//			onScroll:function () {
//				worksSlider.scrolling = false;
//			},
//			whileScrolling: function () {
//				worksSlider.scrollLeft = this.mcs.leftPct;
//			}
//		}
//	});
//	
	
	
	
	
	
	var screen = {
		height: document.documentElement.clientHeight,
		width: document.documentElement.clientWidth
	}
	
	
	
	/*********************
	 * Circle
	 *********************/
	document.querySelector('.section-hero').addEventListener('mousemove', function (e) {
		
		var cX = (2 * e.clientX)/(screen.width) - 1,
			cY = (2 * e.clientY)/(screen.height) - 1;
		
		document.querySelector('.section-hero__circle-1').style.transform = 'translate(' + (c1 * cX) + 'px, ' + (c1 * cY) + 'px)';
		document.querySelector('.section-hero__circle-2').style.transform = 'translate(' + (c2 * cX) + 'px, ' + (c2 * cY) + 'px)';
		
	})
	
	
	
//	/*********************
//	 * Header
//	 *********************/
//	var header 		= document.querySelector('.header'),
//		headerTop 	= getCoords(header);
//	
//	document.addEventListener('scroll', function () {
//		if (window.pageYOffset > headerTop.top) {
//			header.classList.add('fixed');
//		} else {
//			header.classList.remove('fixed');
//		}
//	})
	
	
//	var scrollAnimation = 	window.requestAnimationFrame ||
//             				window.webkitRequestAnimationFrame ||
//             				window.mozRequestAnimationFrame ||
//             				window.msRequestAnimationFrame ||
//             				window.oRequestAnimationFrame ||
//             				// IE Fallback, you can even fallback to onscroll
//             				function(callback){ window.setTimeout(callback, 1000/60) },
//		lastPosition 	= -1,
//		stopSlider 		= false;
//	
//	
	
	
//	function loop () { 
//		// Avoid calculations if not needed
//		
//		
//		
//		var box = worksSlider.element.getBoundingClientRect();
//		
//		
////		console.log(lastPosition < window.pageYOffset);
//		if (box.top < 100 && box.top > -100) {
//			
//			if (lastPosition == window.pageYOffset) {
//				scrollAnimation(loop);
//				return false;
//			} else if (lastPosition < window.pageYOffset) {// вниз
//				
//				if (!worksSlider.end && !stopSlider) {
//					stopSlider = true;
//					
//					console.log('stop');
//					
//					worksSlider.start = false;
//					document.body.style.overflow = 'hidden';
//					
//					document.addEventListener('wheel', scrollSlider);
//				} else if (worksSlider.end && stopSlider) {
//					
//					console.log('start');
//					stopSlider = false;
//					document.body.style.overflow = '';
//					
//					document.removeEventListener('wheel', scrollSlider);
//				}
//			} else {
//				console.log('вверх');
//				if (!worksSlider.start && !stopSlider) {
//					console.log('stop');
//					stopSlider = true;
//					
//					
//					
//					worksSlider.end = false;
//					document.body.style.overflow = 'hidden';
//					
//					
//					document.addEventListener('wheel', scrollSlider);
//				} else if (worksSlider.start && stopSlider){
//					console.log('start');
//					stopSlider = false;
//					document.body.style.overflow = '';
//					document.removeEventListener('wheel', scrollSlider);
//				}
//			}
//		}
//		
//		lastPosition = window.pageYOffset;
//		scrollAnimation( loop );
//	}
//
//	// Call the loop for the first time
//	loop();
//	
//	function scrollSlider (e) {
//		e.preventDefault();
//		worksSlider.element.scrollLeft += e.deltaY;
//	}
	
	
    document.addEventListener("wheel", function (e) {
		var delta 			= e.deltaY,
			documentScroll 	= window.pageYOffset;
		
		var box = worksSlider.element.getBoundingClientRect();
		
		if (box.top < 100 && box.top > -100) {
			if (delta >= 0) { // Вниз
				if (!worksSlider.end) {
					worksSlider.start = false;
					e.preventDefault();
					worksSlider.element.scrollLeft += delta;
					document.body.style.overflow = 'hidden';
				} else {
					document.body.style.overflow = '';
				}
			} else { // Вверх
				
				if (!worksSlider.start) {
					worksSlider.end = false;
					e.preventDefault();
					worksSlider.element.scrollLeft += delta;
					document.body.style.overflow = 'hidden';
				} else {
					document.body.style.overflow = '';
				}
			}
		}
	});
	
	
	$('.menu-btn').click(function () {
		$('.menu').addClass('open');
		$('body').css('overflow', 'hidden');
	})
	$('.menu__btn-close').add('.menu__link').click(function () {
		$('.menu').removeClass('open');
		$('body').css('overflow', '');
	})
	
	
	
	
	
	
	$( ".file-upload" ).each(function (i, e) {
		var wrapper = $(e),
			inp = wrapper.find( ".file-upload__input" ),
			btn = wrapper.find( ".file-upload__btn" ),
			lbl = wrapper.find( ".file-upload__note" );
		
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
			
			if (fileSize > MAX_FILE_SIZE) {
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
	
	
	
	$('[type="submit"]').click(function (e) {
		e.preventDefault();
		
		var form = $(this).parents('form'),
			success = true;
		
		form.find('.input-container__input').each(function (i, input) {
			if (!input.checkValidity()) {
				$(input).siblings('.input-container__label').addClass('active');
				
				input.classList.add('error');
				input.value = input.getAttribute('data-msg');
				success = false;
			}
		})
		if (!success)
			return;
		
//		console.log(form[0]);
		
		var data = new FormData(form[0]),
			xhr  = new XMLHttpRequest();
		
//		xhr.open("POST", url);
//
//		xhr.onreadystatechange = function() {
//			if (xhr.readyState != 4) return;
//			
//			if(xhr.status != 200) {
//				alert(xhr.status + ': ' + xhr.statusText);
//			} else {
//				if (form.attr('id') == 'form-get-a-quote') {
//					var name = $('#quote-first-name').val();
//
//					$('.form-bg__title').text('Thank you, ' + name + '!');
//
//					form.css('opacity', '0');
//					$('.form-bg').css('opacity', '1');
//				} else if (form.attr('id') == 'form-request-portfolio' || form.attr('id') == 'form-become-partner') {
//					$.fancybox.close();
//				}
//			}
//		};
//		
//		xhr.send(data);
		
		var name 	= form.find('input[data-name]').val(),
			formBg 	= form.siblings('.form-bg');

		formBg.find('.form-bg__title').text('Thank you, ' + name + '!');

		form.css('opacity', '0');
		formBg.css('opacity', '1');

		
	})
		
	$('.input-container__input').focus(function () {
			$(this).siblings('.input-container__label').addClass('active');

			if (this.classList.contains('error')) {
				this.classList.remove('error');
				this.value = '';
			}

		})
		.blur(function () {

			if (this.value != '') {
				if (!this.checkValidity()) {
//					$(this).siblings('.input-container__label').removeClass('active');
					this.classList.add('error');
					this.value = this.getAttribute('data-msg');
				} else {
					this.classList.add('success');
				}
			} else {
				$(this).siblings('.input-container__label').removeClass('active');
				this.classList.remove('success');
			}
		})
	
	
	if (screen.width < 990) {
		$('.input-container__input').css('padding-left', '');
		
//		$('.technologies-slider').slick({
//			dots: true
//		});
//		$('.section-form__checkbox-block').slick({
//			dots: true
//		});
	} else {
		
	}
})

