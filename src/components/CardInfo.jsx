import React, { useState } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FaEllipsisH, FaUserCircle, FaRegHeart, FaHeart, FaRegComment, FaRegPaperPlane, FaRegBookmark, FaMinusCircle } from "react-icons/fa";
import ViewModal from './ViewModal';
import { __postLike, __postCardDelete, __getCardInfo } from '../redux/modules/mainSlice';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import icons from '../img/icons.png';

SwiperCore.use([Navigation, Pagination])

const CardInfo = ({ info }) => {
  const dispatch = useDispatch();
  const [heart, setHeart] = useState(info.userLike);
  const [value, setValue] = useState({
    id: info.id,
    heart: heart
  });
  const onDoubleClickHandler = () => {
    setHeart(!heart);
    setValue({
      ...value,
      heart: heart
    })
    console.log("좋아요버튼=>", value);
    dispatch(__postLike(value));
  }
  console.log("info=>", info);
  const [modal, setModal] = React.useState(false);
  const onClickDeleteHandler = (id) => {
    dispatch(__postCardDelete({ id }));
  }
  return (
    <>
      <CardWrap>
        <CardContainer>
          <CardBox>
            <CardItem_01>
              <Item01Left>
                <LeftIcon>
                  <FaUserCircle />
                </LeftIcon>
                <LeftUser>{info.userNic}</LeftUser>
              </Item01Left>
              <Item01Right onClick={() => window.confirm('삭제하시겠습니까?') ? onClickDeleteHandler(info.id) : null} >
                <FaMinusCircle />
              </Item01Right>
            </CardItem_01>
            <CardItem_02 onDoubleClick={onDoubleClickHandler}>

              <Swiper
                className="banner"
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                {info.imageList.map((v) => (
                  <SwiperSlide><CardItem_02_Img key={v.id} src={v.imgUrl} alt='img' /></SwiperSlide>
                ))}
              </Swiper>

            </CardItem_02>
            <CardItem_03>
              <Item03 cursor='pointer' onClick={onDoubleClickHandler}>{heart ? <ColorSpan><FaHeart /></ColorSpan> : <FaRegHeart />}</Item03>
              <Item03 cursor='pointer' onClick={() => setModal(!modal)}><FaRegComment /></Item03>
              <Item03><FaRegPaperPlane /></Item03>
              <Item03 marginLeft='auto' marginRight='0' ><FaRegBookmark /></Item03>
            </CardItem_03>
            <CardItem>좋아요 <span>{info.heartcnt}</span>개</CardItem>
            <CardItem onClick={() => setModal(!modal)}><UserNic>{info.userNic}</UserNic> <CardContent>{info.content}</CardContent></CardItem>
            <CardItem_06>{info.timeMsg}</CardItem_06>
            {/* <CardItem>글쓰기라인</CardItem> */}
          </CardBox>
        </CardContainer>
        {modal && <ViewModal closeModal={() => setModal(!modal)} info={info}>{info.content}</ViewModal>}
      </CardWrap>
    </>
  )
}
export default CardInfo;

const CardWrap = styled.div`
  margin-top:10px;
`;
const CardContainer = styled.div`
  display:flex;

  flex-direction:column;
  justify-content:center;
  align-items:conter;
`;

const CardBox = styled.div`
  width:480px;
  border:1px solid rgb(38,38,38);
`;

const CardItem_01 = styled.div`
  width:480px;
  border:1px solid #efefef;
  display:flex;
  justify-content:space-between;
  align-items:center;
  align-content:center;
  padding:15px;
  box-sizing:border-box;
`;
const Item01Left = styled.div`
margin:0;padding:0;
display:flex;
align-items:center;
`;
const LeftIcon = styled.span`
  font-size:25px;
`;
const LeftUser = styled.span`
  font:15px/1 'Arial','sans-serif';
  margin-left:5px;
  letter-spacing :1px;
`

const Item01Right = styled.div`
  font-size:25px;
  color:red;
  cursor:pointer;
`;





const CardItem_02 = styled.div`
  width:100%;
  height:480px;
  box-sizing: border-box;
  /* background-color:gray;
  border:5px solid black; */
  /* border:5px solid black; */
  
   // 스와이퍼
   .swiper-container {
    width: 100%;
    height: 100%;
  }

  .swiper-button-prev,
  .swiper-button-next {
    margin-top: 0;
    width: 30px;
    height: 30px;
    transform: translateY(-50%);
    background-image: url(${icons});
    background-repeat: no-repeat;
    background-size: 440px 411px;
    ::after {
      content: '';
    }
  }

  .swiper-button-prev {
    background-position: -129px -97px;
  }
  .swiper-button-next {
    background-position: -160px -97px;
  }

  .swiper-slide{
    height:100%;
  }
`;
const CardItem_02_Img = styled.img`
  width:100%;
  height:100%;
  box-sizing: border-box;
  object-fit:cover;
`;




const CardItem_03 = styled.div`
  margin:5px;
  display:flex;
  font-size:25px;
`;
const CardItem_06 = styled.div`
  color:gray;
  font:12px/25px 'Arial','sans-serif';
  padding:10px;
`;

const Item03 = styled.span`
  display:inline-block;
  padding:0 5px;
  margin-left:${(props) => props.marginLeft};
  margin-right:${(props) => props.marginRight};
  cursor:${(props) => props.cursor};
`;

const CardContent = styled.span`
white-space: pre-line;
`;

const CardItem = styled.div`
  padding:10px;
  box-sizing:border-box;
`;

const UserNic = styled.span`
  font-weight:bold;
  letter-spacing :1px;
`;
const ColorSpan = styled.span`
  color:red;
`;