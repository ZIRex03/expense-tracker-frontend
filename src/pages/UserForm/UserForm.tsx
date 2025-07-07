import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import UserSignup from './UserSignup';
import UserLogin from './UserLogin';

import './UserForm.scss';
import { toggleForm } from 'features/user/userSlice';

type Props = {}

const UserForm = (props: Props) => {


    const dispatch = useAppDispatch();
    const {formType, showForm} = useAppSelector(({users}) => users);

    const closeForm = () => {
        dispatch(toggleForm(false));
    }

    return(
        showForm?
            <>
                <div className="overlay-userform">
                    {formType === 'signup'? 
                        <UserSignup closeForm = {closeForm}/>
                        :
                        <UserLogin closeForm={closeForm}/>
                    }
                </div>
            </>
        :
            <>
            </>    
    )
}

export default UserForm