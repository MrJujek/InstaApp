import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <aside className='navbar'>
            <div className='logo'>
                InstaApp
            </div>

            <div className='links'>
                <Link to='/'>Home</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/createPost'>Create post</Link>
            </div>
        </aside>
    )
}

export default Navbar