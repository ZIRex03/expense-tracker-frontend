import React from 'react'

import './RecentTransactions.scss';
import { useAppSelector } from 'hooks/reduxHooks';
import { nameMonth } from 'utils/constants';

type Props = {}

const RecentTransactions = (props: Props) => {

    const {transactionsList} = useAppSelector(({transactions}) => transactions);

    const recentTransactions = transactionsList
    .filter((transaction) => transaction.category !== 'Подписка')
    .sort((a,b) => 
        {
            const dateA = new Date(a.date).getTime();   
            const dateB = new Date(b.date).getTime();
            return dateB - dateA;   
        }
    )
    .filter((_, i:number) => i < 3);

  return (
    <div className='dashboard__bottom-expenses-transactions'>

        <p className="dashboard__bottom-expenses-transactions-title">
            Последние транзакции
        </p>

        <div className="container__transactions">
            {recentTransactions.map(({date, name, category, price}) => {

                const transactionDate = new Date(date);

                return(
                    <div className="container__transactions-item">
                        <p className="item-date">
                            {transactionDate.getDate()} {nameMonth.get(transactionDate.getMonth())}
                        </p>
                        <div className="item-transaction">
                            <p className="item-transaction-name">
                                {name}
                            </p>
                            <p className="item-transaction-category">
                                {category}
                            </p>
                        </div>
                        <p className="item-price">
                            ₽ {price}
                        </p>
                    </div>
                )

                
            })}
        </div>

    </div>
  )
}

export default RecentTransactions