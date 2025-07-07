
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import './CategoryExpenses.scss'
import CategoryIconsSelector from '@images/icons/CategoryExpensesIcons/CategoryIconsSelector'
import { Transactions } from '@pages/Dashboard/DashboardTypes'
import { nameMonth } from 'utils/constants'
import { categoryNotifications } from 'features/user/userSlice'
import { useEffect } from 'react'

type Props = {
    currentDay: number,
    currentMonth: number,
    receivedDate: Date,
    filteredTransactions: Transactions[]
}

const CategoryExpenses = ({currentDay, currentMonth, filteredTransactions, receivedDate}: Props) => {
    const {categoryLimits} = useAppSelector(({limits}) => limits);
    const currentDate = new Date();

    if(currentDate.getMonth() !== receivedDate.getMonth()){
        currentDay = new Date(receivedDate.getFullYear(), receivedDate.getMonth() + 1,0).getDate()
    }

  return (
    <div className='dashboard__bottom-category'>
        <p className="dashboard__bottom-category-title">
            Расходы по категориям
        </p>

        <div className="dashboard__bottom-category-date">
            C 01 - {currentDay} {nameMonth.get(currentMonth)}
        </div>

        {categoryLimits.length > 0 &&

            <div className="dashboard__bottom-category-container">
                {Object.entries(categoryLimits[0]).map(([name, limit]) => {

                    let alreadySpent = 0;

                    filteredTransactions.filter((item:any) => {
                        return item.category === name; 
                    }).map(({price}) => (
                        alreadySpent += price
                    ))

                    return(
                        <div className="container__item">
                            <div className="container__item-icon">
                                {CategoryIconsSelector(name)} 
                            </div>
                            <p className="container__item-title">{name}</p>

                            <div className="container__item-expense">
                                <p className="expense-count">
                                    ₽ {alreadySpent}<span> из ₽ {limit}</span>
                                </p>
                                <meter
                                    className='expense-progress'
                                    value={alreadySpent}
                                    min={0}
                                    max={limit}
                                    high={0.9 * limit}
                                    low={0.2 * limit}
                                    optimum={0.4 * limit}
                                >

                                </meter>
                            </div>
                        </div>
                    )
                    
                })}
            </div>
        }
    </div>
  )
}

export default CategoryExpenses