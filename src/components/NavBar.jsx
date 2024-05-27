"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import logoWhite from '../assets/logo-white.png';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import user from '../assets/user.png'
import admin from '../assets/admin.png'

function NavBar() {
  const [mobile, setMobile] = useState(false);
  const [menuOpend, setMenuOpend] = useState(false);
  const [animateMenuIcon, setAnimateMenuIcon] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };

    // Check if the window object is available
    if (typeof window !== 'undefined') {
      setMobile(window.innerWidth <768);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      // Remove the event listener when the component is unmounted
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const router = useRouter();

  const handleSignOut = () => {
    // Remove token from local storage
    localStorage.removeItem('token1');
    // Redirect to login page
    router.push('/');
  };

  const handleMenuIconClick = () => {
    setMenuOpend(true);
    setAnimateMenuIcon(true);
    setTimeout(() => {
      setAnimateMenuIcon(false);
    }, 500); // Reset the animation state after 500ms (same as the animation duration)
  };

  return (
    <header className='w-full h-fit min-[0px]:hidden min-[140px]:block drop-shadow-2xl fixed z-10 p-5 bg-[#003FE4]'>
      <nav className='flex justify-between sm:items-center sm:w-[92%]  lg:w-[90%] mx-auto'>
        
        <div className='sm:static relative z-10 md:hidden  lg:flex'>
          <Image src={logoWhite} className='w-[100px] cursor-pointer ' />
        </div>

        {menuOpend === false && mobile === true ? (
          <div className="">
            <FontAwesomeIcon
              icon={faBars}
              onClick={handleMenuIconClick}
              className={`text-slate-50 text-3xl relative cursor-pointer ${animateMenuIcon ? 'spin-once' : ''}`}
            />
            <div>

            </div>
          </div>
        ) : (
           <>
            <div className='md:hidden flex bg-[#003FE4] sm:w-[50%] min-[120px]:w-[70%] h-screen absolute right-0 top-0 z-10'>
                <ul className='w-full h-full relative mt-6 '>            
                   <li className='absolute right-8 top-[-7px] cursor-pointer'>
                       <FontAwesomeIcon
                        icon={faXmark}
                        onClick={() => setMenuOpend(false)}
                        className={`text-slate-50 text-3xl ${menuOpend ? 'spin-once' : ''}`}
                        />
                   </li>
                   <li className='absolute top-12  mt-3 w-[90%]'>
                    <div className='flex flex-row w-full h-[43px] outline-none  bg-transparent'>
                            <div className='flex items-center justify-center w-[15%] h-full '>
                                <FontAwesomeIcon icon={faSearch} className='md:text-black text-white cursor-pointer' />
                            </div>
                            <div className='w-[85%] h-full'>
                                <input type='search' placeholder='Search' className='custom-placeholder w-full h-full pl-3 outline-none pr-3 text-white bg-transparent border-b-2 ' />
                            </div>
                        </div>
                   </li>
                   <li className='absolute top-28 mt-4 w-full  flex items-center justify-center'>
                        <Link href="/Dashboard" className='text-[18px] text-white  font-bold'>User Onboarding</Link>
                   </li>
                   <li className='absolute top-[176px] w-full  flex items-center justify-center mt-4'>
                        <Link href="/ShowUserList" className='text-[18px]  text-white   font-bold'>Users List</Link>
                   </li>

                   <li className='absolute top-[240px] w-full flex items-center justify-center mt-4 '>
                        <span className='  h-10 rounded-md btn cursor-pointer text-[18px]  text-white   font-bold 'onClick={handleSignOut}>
                            Sign Out
                        </span>
                   </li>
                </ul>
            </div>

            <div className='hidden md:flex sm:static absolute sm:min-h-fit min-h-screen right-0 top-[9vw] sm:w-auto sm:py-0 py-16 w-1/2 px-5 z-0 bg-[#003FE4]'>       
                <ul className='flex md:flex-row flex-col sm:items-center sm:gap-[4vw] lg:gap-12 text-slate-50'>            
                <li className="absolute top-[-6vw] right-10 cursor-pointer">
                    <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => setMenuOpend(false)}
                    className={`text-slate-50 text-3xl ${menuOpend ? 'spin-once' : ''}`}
                    />
                </li>

                <li name="home" className='relative sm:top-7 md:top-0' onClick={() => setMenuOpend(false)}>
                    <Link href="/Dashboard" className='sm:text-[18px] md:text-[15px] lg:text-[18px]   font-medium'>User Onboarding</Link>
                </li>

                <li className='relative sm:top-3 md:top-0' onClick={() => setMenuOpend(false)}>
                    <Link href="/ShowUserList" className='sm:text-[18px] md:text-[15px] lg:text-[18px]  font-medium'>Users List</Link>
                </li>

                <li className='relative sm:top-3 md:top-0'>
                    <div className='flex flex-row md:w-[240px] w-[250px] h-[43px] outline-none md:bg-white bg-transparent'>
                    <div className='flex items-center justify-center w-[15%] h-full '>
                        <FontAwesomeIcon icon={faSearch} className='md:text-black text-white cursor-pointer' />
                    </div>
                    <div className='w-[85%] h-full'>
                        <input type='search' placeholder='Search' className='custom-placeholder w-full h-full pl-3 outline-none pr-3 text-white md:bg-white bg-transparent md:border-b-0 border-b-2 ' />
                    </div>
                    </div>
                </li>
                <li>
                    <button className='w-[100%] sm:text-[18px] md:text-[14px] lg:text-[18px]  h-10 rounded-md btn cursor-pointer sm:hidden bg-white text-[#003FE4] text-[18px] font-medium top-5' onClick={handleSignOut}>
                    Sign Out
                    </button>
                </li>
                </ul>
            </div>
           </>
        )}

        <div className='hidden md:flex sm:static relative items-center gap-6 z-10 '>
          <button className='sm:text-[18px] md:text-[14px] lg:text-[18px] w-28 h-10 border-2 border-white text-white rounded-md cursor-pointer text-[18px] font-medium ' onClick={handleSignOut}>Sign Out</button>
        </div>

      </nav>
    </header>
  )
}

export default NavBar