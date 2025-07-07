import Aside from '@components/Aside/Aside'
import HeaderBord from '@components/Header/HeaderBord'
import React from 'react'
import { Outlet } from 'react-router'

type Props = {}

const AsideLayout = (props: Props) => {
  return (
    <div id='aside-layout'>
        <Aside/>
        <HeaderBord/>
        <Outlet/>
    </div>
  )
}

export default AsideLayout