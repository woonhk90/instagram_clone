import React from 'react';
import styled from 'styled-components';
const Footer = () => {
    return (
        <>
            <FooterWrap>
                <FooterSpan>Meta</FooterSpan>
                <FooterSpan>소개</FooterSpan>
                <FooterSpan>블로그</FooterSpan>
                <FooterSpan>채용 정보</FooterSpan>
                <FooterSpan>도움말</FooterSpan>
                <FooterSpan>API</FooterSpan>
                <FooterSpan>개인정보처리방침</FooterSpan>
                <FooterSpan>약관</FooterSpan>
                <FooterSpan>인기 계정</FooterSpan>
                <FooterSpan>해시태그</FooterSpan>
                <FooterSpan>위치</FooterSpan>
                <FooterSpan>Instagram Lite</FooterSpan>
                <FooterSpan>연락처 업로드 & 비사용자</FooterSpan>
                <p>&copy; 2022 1 Team from Meta</p>
            </FooterWrap>
        </>
    )
}

export default Footer;

const FooterWrap = styled.div`
    width:100vw;
    height:50px;
    background-color:wheat;
    text-align:center;
`;
const FooterSpan = styled.span`
    display:inline-block;
`;