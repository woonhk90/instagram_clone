import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './elements/Button';
import Input from './elements/Input';
import axios from "axios";
import logoImg from '../img/loginLogo.png';

import { ImCircleDown } from "react-icons/im";
import { FaRegCheckCircle, FaEye } from "react-icons/fa"; // 가능, 보이기
import { FaRegTimesCircle, FaEyeSlash } from "react-icons/fa"; // 불가, 가리기



const Signup = () => {
  const [overlapBtnShowHide, setOverlapBtnShowHide] = React.useState(false);
  const [overlapFlag, setOverlapFlag] = React.useState(false);
  const [pwDisabled, setPwDisabled] = React.useState(true);
  const [pwShowHideFlag, setPwShowHideFlag] = React.useState(false);
  const [overlap, setOverlap] = React.useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userId: '',
    userNic: '',
    userName: '',
    password: '',
    idOverlap: false,
  })

  const { userId, userNic, userName, password, idOverlap } = userInfo

  // const  {comments}  = useSelector((state) => state.todos);
  // const stateInfo = useSelector((state) => state.todo);

  const [pwChk, setPwChk] = useState('');


  const onShowHideHandler = () => {
    setPwShowHideFlag(!pwShowHideFlag);
  }

  const onChangeEventHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserInfo({
      ...userInfo,
      [name]: value
    })

    /* 이름이 usreId이면 이메일 유효성검사해야됨 */
    if (name === "userId") {
      setUserInfo({ ...userInfo, [name]: value, idOverlap: false });
      setOverlap(true);
    }

    // pw5개 이상 가입버튼 활성화
    if (name === 'password') {
      if (value.length > 5) {
        setPwDisabled(false);
      } else {
        setPwDisabled(true);
      }
    }

  }

  const onSubmitEventHandler = async () => {
    if (!pwDisabled) {
      if (userInfo.userId === "") {
        window.alert("아이디를 입력해주세요..");
        return false;
      }
    }


    if (userInfo.userName === "") {
      window.alert("성명을 입력해주세요.");
      return false;
    }



    if (userInfo.userNic === "") {
      window.alert("사용자 이름을 입력해주세요.");
      return false;
    }



    let pwReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!pwReg.test(userInfo.password)) {
      alert("최소 6 자, 하나 이상의 영문자, 숫자");
      return false;
    }







    try {
      console.log("userInfo=>", userInfo);
      const data = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/member/signup`, userInfo);
      console.log("회원가입리턴데이터=>", data);
      if (data.data) {
        navigate("/");
      }
    } catch (error) {
    }


  }

  // 이메일 포커스아웃되면 자동 중복체크
  const onBlurHandler = () => {

    if (userId !== '') {
      //이메일 유효성검사
      const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (!regExp.test(userInfo.userId)) {
        alert("올바른 이메일 주소를 입력해주세요.");
        return false;
      }

      onClickOverlap('idChk')
    }
  }
  const onClickOverlap = async (flag) => {
    setOverlapBtnShowHide(true);
    try {
      console.log("중복확인" + flag, userInfo.userId);
      const data = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/member/checkup`, { flag, val: userInfo.userId });
      console.log('DATA:', data);
      // data ? window.alert("사용가능한 아이디 입니다.") : window.alert("사용불가능한 아이디 입니다.")
      
      userInfo.idOverlap = data;
      
      setOverlap(false);
    } catch (error) {
      // alert('중복된 아이디 입니다.');
      setOverlap(true);
    }
  }

  return (
    <>
      <SigninWrap>
        <SignContainer>
          <SignMain>
            <SigninTitle><img src={logoImg} alt='logo' /></SigninTitle>
            <SigninForm>
              <FormTit>친구들의 사진과 동영상을 보려면 가입하세요.</FormTit>
              <FormItems_Id>
                <Input inputType={'sign'} type={"text"} width={'550px'} name={"userId"} id={"userId"} value={userId} onChange={onChangeEventHandler} onBlur={onBlurHandler} placeholder={'이메일 주소'} maxLength={'25'} />
                {overlapBtnShowHide?<IdOverlapFlag>{!overlap ? <FaRegCheckCircle /> : <FaRegTimesCircle />}</IdOverlapFlag>:null}
              </FormItems_Id>
              <FormItems>
                <Input inputType={'sign'} type={"text"} width={'550px'} name={"userName"} id={"userName"} onChange={onChangeEventHandler} placeholder={'성명'} maxLength={'20'} />
              </FormItems>
              <FormItems>
                <Input inputType={'sign'} type={"text"} width={'550px'} name={"userNic"} id={"userNic"} onChange={onChangeEventHandler} placeholder={'사용자 이름'} maxLength={'20'} />
              </FormItems>
              <FormItems>
                <PwBox>
                  <Input inputType={'sign'} type={pwShowHideFlag?'text':"password"} width={'550px'} name={"password"} id={"password"} onChange={onChangeEventHandler} placeholder={'비밀번호'} maxLength={'25'} />
                  <PwShowHideFlag onClick={onShowHideHandler}>{pwShowHideFlag ? <FaEyeSlash /> : <FaEye />}</PwShowHideFlag>
                </PwBox>
                <PwDetail>* 최소 6 자, 하나 이상의 영문자, 숫자</PwDetail>
              </FormItems>
              <FormItems>
                서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에 업로드했을 수도 있습니다.
              </FormItems>
              <ButtonBox>
                <Button btntype="login" disabled={pwDisabled} onClick={() => { onSubmitEventHandler() }}>가입</Button>
              </ButtonBox>
            </SigninForm>
          </SignMain>
          <BottomBox>
            <LoginText>계정이 있으신가요? <LoginSpan onClick={() => { navigate('/'); }}>로그인</LoginSpan></LoginText>
          </BottomBox>
        </SignContainer>
      </SigninWrap>
    </>
  );
};

