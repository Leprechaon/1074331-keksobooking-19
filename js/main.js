'use strict';
var NUMBERS_OF_OFFERS = 8;
var AVATAR_ARRAY = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLE_ARRAY = ['Надежный приют', 'Несущие опоры как арт-объект', 'Уголок киномана', 'Симфония стиля', 'Семейные традиции', 'Симбиоз авангарда и классики', 'Гармония, построенная на принципах свободы', 'Захватывающее ощущение раскрепощенности и легкости', 'Звучание города', 'Девичье гнездышко', 'Световая симфония', 'Карнавал текстур и красок', 'Продуманная рациональность', 'Приют всех муз', 'Яркое отражение индивидуальности', 'Романтика мегаполиса', 'Дыхание природы', 'Изящество классики, уют прованса'];
var TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_ARRAY = ['12:00', '13:00', '14:00'];
var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarListElement = document.querySelector('.map__pins');
var X_MAX = map.offsetWidth;
var Y_MIN = 130;
var Y_MAX = 630;

map.classList.remove('map--faded');

var randomItem = function (arr) {
  var number = arr.length;
  return Math.floor(Math.random() * (number));
};

var randomNumber = function (number) {
  return Math.ceil(Math.random() * (number));
};

var randomMinMax = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var mixArray = function (arr) {
  var countOffers = randomNumber(arr.length);
  var array = [];
  for (var i = 0; i < countOffers; i++) {
    var item = randomItem(arr);
    array[i] = arr[item];
    arr.splice(item, 1);
  }
  return array;
};

var offersArrays = function (offersCount) {
  var array = [];
  for (var i = 0; i < offersCount; i++) {
    var avatarNumber = randomItem(AVATAR_ARRAY);
    var titleNumber = randomItem(TITLE_ARRAY);
    var numberOfRooms = randomNumber(6);
    var X = randomMinMax(0, X_MAX);
    var Y = randomMinMax(Y_MIN, Y_MAX);
    array[i] = {
      author: {
        avatar: AVATAR_ARRAY[avatarNumber]
      },
      offer: {
        title: TITLE_ARRAY[titleNumber],
        address: X + ', ' + Y,
        price: randomNumber(100000),
        type: TYPE_ARRAY[randomItem(TYPE_ARRAY)],
        rooms: numberOfRooms,
        guests: numberOfRooms * 2,
        checkin: CHECKIN_ARRAY[randomItem(CHECKIN_ARRAY)],
        checkout: CHECKIN_ARRAY[randomItem(CHECKIN_ARRAY)],
        features: mixArray(FEATURES_ARRAY),
        description: 'Хорошая квартира, надо брать',
        photos: PHOTOS_ARRAY
      },
      location: {
        x: X,
        y: Y
      }
    };
    AVATAR_ARRAY.splice(avatarNumber, 1);
    TYPE_ARRAY.splice(titleNumber, 1);
  }
  return array;
};

var offers = offersArrays(NUMBERS_OF_OFFERS);

var renderPins = function (offer) {
  var offerElement = similarPinTemplate.cloneNode(true);
  offerElement.style.left = (offer.location.x - 25) + 'px';
  offerElement.style.top = (offer.location.y - 70) + 'px';
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
