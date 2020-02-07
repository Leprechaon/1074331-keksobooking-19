'use strict';
var NUMBERS_OF_OFFERS = 8;
var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLES = ['Надежный приют', 'Несущие опоры как арт-объект', 'Уголок киномана', 'Симфония стиля', 'Семейные традиции', 'Симбиоз авангарда и классики', 'Гармония, построенная на принципах свободы', 'Захватывающее ощущение раскрепощенности и легкости', 'Звучание города', 'Девичье гнездышко', 'Световая симфония', 'Карнавал текстур и красок', 'Продуманная рациональность', 'Приют всех муз', 'Яркое отражение индивидуальности', 'Романтика мегаполиса', 'Дыхание природы', 'Изящество классики, уют прованса'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var RUS_TYPES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
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
var similarListPins = document.querySelector('.map__pins');
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var titleShuffle = doShuffles(TITLES);
var mapFiltersContainer = map.querySelector('.map__filters-container');
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
  var countFeatures = chooseRandomMinMax(0, arr.length);
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
  var offerPin = similarPinTemplate.cloneNode(true);
  offerPin.style.left = (offer.location.x - PIN_OFFSET_X) + 'px';
  offerPin.style.top = (offer.location.y - PIN_OFFSET_Y) + 'px';
  offerPin.querySelector('img').src = offer.author.avatar;
  offerPin.querySelector('img').alt = offer.offer.title;
  return offerPin;
};

var translateType = function (word) {
  var translatedWord;
  for (var i = 0; i < TYPES.length; i++) {
    if (TYPES[i] === word) {
      translatedWord = RUS_TYPES[i];
      break;
    }
  }
  return translatedWord;
};

var makeEndOfWord = function (numberOfRooms) {
  var endOfWord = 'ы';
  if (numberOfRooms === 1) {
    endOfWord = 'а';
  }
  if (numberOfRooms === 5) {
    endOfWord = '';
  }
  return endOfWord;
};

var renderCards = function (offer) {
  var offerCard = similarCardTemplate.cloneNode(true);
  offerCard.querySelector('.popup__avatar').src = offer.author.avatar;
  offerCard.querySelector('.popup__title').textContent = offer.offer.title;
  offerCard.querySelector('.popup__text--address').textContent = offer.offer.address;
  offerCard.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
  offerCard.querySelector('.popup__type').textContent = translateType(offer.offer.type);
  offerCard.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнат' + makeEndOfWord(offer.offer.rooms) + ' для ' + offer.offer.guests + ' гостей';
  offerCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  offerCard.querySelector('.popup__features').textContent = '';
  var popupFeatures = offerCard.querySelector('.popup__features');
  for (var i = 0; i < offer.offer.features.length; i++) {
    var feature = document.createElement('li');
    feature.classList = 'popup__feature popup__feature--' + offer.offer.features[i];
    popupFeatures.appendChild(feature);
  }
  offerCard.querySelector('.popup__description').textContent = offer.offer.description;
  var popupPhotos = offerCard.querySelector('.popup__photos');
  popupPhotos.textContent = '';
  for (var j = 0; j < offer.offer.photos.length; j++) {
    var photo = document.createElement('img');
    photo.classList = 'popup__photo';
    photo.src = offer.offer.photos[j];
    photo.width = 45;
    photo.height = 40;
    photo.alt = 'Фотография жилья';
    popupPhotos.appendChild(photo);
  }
  return offerCard;
};

var renderFragment = function (array, templateFunction) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(templateFunction(array[i]));
  }
  return fragment;
};

var pinFragment = renderFragment(offers, renderPins);
var cardFragment = renderCards(offers[chooseRandomMinMax(0, offers.length - 1)]);
similarListPins.appendChild(pinFragment);
map.appendChild(cardFragment);
map.appendChild(mapFiltersContainer);
