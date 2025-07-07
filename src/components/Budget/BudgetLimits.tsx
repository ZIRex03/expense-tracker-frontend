import React from 'react'

import './BudgetLimits.scss';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';

type Props = {}


const BudgetLimits = (props: Props) => {

    const {categoryLimits}:any = useAppSelector(({limits}) => limits);
    const {transactionsList} = useAppSelector(({transactions}) => transactions);

  return (
    <div className='budget__limits'>
        
        <p className="budget__limits-title">Лимиты по категориям</p>

        <div className="budget__limits-box">

            {categoryLimits.length > 0 &&

                <>
                    {Object.entries(categoryLimits[0]).map(([name, limit]:any) => {

                        let alreadySpent = 0;

                        transactionsList.filter((item:any) => {
                            return item.category === name; 
                        }).map(({price}) => (
                            alreadySpent += price
                        ));

                        return(

                            <div key={name} className="budget__limits-box-item">
                    
                                <p className="item-title">
                                        {name}
                                </p>
                                
                                <p className="item-total">
                                    ₽ {limit}
                                </p>

                                <div className="item-progress">
                                    <meter
                                        value={alreadySpent}
                                        className='progressbar'
                                        min={0}
                                        max={limit}
                                        high={0.9 * limit}
                                        low={0.2 * limit}
                                        optimum={0.4 * limit}
                                    >
                                    </meter>

                                    <p className='progress-count'>
                                        ₽ {alreadySpent}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </>
        }
        </div>

        
    </div>
  )
}

export default BudgetLimits