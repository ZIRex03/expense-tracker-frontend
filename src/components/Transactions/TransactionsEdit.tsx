import React, { useState } from 'react'

import './TransactionsEdit.scss';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { Calendar } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers';
import { IoMdClose } from 'react-icons/io';
import { deleteTransaction, editTransaction } from 'features/transactions/transactionsSlice';

interface Props {
    transactionid: number,
    closeForm: any
}

const TransactionsEdit = ({transactionid, closeForm}: Props) => {

    const {currentUser}:any = useAppSelector(({users}) => users);

    const currentDate = new Date();
    const dispatch = useAppDispatch();

    const {transactionsList, categoryList} = useAppSelector(({transactions}) => transactions);
    const currentTransaction = transactionsList.filter((transaction) => (
        transaction.id === transactionid
    ));

    const [values, setValues] = useState({
        id: transactionid,
        userid: currentUser.id,
        name: currentTransaction[0].name,
        price: currentTransaction[0].price,
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

    const submitEdit = (event:any) => {

        event.preventDefault();

        if(values.category === 'Подписка'){
            const updatedValues = {...values, date: calendardate || new Date()};
            dispatch(editTransaction(updatedValues));
        }
        else{
            const updatedValues = {...values, date: new Date()};
            dispatch(editTransaction(updatedValues));
        }

        closeForm();
    }

    const submitDelete = (event:any) => {

        event.preventDefault();
        dispatch(deleteTransaction({
            id:transactionid,
            userid: currentUser.id
        }));
        closeForm();
    }

  return (
    <div className='edit-overlay'>
        <div className="transactionsedit">

            <IoMdClose
                className='icon-close'
                title='Close'
                onClick={closeForm}
            />
            
            <p className="transactionsedit-title">
                Редактирование
            </p>

            <form className='transactionsedit__form'>

                <input
                    type="text"
                    name="name"
                    required
                    value={values.name}
                    placeholder='Название'
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    required
                    value={values.price}
                    placeholder='Цена'
                    onChange={handleChange}
                />

                <div className="transactionsedit__form-selector">
                    <p>Категория:</p>
                    <select required name='category' onChange={selectChange}>
                        {categoryList.map(({value}:any) => (
                            <option value={value}>{value}</option>
                        ))}
                    </select>
                </div>

                {values.category === 'Подписка' &&
                    
                    <div className="transactionsedit__form-subscribtion">
                        <p>Укажите дату списания по подписке: </p>
                        <Calendar
                            minDate={currentDate}
                            className='calendar'
                            showIcon
                            dateFormat='dd/mm/yy'
                            onChange={(e:any) => setCalendarDate(e.value)}
                            required
                        />
                    </div>
                    
                }

                <div className="form-buttons">

                    <button
                        className='button-edit'
                        type="submit"
                        onClick={submitEdit}
                    >
                        Редактировать
                    </button>

                    <button
                        className='button-delete'
                        type="submit"
                        onClick={submitDelete}
                    >
                        Удалить запись
                    </button>

                </div>
                

            </form>
        </div>
    </div>
  )
}

export default TransactionsEdit