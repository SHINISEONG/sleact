import { FormEvent, FormEventHandler, useCallback, useState } from 'react';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import axios from 'axios';
import { Navigate, Route, Routes, useParams } from 'react-router';
import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceModal,
  WorkspaceName,
  WorkspaceWrapper,
  Workspaces,
} from '@layouts/Workspace/styles';
import gravatar from 'gravatar';
import DirectMessage from '@/pages/DirectMessage';
import Channel from '@/pages/Channel';
import Menu from '@/components/Menu';
import { Link } from 'react-router-dom';
import { IChannel, IUser } from '@/typings/db';
import Modal from '@/components/Modal';
import { Input, Label } from '@/pages/SignUp/styles';
import { Button } from '@/pages/LogIn/styles';
import useInput from '@/hooks/useInput';
import { toast } from 'react-toastify';
import CreateChannelModal from '@components/CreateChannelModal';
import InviteChannelModal from '@/components/InviteChannelModal';
import InviteWorkspaceModal from '@/components/InviteWorkspaceModal';
// type Props = {
//   children?: React.ReactNode;
// };

const Workspace = () => {
  const { workspace } = useParams() as {
    workspace: string;
  };

  const {
    data: userData,
    error,
    mutate: userMutate,
  } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher);
  const { data: channelData, mutate: channelMutate } = useSWR<IChannel[]>(
    userData
      ? `http://localhost:3095/api/workspaces/${workspace}/channels`
      : null,
    fetcher
  );

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newWorkspaceUrl, onChangeNewWorkspaceUrl, setNewWorkspaceUrl] =
    useInput('');

  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] =
    useState(false);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        userMutate(false, false);
      });
  }, []);
  const onCloseUserProfile = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowUserMenu(false);
  }, []);
  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);
  const onCreateWorkspace = useCallback(
    //React.DOMAttributes<HTMLFormElement>.onSubmit?: FormEventHandler<HTMLFormElement>
    (e: FormEvent) => {
      e.preventDefault();
      if (!newWorkspace || !newWorkspace.trim()) return;
      if (!newWorkspaceUrl || !newWorkspaceUrl.trim()) return;
      axios
        .post(
          'http://localhost:3095/api/workspaces',
          {
            workspace: newWorkspace,
            url: newWorkspaceUrl,
          },
          { withCredentials: true }
        )
        .then(() => {
          userMutate();
          setShowCreateWorkspaceModal(false);
          setNewWorkspace('');
          setNewWorkspaceUrl('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [newWorkspace, newWorkspaceUrl]
  );
  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
    setShowInviteChannelModal(false);
  }, []);

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  }, []);

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);
  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  //----------------------로그인 상태에 따른 페이지 전환 -----------------------
  if (userData === undefined) {
    return <div>로딩중...</div>;
  }

  if (channelData === undefined) {
    return <div>로딩중...</div>;
  }

  if (!userData) {
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
          <span onClick={onClickUserProfile}>
            <ProfileImg
              src={gravatar.url(userData.email, { s: '28px', d: 'retro' })}
              alt={userData.email}
            />
            {showUserMenu && (
              <Menu
                style={{ right: 0, top: 38 }}
                show={showUserMenu}
                onCloseModal={onCloseUserProfile}
              >
                <ProfileModal>
                  <img
                    src={gravatar.url(userData.email, {
                      s: '28px',
                      d: 'retro',
                    })}
                    alt={userData.email}
                  />
                  <div>
                    <span id="profile-name">{userData.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>

      <WorkspaceWrapper>
        <Workspaces>
          {userData?.Workspaces.map((ws) => {
            return (
              <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                <WorkspaceButton>
                  {ws.name.slice(0, 1).toLocaleUpperCase()}
                </WorkspaceButton>
              </Link>
            );
          })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceModal}>Sleact</WorkspaceName>
          <MenuScroll>
            <Menu
              show={showWorkspaceModal}
              onCloseModal={toggleWorkspaceModal}
              style={{ top: 95, left: 80 }}
            >
              <WorkspaceModal>
                <h2>Sleact</h2>
                <button onClick={onClickInviteWorkspace}>
                  워크스페이스에 사용자 초대
                </button>
                <button onClick={onClickAddChannel}>채널 만들기</button>
                <button onClick={onLogout}>로그아웃</button>
              </WorkspaceModal>
            </Menu>
            {channelData?.map((channel) => {
              return (
                <Link
                  key={channel.id}
                  to={`/workspace/${workspace}/channel/${channel.name}`}
                >
                  {channel.name}
                </Link>
              );
            })}
          </MenuScroll>
        </Channels>
        <Chats>
          chats
          <Routes>
            <Route path="channel" element={<Channel />} />
            <Route path=":workspace/channel/:channel" element={<Channel />} />
            <Route path="directmessage" element={<DirectMessage />} />
            <Route path=":workspace/directmessage/:id" element={<Channel />} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
      <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateWorkspace}>
          <Label id="workspace-label">
            <span>워크스페이스 이름</span>
            <Input
              id="workspace"
              value={newWorkspace}
              onChange={onChangeNewWorkspace}
            />
          </Label>
          <Label id="workspace-url-label">
            <span>워크스페이스 url</span>
            <Input
              id="workspace"
              value={newWorkspaceUrl}
              onChange={onChangeNewWorkspaceUrl}
            />
          </Label>
          <Button type="submit">생성하기</Button>
        </form>
      </Modal>
      <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateChannelModal={setShowCreateChannelModal}
      />
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      />
      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
    </div>
  );
};

export default Workspace;
