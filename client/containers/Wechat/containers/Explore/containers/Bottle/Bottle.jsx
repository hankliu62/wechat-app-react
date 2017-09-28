import React, { Component } from 'react';
import classNames from 'classnames';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';

import './Bottle.less';

class Bottle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowHeader: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isShowHeader: false });
    }, 1000);
  }

  handleShowHeader = () => {
    this.setState({ isShowHeader: !this.state.isShowHeader });
  }

  renderFooterScenesWrapper = () => {
    const scenes = [
      {
        type: 'throw',
        title: '扔一个'
      },
      {
        type: 'pickup',
        title: '捡一个'
      },
      {
        type: 'mine',
        title: '我的瓶子'
      }
    ];

    return (
      <div className="content-footer-scenes">
        {
          scenes.map(scene => (
            <div className="content-footer-scene" key={scene.type} onClick={() => this.setState({ scene: scene.type })}>
              <div className={classNames('scene-image', `scene-image-${scene.type}`)} />
              <div className="scene-title">{ scene.title }</div>
            </div>
          ))
        }
        <div className="content-footer-brand" />
      </div>
    );
  }

  render() {
    const { isShowHeader } = this.state;

    return (
      <div className="explore-bottle-wrapper">
        <WeuiHeader
          className={classNames('bottle-header', { 'hidden-header': !isShowHeader })}
          title="漂流瓶"
          back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">发现</span></WeuiBack>)}
        />
        <div className="bottle-content" onClick={this.handleShowHeader}>
          <div className="bottle-content-body">
            <i />
          </div>
          <div className="bottle-content-footer">
            { this.renderFooterScenesWrapper() }
          </div>
        </div>
      </div>
    );
  }
}

export default Bottle;
