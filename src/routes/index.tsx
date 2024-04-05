import React, { Profiler } from "react";
import { Routes, Route } from 'react-router-dom';

import NotFound from "../pages/NotFound";
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

import Dashboard from "../pages/dashboard";
import Profile from "../pages/Profile";
import Faqs from '../pages/Faqs'
import New from "../pages/new";

import Privite from "./Privite";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />

            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />

            <Route path="/dashboard"element={<Privite><Dashboard/></Privite>} />
            <Route path="/Faqs"element={<Privite><Faqs/></Privite>} />

            <Route path="/profile"element={<Privite><Profile/></Privite>} />
            <Route path="/new"element={<Privite><New/></Privite>} />
            <Route path="/new/:id"element={<Privite><New/></Privite>} />


        </Routes>
    )
}