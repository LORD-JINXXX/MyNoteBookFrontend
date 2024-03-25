import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const DisplayNavbar = ({ children }) => {

    const location = useLocation();


    const [displayNavBar, setdisplayNavBar] = useState(false);

    useEffect(() => {
        if (location.pathname === '/') {
            setdisplayNavBar(false);
        }
        else if (location.pathname === '/login') {
            setdisplayNavBar(false);
        }
        else if (location.pathname === '/signup') {
            setdisplayNavBar(false);
        }
        else if (location.pathname === '/resend') {
            setdisplayNavBar(false);
        }
        else if (location.pathname === '/forgot-password') {
            setdisplayNavBar(false);
        }
        else {
            setdisplayNavBar(true);
        }
    }, [location])
    return (
        <>
            <div>{displayNavBar && children}</div>
        </>
    )
}

export default DisplayNavbar;
