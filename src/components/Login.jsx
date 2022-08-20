import React from 'react';
import styled from 'styled-components';
import LoginLogo from '../img/loginLogo.png';
import Button from './elements/Button';
import Input from './elements/Input';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export function setRefreshTokenToCookie(data) {
  let now = new Date();
  now.setMinutes(now.getMinutes() + 30);
  cookies.set("Authorization", data, { path: "/", expires: now });
}

const Login = () => {
  const navigate = useNavigate();
  const [pwDisabled, setPwDisabled] = React.useState(true);
  const [loginInfo, setLoginInfo] = React.useState({
    userId: '',
    password: ''
  })
  const { userId, password } = loginInfo;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value
    })
    if (name === 'password') {
      if (value.length > 5) {
        setPwDisabled(false);
      }
    }
  }


  const handleOnKeyPress = (e) => {
    console.log(e);
  }


  const onClickSubmit = async () => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_IP_ADDRESS}/member/login`,
        loginInfo,
        {
          headers: {},
        }
      );
      console.log("로그인성공데이터1:", data);
      console.log("로그인성공데이터2:", data.status);
      const token = data.headers.authorization;
      setRefreshTokenToCookie(token);
      data.status === 200 ? navigate("/main") : window.alert("로그인 실패하였습니다.");
    } catch {
      alert("사용자를 찾을 수 없습니다.");
    }
  }

  return (
    <>
      <LoginWrap>
        <LoginContainer>
          <LoginMain>
            <LoginRight>
              <RightBox>
                <Logo>
                  <img src={LoginLogo} alt='Logo' />
                </Logo>
                <LoginForm>
                  <Input inputType={'login'} type="text" name={'userId'} onChange={onChangeHandler} value={userId} placeholder='전화번호, 사용자 이름 또는 이메일'/>
                  <Input inputType={'login'} type="password" name={'password'} onChange={onChangeHandler} onKeyPress={handleOnKeyPress} value={password} placeholder='비밀번호'/>
                  <Button btntype='login' disabled={pwDisabled} onClick={onClickSubmit}>로그인</Button>
                  <TextLineBox>
                    <TextLine></TextLine>
                    <div>또는</div>
                    <TextLine></TextLine>
                  </TextLineBox>
                  <p>Facebook으로 로그인</p>
                  <span>비밀번호를 잊으셨나요?</span>
                </LoginForm>
              </RightBox>
              <SignBox>
                <SignText>계정이 없으신가요? <SignSpan onClick={()=>{navigate('/signup')}}>가입하기</SignSpan></SignText>
              </SignBox>
            </LoginRight>
          </LoginMain>
        </LoginContainer>
      </LoginWrap>
    </>
  )
}

export default Login;

const LoginWrap = styled.div`
    width:100%;
    overflow:hidden;
    background-color:#fafafa;
`;
const LoginContainer = styled.div`
    width:100%;
    margin:0 auto;
`;
const LoginMain = styled.section`
  width:100%;
  margin:100px auto;
`;

const LoginRight = styled.div`
    width:350px;
    margin: 0 auto;
`;









const RightBox = styled.div`
  width:350px;
  box-sizing: border-box;
  border:1px solid rgb(219,219,219);
  margin-bottom:10px;
  text-align:center;
  padding:10px 0;
  background-color:#fff;
`;

const Logo = styled.div`
margin:36px 0 12px 0;
width:100%;
text-align:center;
`;
const LoginForm = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
  padding:0 40px;
  box-sizing:border-box;
  `;

/* -----------------------------------------------------------------------------THEN */
const TextLineBox = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
`;
const TextLine = styled.div`
  height:1px;
  width:45%;
  /* padding:0 50px; */
  background-color:#000;
  box-sizing:border-box;
`;









const SignBox = styled.div`
  width:350px;
  border:1px solid rgb(219,219,219);
  font-size:14px;
  text-align:center;
  padding:10px 0;
  box-sizing:border-box;
  background-color:#fff;
`;
const SignText = styled.p`
  margin:15px;
  `;
const SignSpan = styled.span`
  color:#0095f6;
  font-weight: bold;
`;