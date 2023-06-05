import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Post, { PhotoData } from '../components/Post';
import UrlContext from '@/contexts/UrlContext';

function UserProfile() {
    const { id } = useParams();
    const { url } = useContext(UrlContext);

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
        const response = await fetch(url + "/user/" + id, {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();

            setUserEmail(data[0].email);
        }
    }

    async function loadUserPhotos() {
        const response = await fetch(url + "/photos", {
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