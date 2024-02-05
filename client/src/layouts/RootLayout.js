import { NavLink,Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { lightMode,darkMode } from '../store/theme/themeSlice';
import {HiSun,HiMoon} from "react-icons/hi";


export default function RootLayout() {
  const theme = useSelector((state)=>state.theme.color)
  const dispatch = useDispatch()
  
  return (
    <div className=''>
        <header className='p-4'>
            <nav className='flex justify-between items-center container mx-auto px-8'>
                <NavLink to="/"><h1 className='font-black'>insureGhana</h1></NavLink>
                <span className='flex gap-4'>
                <NavLink to="/calculator">Calculator</NavLink>
                <NavLink to="/news">news</NavLink>
                <span className={`${theme==='dark'&&'text-white'} rounded-xl p-1 text-lg border border-slate-200 cursor-pointer ml-6`}>
               {theme==='dark'? null :<HiMoon className=''  onClick={()=>dispatch(darkMode())}/>}
                {theme==='dark'? <HiSun className='' onClick={()=>dispatch(lightMode())} /> :null}
                </span>
                </span>
            </nav>
        </header>

        <main className='container w-full max-w-5xl p-4 mx-auto min-h-[85vh]'>
            <Outlet />
        </main>
    </div>
  )
}
