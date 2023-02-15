import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ResponsiveMain } from 'fm-mui'

import { mainMenu } from './menus'
import Routes from './routes'
import Header from './components/Header'
import SideNav from './components/SideNav'

const App = () => {
  return (
    <BrowserRouter>
      <Header mobileMenuItems={mainMenu} />
      <ResponsiveMain drawer={<SideNav items={mainMenu} />}>
        <Routes />
      </ResponsiveMain>
    </BrowserRouter>
  )
}

export default App
