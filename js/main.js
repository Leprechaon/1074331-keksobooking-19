'use strict';
var NUMBERS_OF_OFFERS = 8;
var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLES = ['Надежный приют', 'Несущие опоры как арт-объект', 'Уголок киномана', 'Симфония стиля', 'Семейные традиции', 'Симбиоз авангарда и классики', 'Гармония, построенная на принципах свободы', 'Захватывающее ощущение раскрепощенности и легкости', 'Звучание города', 'Девичье гнездышко', 'Световая симфония', 'Карнавал текстур и красок', 'Продуманная рациональность', 'Приют всех муз', 'Яркое отражение индивидуальности', 'Романтика мегаполиса', 'Дыхание природы', 'Изящество классики, уют прованса'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
// var RUS_TYPES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ROOMS = 6;
var MAIN_MOUSE_BUTTON = 0;
var KEY_ENTER = 'Enter';
var PIN_OFFSET_X = 25;
var PIN_OFFSET_Y = 70;
var Y_MIN = 130;
var Y_MAX = 630;
var map = document.querySelector('.map');
var xMax = map.offsetWidth;
var adForm = document.querySelector('.ad-form');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarListPins = document.querySelector('.map__pins');
// var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var selectForm = mapFiltersContainer.querySelectorAll('.map__filter');
var fieldsetForm = document.querySelectorAll('fieldset');
var mainPin = map.querySelector('.map__pin--main');
var type = document.querySelector('#type');
var price = document.querySelector('#price');
var rooms = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

// Отключает все элементы переданного массива
var disableForm = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = true;
  }
};

// Включает все элементы переданного массива
var enableForm = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = false;
  }
};

// Перемешивает массив
var doShuffles = function (arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

// Выбирает любое число в заданном интервале
var chooseRandomMinMax = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Выбирает произвольные элементы из коллекции и их количество
var doSelections = function (arr) {
  var mix = [];
  var countFeatures = chooseRandomMinMax(0, arr.length);
  doShuffles(arr);
  for (var i = 0; i < countFeatures; i++) {
    mix[i] = arr[i];
  }
  return mix;
};

// Собирает коллекцию предложений
var doOffers = function (offersCount) {
  var array = [];
  var titleShuffle = doShuffles(TITLES);
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

// Отрисовывает пины
var renderPins = function (offer) {
  var offerPin = similarPinTemplate.cloneNode(true);
  offerPin.style.left = (offer.location.x - PIN_OFFSET_X) + 'px';
  offerPin.style.top = (offer.location.y - PIN_OFFSET_Y) + 'px';
  offerPin.querySelector('img').src = offer.author.avatar;
  offerPin.querySelector('img').alt = offer.offer.title;
  return offerPin;
};

// Переводит слова на русский
// var translateType = function (word) {
//   var translatedWord;
//   for (var i = 0; i < TYPES.length; i++) {
//     if (TYPES[i] === word) {
//       translatedWord = RUS_TYPES[i];
//       break;
//     }
//   }
//   return translatedWord;
// };

// Определяет окончание у слов
// var makeEndOfWord = function (numberOfRooms) {
//   var endOfWord = 'ы';
//   if (numberOfRooms === 1) {
//     endOfWord = 'а';
//   }
//   if (numberOfRooms === 5) {
//     endOfWord = '';
//   }
//   return endOfWord;
// };

// Отрисовывает карточки с информацией
// var renderCards = function (offer) {
//   var offerCard = similarCardTemplate.cloneNode(true);
//   offerCard.querySelector('.popup__avatar').src = offer.author.avatar;
//   offerCard.querySelector('.popup__title').textContent = offer.offer.title;
//   offerCard.querySelector('.popup__text--address').textContent = offer.offer.address;
//   offerCard.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
//   offerCard.querySelector('.popup__type').textContent = translateType(offer.offer.type);
//   offerCard.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнат' + makeEndOfWord(offer.offer.rooms) + ' для ' + offer.offer.guests + ' гостей';
//   offerCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
//   offerCard.querySelector('.popup__features').textContent = '';
//   var popupFeatures = offerCard.querySelector('.popup__features');
//   for (var i = 0; i < offer.offer.features.length; i++) {
//     var feature = document.createElement('li');
//     feature.classList = 'popup__feature popup__feature--' + offer.offer.features[i];
//     popupFeatures.appendChild(feature);
//   }
//   offerCard.querySelector('.popup__description').textContent = offer.offer.description;
//   var popupPhotos = offerCard.querySelector('.popup__photos');
//   popupPhotos.textContent = '';
//   for (var j = 0; j < offer.offer.photos.length; j++) {
//     var photo = document.createElement('img');
//     photo.classList = 'popup__photo';
//     photo.src = offer.offer.photos[j];
//     photo.width = 45;
//     photo.height = 40;
//     photo.alt = 'Фотография жилья';
//     popupPhotos.appendChild(photo);
//   }
//   return offerCard;
// };

// отрисовывает фрагмент с элементами
var renderFragment = function (array, templateFunction) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(templateFunction(array[i]));
  }
  return fragment;
};

