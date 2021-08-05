import React, { useState } from "react";

const SearchForm = ({ handleSubmit }) => {
  const [textInput, setTextInput] = useState("");
  return (
    <form onSubmit={_handleSubmit}>
      <input
        type="text"
        value={textInput}
        onChange={({ target: { value } }) => setTextInput(value)}
      />
      <button>Analyse</button>
    </form>
  );
  function _handleSubmit(e) {
    e.preventDefault();
    handleSubmit(textInput);
  }
};

export default SearchForm;
