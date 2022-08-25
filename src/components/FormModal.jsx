import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Textarea from './elements/Textarea';
import { FaUserCircle } from "react-icons/fa";
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from "react-redux";
import { __postForm } from '../redux/modules/mainSlice';
import axios from "axios";
import Cookies from "universal-cookie";
import { FaRegImages } from "react-icons/fa";


const API_SEATCH = process.env.REACT_APP_IP_ADDRESS;
const cookies = new Cookies();

const FormModal = (props) => {
  const dispatch = useDispatch();

  console.log('모달컴포넌트props=>', props);
  const closeModal = () => {
    props.closeModal();
  }








  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };

  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };

  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };

  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };


  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 4,
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>

        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />

      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  const [values, setValues] = useState({
    // fileList: '',
    content: ''
  })
  const { content } = values;
  const onChangeHandler = (e) => {
    console.log("onChangeHandler", e.target.value)
    setValues({
      content: e.target.value
    })
  }

  const onSubmitHandler = async (e) => {
    if(files.length<=0){
      window.alert('이미지를 넣어주세요.');
      return false;
    }
    if(content.length<=0){
      window.alert('내용을 입력해주세요.');
      return false;
    }
    const formData = new FormData();
    const newFormVal = {
      content: content
    }
    files.map((file, i) => {
      formData.append('multipartFile', files[i])
    });
    formData.append('dto', new Blob([JSON.stringify(newFormVal)], { type: 'application/json' }));

    // FormData key
    for (let key of formData.keys()) {
      console.log(key);
    }
    // FormData value
    for (let value of formData.values()) {
      console.log(value);
    }

    console.log("전송버튼1=>", formData);
    console.log("전송버튼1=>", files.length);
    dispatch(__postForm(formData));

    closeModal();
  }

  return (
    <>
      <ModalWrap onClick={closeModal}>
        <ModalBody onClick={(e) => { e.stopPropagation() }}>
          {/* <button onClick={closeModal}>
            XXXXX
          </button> */}
          <BodyTitle>
            <TitleItem cursor={'pointer'} onClick={closeModal}>X</TitleItem>
            <TitleItem >새 게시물 만들기</TitleItem>
            <TitleItem cursor={'pointer'} onClick={onSubmitHandler}>등록</TitleItem>
          </BodyTitle>
          <BodyContent>
            <ContentLeft>
              <DropLine className="container">
                <DropZone {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <ImgIcon><FaRegImages /></ImgIcon>
                  <ImgFont>사진과 동영상을 여기에 끌어다 놓으세요.</ImgFont>
                  <ImgFont>최대 4개</ImgFont>
                </DropZone>
                <aside style={thumbsContainer}>
                  {thumbs}
                </aside>
              </DropLine>
            </ContentLeft>
            <ContentRight>
              <RTop><TopContent><FaUserCircle />로그인 계정</TopContent></RTop>
              <RMiddle><Textarea onChange={onChangeHandler}></Textarea></RMiddle>
            </ContentRight>
          </BodyContent>
          {props.children}
        </ModalBody>
      </ModalWrap>
    </>
  )
}

export default FormModal;

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
  z-index:10;
`;
const ModalBody = styled.div`
  position: absolute;
  width: 1000px;
  height: 800px;
  @media screen and (max-width: 1200px) {
    width: 80%;
    height: 80%;
  }
  /* padding: 40px; */
  /* text-align: center; */
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

  display:flex;
  flex-direction:column;
`;

const BodyTitle = styled.h1`
  text-align:center;
  font:20px/40px 'Arial','sans-serif';
  border-bottom:1px solid #efefef;
  margin:0;
  
  display:flex;
  justify-content: space-between;
`;
const TitleItem = styled.div`
  padding:0 15px;
  cursor:${(props) => props.cursor}

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
border-bottom-left-radius:10px;
`;
const ContentRight = styled.div`
width:40%;
border-bottom-right-radius:10px;
display:flex;
flex-direction:column;
padding:10px;
box-sizing:border-box;
`;

const RTop = styled.div``;
const TopContent = styled.div`
  font:18px/25px 'Arial','sans-serif';
  margin:17px 0;
`;
const RMiddle = styled.div``;


const DropLine = styled.section`
  height:80%;
  border-bottom:1px solid #efefef;
`;

const DropZone = styled.div`
  border:2px dotted #fff;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

const ImgIcon = styled.span`
  display:flex;
  align-items:center;
  font-size:100px;
  margin-bottom:50px;
`;


const ImgFont = styled.p`
  font:25px/50px 'Arial','sans-serif';
  margin:0;
`;