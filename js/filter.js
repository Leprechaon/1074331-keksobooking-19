'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var dataFromServer = [];

  var featureFilterKeyListener = function (evt) {
    window.util.isEvent.enter(evt, onFeatureFilterKeydown, evt.target);
  };

  var onFeatureFilterKeydown = function (feature) {
    switch (feature.checked) {
      case true:
        feature.checked = false;
        break;
      default:
        feature.checked = true;
    }
    updatePins();
  };

  var filtration = {
    byType: function (ads) {
      switch (housingType.value) {
        case 'any':
          return ads;
        default:
          return ads.filter(function (ad) {
            return ad.offer.type === housingType.value;
          });
      }
    },

    byPrice: function (ads) {
      switch (housingPrice.value) {
        case 'low': {
          return ads.filter(function (ad) {
            return ad.offer.price < LOW_PRICE;
          });
        }
        case 'middle': {
          return ads.filter(function (ad) {
            return ((ad.offer.price <= HIGH_PRICE) && (LOW_PRICE <= ad.offer.price));
          });
        }
        case 'high': {
          return ads.filter(function (ad) {
            return HIGH_PRICE < ad.offer.price;
          });
        }
        default:
          return ads;
      }
    },

    byRooms: function (ads) {
      switch (housingRooms.value) {
        case 'any':
          return ads;
        default:
          return ads.filter(function (ad) {
            return ad.offer.rooms === Number.parseInt(housingRooms.value, 10);
          });
      }
    },

    byGuests: function (ads) {
      switch (housingGuests.value) {
        case 'any':
          return ads;
        default:
          return ads.filter(function (ad) {
            return ad.offer.guests === Number.parseInt(housingGuests.value, 10);
          });
      }
    },

    byFeatures: function (ads) {
      var filteredFeatures = mapFilters.querySelectorAll('input:checked');
      if (filteredFeatures.length === 0) {
        return ads;
      }
      var featureList = [];
      filteredFeatures.forEach(function (feature) {
        featureList.push(feature.value);
      });

      return ads.filter(function (ad) {
        return featureList.every(function (feature) {
          return ad.offer.features.includes(feature);
        });
      });
    }
  };

  var updatePins = window.debounce(function () {
    window.map.removePinCard();
    var finalAds = filtration.byPrice(filtration.byType(filtration.byRooms(filtration.byGuests(filtration.byFeatures(dataFromServer)))));
    window.map.renderFragment(window.util.doShuffles(finalAds), window.pins.render);
  });

  var activate = function (ads) {
    dataFromServer = ads;
    housingType.addEventListener('change', updatePins);
    housingPrice.addEventListener('change', updatePins);
    housingRooms.addEventListener('change', updatePins);
    housingGuests.addEventListener('change', updatePins);
    housingFeatures.addEventListener('change', updatePins);
    housingFeatures.addEventListener('keydown', featureFilterKeyListener);
  };

  var deactivate = function () {
    housingType.removeEventListener('change', updatePins);
    housingPrice.removeEventListener('change', updatePins);
    housingRooms.removeEventListener('change', updatePins);
    housingGuests.removeEventListener('change', updatePins);
    housingFeatures.removeEventListener('change', updatePins);
    housingFeatures.removeEventListener('keydown', featureFilterKeyListener);
    mapFilters.reset();
  };

  window.filter = {
    activate: activate,
    deactivate: deactivate
  };
})();
