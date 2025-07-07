import React from 'react'

import './Budget.scss';
import BudgetLimits from '@components/Budget/BudgetLimits';
import { useAppSelector } from 'hooks/reduxHooks';

import { VscSettings } from "react-icons/vsc";
import BudgetLimitsPopup from '@components/Budget/BudgetLimitsPopup';

type Props = {}

const Budget = (props: Props) => {

    const {categoryLimits} = useAppSelector(({limits}) => limits);
    const {transactionsList} = useAppSelector(({transactions}) => transactions);

    let totalBudget = 0;
    let totalTransactionsPrice = 0;
    let overSpending = 0;
    var totalRemains = 0;

    const limitsEditOpen = () => {
        document.querySelector('#limits-edit')?.classList.add('open');
    }

    if(categoryLimits.length > 0){

        Object.entries(categoryLimits[0]).map(([name, value]:any) => (
            
            totalBudget+=value
        ));

        transactionsList.map(({price}) => (
            totalTransactionsPrice += price
        ));

        if(totalTransactionsPrice > totalBudget){
            overSpending = totalTransactionsPrice-totalBudget;
            totalRemains = 0;
        }
        else{
            totalRemains = totalBudget - totalTransactionsPrice;
        }
        
    }

  return (
    <div className='budget container'>
        <div className="budget__header">
            <p className="budget__header-title">Бюджет</p>
            <p className="budget__header-subtitle">Создавайте бюджеты и отслеживайте их</p>
        </div>

        <button
            className='budget-edit'
            onClick={limitsEditOpen}
        >
            <VscSettings className='icon-settings'/>
            Настроить
        </button>

        <div className="budget__count">

            <div className="budget__count-item">
                <p className='item-title'>Общий бюджет</p>
                <p className="item-count">₽ {totalBudget}</p>
            </div>

            <div className="budget__count-item">
                <p className='item-title'>Потрачено</p>
                <p className="item-count">₽ {totalTransactionsPrice}</p>
            </div>

            <div className="budget__count-item">
                <p className='item-title'>Осталось</p>
                <p className="item-count">₽ {totalRemains}</p>
            </div>

            <div className="budget__count-item">
                <p className='item-title'>Перерасход</p>
                <p className="item-count red">₽ {overSpending}</p>
            </div>
        </div>

        

        <BudgetLimits/>
        {categoryLimits.length > 0 && <BudgetLimitsPopup/>}
        
    </div>
  )
}

export default Budget