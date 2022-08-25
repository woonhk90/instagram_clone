import React, { useEffect } from 'react';
import styled from 'styled-components';
import CardInfo from './CardInfo';
import { useDispatch, useSelector } from "react-redux";
import { __getCardInfo } from "../redux/modules/mainSlice";
import { getUser } from '../redux/modules/loginSlice';
import Follow from './Follow';

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getCardInfo())
  }, [dispatch])
  const { cards } = useSelector((state) => state.main);
  console.log('cards=>', cards);
  const {loginInfo} = useSelector((state) => state.login);
  console.log('loginInfo=>',loginInfo);
  
  return (
    <>
      <MainWrap>
        <MainItem marginRight="10px">
          {cards.length > 0 ? (cards.map((v) => (<div key={v.id}><CardInfo info={v} /></div>))) : <EmptyBox></EmptyBox>}
        </MainItem>
        <MainItem marginLeft='10px'>
          <Follow loginInfo={loginInfo}/>
        </MainItem>
      </MainWrap>
    </>
  )
}

export default Main;

const MainWrap = styled.div`
  display:flex;
  justify-content:center;
`;
const MainItem = styled.div`
  margin-right:${(props) => props.marginRight};
  margin-left:${(props) => props.marginLeft};
`;
const EmptyBox = styled.div`width:480px;`;