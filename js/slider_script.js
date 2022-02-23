



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
		pauseOnHover: false,
		touchThreshold: 7,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					arrows: false,
				}
			}
		],
		
		
	});
	$('.slider-block').slick({
		centerPadding: '0px',
		slidesToShow: 1,
		centerMode: true,
		
	});
});




/*https://youtu.be/rXNfDfqtM3M?t=2992 */