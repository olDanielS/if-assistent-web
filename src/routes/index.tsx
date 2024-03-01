import React from "react";
import {Routes, Route} from 'react-router-dom';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="/dashboard" />

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}