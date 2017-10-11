import React, { Component } from 'react';
import classNames from 'classnames';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';

import './Shake.less';

class Shake extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scene: 'people'
    };
  }

  renderFooterScenesWrapper = () => {
    const scenes = [
      {
        type: 'people',
        title: '人'
      },
      {
        type: 'music',
        title: '歌曲'
      },
      {
        type: 'tv',
        title: '电视'
      }
    ];

    return (
      <div className="content-footer-scenes">
        {
          scenes.map(scene => (
            <div className="content-footer-scene" key={scene.type} onClick={() => this.setState({ scene: scene.type })}>
              <div className={classNames('scene-image', `scene-image-${scene.type}`, { actived: scene.type === this.state.scene })} />
              <div className={classNames('scene-title', { actived: scene.type === this.state.scene })}>{ scene.title }</div>
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    return (
      <div className="explore-shake-wrapper">
        <WeuiHeader
          className="shake-header"
          title="摇一摇"
          back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">发现</span></WeuiBack>)}
        />
        <div className="shake-content">
          <div className="shake-content-body">
            <i className="icon-shake-hand" />
          </div>
          <div className="shake-content-footer">
            { this.renderFooterScenesWrapper() }
          </div>
        </div>
      </div>
    );
  }
}

export default Shake;
