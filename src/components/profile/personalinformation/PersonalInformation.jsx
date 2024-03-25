import style from './styles.module.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiUser from '../../../api/userApi/ApiUser';
import ApiChangeInfo from '../../../api/userApi/ApiChangeInfo';
import base_url from '../../../urls';

const PersonalInformation = () => {

    const [userInfo, setUserInfo] = useState("");

    useEffect(() => {
        const getUserData = async () => {
            try {
                const url = `${base_url}/api/user`;
                const response = await ApiUser.get(url);
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }

        }

        getUserData();
    }, [])

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });


    const onChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${base_url}/api/updateinfo`;
            const {data:response} = await ApiChangeInfo.post(url,data);
            toast.success(response.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "colored",
            });
            console.log(response.message);
            setData({ ...data, "email": "", "firstName": "", "lastName": "", "password": "" });


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
                <div className={style.containerLeft}>
                    <div className={style.containerLeftTitle}>
                        <span>Existing Information</span>
                    </div>
                    <div className={style.existingInfo}>
                        <span className={style.existingInfoTitle}>First Name</span>
                        <span className={style.existingInfoValue}>{userInfo.firstName}</span>
                    </div>
                    <div className={style.existingInfo}>
                        <span className={style.existingInfoTitle}>Last Name</span>
                        <span className={style.existingInfoValue}>{userInfo.lastName}</span>
                    </div>
                    <div className={style.existingInfo}>
                        <span className={style.existingInfoTitle}>Email</span>
                        <span className={style.existingInfoValue}>{userInfo.email}</span>
                    </div>
                </div>
                <div className={style.containerRight}>
                    <div className={style.containerRightTitle}>
                        <span>Change Information</span>
                    </div>
                    <form className={style.form} onSubmit={handleSubmit}>
                        <div className={style.formInput}>
                            <svg className={style.nameImage} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V428.7c-2.7 1.1-5.4 2-8.2 2.7l-60.1 15c-3 .7-6 1.2-9 1.4c-.9 .1-1.8 .2-2.7 .2H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 381l-9.8 32.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.8 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8h8.9c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7L384 203.6V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM549.8 139.7c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM311.9 321c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L512.1 262.7l-71-71L311.9 321z" /></svg>
                            <input
                                className={style.input}
                                type="text"
                                id='firstName'
                                name='firstName'
                                value={data.firstName}
                                onChange={onChange}
                                required
                                placeholder='Enter your first name' />
                        </div>
                        <div className={style.formInput}>
                            <svg className={style.nameImage} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V428.7c-2.7 1.1-5.4 2-8.2 2.7l-60.1 15c-3 .7-6 1.2-9 1.4c-.9 .1-1.8 .2-2.7 .2H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 381l-9.8 32.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.8 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8h8.9c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7L384 203.6V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM549.8 139.7c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM311.9 321c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L512.1 262.7l-71-71L311.9 321z" /></svg>
                            <input
                                className={style.input}
                                type="text"
                                id='lastName'
                                name='lastName'
                                value={data.lastName}
                                onChange={onChange}
                                required
                                placeholder='Enter your last name' />
                        </div>
                        <div className={style.formInput}>
                            <svg className={style.nameImage} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v80 32c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" /></svg>
                            <input
                                className={style.input}
                                type="email"
                                id='email'
                                name='email'
                                value={data.email}
                                onChange={onChange}
                                required
                                placeholder='Enter your email' />
                        </div>
                        <div className={style.btn}>
                            <button className={style.submit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default PersonalInformation;
