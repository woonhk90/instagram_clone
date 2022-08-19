import React from 'react';
import {useNavigate} from "react-router-dom";
import styled from 'styled-components';
const Header = () => {
    const navigate = useNavigate();
    return (
        <>
            <HeaderWrap>
                <button onClick={()=>{navigate('/');}}>홈</button>
            </HeaderWrap>
        </>
    )
}

export default Header;

const HeaderWrap = styled.div`
    width:100vw;
    height:50px;
    background-color:wheat;
`;