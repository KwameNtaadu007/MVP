import { NavLink,Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { lightMode,darkMode } from '../store/theme/themeSlice';
import {HiSun,HiMoon, HiMenu} from "react-icons/hi";
import { useState } from 'react';


export default function RootLayout() {
  // State to manage mobile menu visibility
  const [mobileMenu,setMobileMenu] = useState(true);
   // Selecting the theme color from Redux store
  const theme = useSelector((state)=>state.theme.color);
  // Dispatch function to toggle theme
  const dispatch = useDispatch()
  
  return (
    <div className=''>
        <header className='p-4 shadow-sm'>
            <nav className='flex justify-between items-center container mx-auto px-8'>
              {/* Brand/logo */}
                <NavLink to="/"><h1 className='font-black'>insureGhana</h1></NavLink>
                <span className='flex gap-4'>
                <NavLink to="/calculator" className='hidden md:inline-block'>Calculator</NavLink>
                <NavLink to="/news" className='hidden md:inline-block'>news</NavLink>
                <span className={`${theme==='dark'&&'text-white'} rounded-xl p-1 text-lg border border-slate-200 cursor-pointer ml-6`}>
               {theme==='dark'? null :<HiMoon className=''  onClick={()=>dispatch(darkMode())}/>}
                {theme==='dark'? <HiSun className='' onClick={()=>dispatch(lightMode())} /> :null}
                </span>
                 {/* Mobile menu button */}
                <button className="md:hidden text-2xl" id="mobile-menu-btn" onClick={()=>setMobileMenu(!mobileMenu)}>
                  <HiMenu />
                </button>
                </span>
            </nav>
            {/* Mobile menu */}
            <nav className={`${mobileMenu&&'hidden'} mobile-menu md:hidden bg-slate-50 dark:bg-gray-800 space-y-2`}>
                <NavLink to="/calculator" className='p-2 border border-1' onClick={()=>setMobileMenu(!mobileMenu)}>Calculator</NavLink>
                <NavLink to="/news" className='p-2 border border-1' onClick={()=>setMobileMenu(!mobileMenu)}>news</NavLink>
            </nav>
        </header>
         {/* Main content */}
        <main className='container w-full max-w-5xl p-4 mx-auto min-h-[85vh]'>
            <Outlet />
        </main>
    </div>
  )
}
