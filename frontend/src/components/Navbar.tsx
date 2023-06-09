import { Link } from 'react-router-dom'
import SwitchTheme from './SwitchTheme'
import { Typography } from 'antd';

function Navbar() {
    const { Text } = Typography;

    return (
        <aside className='navbar'>
            <div className='logo'>
                <h2>InstaApp</h2>
            </div>

            <div className='links'>
                <Link to='/'><Text>Home</Text></Link>
                <Link to='/profile'><Text>Profile</Text></Link>
                <Link to='/createPost'><Text>Create post</Text></Link>
            </div>

            <div className='themeSwitch'>
                <SwitchTheme />
            </div>
        </aside>
    )
}

export default Navbar