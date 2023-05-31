import { useState, useEffect } from 'react'
import { PhotoData } from './Post'
import { useParams } from 'react-router-dom';

function ShowPost() {
    const { id } = useParams();

    const [post, setPost] = useState({} as PhotoData)
    const [userProfile, setUserProfile] = useState({} as PhotoData);

    useEffect(() => {
        getPost();
    }, []);

    useEffect(() => {
        loadUserProfile();
    }, [post]);

    async function getPost() {
        const response = await fetch("https://dev.juliandworzycki.pl/api/photos/" + id, {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();

            console.log("getPost", data);


            setPost(data);
        }
    }

    async function loadUserProfile() {
        const response = await fetch("https://dev.juliandworzycki.pl/api/photos", {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();

            setUserProfile(data.filter((element: PhotoData) => element.user === post.user && element.profile === true)[0]);
        }
    }

    return (
        <>
            {userProfile &&
                <div className='postProfile'>
                    <img alt="Photo" src={"/api/photos/show/" + userProfile.id}></img>
                    <div>{post.user}</div>
                </div>
            }
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