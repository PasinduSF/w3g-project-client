import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthToken from './useAuthToken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import UpdateUserList from './UpdateUserList';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';


function UserList() {

  const { token } = useAuthToken();
  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [notificationStatus, setNotificationStatus] = useState(null);
  const [fcmToken1, setFcmToken] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const loginUserType = localStorage.getItem('user_type')
    setUserType(loginUserType)
  }, []);


  useEffect(() => {
      const fetchFcmToken = async () => {
          const FCM = localStorage.getItem('FCM');
        setFcmToken(FCM);
      };
  
      fetchFcmToken();
    }, []);

  useEffect(() => {
    fetchUsers();
  }, [token]);

  useEffect(() => {
    if (isUserUpdated) {
      fetchUsers();
      setIsUserUpdated(false); // Reset the flag after fetching the data
    }
  }, [isUserUpdated, token]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users/getUsers`, {
        headers: {
          Authorization: token,
        },
      });
    
      const updatedUsers = response.data.map(user => ({
        ...user,
        backgroundColor: (userType === 'ADMIN' && user.status === 'INACTIVE') ? '#fed7d7' : (userType === 'USER' ? (user.status === 'INACTIVE' ? '#fed7d7' : '#e6ffed') : ''),
        active: user.status !== 'INACTIVE',
      }));
      setUsers(updatedUsers);
      
    } catch (error) {
      console.error('Error retrieving users:', error);
    }
  };

  // const deactivateUser = async (userId) => {
  //   const result = await Swal.fire({
  //     title: 'Warning',
  //     text: 'Are you sure you want to deactivate?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     cancelButtonText: 'No',
  //     confirmButtonText: 'Yes',
  //   });
  
  //   if (result.isConfirmed) {
  //     try {
  //       await axios.post(`${baseUrl}/users/deactivate/${userId}`, null, {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }).then(() => {
  //         fetchUsers();
  //         toast.success('User has been deactivated successfully');
          
  //       });
  //     } catch (error) {
  //       console.error('Error deactivate user:', error);
  //     }
  //   }
  // };

  const deactivateUser = async (userId) => {
    const result = await Swal.fire({
      title: 'Warning',
      text: 'Are you sure you want to deactivate?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.post(`${baseUrl}/users/deactivate/${userId}`, null, {
          headers: {
            Authorization: token,
          },
        });

        console.log("response", response)
  
        if (response.data.result.message === 'User deactivated successfully') {
          fetchUsers();
          toast.success('User has been deactivated successfully');
  
          // Send notification to the deactivated user
          const notificationResponse = await axios.post(`${baseUrl}/notifications/send`, {
            userId,
            fcmToken1,
          });

          console.log("notificationResponse", notificationResponse)
  
          if (notificationResponse.status === 201) {
            console.log('Notification sent successfully');
            
          } else {
            console.error('Failed to send notification');
          }
        } else {
          console.error('Error deactivating user');
        }
      } catch (error) {
        console.error('Error deactivating user:', error);
      }
    }
  };



  const toggleUpdateBox = (user) => {
    setShowUpdateBox(!showUpdateBox);
    setSelectedUser(user);
  };

  const handleUserUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
    setIsUserUpdated(true);
  };

  return (
    <div>

      <table className="w-full">
        <thead className="bg-[#F1F5FF] shadow-inner">
          <tr>
            <th className="p-3 tracking-wide font-semibold">First Name</th>
            <th className="p-3 tracking-wide font-semibold">Last Name</th>
            <th className="p-3 tracking-wide font-semibold">Date Of Birth</th>
            <th className="p-3 tracking-wide font-semibold">Gender</th>
            <th className="p-3 tracking-wide font-semibold">Contact Number</th>
            <th className="p-3 tracking-wide font-semibold">Email</th>
            <th className="p-3 tracking-wide font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b-2"
              style={{ backgroundColor: user.backgroundColor }}
            >
              <td className="p-3 text-center">{user.basic_info.first_name}</td>
              <td className="p-3 text-center">{user.basic_info.last_name}</td>
              <td className="p-3 text-center">{user.basic_info.dob}</td>
              <td className="p-3 text-center">{user.basic_info.gender}</td>
              <td className="p-3 text-center">{user.contact_info.mobile_number[0]}</td>
              <td className="p-3 text-center">{user.contact_info.email}</td>
              {userType === 'ADMIN' && (
              <td className="p-3 text-center">
                {user.active && (
                  <>
                    {/* Update button */}
                    <FontAwesomeIcon
                      icon={faRepeat}
                      color="green"
                      className="cursor-pointer pr-2"
                      onClick={() => toggleUpdateBox(user)}
                    />
                    {/* Deactivate button */}
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      color="red"
                      className="cursor-pointer"
                      onClick={() => deactivateUser(user._id)}
                    />
                  </>
                )}
                {!user.active && <span className='bg-red-500 p-1 text-white uppercase text-[12px]'>Inactive</span>}
              </td>
              )}
              {userType === 'USER' && (
              <td className="p-3 text-center">
                {user.active && (
                  user.active && <span className='bg-green-600 p-1 text-white uppercase text-[12px]'>Active</span>
                )}
                {!user.active && <span className='bg-red-500 p-1 text-white uppercase text-[12px]'>Inactive</span>}
              </td>
              )}


            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateBox && (
        <UpdateUserList
          handleClick={toggleUpdateBox}
          userData={selectedUser}
          onUserUpdate={handleUserUpdate}
        />
      )}
      {notificationStatus === 'success' && (
      <div className="bg-green-500 text-white p-4 rounded-md mb-4">
        Notification sent successfully to the deactivated user.
      </div>
    )}
    {notificationStatus === 'error' && (
      <div className="bg-red-500 text-white p-4 rounded-md mb-4">
        Failed to send notification to the deactivated user.
      </div>
    )}
      <Toaster />
    </div>
  );
}

export default UserList;