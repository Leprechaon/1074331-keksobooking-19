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
        action(atr, evt);
      }
    },
    mainMouseButton: function (evt, action, atr) {
      if (evt.button === MAIN_MOUSE_BUTTON) {
        action(atr);
      }
    }
  };

  var delElements = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].parentNode.removeChild(arr[i]);
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

  window.util = {
    doShuffles: doShuffles,
    isEvent: isEvent,
    delElements: delElements,
    MAIN_MOUSE_BUTTON: MAIN_MOUSE_BUTTON,
    KEY_CODE: KEY_CODE
  };
})();
