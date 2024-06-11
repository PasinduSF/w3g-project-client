"use client";

import NavBar from '../../components/NavBar'
import AddDetails from './AddDetails'
import withAuth from '../middleware/withAuth';
import { useEffect, useState } from 'react';
import FcmTokenComp from '../../../home/firebaseForeground';


function Dashboard() {

    const [userType, setUserType] = useState('');

    useEffect(() => {
      const loginUserType = localStorage.getItem('user_type')
      setUserType(loginUserType)
    }, []);
  

    return (
        <div className='w-full md:h-screen min-[120px]:h-full flex flex-col bg-white    '>
            <FcmTokenComp />
            <div className='w-full h-[10%] '>  
                <NavBar />
            </div>
            <div className='flex items-center justify-center w-full h-[90%] '>
                <div className='flex flex-col bg-white w-[90%] md:h-[90%] min-[120px]:mt-[40%] sm:mt-[20%] md:mt-[20%] lg:mt-[-10px]   rounded-[5px] shadow-slate-30000 shadow items-center gap-5'>

                    <div className='flex flex-col justify-center w-[90%] h-[20%]  gap-1'>
                        <span className='text-[28px] font-bold '>{userType === 'ADMIN'? 'User Onboarding' : 'Your Details'}</span>
                        <span className='text-text text-[16px]'>Lorem ipsum dolor sit amet consectetur. </span>
                    </div>
                    {userType === 'ADMIN' &&
                        <div className='flex flex-col justify-center items-center w-[90%] min-h-[80%] bg-white'>
                            <AddDetails />
                        </div>
                    }     
                </div>
            </div>
        </div>
    )
}

export default withAuth(Dashboard) 