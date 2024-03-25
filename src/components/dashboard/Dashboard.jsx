import Recent from './recent/Recent';
import Starred from './starred/Starred';
import Home from './home/Home';
import style from './styles.module.css';
import { useState } from "react";
import {Routes, Route} from "react-router-dom";
import FolderComponent from '../filefolder/folderComponent/FolderComponent';



const Dashboard = () => {

    const [selectedComponent, setSelectedComponent] = useState('home');

    const handleComponentClick = (componentName) => {
        setSelectedComponent(componentName);
    };




    return (
        <div className={style.main}>
            <div className={style.leftContainer}>
                <div className={style.title}>
                    <span className={style.svg}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V352H64V64H512z" /></svg>
                    </span>
                    <span className={style.name}>
                        <h1>Dashboard</h1>
                    </span>
                </div>
                <div className={style.content}>
                    <div className={style.ul}>
                        <li className={style.li} onClick={() => handleComponentClick("home")}>

                            <svg className={style.svg} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z" /></svg>

                            <h1 className={style.name}>Home</h1>
                        </li>

                        <li className={style.li} onClick={() => handleComponentClick("recent")}>

                            <svg className={style.svg} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg>

                            <h1 className={style.name}>Recent</h1>
                        </li>
                        <li className={style.li} onClick={() => handleComponentClick("starred")}>

                            <svg className={style.svg} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></svg>

                            <h1 className={style.name}>Starred</h1>
                        </li>
                    </div>
                </div>
            </div>
            <div className={style.rightContainer}>
                <div className={style.top}>
                    <div className={style.componentName}>
                        {selectedComponent === 'home' && (<h3>Home</h3>)}
                        {selectedComponent === 'recent' && (<h3>Recent</h3>)}
                        {selectedComponent === 'starred' && (<h3>Starred</h3>)}
                    </div>
                    <div className={style.searchBar}>
                        <span className={style.svg}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                        </span>
                        <span className={style.input}>
                            <input
                                type="search"
                                placeholder='Search folders or notes' />
                        </span>
                    </div>
                </div>
                <div className={style.bottom}>
                    {selectedComponent === 'home' && 
                    <Routes>
                        <Route path='' element={<Home/>}/> 
                        <Route path='folder/:folderId' element={<FolderComponent/>}/>
                    </Routes>
                    }
                    {selectedComponent === 'recent' && <Recent />}
                    {selectedComponent === 'starred' && <Starred />}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
