import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';

function Profile() {
    return (
        <>
            <Link to={'/'}>Home</Link>
            <div>Profile</div>
            <LogoutButton></LogoutButton>
        </>
    )


}

export default Profile