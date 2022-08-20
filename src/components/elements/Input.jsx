import styled, { css } from "styled-components";

const Input = ({visible, disabled, defaultValue, type, inputType, value, id, title, name, placeholder, width, labelText, onChange, onKeyPress, onFocus, onBlur, minLength, maxLength }) => {
  return (
    <FormInputContainer>
      <label htmlFor={id}>{labelText}</label>
      <FormInput
        disabled={disabled}
        type={type}
        inputType={inputType}
        id={id}
        title={title}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={visible?'검색':placeholder}
        width={width}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onFocus={onFocus}
        onBlur={onBlur}
        minLength={minLength}
        maxLength={maxLength}
      />
    </FormInputContainer>
  );
};

Input.defaultValue = {
  value: "",
  inputType: "",
  type: "",
  id: "",
  name: "",
  placeholder: "",
  width: "",
  labelText: "",
  isHide: false,
  changeHandler: null,
  minLength: 0,
  maxLength: 200,
};

export default Input;

const FormInputContainer = styled.div`
  width:100%;height:100%;
`;

const FormInput = styled.input`
  padding-left: 10px;
  outline: none;
  ${(props) => {
    return (
      props.inputType === "login" &&
      css`
        box-sizing: border-box;
        background-color:#fafafa;
        width: 100%;
        height: 45px;
        border: 1px solid rgb(219,219,219);
        outline:none;
        margin-bottom:6px;
        :focus {
            border: 1px solid rgb(146, 146, 146);
        }
      `
    );
  }}
  ${(props) => {
    return (
      props.inputType === "search" &&
      css`
        background-color:transparent;
        width:100%;
        height:100%;
        border: none;
        outline:none;
        font-size:16px;
        border-radius:10px;
      `
    );
  }}
`;