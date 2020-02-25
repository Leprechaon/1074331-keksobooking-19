'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var dataFromServer = [];

  var updatePins = function (param) {
    window.map.removePinCard();
    var filteredAds = dataFromServer.filter(function (item) {
      return item.offer.type === param;
    });
    window.map.renderFragment(filteredAds, window.pins.render);
  };

  var pins = function (arr) {
    dataFromServer = arr;
    housingType.addEventListener('change', function () {
      updatePins(housingType.value);
    });
  };

  window.filter = {
    pins: pins
  };
})();
