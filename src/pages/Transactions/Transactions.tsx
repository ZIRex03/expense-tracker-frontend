import "./Transactions.scss";

import { IoIosAddCircleOutline } from "react-icons/io";
import TransactionsPopup from "./TransactionsPopup";
import { useAppSelector } from "hooks/reduxHooks";

import { FaEdit } from "react-icons/fa";
import TransactionsEdit from "@components/Transactions/TransactionsEdit";
import { useState } from "react";

type Props = {}

const Transactions = (props: Props) => {

    const {transactionsList} = useAppSelector(({transactions}) => transactions);
    const {currentUser} = useAppSelector(({users}) => users);

    const openTransactionsForm = () => {
        document.querySelector('#transactions-popup')?.classList.add('open');
    };

    const openEditForm = (id:number) => {
        setTransactionId(id);
        setEditOpen(true);
    }

    const closeForm = () => {
        setEditOpen(false);
    }

    const [transactionId, setTransactionId] = useState(0);
    const [editOpen, setEditOpen] = useState(false);

  return (

    <div className='transactions container'>

        <div className="transactions__header">
            <p className="transactions__header-title">Расходы</p>
            <p className="transactions__header-subtitle">Просматривайте и отслеживайте свои расходы</p>
        </div>

        {currentUser? 
            <button
                className='transactions-add'
                onClick={openTransactionsForm}
                >
                <IoIosAddCircleOutline className='icon-add'/>Добавить
            </button>
            :
            <>
            </>
        }

        

        {transactionsList.length > 0? 

            <table className="transactions__table">

                <thead className='transactions__table-header'>
                    <tr >
                        <th>Название</th>
                        <th>Потрачено</th>
                        <th>Категория</th>
                        <th>Дата</th>
                    </tr>
                </thead>

                <tbody>

                    {transactionsList.map(({id, name, price, category, date}:any) => {

                        const transactionDate = new Date(date);
                        const formattedDate = transactionDate.toLocaleDateString('ru-Ru')

                        return(
                            <tr key={id}>
                                <td>{name}</td>
                                <td>-{price} ₽</td>
                                <td>{category}</td>
                                <td>
                                    {formattedDate} 
                                    <FaEdit className="edit-icon" onClick={() => openEditForm(id)}/>
                                </td>
                            </tr>
                        )   
                    })}
                    
                </tbody>

            </table>

            :
            <>
                {currentUser? 
                    <p className="empty-data">Пока нет данных о ваших расходах</p>
                    :
                    <p className="empty-data">Войдите в аккаунт, чтобы увидеть данные о расходах</p>
                }
                
            </>
        }

        

        <TransactionsPopup/>
        {editOpen && <TransactionsEdit transactionid={transactionId} closeForm={closeForm}/>}
        

    </div>
  )
}

export default Transactions