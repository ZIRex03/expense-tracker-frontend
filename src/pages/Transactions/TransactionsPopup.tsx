
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import { insertTransaction } from 'features/transactions/transactionsSlice';
import { Calendar } from 'primereact/calendar'

import './TransactionsPopup.scss';
import { Nullable } from 'primereact/ts-helpers';

type Props = {}
type ValuesType = {
    id: null,
    userid: number | null,
    name: string,
    price: number,
    category: string,
    date: Date | null
}

const TransactionsPopup = (props: Props) => {

    const dispatch = useAppDispatch();

    const currentDate = new Date();

    const {currentUser}:any = useAppSelector(({users}) => users)

    const {categoryList} = useAppSelector(({transactions}) => transactions);

    const [values, setValues] = useState<ValuesType>({
        id: null,
        userid: currentUser.id,
        name: '',
        price: 0,
        category: 'Счета',
        date: null
    });

    const [calendardate, setCalendarDate] = useState<Nullable<Date>>(null);

    const handleChange = ({target: {value, name}}:any) => {
        setValues({...values, [name]: value})
    };

    const selectChange = (event: any) => {
        setValues({...values, category: event.target.value})
    };

    const handleSubmit = (event: any) => {

        event.preventDefault();

        if(values.category === 'Подписка'){
            const updatedValues = {...values, date: calendardate || new Date()};
            dispatch(insertTransaction(updatedValues));
        }
        else{
            const updatedValues = {...values, date: new Date()};
            dispatch(insertTransaction(updatedValues));
        }

        closeForm();
        
    };

    const closeForm = () => {
        document.querySelector('#transactions-popup')?.classList.remove('open');
    }


  return (
    <div id='transactions-popup' className='popup-overlay'>
        <div className="transactions__popup">

            <IoMdClose
                className='icon-close'
                title='Close'
                onClick={closeForm}
            />
            
            <p className="transactions__popup-header">Добавить операцию</p>

            <form className="transactions__popup-form" onSubmit={handleSubmit}>
                
                <input
                    type="text"
                    name="name"
                    value={values.name}
                    placeholder='Название'
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    value={values.price}
                    placeholder='Цена'
                    onChange={handleChange}
                />

                <div className="transactions__popup-form-selector">
                    <p>Категория:</p>
                    <select name='category' onChange={selectChange}>
                        {categoryList.map(({value}:any) => (
                            <option value={value}>{value}</option>
                        ))}
                    </select>
                </div>

                {values.category === 'Подписка' &&
                    
                    <div className="transactions__popup-form-subscribtion">
                        <p>Укажите дату списания по подписке: </p>
                        <Calendar
                            minDate={currentDate}
                            className='calendar'
                            showIcon
                            dateFormat='dd/mm/yy'
                            onChange={(e:any) => setCalendarDate(e.value)}
                        />
                    </div>
                    
                }

                

                <button type="submit">
                    Добавить
                </button>


            </form>
        </div>
    </div>
  )
}

export default TransactionsPopup