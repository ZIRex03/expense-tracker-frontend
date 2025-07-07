import UserForm from '@pages/UserForm/UserForm'
import { getLimits } from 'features/limits/limitsSlice'
import { getTransactions } from 'features/transactions/transactionsSlice'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import React from 'react'
import AppRoutes from 'routes/AppRoutes'

type Props = {}

const App = (props: Props) => {

  const {currentUser}:any = useAppSelector(({users}) => users)
  const dispatch = useAppDispatch();

  if(currentUser){
    dispatch(getTransactions({id: currentUser.id}));
    dispatch(getLimits({id: currentUser.id}));
  }

  return (
    <div>
      <UserForm/>
      <AppRoutes/>
    </div>
  )
}

export default App