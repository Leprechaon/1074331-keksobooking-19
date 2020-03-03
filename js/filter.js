'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var lowPrice = 10000;
  var highPrice = 50000;
  var dataFromServer = [];

  var filtration = {
    type: function (arr) {
      switch (housingType.value) {
        case 'any':
          return arr;
        default:
          return arr.filter(function (item) {
            return item.offer.type === housingType.value;
          });
      }
    },

    price: function (arr) {
      switch (housingPrice.value) {
        case 'low': {
          return arr.filter(function (item) {
            return item.offer.price < lowPrice;
          });
        }
        case 'middle': {
          return arr.filter(function (item) {
            return ((item.offer.price <= highPrice) && (lowPrice <= item.offer.price));
          });
        }
        case 'high': {
          return arr.filter(function (item) {
            return highPrice < item.offer.price;
          });
        }
        default:
          return arr;
      }
    },

    rooms: function (arr) {
      switch (housingRooms.value) {
        case 'any':
          return arr;
        default:
          return arr.filter(function (item) {
            return item.offer.rooms === Number.parseInt(housingRooms.value, 10);
          });
      }
    },

    guests: function (arr) {
      switch (housingGuests.value) {
        case 'any':
          return arr;
        default:
          return arr.filter(function (item) {
            return item.offer.guests === Number.parseInt(housingGuests.value, 10);
          });
      }
    },

    features: function (arr) {
      var filteredFeatures = mapFilters.querySelectorAll('input:checked');
      if (filteredFeatures.length === 0) {
        return arr;
      }
      var featureList = [];
      filteredFeatures.forEach(function (item) {
        featureList.push(item.value);
      });

      return arr.filter(function (element) {
        return featureList.every(function (item) {
          return element.offer.features.includes(item);
        });
      });
    }
  };

  var updatePins = window.debounce.del(function () {
    window.map.removePinCard();
    var finalAds = filtration.price(filtration.type(filtration.rooms(filtration.guests(filtration.features(dataFromServer)))));
    window.map.renderFragment(window.util.doShuffles(finalAds), window.pins.render);
  });

  var pins = function (arr) {
    dataFromServer = arr;
    housingType.addEventListener('change', updatePins);
    housingPrice.addEventListener('change', updatePins);
    housingRooms.addEventListener('change', updatePins);
    housingGuests.addEventListener('change', updatePins);
    housingFeatures.addEventListener('change', updatePins);
  };

  window.filter = {
    pins: pins
  };
})();
