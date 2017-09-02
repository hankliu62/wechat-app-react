import React, { Component, PropTypes } from 'react';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as homepageActions from '../../actions/homepage';
import ObjectUtils from '../../utils/ObjectUtils';
import CollectionCard from './components/CollectionCard/CollectionCard';
import NoenReport from './components/NoenReport/NoenReport';

import Avatar from './images/avatar.jpg';

import './Certificate';

class Certificate extends Component {
  static propTypes = {
    // content: PropTypes.string.isRequired,
    setState: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpenNoenReport: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.setState({ content: 'Modified Redux Content Data' });
    }, 3000);
  }

  componentDidUpdate() {
    if (!this.htmlBody) {
      const htmlBody = document.getElementsByClassName('html-body');
      if (htmlBody && htmlBody.length) {
        this.htmlBody = htmlBody[0];
      }
    }

    if (this.htmlBody) {
      const classname = this.htmlBody.className;
      if (this.state.isOpenNoenReport) {
        this.htmlBody.className = `${classname.replace(' body-overflow', '')} body-overflow`;
      } else {
        this.htmlBody.className = classname.replace(' body-overflow', '');
      }
    }
  }

  onTriggerSwitch = () => {
    this.setState({ isOpenNoenReport: !this.state.isOpenNoenReport });
  }

  render() {
    const { isOpenNoenReport } = this.state;

    const collections = [
      [
        { title: '姓名：', content: '罗得意' },
        { title: '性别：', content: '男' },
        { title: '出生日期：', content: '1991年6月29日' }
      ],
      [
        { title: '入学时间：', content: '2014年9月10日' },
        { title: '毕业时间：', content: '2016年7月1日' },
        { title: '学历类型：', content: '研究生' },
        { title: '学历层次：', content: '硕士研究生' },
        { title: '毕业院校：', content: '中南林业科技大学' },
        { title: '院校所在地：', content: '湖南省' },
        { title: '专业名称：', content: '生理学' },
        { title: '学习形式：', content: '普通全日制' },
        { title: '证书编号：', content: '1055 8120 1302 0032 40' },
        { title: '毕结业结论：', content: '毕业' }
      ],
      [
        { title: '在线验证码：', content: '8117 6483 6712' },
        { title: '制表日期：', content: '2016年9月10日' },
        { title: '验证期至：', content: '2017年3月8日' }
      ]
    ];

    return (
      <div className="certificate-main">
        <header className="certificate-header">
          <div className="switch-langauge">
            <label className="switch-langauge-label">报告语种：</label>
            <span className="langauge-item" onClick={() => window.location.reload()}>中文</span>
            <a className="modal-trigger" onClick={this.onTriggerSwitch}>
              <span className="new-lever">
                <span className="lever-cilcle" />
              </span>
            </a>
            <span className="langauge-item" onClick={this.onTriggerSwitch}>英文</span>
          </div>
          <a className="btn-print" href="http://www.chsi.com.cn/report/xueli/download.do?vcode=811764836712&rid=91787196644925384073491000421032&ln=cn" />
        </header>

        <div className="certificate-body">
          <h5 className="certificate-title">教育部学历证书电子注册备案表</h5>
          <div className="certificate-avatar">
            <img src={Avatar} alt="个人头像" />
          </div>

          { collections.map((collection, index) => (
            <CollectionCard key={`collectioncard-${index}`} collection={collection} />)) }
        </div>

        { isOpenNoenReport && <NoenReport isOpen={isOpenNoenReport} onHide={this.onTriggerSwitch} /> }
        { isOpenNoenReport && <div className="lean-overlay" /> }
      </div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const homepageDispatchActions = bindActionCreators(homepageActions, dispatch);
  return (nextState, nextOwnProps) => {
    const content = nextState.homepage.content;
    const nextResult = { ...nextOwnProps, content, ...homepageDispatchActions };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Certificate);
