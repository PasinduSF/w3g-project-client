"use client"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logoWhite from '../assets/logo-white.png';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function NavBar() {

    const router = useRouter();

    const handleSignOut = () => {
        // Remove token from local storage
        localStorage.removeItem('token1');
        // Redirect to login page 
        router.push('/');
    };

    return (
        <div className='flex items-center justify-center h-[77px] w-full bg-blue-700'>
            <div className='relative flex min-w-[320px] sm:w-[80%] justify-between items-center'>
                {/* Logo */}
                <Image src={logoWhite} alt="Logo" className='w-[10%]' />


                <div className='flex flex-col sm:flex-row absolute sm:static pl-10 sm:pl-0 items-center gap-7 text-black sm:text-white text-[14pt] w-full h-screen sm:h-auto sm:w-auto bg-white sm:bg-transparent top-[-25px] pt-20 sm:pt-0 z-10'>
                    {/* Close icon */}

                    {/* Navigation links */}
                    <Link href="/Dashboard" className='text-[18px] font-medium'>User Onboarding</Link>
                    <Link href="/ShowUserList" className='text-[18px] font-medium'>Users List</Link>

                    <div className='flex flex-row  w-[327px] h-[43px] outline-none bg-white'>
                        <div className='flex items-center justify-center w-[15%] h-full '>
                            <FontAwesomeIcon icon={faSearch} className='text-black cursor-pointer' />
                        </div>
                        <div className='w-[85%] h-full bg-blue-300'>
                            <input type='search' placeholder='Search' className='w-full h-full pl-3 outline-none pr-3 text-black' />
                        </div>
                    </div>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>

            </div>
        </div>
    );
}