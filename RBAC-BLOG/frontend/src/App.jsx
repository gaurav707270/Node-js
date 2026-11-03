import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import  SignUp  from "./screens/SignUp"; 
import  SignIn  from "./screens/SignIn"; 
import { Route,Routes } from "react-router";
import AdminDashboard from './screens/AdminDashboard';
import UserDashboard from "./screens/UserDashboard";
import ViewerDashboard from "./screens/ViewerDashboard";


export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/'  element={<SignIn/>}/>
        <Route path='/signUp'  element={<SignUp/>}/>

        <Route path='/adminDashboard'  element={<AdminDashboard/>}/>

        <Route path='/userDashboard'  element={<UserDashboard/>}/>

        <Route path='/viewerDashboard'  element={<ViewerDashboard/>}/>


        
      </Routes>
    </div>
  )
}
