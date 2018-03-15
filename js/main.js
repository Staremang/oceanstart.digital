$(document).ready(function () {
	var headerTop = $('.header').offset().top;
	
	$(document).scroll(function () {
		if (window.pageYOffset > headerTop) {
			$('.header').addClass('fixed');
		} else {
			$('.header').removeClass('fixed');
		}
	})
})