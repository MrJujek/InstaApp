import { useState, useEffect, useContext } from 'react';
import LogoutButton from '../components/LogoutButton';
import UploadPhoto from '../components/UploadPhoto';
import Post, { PhotoData } from '../components/Post';
import { useAuth } from '@/contexts/AuthContext';
import UrlContext from '@/contexts/UrlContext';

function Profile() {
    const [profilePhoto, setProfilePhoto] = useState([] as PhotoData[])
    const [yourPhotos, setYourPhotos] = useState([] as PhotoData[])

    const { user } = useAuth();
    const { url } = useContext(UrlContext);

    useEffect(() => {
        loadPhotos();
    }, []);

    async function loadPhotos() {
        const response = await fetch(url + "/photos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();

            setYourPhotos(data.filter((element: PhotoData) => !element.profile && element.user === user?.email));
            setProfilePhoto(data.filter((element: PhotoData) => element.profile && element.user === user?.email));
        }
    }

    return (
        <>
            <h1>Profile</h1><LogoutButton></LogoutButton>

            <UploadPhoto photoType="profile" loadPhotos={loadPhotos}></UploadPhoto>

            Twoje zdjecie profilowe:
            <div className="photos">
                {profilePhoto.map((element, index) => {
                    return (
                        <Post key={index} data={element} />
                    )
                })}
            </div>
            <br />

            Twoje zdjecia:
            <div className="photos">
                {yourPhotos.map((element, index) => {
                    return (
                        <Post key={index} data={element} />
                    )
                })}
            </div>
        </>
    )
}

export default Profile