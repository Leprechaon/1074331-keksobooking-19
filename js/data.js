'use strict';

(function () {
  var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var TITLES = ['Надежный приют', 'Несущие опоры как арт-объект', 'Уголок киномана', 'Симфония стиля', 'Семейные традиции', 'Симбиоз авангарда и классики', 'Гармония, построенная на принципах свободы', 'Захватывающее ощущение раскрепощенности и легкости', 'Звучание города', 'Девичье гнездышко', 'Световая симфония', 'Карнавал текстур и красок', 'Продуманная рациональность', 'Приют всех муз', 'Яркое отражение индивидуальности', 'Романтика мегаполиса', 'Дыхание природы', 'Изящество классики, уют прованса'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = 6;
  var map = document.querySelector('.map');
  var Y = {
    MIN: 130,
    MAX: 630
  };
  var X = {
    MIN: 0,
    MAX: map.offsetWidth
  };

  // Выбирает произвольные элементы из коллекции и их количество
  var doSelections = function (arr) {
    var mix = [];
    var countFeatures = window.util.chooseRandomMinMax(0, arr.length);
    window.util.doShuffles(arr);
    for (var i = 0; i < countFeatures; i++) {
      mix[i] = arr[i];
    }
    return mix;
  };

  var doOffers = function (offersCount) {
    var array = [];
    var titleShuffle = window.util.doShuffles(TITLES);
    for (var i = 0; i < offersCount; i++) {
      var numberOfRooms = window.util.chooseRandomMinMax(1, ROOMS);
      var x = window.util.chooseRandomMinMax(X.MIN, X.MAX);
      var y = window.util.chooseRandomMinMax(Y.MIN, Y.MAX);
      array[i] = {
        author: {
          avatar: AVATARS[i]
        },
        offer: {
          title: titleShuffle[i],
          address: x + ', ' + y,
          price: window.util.chooseRandomMinMax(1, 100000),
          type: TYPES[window.util.chooseRandomMinMax(0, TYPES.length - 1)],
          rooms: numberOfRooms,
          guests: numberOfRooms * 2,
          checkin: CHECKINS[window.util.chooseRandomMinMax(0, CHECKINS.length - 1)],
          checkout: CHECKINS[window.util.chooseRandomMinMax(0, CHECKINS.length - 1)],
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
  window.data = {
    doOffers: doOffers
  };
})();
