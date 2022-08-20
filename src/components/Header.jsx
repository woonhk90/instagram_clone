import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import logoImg from '../img/loginLogo.png'
import { ImHome3 } from "react-icons/im";
import { FaRegPlusSquare, FaSearch, FaPowerOff } from "react-icons/fa";
import Button from './elements/Button';
import Input from './elements/Input';
const Header = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);
  const onfocusHandler = () => {
    setVisible(!visible);
  }
  const onBlurHandler = () => {
    setVisible(!visible);
  }

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
            <Input type={"text"} inputType={'search'} onFocus={() => { onfocusHandler() }} onBlur={() => { onBlurHandler() }} visible={visible} />
          </InputBox>
          <BtnBox>
            <div><Button btntype={'headerBtn'} onClick={() => { navigate('/main'); }}><ImHome3 /></Button></div>
            <div><Button btntype={'headerBtn'} onClick={() => { }}><FaRegPlusSquare /></Button></div>
            <div><Button btntype={'headerBtn'} onClick={() => { navigate('/'); }}><FaPowerOff /></Button></div>
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