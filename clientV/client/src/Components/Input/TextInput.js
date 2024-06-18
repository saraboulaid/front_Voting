import React from "react";

const TextInput = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
};
export default TextInput;
