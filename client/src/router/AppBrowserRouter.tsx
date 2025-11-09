import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import App from '../App';
import HomePage from '../pages/(user-dashboard)/HomePage';
import TransactionPage from '../pages/(user-dashboard)/TransactionPage';
import CreateTransactionPage from '../pages/(user-dashboard)/transaction/CreateTransactionPage.';
import WalletPage from '../pages/(user-dashboard)/WalletPage';
import GoalPage from '../pages/(user-dashboard)/GoalPage';
import CategoryPage from '../pages/(user-dashboard)/CategoryPage';
import SettingsPage from '../pages/(user-dashboard)/settings/SettingsPage';
import ProfileSettings from '../pages/(user-dashboard)/settings/ProfileSettings';
import UserWalletSettings from '../pages/(user-dashboard)/settings/UserWalletSettings';
import NotificationSettings from '../pages/(user-dashboard)/settings/NotificationSettings';
import SecuritySettings from '../pages/(user-dashboard)/settings/SecuritySettings';
import SigninPage from '../pages/(user-dashboard)/SigninPage';
import SignupPage from '../pages/(user-dashboard)/SignupPage';
import WelcomePage from '../pages/(user-dashboard)/welcome/WelcomePage';


function AppBrowserRouter() {
  return (
     <BrowserRouter>
      <Routes >
        {/* Parent layout route */}
        <Route path="/" element={<App/>}>
          {/* Nested route (index) */}
          <Route index element={<HomePage />} />
          <Route path="transactions" element={<Outlet />} >
          <Route index element={<TransactionPage />} />
          <Route path="create" element={<CreateTransactionPage />} />
          </Route>

          <Route path="wallet" element={<WalletPage />} />
          <Route path="goals" element={<GoalPage />} />
          <Route path="categories" element={<CategoryPage />} />

          {/* Settings */}
          <Route path="settings" element={<SettingsPage/>}>
            <Route index element={<ProfileSettings />} />
            <Route path="wallet" element={<UserWalletSettings /> }/>
            <Route path="notifications" element={<NotificationSettings />} />
            <Route path="security" element={<SecuritySettings />}/>
          </Route>

          {/* Auth */}
       
         </Route>

         {/* Auth routes */}
          <Route path="signin" element = {<SigninPage />} />
          <Route path="signup" element = {<SignupPage />} />
          <Route path="intro" element  = {<WelcomePage />} />
      </Routes>
    </BrowserRouter> 
  )
}

export default AppBrowserRouter