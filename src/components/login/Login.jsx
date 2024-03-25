import style from './styles.module.css'
import { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import base_url from '../../urls';



const Login = () => {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        email: "",
        password: "",
    });


    const onChange = ({ currentTarget: input }) => {
        setInfo({ ...info, [input.name]: input.value });
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {

            const url = `${base_url}/api/login`;
            const response = await axios.post(url, info, { withCredentials: true });
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "colored",
            });

            const receivedToken = response.data.token;
            const userId = response.data.userId;

            // Storing the token in localStorage
            login(receivedToken,userId);
            navigate('/dashboard');
            console.log(response.message);

        }catch (error) {
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

    }

    const handleOnClick = () => {
        navigate('/resend');
    }

    return (
        <div className={style.main}>
            <div className={style.containerLeft}>
                <div className={style.signup}>
                    <p>New Here?</p>
                    <Link to="/signup"><button className={style.btnSignup}>SignUp</button></Link>
                    <button className={style.resend} onClick={() => handleOnClick()}>Resend Verification Mail</button>
                </div>
            </div>
            <div className={style.containerRight}>
                <div className={style.header}>
                    <h1>Login</h1>
                </div>
                <form className={style.form} onSubmit={handleSubmit}>
                    <div className={style.formInput}>
                        <svg className={style.nameImage} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v80 32c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" /></svg>
                        <input
                            className={style.input}
                            type="email"
                            id='email'
                            name='email'
                            value={info.email}
                            onChange={onChange}
                            required
                            placeholder='Email' />
                    </div>
                    <div className={style.formInput}>
                        <svg className={style.nameImage} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 64c-44.2 0-80 35.8-80 80v48H384c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80V144C80 64.5 144.5 0 224 0c57.5 0 107 33.7 130.1 82.3c7.6 16 .8 35.1-15.2 42.6s-35.1 .8-42.6-15.2C283.4 82.6 255.9 64 224 64zm32 320c17.7 0 32-14.3 32-32s-14.3-32-32-32H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h64z" /></svg>
                        <input
                            className={style.input}
                            type="password"
                            id='password'
                            name='password'
                            value={info.password}
                            onChange={onChange}
                            required
                            placeholder='Password' />
                    </div>

                    <div className={style.forgot}>
                        <Link to="/forgot-password" style={{ textDecoration: 'none' }}><p>Forgot password?</p></Link>
                    </div>
                    <div className={style.btn}>
                        <button className={style.submit}>Submit</button>
                    </div>
                </form>
            </div>
            <div className={style.appName}>
                <span>MyNoteBook</span>
                <p>Save all your notes on cloud</p>
            </div>
        </div>
    )
}

export default Login;

