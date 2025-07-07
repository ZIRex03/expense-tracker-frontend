import React, { useState } from 'react'

import './BudgetLimitsPopup.scss'
import { IoMdClose } from 'react-icons/io'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import { editLimits } from 'features/limits/limitsSlice'

type Props = {}

const BudgetLimitsPopup = (props: Props) => {

    const dispatch = useAppDispatch();

    const {categoryLimits}:any = useAppSelector(({limits}) => limits);
    const {currentUser}:any = useAppSelector(({users}) => users)

    const [values, setValues] = useState(categoryLimits[0]);

    const handleChange = ({target: {value, name}}:any) => {
        setValues({...values, [name]: Number(value)});
    };

    const closeForm = () => {
        document.querySelector('#limits-edit')?.classList.remove('open');
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();

        dispatch(editLimits({
            id: currentUser.id,
            ...values
        }));

        closeForm();

    }

  return (
    <div id='limits-edit' className='popup-overlay' onSubmit={handleSubmit}>
        
        <div className="limits__popup">

            <IoMdClose
                className='icon-close'
                title='Close'
                onClick={closeForm}
            />
            
            <p className="limits__popup-header">Изменить лимиты</p>

            <form className="limits__popup-form" >

                {Object.entries(categoryLimits[0]).map(([name]:any) => (

                    <div key={name} className="limits__popup-form-category">

                        <p>
                            {name}
                        </p>

                        <input
                            type="number"
                            name={name}
                            placeholder='0'
                            value={values[name]}
                            onChange={handleChange}
                        />

                    </div>
                        
                ))}
                
                <button type="submit">
                    Изменить
                </button>

            </form>
        </div>
    </div>
  )
}

export default BudgetLimitsPopup