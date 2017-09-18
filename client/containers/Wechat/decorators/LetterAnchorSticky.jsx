import React from 'react';
import { Sticky, StickyContainer } from 'react-sticky';
import classNames from 'classnames';
import uuidv1 from 'uuid/v1';

import WeuiCells from '../components/WeuiCells/WeuiCells';
import { HEADER_HEIGHT } from '../constants/Constants';
import ElementUtil from '../../../utils/ElementUtil';

function LetterAnchorSticky(letterIdPrefix) {
  letterIdPrefix = letterIdPrefix || uuidv1();
  const letterAlphaId = `${letterIdPrefix}-alpha%s`;

  return function (WrappedComponent) {
    WrappedComponent.prototype.onClickAnchorLetter = function (letter) {
      const that = this;
      return function (e) {
        const anchor = document.getElementById(letterAlphaId.replace('%s', letter));
        if (anchor && Math.abs(anchor.offsetTop - (HEADER_HEIGHT * that.state.fontSize)) >= 5) {
          window.scrollTo(0, anchor.offsetTop);
        }
        e.stopPropagation();
      };
    };

    WrappedComponent.prototype.redrawStickyAnchorLetter = function () {
      if (this.checkIsSubRoute()) {
        return;
      }

      const subDom = this.officialAccountsWrapper || document;

      const stickyAlphas = subDom.getElementsByClassName('sticky');
      const length = stickyAlphas.length;
      let stickyAlphaLetter;
      if (stickyAlphas.length) {
        const stickyAlpha = stickyAlphas[length - 1];
        stickyAlphaLetter = stickyAlpha.getAttribute('data-alpha');
      }

      const anchors = subDom.getElementsByClassName('letter-anchor');
      for (const anchor of anchors) {
        if (ElementUtil.hasClassName(anchor, 'anchor-sticky') && anchor.innerText !== stickyAlphaLetter) {
          ElementUtil.removeClassName(anchor, 'anchor-sticky');
        }

        if (anchor.innerText === stickyAlphaLetter) {
          ElementUtil.addClassName(anchor, 'anchor-sticky');
        }
      }
    };

    WrappedComponent.prototype.triggerStickyAnchorLetter = function (letter) {
      const subDom = this.officialAccountsWrapper || document;

      const anchors = subDom.getElementsByClassName('letter-anchor');
      for (const anchor of anchors) {
        if (ElementUtil.hasClassName(anchor, 'anchor-sticky') && anchor.innerText !== letter) {
          ElementUtil.removeClassName(anchor, 'anchor-sticky');
        }

        if (anchor.innerText === letter) {
          ElementUtil.addClassName(anchor, 'anchor-sticky');
        }
      }
    };

    WrappedComponent.prototype.renderLetterStickyContainer = function () {
      const { letters } = this.props;
      const fontSize = this.state.fontSize || 16;

      return (
        <ul className="contact-frineds">
          {
            letters.map((letter, index) => (
              <StickyContainer className="contact-friends-group" key={index}>
                <Sticky topOffset={-(((HEADER_HEIGHT + 0.56) * fontSize) - 2)}>
                  {
                    ({ isSticky, style }) => {
                      if (isSticky && this.stickyLetter !== letter) {
                        this.triggerStickyAnchorLetter(letter);
                        this.stickyLetter = letter;
                      }

                      return (
                        <p
                          id={letterAlphaId.replace('%s', letter)}
                          data-alpha={letter}
                          className={classNames('contact-alpha', { sticky: isSticky })}
                          style={{ ...style, top: (HEADER_HEIGHT * fontSize) - 2 }}
                        >{letter}</p>
                      );
                    }
                  }
                </Sticky>
                <WeuiCells cells={this.getStickyContainerCells(letter)} />
              </StickyContainer>
            ))
          }
        </ul>
      );
    };

    WrappedComponent.prototype.renderStickyAnchor = function () {
      const { letters } = this.props;
      return (
        <ul className="anchor-bar">
          {
            letters.map((item, index) => (
              <li
                className={classNames('letter-anchor', `letter-anchor-${item}`)}
                key={index}
                onClick={this.onClickAnchorLetter(item)}
              >{item}</li>
            ))
          }
        </ul>
      );
    };

    WrappedComponent.prototype.renderStickyStatistics = function (unit) {
      const { total } = this.props;
      return (<p className="contact-frineds-statistics">{`${total}${unit}`}</p>);
    };
  };
}

export default LetterAnchorSticky;
