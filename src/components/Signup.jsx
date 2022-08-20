import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './elements/Button';
import Input from './elements/Input';
import axios from "axios";

import { ImCircleDown } from "react-icons/im";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userId: '',
    userNic: '',
    password: '',
    passwordConfirm: '',
    idOverlap: false,
  })

  const {userId,userNic,password,passwordConfirm,idOverlap}=userInfo

  // const  {comments}  = useSelector((state) => state.todos);
  // const stateInfo = useSelector((state) => state.todo);

  const [pwChk, setPwChk] = useState('');


  const onChangeEventHandler = (e) => {
    const { name, value } = e.target;
    console.log(name,value);
    setUserInfo({
      ...userInfo,
      [name]: value
    })

    if (name === "userId") {
      setUserInfo({...userInfo,[name]: value, idOverlap:false});
    }

    /* 비밀번호 일치 하는지 안하는지 */
    if (name === 'passwordConfirm'||name === 'password') {
      if (userInfo.password === value||userInfo.passwordConfirm === value) {
        setPwChk("비밀번호가 일치합니다.");
      } else {
        setPwChk("비밀번호가 일치하지 않습니다");
      }
    }
  }

  const onSubmitEventHandler = async() => {
    if (userInfo.userId === "") {
      window.alert("아이디를 입력해주세요..");
      return false;
    }
    if (!userInfo.idOverlap) {
      window.alert("아이디 중복검사를 해주세요.");
      return false;
    }
    if (userInfo.userNic === "") {
      window.alert("닉네임을 입력해주세요.");
      return false;
    }
    let idReg = /^[A-za-z0-9]{5,15}/g;
    if (!idReg.test(userInfo.userId)) {
      alert("아이디를 영문 대문자 또는 소문자 또는 숫자로 시작하는 아이디, 길이는 5~15자");
      return false;
    }

    let nicReg = /^[A-za-z0-9]{5,15}/g;
    if (!nicReg.test(userInfo.userNic)) {
      alert("닉네임을 영문 대문자 또는 소문자 또는 숫자로 시작하는 아이디, 길이는 5~15자");
      return false;
    }

    let pwReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!pwReg.test(userInfo.password)) {
      alert("비밀번호를 최소 8 자, 하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자");
      return false;
    }



    if (userInfo.password === '' || userInfo.passwordConfirm === '') {
      window.alert("비밀번호를 확인해주세요.");
    }









      try {
        const data = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/member/signup`, userInfo);
        console.log("회원가입리턴데이터=>", data);
        if(data.data){
          navigate("/");
        }
        // return thunkAPI.fulfillWithValue(data.data);
      } catch (error) {
        // return thunkAPI.rejectWithValue(error);
      }




    // dispatch(__postUserInfo(userInfo));
  }

  const onClickOverlap = async (flag) => {
    try {
        console.log("중복확인"+flag);
      const data = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/member/checkup`, { flag, val: userInfo.userId });
      console.log('DATA:', data);
      data ? window.alert("사용가능한 아이디 입니다.") : window.alert("사용불가능한 아이디 입니다.")
      userInfo.idOverlap=data;
    } catch (error){
      alert('중복된 아이디 입니다.');      
    }
  }
  
  return (
    <>
        <SigninWrap>
          <SigninTitle>회원가입</SigninTitle>
          <SigninForm>
            <div>
              <InputLabel htmlFor="userId">아이디: </InputLabel>
              <Input type={"text"} width={'550px'} name={"userId"} id={"userId"} value={userId} onChange={onChangeEventHandler} placeholder={'영문 대문자 또는 소문자 또는 숫자로 시작하는 아이디, 길이는 5~15자'} /><OverLapSpan onClick={() => { onClickOverlap('idChk') }}>중복확인</OverLapSpan>
            </div>
            <div>
              <InputLabel htmlFor="userNic">닉네임: </InputLabel>
              <Input type={"text"} width={'550px'} name={"userNic"} id={"userNic"} onChange={onChangeEventHandler} placeholder={'영문 대문자 또는 소문자 또는 숫자로 시작하는 아이디, 길이는 5~15자'} />
            </div>
            <div>
              <InputLabel htmlFor="password">비밀번호 입력: </InputLabel>
              <Input type={"password"} width={'550px'} name={"password"} id={"password"} onChange={onChangeEventHandler} placeholder={'최소 8 자, 하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자'} />
            </div>
            <div>
              <InputLabel htmlFor="passwordConfirm">비밀번호 확인: </InputLabel>
              <Input type={"password"} width={'550px'} name={"passwordConfirm"} id={"passwordConfirm"} onChange={onChangeEventHandler} />
              <PwDoubleChk>{pwChk}</PwDoubleChk>
            </div>
            <ButtonBox>
              <button btntype="signSubmit" onClick={() => { onSubmitEventHandler() }}>회원가입</button>
              <button btntype="back" onClick={() => { navigate('/login'); }}>뒤로가기</button>
            </ButtonBox>
          </SigninForm>
        </SigninWrap>
    </>
  );
};

export default Signup;

const SigninWrap = styled.div`
  width:100%;
  background-color:rgba(0,0,0,0.8);
  text-align:center;
  display:flex;
  flex-direction:column;
`;

const SigninTitle = styled.h1`
  font:40px/80px 'Arial','sans-serif';
  letter-spacing: 10px;
`;

const SigninForm = styled.div`
  font:20px/60px 'Arial','sans-serif';
  letter-spacing: 5px;
  padding:15px;
  box-sizing:border-box;
`;

const InputLabel = styled.label`
  width:200px;
  display:block;
  float:left;
  margin-left:25px;
`;

const OverLapSpan = styled.span`
  cursor: pointer;
  display:inline-block;
  border: 1px solid rgb(255,255,255);
  margin-left:15px;
`;
const PwDoubleChk = styled.div`
  color:rgb(255,0,0);
  font:20px/50px 'Arial','sans-serif';
  width:80%;
  height:15px;
  margin:0 auto;
`;

const ButtonBox = styled.div`
  position:relative;
  bottom:0%;
  margin-top:50px;
`;