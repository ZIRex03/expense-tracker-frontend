import { changeFormType } from 'features/user/userSlice';
import { useAppDispatch } from 'hooks/reduxHooks';
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';

type Props = {
    closeForm: any
}

const UserLogin = ({closeForm}: Props) => {
    const dispatch = useAppDispatch();

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = ({target: {value, name}}:any) => {
        setValues({...values, [name]: value})
    };

    const changeCurrentForm = (type: string) => {
        dispatch(changeFormType(type));
    }

  return (
    <div className='userform'>

        <IoMdClose className='icon-close' title='Закрыть' onClick={closeForm}/>

        <div className="userform__header">
            <p className="userform__header-title">Добро пожаловать!</p>
            <p className="userform__header-subtitle">Прежде чем мы начнем, нам нужны некоторые детали.</p>
        </div>

        <form className="userform__form">

            <input
                type="email"
                name="email"
                value={values.email}
                placeholder='example@gmail.com'
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                value={values.password}
                placeholder='********'
                onChange={handleChange}
            />

            <button type="submit">Войти</button>
        </form>

        <div className="userform__footer">
            <p>Еще нет аккаунта? 
                <span
                    onClick={() => changeCurrentForm('signup')}
                >
                    Зарегистрироваться
                </span>
            </p>
        </div>
    </div>
  )
}

export default UserLogin