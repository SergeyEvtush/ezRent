$(document).ready(function () { 
	$('.equipment-slider').slick({
		arrows: true,
		centerMode: true,
		slidesToShow: 3,
		centerPadding: '10px',
		speed: 1000,
		easing: 'cubic-bezier(0.75,-1,0.21,-1)',
		autoplay: true,
		autoplaySpeed: 1000,
		initialSlide:1,
		pauseOnHover: false,
		touchThreshold: 7,
		asNavFor:".equipment__text-slider",
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					arrows: false,
					autoplaySpeed: 1000,
					initialSlide: 1,
					centerMode: true,
					pauseOnHover: false,
					touchThreshold: 7,
				}
			}
		],
		
		
	});
	$('.reviews__slider').slick({
		dots: true,
		arrows: false,
		slidesToShow: 1,
		speed: 1000,
		easing: 'cubic-bezier(0.75,-1,0.21,-1)',
		autoplay: true,
		autoplaySpeed: 1000,
		touchThreshold: 7,
	});
	$('.equipment__text-slider').slick({
		asNavFor:".equipment-slider",
		arrows: false,
		
	});
});
/*https://youtu.be/rXNfDfqtM3M?t=2992 */