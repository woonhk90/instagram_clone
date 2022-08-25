import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import userImg from '../img/user.png';
import Cookies from "universal-cookie";

const Follow = ({loginInfo}) => {
  console.log("loginInfo=>>",loginInfo);
    const cookies = new Cookies();
  return (
    <>
      <FollowWrap>
        <FollowContainer>
          <FollowItem fontSize='20px'><UserImg src={userImg} alt='user'/></FollowItem>
          <FollowItem>
            <FollowItem>{loginInfo.userNic}</FollowItem>
            <FollowItem>{loginInfo.userName}</FollowItem>
          </FollowItem>
          <FollowItem marginLeft='auto' marginRight='0'>팔로우</FollowItem>
        </FollowContainer>
      </FollowWrap>
    </>
  )
}
export default Follow;

const FollowWrap = styled.div`
  width:350px;
  background-color:pink;
  padding:5px;
  box-sizing:border-box;
`;
const FollowContainer = styled.div`
  display:flex;
  align-items:center;
`;
const FollowItem = styled.div`
  font-size:${(props) => props.fontSize};
  margin-left:${(props) => props.marginLeft};
  margin-right:${(props) => props.marginRight};
`;
const UserImg = styled.img`width:50px;`;