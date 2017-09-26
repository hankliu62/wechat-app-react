import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';
import throttle from 'lodash/throttle';
import debug from 'debug';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';
import WeuiSearchBar from '../../../../components/WeuiSearchBar/WeuiSearchBar';
import LetterAnchorSticky from '../../../../decorators/LetterAnchorSticky';
import CheckRoute from '../../../../decorators/CheckRoute';
import * as contactActions from '../../../../actions/contact';
import ElementUtil from '../../../../../../utils/ElementUtil';
import ObjectUtils from '../../../../../../utils/ObjectUtils';

import './OfficialAccounts.less';

const contactDebug = debug('wechat:contact');

@CheckRoute
@LetterAnchorSticky()
class OfficialAccounts extends Component {
  static propTypes = {
    officialAccounts: PropTypes.object,
    letters: PropTypes.array,
    total: PropTypes.number.isRequired,
    fetchOfficialAccounts: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      fontSize: '16'
    };

    contactDebug('official accounts letters:', props.letters);
    contactDebug('official accounts letters total:', props.total);

    this.checkIsSubRoute = this.checkIsSubRoute.bind(this);
    this.triggerStickyAnchorLetter = this.triggerStickyAnchorLetter.bind(this);
    this.onClickAnchorLetter = this.onClickAnchorLetter.bind(this);
    this.redrawStickyAnchorLetter = this.redrawStickyAnchorLetter.bind(this);
    this.renderLetterStickyContainer = this.renderLetterStickyContainer.bind(this);
    this.renderStickyAnchor = this.renderStickyAnchor.bind(this);
    this.renderStickyStatistics = this.renderStickyStatistics.bind(this);
  }

  componentDidMount() {
    if (!this.props.officialAccounts) {
      this.props.fetchOfficialAccounts();
    }

    const fontSize = (ElementUtil.getElementStyle(document.documentElement, 'font-size') || '16px').replace('px', '');
    this.setState({ fontSize });

    this.throttleRedrawStickyAnchorLetter = throttle(this.redrawStickyAnchorLetter, 16.7);
    window.addEventListener('scroll', this.throttleRedrawStickyAnchorLetter, false);
  }

  componentWillUnmount() {
    if (this.throttleRedrawStickyAnchorLetter) {
      window.removeEventListener('scroll', this.throttleRedrawStickyAnchorLetter, false);
      this.throttleRedrawStickyAnchorLetter = false;
    }
  }

  onClickOfficialAccount = officialAccount => () => {
    this.props.setState({ selectedofficialAccount: officialAccount });
    this.props.history.push(`/wechat/contact/official-account/${officialAccount.wxid}`);
  }

  getStickyContainerCells = (letter) => {
    const { officialAccounts } = this.props;

    const cells = officialAccounts[letter] ? officialAccounts[letter].map(officialAccount => ({
      left: (<img src={officialAccount.headerUrl} />),
      center: (<p>{officialAccount.name}</p>),
      onClick: this.onClickOfficialAccount(officialAccount)
    })) : [];

    return cells;
  }

  render() {
    const { officialAccounts } = this.props;

    if (!officialAccounts) {
      return null;
    }

    return (
      <div className="contact-official-accounts-wrapper" ref={el => this.officialAccountsWrapper = el}>
        <WeuiHeader title="公众号" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">通讯录</span></WeuiBack>)}>
          <i className="icon-header-operation iconfont icon-tips-jia" />
        </WeuiHeader>

        <WeuiSearchBar />

        { this.renderLetterStickyContainer() }
        { this.renderStickyStatistics('个公众号') }
        { this.renderStickyAnchor() }
      </div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const contactDispatchActions = bindActionCreators(contactActions, dispatch);
  return (nextState, nextOwnProps) => {
    const { contactMain = {} } = nextState.wechat;
    const { selectedContacter, officialAccountsLetters: letters, officialAccountsGroups, officialAccounts } = contactMain;
    const total = officialAccounts ? officialAccounts.length : 0;

    const nextResult = {
      ...nextOwnProps,
      officialAccounts: officialAccountsGroups,
      letters,
      total,
      selectedContacter,
      ...contactDispatchActions,
    };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(OfficialAccounts);
