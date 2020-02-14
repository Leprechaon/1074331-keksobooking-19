'use strict';

(function () {
  var OFFSET_X = 25;
  var OFFSET_Y = 70;
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPins = function (offer) {
    var offerPin = similarPinTemplate.cloneNode(true);
    offerPin.style.left = (offer.location.x - OFFSET_X) + 'px';
    offerPin.style.top = (offer.location.y - OFFSET_Y) + 'px';
    offerPin.querySelector('img').src = offer.author.avatar;
    offerPin.querySelector('img').alt = offer.offer.title;
    offerPin.classList.add('map__pin--ads');
    offerPin.tabindex = 0;
    return offerPin;
  };

  window.pins = {
    renderPins: renderPins,
    offsetX: OFFSET_X,
    offsetY: OFFSET_Y
  };
})();
