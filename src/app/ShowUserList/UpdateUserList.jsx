import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import UpdateInputFeild from './UpdateInputFeild';
import Swal from 'sweetalert2';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { validateUpdateFormFields } from '../Validations/validateUpdateFormField';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);  // getMonth() returns 0-11
  const day = (`0${date.getDate()}`).slice(-2);        
  return `${year}-${month}-${day}`;
}


function UpdateUserList(props) {
  const [token, setToken] = useState('');
  const [updateData, setUpdateData] = useState(() => {
    if (props.userData) {
      return {
        id: props.userData._id,
        firstName: props.userData.basic_info.first_name,
        lastName: props.userData.basic_info.last_name,
        dob: props.userData.basic_info.dob,
        gender: props.userData.basic_info.gender,
        mobileNumberOne: props.userData.contact_info.mobile_number[0] || '',
        mobileNumberTwo: props.userData.contact_info.mobile_number[1] || '',
        mobileNumberThree: props.userData.contact_info.mobile_number[2] || '',
        email: props.userData.contact_info.email,
      };
    } else {
      return {
        id: '',
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        mobileNumberOne: '',
        mobileNumberTwo: '',
        mobileNumberThree: '',
        email: '',
      };
    }
  });

  useEffect(() => {
    const jwtToken = localStorage.getItem('token1');
    if (jwtToken) {
      setToken(jwtToken);
    }
    console.log(jwtToken);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateUpdateFormFields(updateData);
    if(Object.keys(validationErrors).length === 0){
      const result = await Swal.fire({
        title: 'Update User?',
        text: 'Are you sure you want to update?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update!',
        cancelButtonText: 'No, cancel',
      });
  
      if (result.isConfirmed) {

        // convert user input gender as uppercase
        const toUpperCase = (str) => {
          return str.toUpperCase();
        }
        const genderUppercase = toUpperCase(updateData.gender);
        const formattedDob = formatDate(updateData.dob);
     

        const userData = {
          type: 'USER',
          status: 'ONBOARD',
          basic_info: {
            first_name: updateData.firstName,
            last_name: updateData.lastName,
            dob: formattedDob,
            gender: genderUppercase,
          },
          contact_info: {
            email: updateData.email,
            mobile_number: [...props.userData.contact_info.mobile_number], // Start with the existing mobile numbers
          },
          auth_info: {
            password: '',
          },
        };
        console.log(userData)
        // Update the specific mobile number field that the user has modified
        if (updateData.mobileNumberOne.trim() !== '') {
          userData.contact_info.mobile_number[0] = updateData.mobileNumberOne.trim();
        }
        if (updateData.mobileNumberTwo.trim() !== '') {
          userData.contact_info.mobile_number[1] = updateData.mobileNumberTwo.trim();
        }
        if (updateData.mobileNumberThree.trim() !== '') {
          userData.contact_info.mobile_number[2] = updateData.mobileNumberThree.trim();
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; 

        try {
          const response = await axios.put(
            `${baseUrl}/users/updateUser/${updateData.id}`,
            userData,
            {
              headers: {
                Authorization: token,
              },
            }
          );      
          props.onUserUpdate(userData);
          toast.success('User details have been updated successfully!');

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message === 'Email already exists') {
              toast.error('Email already exists. Please use a different email address.');
            } else {
              toast.error('An error occurred while updating the user information.');
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

  const resetForm = () => {
    setUpdateData({
      id: '',
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      mobileNumberOne: '',
      mobileNumberTwo: '',
      mobileNumberThree: '',
      email: '',
    });
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
      <form className="relative bg-white w-[30%] h-[95%] rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className='w-full h-[85%]'>
          <div className='w-full h-[10%] flex items-center pl-5'>
            <span className='text-black text-[20px] font-Lato font-semibold'>User Details</span>
          </div>
          <div className='w-full h-[90%]  items-center pl-5 pr-5 flex flex-col justify-between' >
            <UpdateInputFeild
              name="firstName"
              labelText="First name"
              label={updateData.firstName}
              value={updateData.firstName}
              handleInputChange={handleInputChange} />

            <UpdateInputFeild
              name="lastName"
              labelText="Last name"
              label={updateData.lastName}
              value={updateData.lastName}
              handleInputChange={handleInputChange} />

            <UpdateInputFeild
              name="dob"
              labelText="DOB"
              label={updateData.dob}
              value={updateData.dob}
              handleInputChange={handleInputChange} />

            <UpdateInputFeild
              name="gender"
              labelText="Gender"
              label={updateData.gender}
              value={updateData.gender}
              handleInputChange={handleInputChange} />

            <UpdateInputFeild
              name="mobileNumberOne"
              labelText="Mobile Number 1"
              label={updateData.mobileNumberOne}
              value={updateData.mobileNumberOne}
              handleInputChange={handleInputChange} />

            <UpdateInputFeild
              name="mobileNumberTwo"
              labelText="Mobile Number 2"
              label={updateData.mobileNumberTwo}
              value={updateData.mobileNumberTwo}
              handleInputChange={handleInputChange} />

            <UpdateInputFeild
              name="mobileNumberThree"
              labelText="Mobile Number 3"
              label={updateData.mobileNumberThree}
              value={updateData.mobileNumberThree}
              handleInputChange={handleInputChange} />

            <UpdateInputFeild
              name="email"
              labelText="Email"
              label={updateData.email}
              value={updateData.email}
              handleInputChange={handleInputChange} />

          </div>
        </div>

        {/* Buttons */}
        <div className='absolute bottom-0 w-full h-[15%] flex gap-2 items-end justify-end pr-5 pb-5'>
          <Button
            type="button"
            title="Cancel"
            handleClick={props.handleClick}
            style={{
              color: '#003FE4',
              border: "1px solid #003FE4"
            }}
          />
          <Button
            type="submit"
            title="Update"
            style={{
              color: 'white',
              backgroundColor: "#003FE4"
            }}
          />
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default UpdateUserList;