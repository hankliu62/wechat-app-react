import ElementUtil from '../../../utils/ElementUtil';
import { HEADER_HEIGHT } from '../constants/Constants';

function GetStickyPostion(stickyChildrenHeight = 0.56, coefficient = 2) {
  const fontSize = (ElementUtil.getElementStyle(document.documentElement, 'font-size') || '16px').replace('px', '');

  return function (WrappedComponent) {
    WrappedComponent.prototype.getStickyTopOffset = function () {
      return -(((HEADER_HEIGHT + stickyChildrenHeight) * fontSize) - coefficient);
    };

    WrappedComponent.prototype.getStickyChildrenTop = function () {
      return (HEADER_HEIGHT * fontSize) - coefficient;
    };
  };
}


export default GetStickyPostion;
