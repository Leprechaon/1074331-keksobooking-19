'use strict';

(function () {
  var map = document.querySelector('.map');
  var Y = {
    START: '375px',
    MIN: 130,
    MAX: 630
  };
  var X = {
    START: '570px',
    MIN: 0,
    MAX: map.offsetWidth
  };

  var OFFSET = {
    X: 25,
    Y: 70,
    MAIN: {
      X: 33,
      Y: 70
    }
  };

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var render = function (offer) {
    var offerPin = similarPinTemplate.cloneNode(true);
    offerPin.style.left = (offer.location.x - OFFSET.X) + 'px';
    offerPin.style.top = (offer.location.y - OFFSET.Y) + 'px';
    offerPin.querySelector('img').src = offer.author.avatar;
    offerPin.querySelector('img').alt = offer.offer.title;
    offerPin.classList.add('map__pin--ads');
    return offerPin;
  };

  window.pins = {
    render: render,
    OFFSET: OFFSET,
    X: X,
    Y: Y
  };
})();
