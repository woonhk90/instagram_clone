import styled, { css } from "styled-components";

const Button = ({
  text,
  btntype,
  type,
  onClick,
  children,
  uibutton,
  disabled,
}) => {
  return (
    <StButton type={type} onClick={onClick} btntype={btntype} disabled={disabled}>
      {children}
    </StButton>
  );
};

export default Button;

const StButton = styled.button`
  border-radius: 8px;
  color:#fff;
  cursor:pointer;
  ${(props) => {
    return (
      props.btntype === "login" &&
      css`
        border: 1px solid #0095f6;
        background-color: #0095f6;
        width: 100%;
        height: 50px;
        :disabled {
          cursor: default;
          opacity: 0.5;
        }
      `
    );
  }}
  ${(props) => {
    return (
      props.btntype === "signup" &&
      css`
        border: 1px solid rgb(221, 221, 221);
        background-color: white;
        :hover {
          border: 1px solid rgb(254, 83, 31);
        }
        width: 100%;
        height: 50px;
      `
    );
  }}
  ${(props) => {
    return (
      props.btntype === "headerBtn" &&
      css`
      color:#000;
      background-color:transparent;
      font-size:30px;
      border:none;
      margin:0 10px;
      `
    );
  }}
`;
