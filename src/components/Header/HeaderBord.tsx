import React from 'react'

import { AiOutlineMenu } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";

import './HeaderBord.scss'
import { useAppSelector } from 'hooks/reduxHooks';
import { categoryNotifications } from 'features/user/userSlice';
import { Link } from 'react-router-dom';

type Props = {}

const HeaderBord = (props: Props) => {

  const {notificationsList, currentBudget, currentExpenses, categoriesOver} = useAppSelector(({users}) => users);
  const {categoryLimits} = useAppSelector(({limits}) => limits)

  const openAsideMenu = () => {
    document.querySelector('#aside')?.classList.add('open');
  }

  const openNotifications = () => {
    document.getElementById('notifications')?.classList.toggle("open");
  }

  const categoryNotifications:any = [];

  if(categoriesOver) {
    Object.entries(categoryLimits[0]).map(([name, limit]) => {

      let alreadySpent = 0;
  
      categoriesOver.filter((item:any) => {
          return item.category === name; 
      }).map(({price}) => (
          alreadySpent += price
      ))
  
      if(alreadySpent > limit){
        categoryNotifications.push({
          category: name,
          limit: limit,
          spent: alreadySpent
        })
      }

      return null;
  
    })
  }

  console.log(categoryNotifications)

  return (
    <div className='headerbord container'>
        <AiOutlineMenu
            className='burger-icon'
            title='Открыть меню'
            onClick={openAsideMenu}
        />
        <div className="notification-box">
          <IoMdNotifications
            className='notification-icon'
            onClick={openNotifications}
          />
          {(notificationsList.length > 0 || currentBudget < currentExpenses) && <span></span>}

          <div id='notifications' className=''>
            <div className='budget-over'>
              <p className="title">🔥Бюджет</p>
              {currentBudget < currentExpenses? 
                <>
                  <p className="subtitle">
                    Вы превысили общий бюджет на 10%
                  </p>
                </>
                :
                <>
                  
                </>
              }
              <div className="category-over">
                {categoryNotifications.length > 0?
                  <>
                    {categoryNotifications.map(({category, spent, limit}:any) => (
                      <>
                        <p className="subtitle-category">
                          Превышение по категории {category}
                        </p>
                        <p className="subtitle-spent">
                          Потрачено: {spent} из {limit}
                        </p>
                        <Link to={'/budget'}>
                          <p className="link">Изменить бюджет</p>
                        </Link>
                      </>
                    ))}
                  </>
                  :
                  <>
                  </>
                }
              </div>
            </div>
          </div>
          
        </div>
        
    </div>
  )
}

export default HeaderBord