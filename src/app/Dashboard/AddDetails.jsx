import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
// import { ToastContainer, toast  } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { validateFormFields } from '../Validations/validateFormFields';



function AddDetails() {
    const [selectedOption, setSelectedOption] = useState('');
    const [showExtraPhoneFieldOne, setShowExtraPhoneFieldOne] = useState(false);
    const [showExtraPhoneFieldTwo, setShowExtraPhoneFieldTwo] = useState(false);
    const [token, setToken] = useState('');


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        mobileNumber: '',
        mobileNumberTwo: '',
        mobileNumberThree: '',
        email: ''
    });

    const handleTogglePhoneFieldsOne = () => {
      setShowExtraPhoneFieldOne(!showExtraPhoneFieldOne);
    };
    const handleTogglePhoneFieldsTwo = () => {
        setShowExtraPhoneFieldTwo(!showExtraPhoneFieldTwo);
      };
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    
    useEffect(() => {
        const jwtToken = localStorage.getItem('token1');
        if (jwtToken) {
            setToken(jwtToken);
        }
        console.log(jwtToken)
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClear = () => {
        // Clear form fields
        setFormData({
            firstName: '',
            lastName: '',
            dob: '',
            mobileNumber: '',
            email: '',
            gender: '',
        });

        toast.dismiss();

    }

    // Handle form submit button
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateFormFields({ ...formData, selectedOption });
        
        // Check if any of the required fields are empty
        if(Object.keys(validationErrors).length === 0){
            // Display SweetAlert2 confirmation dialog
            const result = await Swal.fire({
                title: 'Submit Form?',
                text: 'Are you sure you want to submit the form data?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, submit!',
                cancelButtonText: 'No, cancel'
            });

            if (result.isConfirmed) {
                // User confirmed, proceed with form submission

                const mobileNumbers = [
                    formData.mobileNumber,
                    formData.mobileNumberTwo,
                    formData.mobileNumberThree,
                ].filter(num => num.trim() !== '');
            
                const userData = {
                    type: 'USER',
                    status:'ONBOARD',
                    basic_info: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        dob: formData.dob,
                        gender: selectedOption,
                    },
                    contact_info: {
                        email: formData.email,
                        mobile_number: mobileNumbers,
                    },
                    auth_info: {
                        password: '', 
                    },
                };

                try {
                    const response = await axios.post('http://localhost:4000/users/userAdd', userData, {
                        headers: {
                            Authorization:token, 
                        },
                    });
                   
                    toast.success('User added successfully!!');
                    // Reset the form after successful submission
                    setFormData({
                        firstName: '',
                        lastName: '',
                        dob: '',
                        mobileNumber: '',
                        mobileNumberTwo: '',
                        mobileNumberThree: '',
                        email: '',
                        gender: '',
                    });

                } catch (error) {
                    if (error.response && error.response.data && error.response.data.message === 'Email already exists') {
                        toast.error('Email already exists. Please use a different email address.');
                    } else if(error.response && error.response.data && error.response.data.message === 'One or more phone numbers already exist for another user'){
                        toast.error('One or more phone numbers already exist for another user.');
                    }else {
                        toast.error('An error occurred while adding the user.');
                    }
                }
            }
        }else{
            // Display validation errors as toast notifications
                Object.entries(validationErrors).forEach(([field, error]) => {
                toast.error(`${error}`);
            });

        }

    };

    return (
        <form className='flex flex-col items-center w-[100%] h-full gap-3  ' onSubmit={handleSubmit}>
            <div className='flex flex-col w-[90%] min-h-[80%] border-[2px] items-center '>
                {/* Basic details */}
                <div className='flex flex-col w-full h-[60%] items-center '>
                    <div className='flex w-[90%] h-[30%] items-center '>
                        <span className='text-[16px] font-semibold text-text'>Basic Details</span>
                    </div>
                    <div className='flex flex-col gap-7 w-[90%] h-[50%] '>
                        <div className='w-full h-[40%] flex justify-between'>
                            <input
                                type='text'
                                name='firstName'
                                placeholder='First Name'
                                value={formData.firstName}
                                onChange={handleChange}
                                className='w-[30%] h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder'
                            />
                            <input
                                type='text'
                                name='lastName'
                                placeholder='Last Name'
                                value={formData.lastName}
                                onChange={handleChange}
                                className='w-[30%] h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder'
                            />
                            <input
                                type='date'
                                name='dob'
                                placeholder='Date of Birth'
                                value={formData.dob}
                                onChange={handleChange}
                                className='w-[30%] h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder'
                            />
                        </div>
                        <div className='w-full h-[50%] '>
                            <Dropdown selectedOption={selectedOption} handleOptionSelect={handleOptionSelect} />
                        </div>
                    </div>
                </div>
                {/* Contact Details */}
                <div className='flex flex-col gap-2 w-[90%] max-h-[30%]' >
                    <div className='flex w-[90%] h-[30%]  items-center mt-[-10px]'>
                        <span className='text-[16px] font-semibold text-text'>Contact Details</span>
                    </div>
                    
                    <div className='w-full min-h-[50%] flex gap-6 flex-wrap items-center'>
                        <input
                            type='text'
                            name='email'
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-[25%] h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder '
                        />
                       <input
                            type="text"
                            name="mobileNumber"
                            placeholder="Mobile Number"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            className="w-[25%] h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder"
                            />
                        
                        {/* Handle Extra Mobile numbers feilds */}
                        <button
                            type="button"
                            onClick={handleTogglePhoneFieldsOne}
                            className="flex items-center justify-center outline-none border-none rounded-full bg-transparent text-white"
                            >
                            {showExtraPhoneFieldOne ? <FontAwesomeIcon icon={faMinus} color='red' size='xl'/> : <FontAwesomeIcon icon={faPlus} color='#00000040' size='xl'/>}
                        </button>

                        {/* Handle Extra Mobile numbers  feild One */}
                        {showExtraPhoneFieldOne && (
                        <>
                            <input
                                type="text"
                                name="mobileNumberTwo"
                                placeholder="Mobile Number"
                                value={formData.mobileNumberTwo}
                                onChange={handleChange}
                                className="w-[25%] h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder"
                                />
                            <button
                                type="button"
                                onClick={handleTogglePhoneFieldsTwo}
                                className="w-[10px] h-[10px] flex items-center justify-center outline-none border-none rounded-full bg-transparent text-white"
                                >
                                {showExtraPhoneFieldTwo ? <FontAwesomeIcon icon={faMinus} color='red' size='xl'/> : <FontAwesomeIcon icon={faPlus} color='#00000040' size='xl'/>}
                            </button>

                         </> )}
                        
                         {/* Handle Extra Mobile numbers  feild Two */}
                         {showExtraPhoneFieldTwo && (
                        <>
                            <input
                                type="text"
                                name="mobileNumberThree"
                                placeholder="Mobile Number"
                                value={formData.mobileNumberThree}
                                onChange={handleChange}
                                className="w-[25%] h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder"
                                />
                         </> )}
                           
                        
                    </div>
                </div>
            </div>

            <div className='flex flex-row items-start justify-end w-[90%] h-[10%] gap-1  '>
                <Button
                    type="button"
                    title="Clear"
                    handleClick={handleClear}
                    style={{
                        color: '#003FE4',
                        border: "1px solid #003FE4"
                    }}
                />
                <Button
                    type="submit"
                    title="Save"
                    style={{
                        color: 'white',
                        backgroundColor: "#003FE4"
                    }}
                />
            </div>
            {/* <ToastContainer /> */}
            <Toaster />
        </form>
    );
}

export default AddDetails;
