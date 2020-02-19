'use strict';

(function () {
  var KEY_CODE = {ESC: 27,
    ENTER: 13
  };

  var MAIN_MOUSE_BUTTON = 0;

  var isEvent = {
    esc: function (evt, action, atr) {
      if (evt.keyCode === KEY_CODE.ESC) {
        action(atr);
      }
    },
    enter: function (evt, action, atr) {
      if (evt.keyCode === KEY_CODE.ENTER) {
        action(atr);
      }
    }
  };

  var delElements = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].parentNode.removeChild(arr[i]);
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
    isEvent: isEvent,
    delElements: delElements,
    MAIN_MOUSE_BUTTON: MAIN_MOUSE_BUTTON,
    KEY_CODE: KEY_CODE
  };
})();
