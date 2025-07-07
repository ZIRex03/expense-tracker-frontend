import { changeFormType } from 'features/user/userSlice'
import { useAppDispatch } from 'hooks/reduxHooks'
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'

type Props = {
    closeForm: any
}

const UserSignup = ({closeForm}: Props) => {

    const dispatch = useAppDispatch();

    const [values, setValues] = useState({
        name: '',
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
                type="text"
                name="name"
                value={values.name}
                placeholder='Имя пользователя'
                onChange={handleChange}
            />

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

            <button type="submit">Зарегистрироваться</button>
        </form>

        <div className="userform__footer">
            <p>Уже есть аккаунт? 
                <span
                    onClick={() => changeCurrentForm('login')}
                >
                    Войти
                </span>
            </p>
        </div>
    </div>
  )
}

export default UserSignup