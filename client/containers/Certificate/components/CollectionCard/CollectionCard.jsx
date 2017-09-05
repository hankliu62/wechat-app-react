import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CollectionCard.less';

class CollectionCard extends Component {
  static propTypes = {
    collection: PropTypes.array.isRequired
  }

  static defaultProps = {
    collection: []
  }

  render() {
    const { collection } = this.props;
    return (
      <div className="collection card">
        {
          collection.map((item, index) => (
            <div key={`key-${index}`} className="collection-item">
              <div className="collection-item-title">{ item.title }</div>
              <div className="collection-item-content">{ item.content }</div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default CollectionCard;
