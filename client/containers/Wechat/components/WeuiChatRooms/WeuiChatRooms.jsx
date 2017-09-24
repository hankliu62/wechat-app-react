import React, { Component } from 'react';

import WeuiChatRoom from '../WeuiChatRoom/WeuiChatRoom';

import './WeuiChatRooms.less';

class WeuiChatRooms extends Component {
  constructor(props) {
    super(props);

    const chatRoomsSymbols = (props.chatRooms || []).map(item => Symbol(item.link));

    this.state = {
      chatRoomsSymbols
    };
  }

  handleSwiperExpand = (index) => {
    const chatRoomsSymbols = this.state.chatRoomsSymbols.map((symbol, symbolIndex) => {
      return symbolIndex === index ? symbol : Symbol(this.props.chatRooms[index].link);
    });

    this.setState({ chatRoomsSymbols });
  }

  render() {
    return (
      <div className="weui-chat-rooms">
        {
          this.props.chatRooms && this.props.chatRooms.map((item, index) => (
            <WeuiChatRoom
              restoreSymbol={this.state.chatRoomsSymbols[index]}
              key={item.link || index}
              onSwiperExpand={() => this.handleSwiperExpand(index)}
              {...item}
            />
          ))
        }
      </div>
    );
  }
}

export default WeuiChatRooms;
