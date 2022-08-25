import React from "react";
import styled from "styled-components";

const Textarea = (props) => {
  const {
    maxLength,
    title,
    id,
    name,
    defaultValue,
    onChange,
    placeholder,
    width,
    height,
  } = props;

  return (
    <TextareaWrap>
      <StTextarea
        maxLength={maxLength}
        title={title}
        id={id}
        defaultValue={defaultValue}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        width={width}
        height={height}
      />
    </TextareaWrap>
  );
};

export default Textarea;

const TextareaWrap = styled.div`
  width: 100%;
`;

const StTextarea = styled.textarea`
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  resize: none;
  box-sizing: border-box;
  border: 1px solid rgb(238, 238, 238);
  width: ${({ width }) => `${width}`};
  height: ${({ height }) => `${height}`};
  padding: 10px;
  font-size: 14px;
  outline:none;
  width:100%;
  height:150px;
`;
