import React, { useEffect, useState } from 'react'

import './Aside.scss';
import LOGO_DARK from "@images/icons/logo-dark.png";
import LOGO_LIGHT from "@images/icons/logo-light.png";
import { Link } from 'react-router-dom';

import { RxDashboard } from "react-icons/rx";
import { CiWallet } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { IoMdClose } from 'react-icons/io';
import { IoAnalytics } from "react-icons/io5";

type Props = {}

const Aside = (props: Props) => {

    const [theme, setTheme] = useState(true);

    useEffect(() => {
        if(theme){
            document.body.classList.add('dark');
        }
        else{
            document.body.classList.remove('dark');
        }
    }, [theme])

    const pages = [
        {
           text: 'Дашборд',
           icon: <RxDashboard className='aside__pages-item-icon'/>,
           link: 'dashboard'
        },
        
        {
            text: 'Расходы',
            icon: <GrTransaction className='aside__pages-item-icon'/>,
            link: 'transactions'
        },
        {
            text: 'Бюджет',
            icon: <CiWallet className='aside__pages-item-icon'/>,
            link: 'budget'
        },
        {
            text: 'Аналитика',
            icon: <IoAnalytics className='aside__pages-item-icon'/>,
            link: 'analytics'
        },
    ];

    const [currentPage, setCurrentPage] = useState(0);

    const closeAsideMenu = () => {
        document.querySelector('#aside')?.classList.remove('open');
    }

  return (
    <aside id='aside' className=''>

        <Link to={'/'}>
            <img src={`${theme? LOGO_LIGHT : LOGO_DARK}`} alt="SubTrackr" className='aside__logo'/>
        </Link>

        <IoMdClose
            className='close-icon'
            title='CLose'
            onClick={closeAsideMenu}
        />
        

        <div className="aside__pages">
            {pages.map(({text, icon, link}:any, i:number) => (
                <Link key={i} to={`/${link}`} 
                onClick={() => {
                    setCurrentPage(i)
                    closeAsideMenu();
                }}>
                    <div className={`aside__pages-item ${i === currentPage? 'active' : ''}`}>
                        {icon}
                        <p>{text}</p>
                    </div>
                </Link>
                
            ))}
        </div>

        <div className="aside__settings">
            <div className="aside__settings-darkmode">
                <input type="checkbox" id="check" checked={theme}/>
                <label
                    htmlFor="check"
                    className='switch'
                    onClick={() => setTheme(prev => !prev)}
                >
                </label>
                <p>Темная тема</p>
            </div>
        </div>
    </aside>
  )
}

export default Aside