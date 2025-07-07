import React, { useEffect, useState } from 'react'

import "./Dashboard.scss";

import USER_ICON from '@images/icons/unknown_user_icon.jpg'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { nameDay, nameMonth } from 'utils/constants';
import GaugeChart from '@components/Dashboard/GaugeChart/GaugeChart';
import DoughnutChart from '@components/Dashboard/DoughnutChart/DoughnutChart';
import { setUserGreeting } from 'utils/common';
import { Transactions } from './DashboardTypes';
import CategoryExpenses from '@components/Dashboard/CategoryExpenses/CategoryExpenses';
import UpcomingExpenses from '@components/Dashboard/UpcomingExpenses/UpcomingExpenses';
import RecentTransactions from '@components/Dashboard/RecentTransactions/RecentTransactions';
import { Calendar } from 'primereact/calendar';
import {addLocale} from 'primereact/api';
import { categoryNotifications } from 'features/user/userSlice';

type Props = {}

const Dashboard = (props: Props) => {
  const {currentUser} = useAppSelector(({users}) => users);
  const {transactionsList} = useAppSelector(({transactions}) => transactions);
  const dispatch = useAppDispatch();

  var currentDate = new Date();

  const userLocalDate = new Date();

  var filteredTransactions: Transactions[] | null = null;
  var filteredSubscriptions: Transactions[] | null = null;

  const [calendarDate, setCalendarDate] = useState<Date>(userLocalDate);

  addLocale('ru', {
    firstDayOfWeek: 1,
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    today: 'Hoy',
    clear: 'Limpiar'
  });

  if(transactionsList.length > 0){

    if(currentDate.getMonth() !== calendarDate.getMonth()){

      currentDate = new Date(calendarDate)

      filteredTransactions = transactionsList.filter(transaction => {

        const transactionDate = new Date(transaction.date);
  
        return(
          transactionDate.getFullYear() === calendarDate.getFullYear() &&
          transactionDate.getMonth() === calendarDate.getMonth()
        )
      });
    }
    else{

      filteredTransactions = transactionsList.filter(transaction => {

        const transactionDate = new Date(transaction.date);
  
        return(
          transactionDate.getFullYear() === currentDate.getFullYear() &&
          transactionDate.getMonth() === currentDate.getMonth() && 
          transactionDate.getDate() <= currentDate.getDate()
        )
      });

    }

    filteredSubscriptions = transactionsList.filter(transaction => {

      const transactionDate = new Date(transaction.date);

      return(
        transaction.category === 'Подписка' &&
        transactionDate >= userLocalDate
      )
    });
  }

  useEffect(() => {
    dispatch(categoryNotifications(filteredTransactions))
  }, [calendarDate])

  return (
    <div className='dashboard container'>

      <div className="dashboard__header">

        <div className="dashboard__header-text">
          <p className="dashboard__header-title">Дашборд</p>
          <p className="dashboard__header-subtitle">
            Добро пожаловать в вашу финансовую аналитику
          </p>
        </div>

        <div className="dashboard__header-calendar">

          <p className="dashboard__header-calendar-title">
            Данные за:
          </p>

          <div className="calendar__container">

            <input
              type="text"
              className='p-inputtext custom'
              readOnly
              value={calendarDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
              onClick={() => document.querySelector<HTMLButtonElement>('.p-datepicker-trigger')?.click()}
            />

            <Calendar
              className='calendar'
              value={userLocalDate}
              view='month'
              locale='ru'
              showIcon
              maxDate={userLocalDate}
              onChange={(e:any) => setCalendarDate(e.value)}
            />

          </div>
          
        </div>
        
        
      </div>

      <div className="dashboard__top">

        <div className="dashboard__top-user">

          <div className="dashboard__top-user-image">
            <img src={USER_ICON} alt="User Icon" />
          </div>

          <div className="dashboard__top-user-info">

            <p className="info-username">
              <span>{setUserGreeting(userLocalDate)},</span>
              <br />
              {currentUser.name}
            </p>

            <p className="info-currentdate">
              {userLocalDate.getDate()} {nameMonth.get(userLocalDate.getMonth())}, {nameDay.get(userLocalDate.getDay())}
            </p>
          </div>

        </div>

        {filteredTransactions?
          <div className="dashboard__top-charts">
            <GaugeChart
              currentDay={currentDate.getDate()}
              currentMonth={currentDate.getMonth()}
              currentYear={currentDate.getFullYear()}
              receivedDate={currentDate}
              filteredTransactions={filteredTransactions}
            />
            <DoughnutChart
              currentDay={currentDate.getDate()}
              currentMonth={currentDate.getMonth()}
              receivedDate={currentDate}
              filteredTransactions={filteredTransactions}
            />
          </div>
          :
          <>
            <p className="empty-transactions">Нет данных о расходах</p>
          </>
        }

      </div>

      {filteredTransactions && 

        <div className="dashboard__bottom">
          <CategoryExpenses
            currentDay={currentDate.getDate()}
            currentMonth={currentDate.getMonth()}
            receivedDate={currentDate}
            filteredTransactions={filteredTransactions}
          />

          <div className="dashboard__bottom-expenses">

            {filteredSubscriptions && 
              <UpcomingExpenses filteredSubscriptions={filteredSubscriptions}/>
            }

            <RecentTransactions/>
            
          </div>
        </div>
      }

    </div>
  )
}

export default Dashboard