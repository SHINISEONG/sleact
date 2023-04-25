import { IChat, IDM, IUser } from '@/typings/db';
import React, { FC, memo, useMemo } from 'react';
import { ChatWrapper } from './styles';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
interface Props {
  data: IDM;
  key: string;
}

// const BACK_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:3095'
//     : 'https://sleact.nodebird.com';
const Chat: FC<Props> = ({ data }) => {
  const user = data.Sender;
  return (
    <ChatWrapper>
      <div className="chat-img">
        <img
          src={gravatar.url(user?.email, { s: '36px', d: 'retro' })}
          alt={user?.nickname}
        />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user?.nickname}</b>
          <span> {dayjs(data.createdAt?.toString()).format('h:mm A')}</span>
        </div>
        <p>{data.content}</p>
      </div>
    </ChatWrapper>
  );
};

export default memo(Chat);
