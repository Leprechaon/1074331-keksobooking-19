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

  var onFeatureFilterKeydown = function (evt) {
    window.util.isEvent.enter(evt, toggleFeatures, evt.target);
  };

  var toggleFeatures = function (feature) {
    switch (feature.checked) {
      case true:
        feature.checked = false;
        break;
      default:
        feature.checked = true;
    }
    onFilterChange();
  };

  var Filtration = {
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

  var onFilterChange = window.debounce(function () {
    window.map.removePinCard();
    var finalAds = Filtration.byPrice(Filtration.byType(Filtration.byRooms(Filtration.byGuests(Filtration.byFeatures(dataFromServer)))));
    window.map.renderFragment(window.util.doShuffles(finalAds), window.pins.render);
  });

  var activate = function (ads) {
    dataFromServer = ads;
    housingType.addEventListener('change', onFilterChange);
    housingPrice.addEventListener('change', onFilterChange);
    housingRooms.addEventListener('change', onFilterChange);
    housingGuests.addEventListener('change', onFilterChange);
    housingFeatures.addEventListener('change', onFilterChange);
    housingFeatures.addEventListener('keydown', onFeatureFilterKeydown);
  };

  var deactivate = function () {
    housingType.removeEventListener('change', onFilterChange);
    housingPrice.removeEventListener('change', onFilterChange);
    housingRooms.removeEventListener('change', onFilterChange);
    housingGuests.removeEventListener('change', onFilterChange);
    housingFeatures.removeEventListener('change', onFilterChange);
    housingFeatures.removeEventListener('keydown', onFeatureFilterKeydown);
    mapFilters.reset();
  };

  window.filter = {
    activate: activate,
    deactivate: deactivate
  };
})();
