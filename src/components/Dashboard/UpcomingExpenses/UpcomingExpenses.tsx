import React from 'react'

import './UpcomingExpenses.scss';
import { Transactions } from '@pages/Dashboard/DashboardTypes';
import { nameMonth } from 'utils/constants';

type Props = {
    filteredSubscriptions: Transactions[]
}

const UpcomingExpenses = ({filteredSubscriptions}: Props) => {

    const currentSubscriptions:Transactions[] = filteredSubscriptions.filter((_, i:number) => i < 4);

  return (
    <div className='dashboard__bottom-expenses-subscriptions'>
        <p className="dashboard__bottom-expenses-subscriptions-title">
            Предстоящие подписки
        </p>

        <div className="dashboard__bottom-expenses-subscriptions-container">
            {currentSubscriptions.length > 0?  
            
                <>
                    {currentSubscriptions.map(({date, price, name}) => {

                        const subscriptionDate = new Date(date);

                        return(
                            <div className="container__subscription">
                                <p className="container__subscription-date">
                                    {subscriptionDate.getDate()} {nameMonth.get(subscriptionDate.getMonth())}
                                </p>
                                <p className="container__subscription-name">
                                    {name}
                                </p>
                                <p className="container__subscription-price">
                                    ₽ {price}
                                </p>
                            </div>
                        )
                    })}
                </>

            :
                <><p>Предстоящие подписки отсутствуют</p></>
        }
        </div>

    </div>
  )
}

export default UpcomingExpenses