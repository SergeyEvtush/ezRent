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
	document.getElementById("image").src  = `img/SliderMain/Riomob.jpg`;/*  */
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
/*аккордеон */
const acc = document.getElementsByClassName("accordion");
acc[1].classList.add("active");
var i;
const pane = document.getElementsByClassName("panel");
pane[1].classList.add("active");
pane[1].style.maxHeight = pane[1].scrollHeight + "px"

for (i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function () {
		closeTab(acc,pane);
	  this.classList.toggle("active");
		var panel = this.nextElementSibling;
	  panel.classList.toggle("active");
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
	 }
		
	 else {
		 panel.style.maxHeight = panel.scrollHeight + "px";
		} 
		
		
  });
}
function closeTab(tabsArray, contentTabsArray) {
	for (let i = 0; i < tabsArray.length; i++) { 
		tabsArray[i].classList.remove("active");
		contentTabsArray[i].classList.remove("active");
		contentTabsArray[i].style.maxHeight = null;
	}
 }
/*-------------------------------------- */
//!popup form 
const headerBlock = document.querySelector('header');
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");
let unlock = true;
const timeout = 800;
if(popupLinks.length>0)
{
	
for(let index=0;index<popupLinks.length;index++)
{
	const popupLink=popupLinks[index];
	popupLink.addEventListener("click",function(e){
	const popupName = popupLink.getAttribute('href').replace('#','');//здесь мы берем ссылку на которую кликаем и из атрибута href  убирае решетку и заменяем на имя по id
		const curentPopup = document.getElementById(popupName);
		popupOpen(curentPopup);
		
	e.preventDefault();//с пом этой функции запрещаем перезагружать страницу
}
	);}
}
//метод для объектов закрывающих попап
const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length>0)
{
	for(let index=0;index<popupCloseIcon.length;index++)
	{
const el=popupCloseIcon[index];
el.addEventListener(
	'click',function(e){
		popupClose(el.closest('.popup'));
		
		e.preventDefault();

	}
);}
}
function popupOpen(curentPopup){
if(curentPopup && unlock)
{
const popupActive=document.querySelector('.popup.open');
if(popupActive){
popupClose(popupActive,false);

}
else{
bodyLock();

}
curentPopup.classList.add('open');
curentPopup.addEventListener("click",function(e){
if(!e.target.closest('.popup__content')){
	popupClose(e.target.closest('.popup'));
			}
		});
	}
}
function popupClose(popupActive,doUnlock = true){
if(unlock){
	popupActive.classList.remove('open');
	
	headerBlock.classList.remove('no-visible');
if(doUnlock){
bodyUnLock();
}
}
}

function bodyLock(){
const lockPaddingValue=window.innerWidth-document.querySelector('.wraper').offsetWidth+'px';
if(lockPadding.length>0){
	for(let index=0;index<lockPadding.length;index++){
		const el=lockPadding[index];
		el.style.paddingRight=lockPaddingValue;
		}
}

body.style.paddingRight=lockPaddingValue;
body.classList.add('lock');
unlock=false;
setTimeout(function(){
unlock=true;

},timeout);
}
function bodyUnLock(){
setTimeout(function(){
	if(lockPadding.length>0){
		for(let index=0;index<lockPadding.length;index++){
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
			}
	}

body.style.paddingRight='0px';
body.classList.remove('lock');
},timeout);
unlock=false;
setTimeout(function(){
	unlock=true;
},timeout);
}
document.addEventListener('keydown',function(e){
if(e.which===27){
const popupActive=document.querySelector('.popup.open');
popupClose(popupActive);
}
})
//клонирование элементов аренды
var CloningCard = document.getElementById("clone");
CloningCard.querySelector('.image__item').innerHTML = `<img src="files/rentalcars/car0.jpg" alt="car">`;
CloningCard.querySelector('.title__car-text').innerHTML = "Wolkswagen Polo";

function SetCardsTitle(clone,carsArray,data) {
	for (let i = 0; i <carsArray.length; i++) { 
		var CloneCard = clone.cloneNode(true);
		CloneCard.querySelector('.title__car-text').innerHTML = carsArray[i];
		CloneCard.querySelector('.image__item').innerHTML = `<img src="files/rentalcars/car${i + 1}.jpg" alt="car">`;
		/* CloneCard.querySelector('.car__list-description').innerHTML = setLisiInfo(data, carsArray[i]); */
		clone.after(CloneCard);
	}
 }
/*--------------------------------------------------------- */
var valueOfCar = document.getElementsByClassName('title__car-text');
var listOfDescription = document.getElementById('list');//получаем в переменную список 
var request = new XMLHttpRequest();//создаем объект запроса
var requestURL = 'files/jsonFiles/descriptionCar.json';//получаем адрес json файла
request.open('GET',requestURL);
//создаем объект запроса

request.onload=function(e){
	if(request.readyState===4){
		if(request.status===200){
			
			var dataList=JSON.parse(request.responseText);//получаем текстовые данные которые записываем в переменную dataTable
			/* setLisiInfo(dataList, valueOfCar); */
			SetCardsTitle(CloningCard, setNamesOfCars(dataList));
			
			
	
		}
		else{
			console.error(request.statusText);//иначе выводим сообщение об ошибке
		}
	}
	};
	request.onerror=function(e){//метод вывода сообщений об ошибке
		console.error(request.statusText);
	};
request.send(null);
let carsArray;
/*метод получения массива автомобилей */
function setNamesOfCars(data) {
	for (let key in data) {
		if (data.hasOwnProperty(key)) {
			carsArray = Object.keys(data);
			/* console.log(carsArray.length); */
			
			return carsArray; 
			}
		
		else {
			console.log('Нет машин');
			return 0;
		}
	}
}
function setDescriptionsOfCars(data) {
	for (let key in data) {
		if (data.hasOwnProperty(key)) {
			carsArray = Object.values(data);
			/* console.log(carsArray.length); */
			
			return carsArray; 
			}
		
		else {
			console.log('Нет машин');
			return 0;
		}
	}
}
//TODOдОДУМАТЬ ФУНКЦИЮ ПОЛУЧЕНИЯ СПИСКА ЭЛЕМЕНТОВ
/* function setLisiInfo(data,valueOfCar)
{
	let ChoisedCar = setDescriptionsOfCars(data);//получаем массив автомобиля в переменную
	
	

var valueOfCar;
for(let key in ChoisedCar){
	let propertyCar = ChoisedCar[key];//получаем свойство в переменную
	console.log(propertyCar.length);
	
  valueOfCar=Object(propertyCar);//получаем значение ключа свойства в переменную
	 if(valueOfCar==ChoisedCar){//если значение ключа свойства не равно "coast" то вносим это значение в список
			{	const li=document.createElement('li');
					li.classList.add('listPropertes');
						li.innerHTML=`<li>${valueOfCar}</li>`;
							listOfDescription.appendChild(li); 
			}																			
		}  
	}
} */