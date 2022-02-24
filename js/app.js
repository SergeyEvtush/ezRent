/* import * as flsFunctions from "./modules/functions.js"
flsFunctions.isWebp(); */
"use strict"
//метод который позволяет определить на каком устройстве открыта страница
const isMobile={
	Android:function(){
		return navigator.userAgent.match(/Android/i);
	},
BlackBerry:function(){
		return navigator.userAgent.match(/BlackBerry/i);
	},
	IOS:function(){
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera:function(){
		return navigator.userAgent.match(/Opera mini/i);
	},
	Windows:function(){
		return navigator.userAgent.match(/IEMobile/i);
	},
	any:function(){
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.IOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		);
	}
};
const screenWidth = window.screen.width
/* console.log(screenWidth); */

const imageBlock = document.getElementById("image");
/* console.log(imageBlock); */

if (screenWidth >= 1200) {
	document.getElementById("image").src = `img/SliderMain/Rio_pc.jpg`;
}
/* else if (screenWidth < 1200 && screenWidth > 768) { 
	document.getElementById("image").src  = `img/SliderMain/Rio800.jpg`;
} */
else if (screenWidth < 430 ) { 
	document.getElementById("image").src  = `img/SliderMain/Riomob.jpg`;
}
//проверка на каком устройстве открыта страница
if	(isMobile.any())
{
	//если открыта на мобилке то к боди добавляем  класс _touch
document.body.classList.add('_touch');
// также собираем все элементы .menu__arrow(стрелки)
let menuArrows=document.querySelectorAll('.menu__arrow');
// и если они есть есть то слушаем событие клик на них и при его возникновении добавляем к ним класс '_active'
if(menuArrows.length>0){
for(let index=0;index<menuArrows.length;index++){
const menuArrow=menuArrows[index];
menuArrow.addEventListener("click",function(e){
menuArrow.parentElement.classList.toggle('_active');
});
}

}
//иначе к боди добавляем класс _pc
}else
{
	document.body.classList.add('_pc');
}
//бургер
const iconMenu=document.querySelector('.menu__icon');
const menuBody=document.querySelector('.menu__body');
if(iconMenu)
{

	//при клике на menu__icon то есть на бургер(на саму иконку) присваиваем body класс _lock,а для иконки и для самого меню
	//добавляем им класс _active
iconMenu.addEventListener("click",function(e){
	document.body.classList.toggle('_lock');	
iconMenu.classList.toggle('_active');
menuBody.classList.toggle('_active');
});
}
//прокрутка при клике
const menuLinks=document.querySelectorAll('.menu__link[data-goto]');//ищем только те элементы классов menu__link у котрых есть атрибут data-goto
if(menuLinks.length>0)
{
menuLinks.forEach(menuLink=>{
menuLink.addEventListener("click",onMenuLinkClick)
});
function onMenuLinkClick(e)
	{
const menuLink=e.target;
//проверка на то  что есть ли чтото в датат атрибуте и  существует ли объект на который ссылается данный атрибут  
if(menuLink.dataset.goto&&document.querySelector(menuLink.dataset.goto))
			{
	//получаем сам объект на который	 ссылается дата атрибут
const gotoBlock = document.querySelector(menuLink.dataset.goto);
//вычисляем положение объекта с учетом высоты шапки
const gotoBlockValue=/*местоположение объекта от верха в пикселях*/gotoBlock.getBoundingClientRect().top+/*количество прокрученных пикселей*/pageYOffset-/*высота шапки*/document.querySelector('header').offsetHeight;
/*проверка нужна для того чтобы при открытом меню при прокрутке к нужному разделу меню закрывалось */
if(iconMenu.classList.contains('_active'))
{
	/*убираем классы которые добавили при открытии меню */
	document.body.classList.remove('_lock');	
iconMenu.classList.remove('_active');
menuBody.classList.remove('_active');

}

/*код который прокручивает скролл на высоту равную константе  gotoBlockValue*/
window.scrollTo
	({
top:gotoBlockValue,
behavior:"smooth"/* плавность поркрутки*/
		});
e.preventDefault();//отключаем работу ссылки
			}
		}
}