export default Signup;

const SigninWrap = styled.div`
  width:100%;
  height: 100vh;
  background-color:#fafafa;
  display:flex;
  align-items:center;
`;
const SignContainer = styled.div`
  width:1000px;
  margin:0 auto;
  
  display:flex;
  flex-direction:column;
  align-items: center;
`;
const SignMain = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  border:1px solid #dbdbdb;
  background-color:#fff;
  max-width:400px;
  text-align:center;
  padding:50px;
  box-sizing: border-box;
  margin-bottom:6px;
`;


const SigninTitle = styled.h1`
  letter-spacing: 10px;
  margin:36px 0 12px 0;
`;

const SigninForm = styled.div`
width:100%;
display:flex;
flex-direction:column;
justify-content:center;
`;

const FormTit = styled.span`
  font-size:17px;
  line-height:20px;
  margin:0 40px 10px;
`;

const FormItems = styled.div`
width:100%;
margin-bottom:5px;
/* padding:0 10px;
box-sizing: border-box; */
`;
const FormItems_Id = styled.div`
width:100%;
margin-bottom:5px;

display:flex;
align-items:center;
position:relative;
`;
const IdOverlapFlag = styled.span`
display:block;
position:absolute;
right:0;
`;


const PwBox = styled.div`
  display:flex;
  align-items:center;

  position:relative;
`;
const PwShowHideFlag = styled.span`
  position:absolute;
  right:0;
  cursor:pointer;
`;
const PwDetail = styled.span`
  display:block;
  margin:0 0 15px;
  font-size:12px;
  color:red;
  text-align:left;
  font-weight: bold;
`;

const BottomBox = styled.div`
  /* max-width:400px;
  background-color:purple;
  text-align:center; */

  width:400px;
  border:1px solid rgb(219,219,219);
  font-size:14px;
  text-align:center;
  padding:10px 0;
  box-sizing:border-box;
  background-color:#fff;
`;
const LoginText = styled.p`
  margin:15px;
  `;
const LoginSpan = styled.span`
  color:#0095f6;
  font-weight: bold;
`;


const ButtonBox = styled.div`
  /* position:relative;
  bottom:0%;
  margin-top:50px;
  text-align:center; */
`;