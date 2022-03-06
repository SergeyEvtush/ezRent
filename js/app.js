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
iconMenu.classList.toggle('menu_active');
menuBody.classList.toggle('menu_active');
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
if(iconMenu.classList.contains('menu_active'))
{
	/*убираем классы которые добавили при открытии меню */
	document.body.classList.remove('_lock');	
iconMenu.classList.remove('menu_active');
menuBody.classList.remove('menu_active');

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
//!---------------аккордеон--------------------------------- 
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
const titleCards=document.querySelectorAll('.column__header-offert');
/* const popupLinks = document.querySelectorAll('.popup-link'); */
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");
let unlock = true;
const timeout = 800;
//метод подменяющий # в атрибуте href на пустоту для того чтобы по клику переходить к попапу и открывающий попап
function writeHref(arrayNames) {
	
	const popupLinks = document.querySelectorAll('.popup-link');
	if(popupLinks.length>0) {
			for(let index=0;index<popupLinks.length;index++){
				const popupLink=popupLinks[index];
				popupLink.addEventListener("click", function (e) {
					/* const titleCard = arrayNames[index]; */
					const popupName = popupLink.getAttribute('href').replace('#', '');//здесь мы берем ссылку на которую кликаем и из атрибута href  убирае решетку и заменяем на имя по id
					let titleCardValue;
					if (index == 0) {
						titleCardValue = arrayNames[arrayNames.length-1];

					}
					else { 
						titleCardValue = arrayNames[index-1];
					}
					//получаю текст который написан в том объекте кнопку которого мы слушаем
					document.getElementById("carBrand").value=titleCardValue;//записываем  полученный текст в инпут который находится в попапе в форме
					const curentPopup = document.getElementById(popupName);
					popupOpen(curentPopup);
					e.preventDefault();//с пом этой функции запрещаем перезагружать страницу
			});
		}
	}
}
//вызов метода подменяющего # в атрибуте href на пустоту для того чтобы по клику переходить к попапу
writeHref(titleCards);
//метод для объектов закрывающих попап
const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length>0){
	for(let index=0;index<popupCloseIcon.length;index++){
		const el=popupCloseIcon[index];
		el.addEventListener('click',function(e){
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
//!------------------------клонирование и запись из файла-----------------
let carsArray;
let description;
var CloningCard = document.getElementById("clone");

function SetCardsTitle(clone, carsArray, data) {
	//клонирование элементов аренды
	clone.querySelector('.image__item').innerHTML = `<img src="files/rentalcars/car0.jpeg" alt="car">`;//установка фоток в первую карту
	clone.querySelector('.title__car-text').innerHTML = carsArray[0];//название в первую карту
	//создаю клонов карт первой карты
	for (let i = 1; i <= carsArray.length - 1; i++) {
		var CloneCard = clone.cloneNode(true);//обозначаю что клонирование глубокое т.е все узлы
		CloneCard.querySelector('.title__car-text').innerHTML=`${carsArray[i]}`;
		CloneCard.querySelector('.image__item').innerHTML = `<img src="files/rentalcars/car${i}.jpeg" alt="car">`;//меняю путь к фоткам i элемент цифра в фотке в фотке
		var g = getArrayOfTheCarDescr(getDescriptionOfCars(setNamesOfCars(data), data, carsArray[i]));//метод получения массива описаний машин
		//бегаю по этому массиву и получаю данные для списка характеристик машин
		for (let h = 0; h < g.length; h++) {
			 const li=document.createElement('li');//создаем новый элемент списка
			 li.innerHTML=g[h]; //заполняем его
			 CloneCard.querySelector('.item__car-list').replaceWith(li);//берем старый и меняем на новый
		}
	
		clone.after(CloneCard);//добавляю клонированную карту
		
	}
	//вызов метода подменяющего # в атрибуте href на пустоту для того чтобы по клику переходить к попапу
	//? т.к при клонировании клонируются только свойства и узлы а события нет их надо прописывать заново
	writeHref(carsArray.reverse());
	
	console.log(carsArray.length);
	
}

/*--------------------------------------------------------- */
//!---------------получение данных из json------------------------- 
var valueOfCar = document.getElementsByClassName('title__car-text');//переменная для получения названия машин
var listOfDescription = document.getElementById('list');//получаем в переменную список 
var request = new XMLHttpRequest();//создаем объект запроса
var requestURL = 'files/jsonFiles/descriptionCar.json';//получаем адрес json файла
request.open('GET',requestURL);
//создаем объект запроса

request.onload=function(e){
	if(request.readyState===4){
		if(request.status===200){
			var dataList=JSON.parse(request.responseText);//получаем текстовые данные которые записываем в переменную dataTable
			SetCardsTitle(CloningCard, setNamesOfCars(dataList),dataList);//метод для заполнения карточек 
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

/*метод получения массива автомобилей */
function setNamesOfCars(data) {
	for (let key in data) {
		if (data.hasOwnProperty(key)) {
			carsArray = Object.keys(data);
			return carsArray; 
			}
		else {
			console.log('Нет машин');
			return 0;
		}
	}
}
//Метод получения определенного описания всех машин
//в параметрах должен быть массив объектов машин общие данные и машина 
function getDescriptionOfCars(arrayCars,data,car) { 
	var arrayOfCarsObjects = arrayCars;
	var dataArray = data;
			for (const key in dataArray) {//в строчке ниже я сверяю переданную машину с машиной из данных если такая есть то получаю данные
				if (Object.hasOwnProperty.call(dataArray, key)&&key===car) {
					const element = Object.values(dataArray[key]);
					return element;
				}
			}
		}
//Метод получения значений описания 
function getArrayOfTheCarDescr(arrayDescription) {
	for (let i = 0; i <arrayDescription.length; i++) {
		 for (const key in arrayDescription) {
			if (Object.hasOwnProperty.call(arrayDescription, key)) {
				const element = Object.values(arrayDescription);
					return element;
				}
			}
		}
}
	/*-------------------------------------------------- */
//!--------------Анимация при скролле------------------------

	const animItems = document.querySelectorAll('._anim-items');//класс объектов которые будут анимироваться
	if (animItems.length > 0) {
		window.addEventListener('scroll', animOnScroll);//слушаем событи скролл,когда он происходит запускаем метод animOnScroll
		function animOnScroll(params) {
			for (let i = 0; i < animItems.length; i++) {
				const animItem = animItems[i];
				const animItemHeight = animItem.offsetHeight;
				const animItemOffset = offset(animItem).top;//с пом функции(см ниже) растояние от верха экрана до объекта 

				const animStart = 8;//коэффициент регулирующий момент старта анимации
				//расчет точки начала анимации
				let animItemPoint = window.innerHeight - animItemHeight / animStart;//высота окна браузера минус высота объекта поделенную на коэффициент регулирующий момент начала старта анимации
				//если объект по высоте больше чем высота окна браузера то расчет точки начала анимации будет считаться по формуле ниже
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}
				//если пркручено больше чем позиция объекта минус точка старта и меньше чем позиция объекта минус его высота
				if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
					animItem.classList.add('_activeScroll');
				} else {
					if (!animItem.classList.contains('_anim-no-hide')) {
						animItem.classList.remove('_activeScroll');
					}
	
	
				}
			}

		}
		//функция вычисляющая растояние от верха экрана до начала объекта
		//или гот правой части экрана до объекта
		function offset(el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + screenLeft }
		}
		//метод задержки анимации
		setTimeout(() => {
			//вызываю метод "изначально" для того чтобы анимация была сразу при загрузке окна
			animOnScroll();
		}, 300);
	
	} 





 

																	

