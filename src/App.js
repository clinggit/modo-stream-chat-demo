import React from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';

const chatClient = new StreamChat('qk4nn7rpcn75');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidHdpbGlnaHQtbGFiLTIifQ.9CrUddtFnRQjzsh3wlPj-sm3nCxc5VG7h7v6KqI92xI';

// custom channel preview component
class MyChannelPreview extends React.Component {
  render() {
      const {setActiveChannel, channel} = this.props;
      const unreadCount = channel.countUnread();

      return (
      <div className="channel_preview">
        <a href="#" onClick={(e) => setActiveChannel(channel, e)}>
          {channel.data.name}
        </a>

        <span>
          Unread messages: {unreadCount}
        </span>
      </div>
    );
  }
}

// a very minimalistic message component
class MyMessageComponent extends React.Component {
  render() {
    return <div><b>{this.props.message.user.name}</b> {this.props.message.text}</div>;
  }
}

chatClient.setUser(
  {
    id: 'twilight-lab-2',
    name: 'Twilight lab',
    image: 'https://getstream.io/random_svg/?id=twilight-lab-2&name=Twilight+lab'
  },
  userToken,
);

const filters = { type: 'messaging' };
const sort = { last_message_at: -1 };
const channels = chatClient.queryChannels(filters, sort);

const App = () => (
  <Chat client={chatClient} theme={'messaging light'}>
    <ChannelList
      filters={filters}
      sort={sort}
      Preview={MyChannelPreview}
    />
    <Channel Message={MyMessageComponent}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default App;