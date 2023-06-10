import { Link } from 'react-router-dom'
import SwitchTheme from './SwitchTheme'
import { Typography } from 'antd';
import { CompassOutlined, HomeOutlined, UserOutlined, CameraOutlined } from '@ant-design/icons';

function Navbar() {
    const { Text } = Typography;

    return (
        <aside className='navbar'>
            <div className='logo'>
                <h2>InstaApp</h2>
            </div>

            <div className='links'>
                <Link to='/'><Text><HomeOutlined />Home</Text></Link>
                <Link to='/explore'><Text><CompassOutlined />Explore</Text></Link>
                <Link to='/profile'><Text><UserOutlined />Profile</Text></Link>
                <Link to='/createPost'><Text><CameraOutlined />Create post</Text></Link>
            </div>

            <div className='themeSwitch'>
                <SwitchTheme />
            </div>
        </aside>
    )
}

export default Navbar