import ElementUtil from '../../../utils/ElementUtil';

function BindSwiper(width = '156px') {
  const fontSize = (ElementUtil.getElementStyle(document.documentElement, 'font-size') || '16px').replace('px', '');
  const maxWith = width.indexOf('rem') > -1 ? width.replace('rem', '') * fontSize : width.replace('px', '');
  return function (WrappedComponent) {
    WrappedComponent.prototype.bindSwiper = function (element, swiperExpandCallback) {
      let isTouchMove;
      let startTx;
      let startTy;

      const handleTouchstart = (e) => {
        const touches = e.touches[0];
        startTx = touches.clientX;
        startTy = touches.clientY;
        isTouchMove = false;
      };

      const handleTouchmove = (e) => {
        const touches = e.changedTouches[0];
        const endTx = touches.clientX;
        const endTy = touches.clientY;
        const distanceX = startTx - endTx;
        const distanceY = startTy - endTy;

        if (distanceX < 0) { // 右滑
          if (Math.abs(distanceX) >= Math.abs(distanceY)) {
            if (Math.abs(distanceX) > 20) {
              element.style.transition = '0.3s';
              element.style.marginLeft = `${0}px`;
              element.style.marginRight = `${0}px`;
            }
          }
        } else if (Math.abs(distanceX) >= Math.abs(distanceY)) { // 左滑
          if (distanceX < maxWith && distanceX > 20) {
            e.preventDefault();
            element.style.transition = '0s';
            element.style.marginLeft = `${-distanceX}px`;
            element.style.marginRight = `${distanceX}px`;
            isTouchMove = true;
          }
        }
        // e.preventDefault()
      };

      const handleTouchend = (e) => {
        if (!isTouchMove) {
          return;
        }

        const touches = e.changedTouches[0];
        const endTx = touches.clientX;
        const endTy = touches.clientY;
        const distanceX = startTx - endTx;
        const distanceY = startTy - endTy;

        if (Math.abs(distanceX) >= Math.abs(distanceY)) {
          if (distanceX < 0) {
            return;
          }
          if (Math.abs(distanceX) < 60) {
            element.style.transition = '0.3s';
            element.style.marginLeft = `${0}px`;
            element.style.marginRight = `${0}px`;
          } else {
            element.style.transition = '0.3s';
            element.style.marginLeft = `-${width}`;
            element.style.marginRight = `${width}`;
            if (swiperExpandCallback) {
              swiperExpandCallback();
            }
          }
        }
      };

      element.addEventListener('touchstart', handleTouchstart, false);
      element.addEventListener('touchmove', handleTouchmove, false);
      element.addEventListener('touchend', handleTouchend, false);

      return { handleTouchstart, handleTouchmove, handleTouchend };
    };

    WrappedComponent.prototype.unbindSwiper = function (element, handleTouchstart, handleTouchmove, handleTouchend) {
      element.removeEventListener('touchstart', handleTouchstart, false);
      element.removeEventListener('touchmove', handleTouchmove, false);
      element.removeEventListener('touchend', handleTouchend, false);
    };

    WrappedComponent.prototype.restoreSwiper = function (element) {
      element.style.transition = '0.3s';
      element.style.marginLeft = `${0}px`;
      element.style.marginRight = `${0}px`;
    };
  };
}


export default BindSwiper;
