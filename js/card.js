'use strict';

(function () {
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var Photo = {
    WIDTH: 45,
    HEIGHT: 40
  };

  // Переводит слова на русский
  var translateType = function (word) {
    switch (word) {
      case 'palace':
        return 'Дворец';
      case 'flat':
        return 'Квартира';
      case 'house':
        return 'Дом';
      case 'bungalo':
        return 'Бунгало';
      default:
        return 'Помещение';
    }
  };

  // Определяет окончание у слов
  var makeEndOfWord = function (numberOfRooms) {
    switch (numberOfRooms) {
      case 1: return 'а';
      case 5: return '';
      default: return 'ы';
    }
  };

  // Отрисовывает карточки с информацией
  var render = function (offer) {
    var offerCard = similarCardTemplate.cloneNode(true);
    offerCard.querySelector('.popup__avatar').src = offer.author.avatar;
    offerCard.querySelector('.popup__title').textContent = offer.offer.title;
    offerCard.querySelector('.popup__text--address').textContent = offer.offer.address;
    offerCard.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
    offerCard.querySelector('.popup__type').textContent = translateType(offer.offer.type);
    offerCard.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнат' + makeEndOfWord(offer.offer.rooms) + ' для ' + offer.offer.guests + ' гостей';
    offerCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    offerCard.querySelector('.popup__features').textContent = '';
    var popupFeatures = offerCard.querySelector('.popup__features');
    for (var i = 0; i < offer.offer.features.length; i++) {
      var feature = document.createElement('li');
      feature.classList = 'popup__feature popup__feature--' + offer.offer.features[i];
      popupFeatures.appendChild(feature);
    }
    offerCard.querySelector('.popup__description').textContent = offer.offer.description;
    var popupPhotos = offerCard.querySelector('.popup__photos');
    popupPhotos.textContent = '';
    for (var j = 0; j < offer.offer.photos.length; j++) {
      var photo = document.createElement('img');
      photo.classList = 'popup__photo';
      photo.src = offer.offer.photos[j];
      photo.width = Photo.WIDTH;
      photo.height = Photo.HEIGHT;
      photo.alt = 'Фотография жилья';
      popupPhotos.appendChild(photo);
    }
    return offerCard;
  };

  window.card = {
    render: render
  };
})();
