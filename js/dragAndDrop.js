'use strict';

(function () {
  var moveElement = function (element) {
    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var StartCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        dragged = true;

        var Shift = {
          x: StartCoords.x - moveEvt.clientX,
          y: StartCoords.y - moveEvt.clientY
        };

        StartCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if ((element.offsetTop - Shift.y) < (window.pins.Y.MIN - window.pins.OFFSET.MAIN.Y)) {
          element.style.top = (window.pins.Y.MIN - window.pins.OFFSET.MAIN.Y) + 'px';
        } else if ((element.offsetTop - Shift.y) > (window.pins.Y.MAX)) {
          element.style.top = (window.pins.Y.MAX) + 'px';
        } else {
          element.style.top = (element.offsetTop - Shift.y) + 'px';
        }

        if ((element.offsetLeft - Shift.x) < (window.pins.X.MIN - window.pins.OFFSET.MAIN.X)) {
          element.style.left = (window.pins.X.MIN - window.pins.OFFSET.MAIN.X) + 'px';
        } else if ((element.offsetLeft - Shift.x) > (window.pins.X.MAX - window.pins.OFFSET.MAIN.X)) {
          element.style.left = (window.pins.X.MAX - window.pins.OFFSET.MAIN.X) + 'px';
        } else {
          element.style.left = (element.offsetLeft - Shift.x) + 'px';
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        window.map.onMainPinUnpress();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            element.removeEventListener('click', onClickPreventDefault);
          };
          element.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

  };
  window.dragAndDrop = {
    moveElement: moveElement
  };
})();
