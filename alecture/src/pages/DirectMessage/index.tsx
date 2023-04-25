import { IDM, IUser } from '@/typings/db';
import { Container, Header } from './styles';
import gravatar from 'gravatar';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import fetcher from '@/utils/fetcher';
import { useParams } from 'react-router';
import ChatBox from '@/components/ChatBox';
import ChatList from '@/components/ChatList';
import { FormEvent, useCallback } from 'react';
import useInput from '@/hooks/useInput';
import axios from 'axios';

const DirectMessage = () => {
  const { workspace, id } = useParams();
  console.log(id);
  //----------------------SWR-----------------------------------------
  const {
    data: userData,
    error,
    mutate: userMutate,
  } = useSWR(
    `http://localhost:3095/api/workspaces/${workspace}/users/${id}`,
    fetcher
  );

  const { data: myData } = useSWR<IUser | false>(
    'http://localhost:3095/api/users',
    fetcher
  );
  const {
    data: chatData,
    mutate: chatMutate,
    setSize,
  } = useSWRInfinite<IDM[]>(
    (index) =>
      `http://localhost:3095/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${
        index + 1
      }`,
    fetcher
  );
  //-----------------hook--------------------------------------
  const [chat, onChangeChat, setChat] = useInput('');

  const onSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (chat?.trim()) {
        axios
          .post(
            `http://localhost:3095/api/workspaces/${workspace}/dms/${id}/chats`,
            {
              content: chat,
            },
            { withCredentials: true }
          )
          .then(() => {
            chatMutate();
            setChat('');
          })
          .catch((error) => {
            console.dir(error);
          });
      }
    },
    [chat]
  );
  if (
    userData === undefined ||
    myData === undefined ||
    chatData === undefined
  ) {
    return <div>'로딩중'</div>;
  }
  // console.log(userData);
  return (
    <Container>
      <Header>
        <img
          src={gravatar.url(userData.email, { s: '24px', d: 'retro' })}
          alt={userData.nickname}
        />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList chatData={chatData[0]}></ChatList>

      <ChatBox
        chat={chat}
        onSubmitForm={onSubmitForm}
        onChangeChat={onChangeChat}
      ></ChatBox>
    </Container>
  );
};

export default DirectMessage;
