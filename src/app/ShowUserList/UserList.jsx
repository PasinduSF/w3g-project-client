import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthToken from './useAuthToken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import UpdateUserList from './UpdateUserList';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import WaitingDialoag from '../../components/WaitingDialoag';
import moment from 'moment';
import ReactPaginate from 'react-paginate';




function UserList() {

  const { token } = useAuthToken();
  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [notificationStatus, setNotificationStatus] = useState(null);
  const [fcmToken1, setFcmToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);



// Get FCM token from the loacal storage
  useEffect(() => {
        const FCM = localStorage.getItem('FCM');
        setFcmToken(FCM);
    }, []);

  useEffect(() => {
  }, [token]);

  useEffect(() => {
    if (isUserUpdated) {
      setIsUserUpdated(false); 
    }
  }, [isUserUpdated, token]);


 const [records, setRecords] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [totalUsers, setTotalUsers] = useState("");
 const recodesPerPage = 10;

 const handlePageChange = (selectedPage) => {
  setCurrentPage(selectedPage.selected + 1);
};

    const getUserWithColorAndStatus = (user) => ({
      ...user,
      backgroundColor: ( user.status === 'INACTIVE') ? '#fed7d7' :  '',
      active: user.status !== 'INACTIVE',
    });
   
  useEffect(() => {
    const fetchRecords = async () => {
      setIsLoading(true); 
      try {
        console.log(currentPage)
        const res = await axios.get(`${baseUrl}/users/getUserList?page=${currentPage}&limit=${recodesPerPage}`, {
          headers: {
            Authorization: token,
          },
        });

        if (res.data.records.length === 0) {
          setRecords([]);
        } else {
          const updatedUsers = res.data.records.map(getUserWithColorAndStatus);
          setRecords(updatedUsers);
        }
        setTotalUsers(res.headers.allusercount);
      } catch (error) {
        console.error('Error fetching records:', error);
      }finally{
        setIsLoading(false)
      }
    
    };
    fetchRecords();
  }, [currentPage, baseUrl, token, recodesPerPage,shouldRefresh]);

  const indexOfLastUser = currentPage * recodesPerPage;
  const indexOfFirstUser = indexOfLastUser - recodesPerPage;
  const totalPages = Math.ceil(totalUsers / recodesPerPage);


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
      setIsLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/users/deactivate/${userId}`, null, {
          headers: {
            Authorization: token,
          },
        });
  
        if (response.data.result.message === 'User deactivated successfully') {
          toast.success('User has been deactivated successfully');
  
          // Send notification to the deactivated user
          const notificationResponse = await axios.post(`${baseUrl}/notifications/send`, {
            userId,
            fcmToken1,
          });
  
          if (notificationResponse.status === 201) {
            console.log('Notification sent successfully');
  
            // Update the records state with the deactivated user
            setRecords((prevRecords) =>
              prevRecords.map((user) =>
                user._id === userId
                  ? {
                      ...user,
                      status: 'INACTIVE',
                      backgroundColor:"#fed7d7",
                      active: false,
                    }
                  : user
              )
            );
          } else {
            console.error('Failed to send notification');
          }
        } else {
          console.error('Error deactivating user');
        }
      } catch (error) {
        console.error('Error deactivating user:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleUpdateBox = (user) => {
    setShowUpdateBox(!showUpdateBox);
    setSelectedUser(user);
  };

  const handleUserUpdate = (updatedUser) => {
    setRecords((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
    setIsUserUpdated(true);
    setShouldRefresh(!shouldRefresh); 
  };

  return (
    <div className='w-full flex h-full flex-col relative'>
      {isLoading && <WaitingDialoag />}
      <div className='w-full h-[100%] mb-4 overflow-auto'>
        <table className="w-full  ">
          <thead className="bg-[#F1F5FF] shadow-inner">
            <tr>
              <th className="md:p-[5px]  lg:text-sm sm:text-[12px] min-[120px]:text-[11px] tracking-wide font-semibold">ID</th>
              <th className="md:p-[5px]  lg:text-sm sm:text-[12px] min-[120px]:text-[11px] tracking-wide font-semibold">First Name</th>
              <th className="md:p-[5px]  lg:text-sm sm:text-[12px] min-[120px]:text-[11px] tracking-wide font-semibold">Last Name</th>
              <th className="md:p-[5px]  lg:text-sm sm:text-[12px] min-[120px]:text-[11px] tracking-wide font-semibold">Date Of Birth</th>
              <th className="md:p-[5px]  lg:text-sm sm:text-[12px] min-[120px]:text-[11px] tracking-wide font-semibold">Gender</th>
              <th className="md:p-[5px]  lg:text-sm sm:text-[12px] min-[120px]:text-[11px] tracking-wide font-semibold">Contact Number</th>
              <th className="md:p-[5px]  lg:text-sm sm:text-[12px] min-[120px]:text-[11px] tracking-wide font-semibold">Email</th>
              <th className="md:p-[5px]  lg:text-sm sm:text-[12px] min-[120px]:text-[11px] tracking-wide font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((user, index) => (
              <tr
                key={user._id}
                className="border-b-2 "
                style={{ backgroundColor: user.backgroundColor }}
              >
                <td className="p-[8px] text-sm text-center">{indexOfFirstUser + index + 1}</td>
                <td className="p-[8px] text-sm text-center">{user.basic_info.first_name}</td>
                <td className="p-[8px] text-sm text-center">{user.basic_info.last_name}</td>
                <td className="p-[8px] text-sm text-center">{moment(user.basic_info.dob).format("YYYY-MM-DD")}</td>
                <td className="p-[8px] text-sm text-center">{user.basic_info.gender}</td>
                <td className="p-[8px] text-sm text-center">{user.contact_info.mobile_number[0]}</td>
                <td className="p-[8px] text-sm text-center">{user.contact_info.email}</td>
                <td className="p-[8px] text-sm text-center">
                  {user.active && (
                    <>
                      <FontAwesomeIcon
                        icon={faRepeat}
                        color="green"
                        className="cursor-pointer pr-2"
                        onClick={() => toggleUpdateBox(user)}
                      />
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
        <div className='w-full h-[10%] relative flex items-center justify-center'>
          <nav className='flex items-center fixed bottom-12 2xl:bottom-12 '>
            <ReactPaginate
              previousLabel={
                <span className="mx-2 text-gray-500 hover:text-gray-700">Prev</span>
              }
              nextLabel={
                <span className="mx-2 text-gray-500 hover:text-gray-700">Next</span>
              }
              pageCount={totalPages}
              onPageChange={handlePageChange}
              containerClassName="flex"
              pageClassName="mx-1 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200"
              activeClassName="bg-blue-500 text-white"
              disabledClassName="text-gray-400 cursor-not-allowed"
              renderOnZeroPageCount={null}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
            />
          </nav>
        </div>


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