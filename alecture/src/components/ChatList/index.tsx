import Chat from '@components/Chat';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import { IDM, IChat } from '@typings/db';
import React, {
  useCallback,
  forwardRef,
  RefObject,
  MutableRefObject,
} from 'react';
// import { Scrollbars } from 'react-custom-scrollbars';

const ChatList = () => {
  return (
    <ChatZone>
      <Section>
        <section>section</section>
      </Section>
    </ChatZone>
  );
};

export default ChatList;
