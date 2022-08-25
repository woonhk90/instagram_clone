import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import logoImg from '../img/loginLogo.png'
import { ImHome3 } from "react-icons/im";
import { FaRegPlusSquare, FaSearch, FaPowerOff } from "react-icons/fa";
import Button from './elements/Button';
import Input from './elements/Input';
import { __postSearch } from '../redux/modules/mainSlice';
import Modal from "./FormModal";
import { getLogout } from "../actions/cookie";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Header = () => {



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);
  const [val, setVal] = React.useState('');
  const onfocusHandler = () => {
    setVisible(!visible);
  }
  const onBlurHandler = () => {
    setVisible(!visible);
    setVal('');
  }
  const onChangeHandler = (e) => {
    setVal(e.target.value);
  }
  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      onSubmitEvent();
    }
  }
  const onSubmitEvent = () => {
    console.log("onSubmitEvent");
    dispatch(__postSearch({ userNic: val }));
  }
  if (!cookies.get("Authorization")) {
    console.log("Authorization->false");
    navigate('/');
  }
  //모달 띄우기
  const [modal, setModal] = React.useState(false);
  return (
    <>
      <HeaderWrap>
        <HeaderContainer>
          <div><img src={logoImg} alt='logo' /></div>
          <InputBox>
            {!visible ? <SearchItems>
              <FaSearch />
              <span>검색</span>
            </SearchItems> : null}
            <Input type={"text"} inputType={'search'} onFocus={() => { onfocusHandler() }} onBlur={() => { onBlurHandler() }} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} visible={visible} value={val} />
          </InputBox>
          <BtnBox>
            <div><Button btntype={'headerBtn'} onClick={() => { navigate('/main'); }}><ImHome3 /></Button></div>
            <div><Button btntype={'headerBtn'} onClick={() => { setModal(!modal) }}><FaRegPlusSquare /></Button></div>
            <div><Button btntype={'headerBtn'} onClick={() => { getLogout(); navigate('/'); }}><FaPowerOff /></Button></div>
            {
              modal && (<Modal closeModal={() => setModal(!modal)}></Modal>)
            }
          </BtnBox>
        </HeaderContainer>
      </HeaderWrap>
    </>
  )
}

export default Header;

const HeaderWrap = styled.div`
    width:100vw;
    height:80px;
    border-bottom:1px solid rgb(219,219,219);
`;
const HeaderContainer = styled.div`
    width:1000px;
    height:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:0 auto;
`;
const InputBox = styled.div`
  width:300px;
  height:35px;
  border-radius:10px;
  /* background-color:rgb(239,239,239); */
  background-color:pink;
  display:flex;
  justify-content:center;
  align-items:center;
  position:relative;
`;
const SearchItems = styled.div`
  display:flex;
  align-items:center;
  position:absolute;
  left:0;
  margin-left:15px;
`;
const BtnBox = styled.div`
    display:flex;
`;