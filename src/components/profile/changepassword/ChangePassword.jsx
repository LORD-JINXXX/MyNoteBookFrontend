import style from './styles.module.css';
import { useState } from 'react';
import ApiChangePassword from '../../../api/userApi/ApiChangePassword';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import base_url from '../../../urls';

const ChangePassword = () => {

    const [data, setData] = useState({
        password: "",
        confirmPassword: "",
    });


    const onChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const url = `${base_url}/api/changepassword`;
            const { data: response } = await ApiChangePassword.post(url, data);
            setData({ ...data, "password": "",confirmPassword: ""});
            toast.success(response.message, {
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
    }

    return (
        <div className={style.main}>
            <div className={style.container}>
                <div className={style.container}>
                    <div className={style.containerForm}>
                        <div className={style.title}>
                            <h1>Change your password</h1>
                        </div>
                        <form className={style.form} onSubmit={handleSubmit}>
                            <div className={style.formInput}>
                                <svg className={style.nameImage} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" /></svg>
                                <input
                                    className={style.input}
                                    type="password"
                                    id='password'
                                    name='password'
                                    value={data.password}
                                    onChange={onChange}
                                    required
                                    placeholder='Password' />

                            </div>
                            <div className={style.formInput}>
                                <svg className={style.nameImage} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" /></svg>
                                <input
                                    className={style.input}
                                    type="password"
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    value={data.confirmPassword}
                                    onChange={onChange}
                                    required
                                    placeholder='Confirm Password' />

                            </div>
                            <div className={style.btn}>
                                <button className={style.submit}>Submit</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ChangePassword;
