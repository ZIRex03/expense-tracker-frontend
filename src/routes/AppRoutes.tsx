import Dashboard from 'pages/Dashboard/Dashboard'
import React from 'react'
import { Route, Routes } from 'react-router'
import { ROUTES } from './routes'

import Transactions from '@pages/Transactions/Transactions'
import AsideLayout from '@components/AsideLayout/AsideLayout'
import Budget from '@pages/Budget/Budget'
import Analytics from '@pages/Analytics/Analytics'
import Home from '@pages/Home/Home'

type Props = {}

const AppRoutes = (props: Props) => {
  return (
    <Routes>
        <Route path={ROUTES.HOME} element={<Home/>}/>
        <Route path='/' element={<AsideLayout/>}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard/>}/>
          <Route path={ROUTES.TRANSACTIONS} element={<Transactions/>}/>
          <Route path={ROUTES.BUDGET} element={<Budget/>}/>
          <Route path={ROUTES.ANALYTICS} element={<Analytics/>}/>
        </Route>
        
    </Routes> 
  )
}

export default AppRoutes