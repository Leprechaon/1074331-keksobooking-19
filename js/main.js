'use strict';
var NUMBERS_OF_OFFERS = 8;
var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLES = ['Надежный приют', 'Несущие опоры как арт-объект', 'Уголок киномана', 'Симфония стиля', 'Семейные традиции', 'Симбиоз авангарда и классики', 'Гармония, построенная на принципах свободы', 'Захватывающее ощущение раскрепощенности и легкости', 'Звучание города', 'Девичье гнездышко', 'Световая симфония', 'Карнавал текстур и красок', 'Продуманная рациональность', 'Приют всех муз', 'Яркое отражение индивидуальности', 'Романтика мегаполиса', 'Дыхание природы', 'Изящество классики, уют прованса'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ROOMS = 6;
var PIN_OFFSET_X = 25;
var PIN_OFFSET_Y = 70;
var Y_MIN = 130;
var Y_MAX = 630;
var map = document.querySelector('.map');
var xMax = map.offsetWidth;
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarListElement = document.querySelector('.map__pins');
var titleShuffle = doShuffles(TITLES);
map.classList.remove('map--faded');

function doShuffles(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

var chooseRandomMinMax = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var doSelections = function (arr) {
  var mix = [];
  var countFeatures = chooseRandomMinMax(1, arr.length);
  doShuffles(arr);
  for (var i = 0; i < countFeatures; i++) {
    mix[i] = arr[i];
  }
  return mix;
};

var doOffers = function (offersCount) {
  var array = [];
  for (var i = 0; i < offersCount; i++) {
    var numberOfRooms = chooseRandomMinMax(1, ROOMS);
    var x = chooseRandomMinMax(0, xMax);
    var y = chooseRandomMinMax(Y_MIN, Y_MAX);
    array[i] = {
      author: {
        avatar: AVATARS[i]
      },
      offer: {
        title: titleShuffle[i],
        address: x + ', ' + y,
        price: chooseRandomMinMax(1, 100000),
        type: TYPES[chooseRandomMinMax(0, TYPES.length - 1)],
        rooms: numberOfRooms,
        guests: numberOfRooms * 2,
        checkin: CHECKINS[chooseRandomMinMax(0, CHECKINS.length - 1)],
        checkout: CHECKINS[chooseRandomMinMax(0, CHECKINS.length - 1)],
        features: doSelections(FEATURES),
        description: 'Хорошая квартира, надо брать',
        photos: PHOTOS
      },
      location: {
        x: x,
        y: y
      }
    };
  }
  return array;
};

var offers = doOffers(NUMBERS_OF_OFFERS);

var renderPins = function (offer) {
  var offerElement = similarPinTemplate.cloneNode(true);
  offerElement.style.left = (offer.location.x - PIN_OFFSET_X) + 'px';
  offerElement.style.top = (offer.location.y - PIN_OFFSET_Y) + 'px';
  offerElement.querySelector('img').src = offer.author.avatar;
  offerElement.querySelector('img').alt = offer.offer.title;
  return offerElement;
};

var renderFragment = function (array, templateFunction) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(templateFunction(offers[i]));
  }
  similarListElement.appendChild(fragment);
};

renderFragment(offers, renderPins);
