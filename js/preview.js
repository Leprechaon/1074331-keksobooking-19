'use strict';

(function () {
  var FILE_TYPES = ['jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var imageChooser = document.querySelector('#images');
  var imagePreviewWrapper = document.querySelector('.ad-form__photo');
  var image = document.createElement('img');

  var ImageSizes = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BORDER_RADIUS: '5px'
  };

  var filtrationByType = function (file) {
    return FILE_TYPES.some(function (type) {
      return file.name.toLowerCase().endsWith(type);
    });
  };

  var replaceAvatar = function (src) {
    avatarPreview.src = src;
  };

  var loadFile = function (chooser, action) {
    var file = Array.from(chooser.files).filter(filtrationByType)[0];
    if (file) {
      var reader = new FileReader();
      reader.addEventListener('load', function (evt) {
        action(evt.target.result);
      });
      reader.readAsDataURL(file);
    }
  };

  var addImage = function (src) {
    image.src = src;
    image.style.width = ImageSizes.WIDTH;
    image.style.height = ImageSizes.HEIGHT;
    image.style.borderRadius = ImageSizes.BORDER_RADIUS;
    if (!document.querySelector('.add-form__image')) {
      imagePreviewWrapper.appendChild(image);
      image.classList.add('add-form__image');
    }
  };

  var onAvatarChange = function (evt) {
    loadFile(evt.target, replaceAvatar);
  };

  var onImageChange = function (evt) {
    loadFile(evt.target, addImage);
  };

  var activate = function () {
    avatarChooser.addEventListener('change', onAvatarChange);
    imageChooser.addEventListener('change', onImageChange);
  };

  var deactivate = function () {
    avatarChooser.removeEventListener('change', onAvatarChange);
    imageChooser.removeEventListener('change', onImageChange);
    replaceAvatar(DEFAULT_AVATAR);
    if (document.querySelector('.add-form__image')) {
      document.querySelector('.add-form__image').remove();
    }
  };

  window.preview = {
    activate: activate,
    deactivate: deactivate
  };
})();
