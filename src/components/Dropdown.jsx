"use client";

// Dropdown.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function Dropdown({ selectedOption, handleOptionSelect }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='relative flex items-center md:w-[30%] w-full h-[40px] placeholders border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 justify-between pr-3 cursor-pointer'
            onClick={toggleDropdown}>
            {selectedOption || 'Gender'} 
            <FontAwesomeIcon icon={faCaretDown} />

            {isOpen && (
                <div className='rounded border-[1px] border-r-gray-40000 bg-white p-2 absolute top-[50px] w-full left-0 z-10'>
                    <div className='cursor-pointer hover:bg-slate-200 p-2' onClick={() => handleOptionSelect('MALE')}>MALE</div>
                    <hr />
                    <div className='cursor-pointer hover:bg-slate-200 p-2' onClick={() => handleOptionSelect('FEMALE')}>FEMALE</div>
                </div>
            )}
        </div>
    );
}

export default Dropdown;
