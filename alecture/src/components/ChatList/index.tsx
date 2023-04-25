import Chat from '@components/Chat';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import { IDM, IChat } from '@typings/db';
import React, {
  useCallback,
  forwardRef,
  RefObject,
  MutableRefObject,
  useRef,
  FC,
} from 'react';
import Scrollbars from 'react-custom-scrollbars';
// import { Scrollbars } from 'react-custom-scrollbars';
interface Props {
  chatData: IDM[];
}
const defaultProps = {
  chatData: [],
};

const ChatList: FC<Props> = ({ chatData }) => {
  const scrollbarRef = useRef(null);
  const onScroll = useCallback(() => {}, []);
  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        {chatData.map((chat) => (
          <Chat key={chat.id?.toString()} data={chat} />
        ))}
      </Scrollbars>
    </ChatZone>
  );
};
ChatList.defaultProps = defaultProps;
export default ChatList;
