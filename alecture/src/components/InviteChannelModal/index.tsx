import React, { useCallback, FormEvent } from 'react';
import { Button, Input, Label } from '@/pages/LogIn/styles';
import Modal from '../Modal';
import useInput from '@/hooks/useInput';
import axios from 'axios';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import { IChannel, IUser } from '@/typings/db';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteChannelModal: (flag: boolean) => void;
}

const InviteChannelModal: React.FC<Props> = ({
  show,
  onCloseModal,
  setShowInviteChannelModal,
}) => {
  const [newMember, onChangeNewMember, setNewMember] = useInput('');

  const { workspace, channel } = useParams<{
    workspace: string;
    channel: string;
  }>();

  const {
    data: userData,
    error,
    mutate: userMutate,
  } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher);

  const { mutate: memberMutate } = useSWR<IUser[]>(
    userData && channel
      ? `http://localhost:3095/api/workspaces/${workspace}/channels/${channel}/members`
      : null,
    fetcher
  );

  const onInviteMember = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) {
        return;
      }
      axios
        .post(
          `http://localhost:3095/api/workspaces/${workspace}/channels/${channel}/members`,
          { email: newMember },
          { withCredentials: true }
        )
        .then(() => {
          memberMutate();
          setShowInviteChannelModal(false);
          setNewMember('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [workspace, newMember]
  );
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>이메일</span>
          <Input
            id="member"
            type="email"
            value={newMember}
            onChange={onChangeNewMember}
          />
        </Label>
        <Button type="submit">{channel}채널로 초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteChannelModal;
