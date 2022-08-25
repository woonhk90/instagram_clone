import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaEllipsisH, FaUserCircle } from "react-icons/fa";
import Textarea from './elements/Textarea';
import { __postCardUpdate } from '../redux/modules/mainSlice';
import { useDispatch, useSelector } from "react-redux";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
SwiperCore.use([Navigation, Pagination])

const ViewModal = (props) => {
  const dispatch = useDispatch();
  console.log("BB", props);
  console.log("BB", props.info.id);
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const [updateFlag, setUpdateFlag] = useState(false);
  const onUpdateHandler = (id) => {
    setUpdateFlag(!updateFlag);
  }
  const [textAreaVal, setTextAreaVal] = useState(props.info.content);
  const onSubmitHandler = (id) => {
    dispatch(__postCardUpdate({ id, content: textAreaVal }));
    props.closeModal();
  }

  const onChangeHandler = (e) => {
    setTextAreaVal(e.target.value);
  }
  return (
    <>

      <ModalWrap onClick={props.closeModal}>
        <ModalBody onClick={(e) => { e.stopPropagation() }}>
          <BodyContent>
            <ContentLeft>
              <ContentImg src={props.info.imgUrl} alt='img' />
            </ContentLeft>
            <ContentRight>
              <RTop>
                <TopContent>
                  <TopMenu>
                    <FaUserCircle />
                    {props.info.userNic}
                  </TopMenu>
                  <TopMenu marginLeft='auto' marginRight='0' onClick={() => onUpdateHandler(props.info.id)}>
                    <FaEllipsisH />
                  </TopMenu>
                </TopContent>
              </RTop>
              {!updateFlag ? <RMiddle>{props.children}</RMiddle> : <div><Textarea defaultValue={textAreaVal} onChange={onChangeHandler}></Textarea><button onClick={() => onSubmitHandler(props.info.id)}>수정완료</button></div>}
            </ContentRight>
          </BodyContent>
        </ModalBody>
      </ModalWrap>

    </>
  )
}

export default ViewModal;

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBody = styled.div`
  position: absolute;
  width: 1200px;
  height: 800px;
  /* padding: 40px; */
  /* text-align: center; */
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

  display:flex;
`;



const BodyContent = styled.div`
width:100%;
height:100%;
  display:flex;
  justify-content:center;
`;


const ContentLeft = styled.div`
width:60%;
height:100%;
`;
const ContentRight = styled.div`
width:40%;
display:flex;
flex-direction:column;
padding:10px;
box-sizing:border-box;
`;

const RTop = styled.div``;

const TopContent = styled.div`
  font:18px/25px 'Arial','sans-serif';
  margin:17px 0;
  display:flex;
  border-bottom:1px solid #dfdfdf;
`;
const TopMenu = styled.div`
  margin-right:${(props) => props.marginRight};
  margin-left:${(props) => props.marginLeft};
`;



const RMiddle = styled.div`
white-space: pre-line;
`;


const ContentImg = styled.img`
width:100%;
height:100%;
`;