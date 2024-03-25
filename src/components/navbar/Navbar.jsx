import style from './styles.module.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiLogout from '../../api/authApi/ApiLogout';
import ApiUser from '../../api/userApi/ApiUser';
import base_url from '../../urls';


const Navbar = () => {

    const [firstName, setFirstName] = useState("");

    useEffect(() => {
        const getUserData = async () => {
            try {
                const url = `${base_url}/api/user`;
                const response = await ApiUser.get(url);
                setFirstName(response.data.firstName);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }

        }

        getUserData();
    }, [])





    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {

        try {

            const url = `${base_url}/api/logout`;
            const response = await ApiLogout.get(url);
            logout();
            navigate("/");

            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "colored",
            });

            console.log(response.message);

        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500) {
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "colored",
                });
            }
        }

    };

    return (
        <>

            <div className={style.main}>
                <div className={style.body}>
                    <div className={style.appNameImage}>
                        <img src="/images/M.png" alt="Logo" />
                        <h1>MyNoteBook</h1>
                    </div>
                    <div className={style.appContent}>
                        <Link className={style.link} to="/dashboard">Dashboard</Link>
                        <Link className={style.link} to="#">PDF Merger</Link>
                        <Link className={style.link} to="#">File Converter</Link>
                    </div>
                    <div className={style.user}>
                        <svg className={style.userSVG} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
                        <span className={style.userName}><Link className={style.userLink} to="/profile/:activepage">{firstName}</Link></span>

                    </div>
                    <div className={style.logout}>
                        <button className={style.logoutButton} onClick={handleLogout}>

                            <svg className={style.logoutSVG} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></svg>

                            <span className={style.logoutButtonName}>Logout</span></button>
                    </div>
                </div>
            </div>


        </>
    )

}
export default Navbar;
