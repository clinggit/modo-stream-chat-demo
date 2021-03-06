import React from 'react';
import { Chat, Channel, ChannelList, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';

const chatClient = new StreamChat('brbgs2r8pfvk');
//const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidHdpbGlnaHQtbGFiLTIifQ.9CrUddtFnRQjzsh3wlPj-sm3nCxc5VG7h7v6KqI92xI';

chatClient.setUser(
  {
       id: 'micaela',
       name: 'Micaela',
       image: 'https://getstream.io/random_svg/?id=micaela&name=Micaela'
  },
  chatClient.devToken('micaela'),
);

const channel = chatClient.channel('messaging', 'anthropology', {
  // add as many custom fields as you'd like
  image: 'https://static.modolabs.com/cling/anthropology.png',
  name: 'Talk about Anthropology',
});

const filters = { type: 'messaging' };
const sort = { last_message_at: -1 };
const channels = chatClient.queryChannels(filters, sort);

const App = () => (
  <Chat client={chatClient} theme={'messaging light'}>
    <ChannelList
      filters={filters}
      sort={sort}
    />
    <Channel>
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