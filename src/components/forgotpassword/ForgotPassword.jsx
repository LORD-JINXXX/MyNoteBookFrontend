import style from './styles.module.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import base_url from '../../urls';

const ForgotPassword = () => {

    const [data, setData] = useState({
        email: "",
    });


    const onChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const url = `${base_url}/api/password-reset`;
            const { data: res } = await axios.post(url, data);
            setData({ ...data, "email": "" });
            toast.success(res.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "colored",
            });
            console.log(res.message);


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
    }


    return (
        <div className={style.main}>
            <div className={style.container}>
                <div className={style.title}>
                    <h1>Forgot Password</h1>
                </div>
                <form className={style.form} onSubmit={handleSubmit}>
                    <div className={style.formInput}>
                        <svg className={style.nameImage} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v80 32c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/></svg>
                        <input
                            className={style.input}
                            type="email"
                            id='email'
                            name='email'
                            value={data.email}
                            onChange={onChange}
                            required
                            placeholder='Email' />
                    </div>
                    <div className={style.btn}>
                        <button className={style.submit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
