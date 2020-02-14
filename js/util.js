'use strict';

(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  var isEscapeEvent = function (evt, action, atr) {
    if (evt.keyCode === ESC_KEY) {
      action(atr);
    }
  };

  var isEnterEvent = function (evt, action, atr) {
    if (evt.keyCode === ENTER_KEY) {
      action(atr);
    }
  };

  var getMaxElement = function (arr) {
    var MaxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (MaxElement < arr[i]) {
        MaxElement = arr[i];
      }
    }
    return MaxElement;
  };

  // Выбирает любое число в заданном интервале
  var chooseRandomMinMax = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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

  var chooseRandomItem = function (arr) {
    var number = arr.length;
    return Math.floor(Math.random() * (number));
  };

  window.util = {
    chooseRandomMinMax: chooseRandomMinMax,
    doShuffles: doShuffles,
    chooseRandomItem: chooseRandomItem,
    getMaxElement: getMaxElement,
    isEscapeEvent: isEscapeEvent,
    isEnterEvent: isEnterEvent
  };
})();
