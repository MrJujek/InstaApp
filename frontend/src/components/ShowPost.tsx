import { useState, useEffect } from 'react'
import { PhotoData } from './Photo'
import { useParams } from 'react-router-dom';

function ShowPost() {
    const { id } = useParams();

    const [user, setUser] = useState({} as {
        id: string;
        name: string;
        lastName: string;
        email: string;
    })
    const [post, setPost] = useState({} as PhotoData)

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        getPost();
    }, [user]);

    async function loadUser() {
        const response = await fetch("https://dev.juliandworzycki.pl/api/user/" + id, {
            method: "GET"
        });
        if (response.ok) {
            const [data] = await response.json();

            setUser(data);
        }
    }

    async function getPost() {
        const response = await fetch("https://dev.juliandworzycki.pl/api/photos/" + id, {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();

            setPost(data);
        }
    }

    return (
        <>
            <div className='postProfile'>
                <img alt="Photo" src={"/api/photos/show/" + post.id}></img>{user.email}
            </div>
            <br />
            <div className="photo">
                <img alt="Photo" src={"/api/photos/show/" + post.id}></img>
                {post.id}
                {post.name}
                {post.type}
                {post.path}
                {post.user}
                {post.profile}
                {post.history && post.history.map((element, index) => {
                    return (
                        <div key={index}>
                            <div>{(element.date).toString()}</div>
                            <div>{element.status}</div>
                        </div>
                    )
                })}
                {post.tags && post.tags.map((element, index) => {
                    return (
                        <div key={index}>
                            <div>{element.id}</div>
                            <div>{element.name}</div>
                            <div>{element.popularity}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ShowPost