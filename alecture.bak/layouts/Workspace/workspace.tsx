import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Navigate } from 'react-router';
import {
  Channels,
  Chats,
  Header,
  MenuScroll,
  ProfileImg,
  RightMenu,
  WorkspaceName,
  WorkspaceWrapper,
} from '@layouts/Workspace/styles';
import gravatar from 'gravatar';
type Props = {
  children?: React.ReactNode;
};
const Workspace: React.FC<Props> = ({ children }) => {
  const { data, error, mutate } = useSWR('/api/users');

  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(false, false);
      });
  }, []);
  if (!data) {
    return (
      <div id="container">
        <Navigate replace to="/Login" />
      </div>
    );
  }
  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt={data.email} />
          </span>
        </RightMenu>
      </Header>

      <button onClick={onLogout}>Logout</button>

      <WorkspaceWrapper>
        {/* <Workspace>test</Workspace> */}
        <Channels></Channels>
        <WorkspaceName>Sleact</WorkspaceName>
        <MenuScroll>menu scroll</MenuScroll>
        <Chats>chat</Chats>
      </WorkspaceWrapper>
      {children}
    </div>
  );
};

export default Workspace;
