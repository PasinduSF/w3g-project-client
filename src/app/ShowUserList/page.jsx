"use client";

import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar'
import UserList from './UserList'
import Image from 'next/image';
import info from '../../assets/info.png'


function ShowUserList() {
    const[userType,setUserType] =useState("");

    useEffect(() => {
        const loginUserType = localStorage.getItem('user_type')
        setUserType(loginUserType)
      }, []);

    return (
        <div className='w-full h-screen flex flex-col bg-white '>
            <div className='w-full h-[10%] '>
                <NavBar />
            </div>
            <div className='flex items-center justify-center w-full h-[90%] '>
              
               {userType === "ADMIN" ? 
                <div className='flex flex-col w-[90%] h-[90%] rounded-[5px] shadow-slate-30000 shadow items-center gap-5 '>
                    <div className='flex flex-col justify-center w-[90%] h-[20%]  gap-1'>
                        <span className='text-[28px] font-bold '>User List</span>
                        <span className='text-text text-[16px]'>Lorem ipsum dolor sit amet consectetur. </span>
                    </div>
                    <div className=' flex-col justify-center items-center w-[90%] h-[80%] overflow-auto mb-7 mt-[-25px]'>
                        <UserList />
                    </div>
                </div>  
                :
                <div className='flex flex-col w-[50%] h-[50%] rounded-[5px] shadow-slate-30000 shadow items-center justify-center  gap-5  '>
                    <Image src={info} className='w-[15%]' />
                    <span className='text-[40px]'> Sorry</span>
                    <span className='text-[20px]'> Your are unabale to view the user list</span>
                </div> 
               }             

            </div>
        </div>
    )
}

export default ShowUserList