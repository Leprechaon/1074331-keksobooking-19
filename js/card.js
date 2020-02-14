'use strict';

(function () {
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Переводит слова на русский
  var translateType = function (word) {
    var translatedWord;
    switch (word) {
      case 'palace': translatedWord = 'Дворец';
        break;
      case 'flat': translatedWord = 'Квартира';
        break;
      case 'house': translatedWord = 'Дом';
        break;
      case 'bungalo': translatedWord = 'Бунгало';
        break;
    }
    return translatedWord;
  };

  // Определяет окончание у слов
  var makeEndOfWord = function (numberOfRooms) {
    var endOfWord = 'ы';
    if (numberOfRooms === 1) {
      endOfWord = 'а';
    }
    if (numberOfRooms === 5) {
      endOfWord = '';
    }
    return endOfWord;
  };

  // Отрисовывает карточки с информацией
  var renderCards = function (offer) {
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
      photo.width = 45;
      photo.height = 40;
      photo.alt = 'Фотография жилья';
      popupPhotos.appendChild(photo);
    }
    return offerCard;
  };

  window.card = {
    render: renderCards
  };
})();
