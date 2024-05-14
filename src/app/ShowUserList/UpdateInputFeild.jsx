import React, { useState } from 'react';

function UpdateInputField(props) {
  const [labelText, setLabelText] = useState(props.label);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(props.value);

  const handleEditClick = () => {
    setIsEditing(true);
    setLabelText(props.label);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    setLabelText(props.label);
    props.handleInputChange({ target: { name: props.name, value: inputValue } });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const borderColor = isEditing ? '#0047ab' : '#D9D9D9';

  return (
    <div
      className={'relative w-full h-[50px] border-[2px] rounded-md hover:border-black '}
      style={{ border: `2px solid ${borderColor}` }}
    >
      {isEditing ? (
        <>
          <div className='min-w-[20px] h-[18px] absolute left-3 top-[-13px] bg-white flex justify-center items-center p-3'>
            <span style={{ color: 'blue' }}>{labelText}</span>
          </div>
          <input
            type='text'
            name={props.name}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder={props.labelText}
            onClick={handleEditClick}
            className='w-full h-full placeholder:text-placeholder pl-3 outline-none bg-transparent'
          />
        </>
      ) : (
        <input
          type='text'
          name={props.name}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder={props.labelText}
          onClick={handleEditClick}
          className='w-full h-full placeholder:text-placeholder pl-3 outline-none bg-transparent'
        />
      )}
    </div>
  );
}

export default UpdateInputField;