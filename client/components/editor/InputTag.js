import { useState } from "react";

const InputTag = ({ handleAddTag }) => {
  const [value, setValue] = useState("");

  const keydown = (e) => {
    switch (e.keyCode) {
      case 13:
      case 188:
      case 9:
        if (e.keyCode !== 9) e.preventDefault();
        handleAddTag(value);
        setValue("");
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => setValue(e.target.value);

  //   const handleAddTag = () => {
  //     console.log("hello");
  //     console.log(value);

  //     setValue("");
  //   };

  return (
    <input
      name="title"
      type="text"
      placeholder="Enter tags"
      className="auth-form w-100 mb-3"
      value={value}
      onKeyDown={keydown}
      onChange={handleChange}
    />
  );
};

export default InputTag;
