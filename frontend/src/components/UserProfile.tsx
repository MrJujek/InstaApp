import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Post, { PhotoData } from './Post';

function UserProfile() {
    const { id } = useParams();

    const [userEmail, setUserEmail] = useState("")
    const [userProfilePhoto, setUserProfilePhoto] = useState([] as PhotoData[])
    const [userPhotos, setUserPhotos] = useState([] as PhotoData[])

    useEffect(() => {
        getEmail();
    }, []);

    useEffect(() => {
        loadUserPhotos();
    }, [userEmail]);

    async function getEmail() {
        const response = await fetch("https://dev.juliandworzycki.pl/api/user/" + id, {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();

            setUserEmail(data[0].email);
        }
    }

    async function loadUserPhotos() {
        const response = await fetch("https://dev.juliandworzycki.pl/api/photos", {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();

            setUserPhotos(data.filter((element: PhotoData) => !element.profile && element.user == userEmail));
            setUserProfilePhoto(data.filter((element: PhotoData) => element.profile && element.user == userEmail));
        }
    }

    return (
        <>
            <h1>User profile - {userEmail}</h1>
            <Link to={'/'}>Home</Link>

            User profile photo:
            <div className="photos">
                {userProfilePhoto.map((element, index) => {
                    return (
                        <Post key={index} data={element} />
                    )
                })}
            </div>

            User photos:
            <div className="photos">
                {userPhotos.map((element, index) => {
                    return (
                        <Post key={index} data={element} />
                    )
                })}
            </div>
        </>
    )


}

export default UserProfile