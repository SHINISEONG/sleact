import React, { useCallback, useState } from 'react';
import useInput from '@hooks/useInput';
import {
  Success,
  Form,
  Error,
  Label,
  Input,
  LinkContainer,
  Button,
  Header,
} from './styles';
import { Link, Navigate, Route } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
import fetcher from '@utils/fetcher';
import { useNavigate } from 'react-router-dom';
import { IUser } from '@/typings/db';

const LogIn = () => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, setPassword] = useState('');
  const [logInError, setLogInError] = useState('');
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher);
  const navigate = useNavigate();
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(email, password);
      setLogInError('');
      axios
        .post(
          'http://localhost:3095/api/users/login',
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);
          setLogInError('로그인 성공!');
          mutate();
        })
        .catch((error) => {
          console.log(error);
          setLogInError(error.response.data);
        })
        .finally();
    },
    [email, password]
  );

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  if (userData === undefined) {
    return <div>로딩중...</div>;
  }

  if (userData) {
    return (
      <div id="container">
        <Navigate replace to="/workspace/sleact/channel/일반" />
      </div>
    );
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
        </Label>

        <Label id="password-label ">
          <span>비밀번호</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          {!logInError && <Error>{logInError}</Error>}
          {logInError && <Success>{logInError}</Success>}
        </Label>

        <Button type="submit">로그인</Button>
      </Form>

      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
