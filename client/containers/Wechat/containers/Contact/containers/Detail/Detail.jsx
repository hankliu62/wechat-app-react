import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty, cloneDeep } from 'lodash';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiCells from '../../../../components/WeuiCells/WeuiCells';
import WeuiGender from '../../../../components/WeuiGender/WeuiGender';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';
import WeuiBtn from '../../../../components/WeuiBtn/WeuiBtn';
import WeuiAvatarModal from '../../../../components/WeuiAvatarModal/WeuiAvatarModal';
import ObjectUtils from '../../../../../../utils/ObjectUtils';
import * as contactActions from '../../../../actions/contact';

import './Detail.less';

const HeaderCellContent = props => (
  <div className="header-cell-center">
    <h4 className="self-remark">
      <span>{props.remark || props.nickname}</span>
      <WeuiGender gender={props.gender} />
    </h4>
    <p className="self-wxid">微信号: {props.wxid}</p>
    { props.remark && <p className="self-nickname">昵称: {props.nickname}</p> }
  </div>
);

class Detail extends Component {
  static propTypes = {
    selectedContacter: PropTypes.object,
    getContacter: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpenAvatarModal: false
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    if (isEmpty(this.props.selectedContacter) || params.wxid !== this.props.selectedContacter.wxid) {
      this.props.getContacter(params.wxid);
    }
  }

  handleClickOpenAvatarModal = () => {
    this.setState({ isOpenAvatarModal: true });
  }

  handleClickCloseAvatarModal = () => {
    this.setState({ isOpenAvatarModal: false });
  }

  renderHeaderCells = () => {
    const { selectedContacter: contacter } = this.props;

    const headerCells = [{
      className: 'header-weui-cell',
      left: (contacter.headerUrl ? <img onClick={this.handleClickOpenAvatarModal} src={contacter.headerUrl} /> : null),
      center: (<HeaderCellContent remark={contacter.remark} nickname={contacter.nickname} wxid={contacter.wxid} gender={contacter.gender} />)
    }];

    return (<WeuiCells cells={headerCells} />);
  }

  renderDetailCells = () => {
    const { selectedContacter: contacter } = this.props;

    const detailCells = [];
    if (contacter.telephone) {
      detailCells.push({
        left: (<p className="weui-cell-label">电话号码</p>),
        center: (<p className="weui-cell-content content-telephone">{ contacter.telephone }</p>)
      });
    }

    const hasTag = (Array.isArray(contacter.tag) && contacter.tag.length) || (!Array.isArray(contacter.tag) && !!contacter.tag);
    const hasDesc = contacter.desc && (contacter.desc.title || contacter.desc.picUrl);

    if (hasDesc) {
      detailCells.push({
        className: 'with-arrow',
        left: (<p className="weui-cell-label">描述</p>),
        center: (
          <div className="weui-cell-content content-desc">
            { contacter.desc.picUrl && <img className="content-desc-pic" src={require('./images/icon-desc.png')} /> }
            { contacter.desc.title && <span className="content-desc-title">{ contacter.desc.title }</span> }
          </div>
        )
      });
    }

    if (hasTag) {
      detailCells.push({
        className: 'with-arrow',
        left: (<p className="weui-cell-label">标签</p>),
        center: (<p className="weui-cell-content content-tags">{ Array.isArray(contacter.tag) ? contacter.tag.join(', ') : contacter.tag }</p>)
      });
    }

    if (!hasDesc && !hasTag) {
      detailCells.push({
        className: 'with-arrow',
        left: (<p className="weui-cell-label">设置备注和标签</p>)
      });
    }

    return (<WeuiCells cells={detailCells} />);
  }

  renderMoreCells = () => {
    const { selectedContacter: contacter } = this.props;

    const moreCells = [
      {
        left: (<p className="weui-cell-label">地区</p>),
        center: (<p className="weui-cell-content content-address">{ Array.isArray(contacter.area) ? contacter.area.join(' ') : contacter.area }</p>)
      },
      {
        className: 'signature-cell',
        left: (<p className="weui-cell-label">个性签名</p>),
        center: (<p className="weui-cell-content content-signature">{ contacter.signature }</p>)
      },
      {
        className: 'with-arrow',
        left: (<p className="weui-cell-label">更多</p>),
      }
    ];

    const hasAlbum = contacter.album && contacter.album.length && contacter.album.some(item => !!item.imgSrc);
    if (hasAlbum) {
      const albums = cloneDeep(contacter.album).sort((pre, next) => (next.date || '') - (pre.date || ''));
      const displayAlbums = [];
      for (const item of albums) {
        if (displayAlbums.length === 3) {
          break;
        }

        if (item.imgSrc) {
          displayAlbums.push(item.imgSrc);
        }
      }

      moreCells.splice(-1, 0, {
        className: 'with-arrow',
        left: (<p className="weui-cell-label">个人相册</p>),
        center: (
          <p className="weui-cell-content content-albums">
            { displayAlbums.map((url, index) => (<img className="content-album" key={index} src={url} />)) }
          </p>
        )
      });
    }

    return (<WeuiCells className="contact-detail-more-cells" cells={moreCells} />);
  }

  render() {
    const { selectedContacter: contacter } = this.props;
    if (!contacter) {
      return null;
    }

    return (
      <div className="contact-detail-wrapper">
        <WeuiHeader title="详细资料" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">通讯录</span></WeuiBack>)} />

        { this.renderHeaderCells() }

        { this.renderDetailCells() }

        { this.renderMoreCells() }

        <section className="btn-groups">
          <WeuiBtn theme="primary">发消息</WeuiBtn>

          <WeuiBtn theme="default">视频聊天</WeuiBtn>
        </section>

        <WeuiAvatarModal
          isOpen={this.state.isOpenAvatarModal}
          headerUrl={contacter.headerUrl}
          onRequestClose={this.handleClickCloseAvatarModal}
          overlayStyle={{ zIndex: 100 }}
        />
      </div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const contactDispatchActions = bindActionCreators(contactActions, dispatch);
  return (nextState, nextOwnProps) => {
    const { contactMain } = nextState.wechat;
    const { selectedContacter } = contactMain;

    const nextResult = {
      ...nextOwnProps,
      selectedContacter,
      ...contactDispatchActions
    };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Detail);
