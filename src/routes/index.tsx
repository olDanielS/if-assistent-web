import React from "react";
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Dashboard from "../pages/dashboard";
import NotFound from "../pages/NotFound";

import Privite from "./Privite";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />

            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />

            <Route path="/dashboard"element={<Privite><Dashboard/></Privite>} />


        </Routes>
    )
}