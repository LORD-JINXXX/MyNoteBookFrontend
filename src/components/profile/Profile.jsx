import style from './styles.module.css';
import { useParams } from 'react-router-dom';
import LeftBar from './leftbar/LeftBar';
import ProfilePicture from './profilepicture/ProfilePicture';
import PersonalInformation from './personalinformation/PersonalInformation';
import ChangePassword from './changepassword/ChangePassword';

const Profile = () => {

    const { activepage } = useParams();

    return (
        <div className={style.main}>
            <div className={style.left}>
                <LeftBar />
            </div>
            <div className={style.right}>
                {
                    activepage === ":activepage" && <ProfilePicture />
                }
                {
                    activepage === "profilepicture" && <ProfilePicture />
                }

                {
                    activepage === "personalinformation" && <PersonalInformation />
                }

                {
                    activepage === "changepassword" && <ChangePassword />
                }

            </div>
        </div>
    )
}

export default Profile;