var pinFragment = renderFragment(offers, renderPins);
// var cardFragment = renderCards(offers[chooseRandomMinMax(0, offers.length - 1)]);

var onPinPress = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  enableForm(selectForm);
  enableForm(fieldsetForm);
  similarListPins.appendChild(pinFragment);
};

var onPinUnpress = function () {
  document.querySelector('#address').value = (delPX(mainPin.style.left) + PIN_OFFSET_X) + ', ' + (delPX(mainPin.style.top) + PIN_OFFSET_Y);
};

// Валидация

var checkMinPrice = function () {
  switch (type.value) {
    case 'flat': price.min = 1000;
      price.placeholder = '1000';
      break;
    case 'house': price.min = 5000;
      price.placeholder = '5000';
      break;
    case 'palace': price.min = 10000;
      price.placeholder = '10000';
      break;
    default: price.min = 0;
      price.placeholder = '0';
  }
};

var delPX = function (string) {
  var word = string.substr(0, string.length - 2);
  return Number.parseInt(word, 10);
};

var checkRoomCapacity = function () {
  var roomNumber = Number.parseInt(rooms.value, 10);
  var capacityNumber = Number.parseInt(capacity.value, 10);
  if (roomNumber < capacityNumber) {
    capacity.setCustomValidity('Количество гостей не должно превышать количество комнат!');
    rooms.setCustomValidity('');
  } else if ((roomNumber > 10) & (capacityNumber !== 0)) {
    rooms.setCustomValidity('');
    capacity.setCustomValidity('Это не для гостей');
  } else if ((capacityNumber === 0) & (roomNumber !== 100)) {
    rooms.setCustomValidity('Вам требуется больше комнат!');
    capacity.setCustomValidity('');
  } else {
    rooms.setCustomValidity('');
    capacity.setCustomValidity('');
  }
};

disableForm(selectForm);
disableForm(fieldsetForm);
checkRoomCapacity();
checkMinPrice();

document.querySelector('#address').value = (delPX(mainPin.style.left) + PIN_OFFSET_X) + ', ' + (delPX(mainPin.style.top) + PIN_OFFSET_Y);

mainPin.addEventListener('mousedown', function (MouseEvent) {
  if (MouseEvent.button === MAIN_MOUSE_BUTTON) {
    onPinPress();
    mainPin.addEventListener('mousemove', onPinUnpress);
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === KEY_ENTER) {
    onPinPress();
  }
});

type.addEventListener('change', function () {
  checkMinPrice();
});

rooms.addEventListener('change', function () {
  checkRoomCapacity();
});

capacity.addEventListener('change', function () {
  checkRoomCapacity();
});


//  Вставка карточки на карте
// map.appendChild(cardFragment);
//  Смещение фильтра в конец
// map.appendChild(mapFiltersContainer);

