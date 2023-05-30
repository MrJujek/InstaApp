import { useState, useEffect } from 'react';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';
import UploadPhoto from './UploadPhoto';
import Photo, { PhotoData } from './Photo';
import { useAuth } from '@/services/auth/context/AuthContext';

function Profile() {
    const [profilePhoto, setProfilePhoto] = useState([] as PhotoData[])
    const [yourPhotos, setYourPhotos] = useState([] as PhotoData[])
    const { user } = useAuth();

    useEffect(() => {
        loadPhotos();
    }, []);

    async function loadPhotos() {
        const response = await fetch("https://dev.juliandworzycki.pl/api/photos", {
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
            <Link to={'/'}>Home</Link>

            <UploadPhoto photoType="profile" loadPhotos={loadPhotos}></UploadPhoto>

            Twoje zdjecie profilowe:
            <div className="photos">
                {profilePhoto.map((element, index) => {
                    return (
                        <Photo key={index} data={element} />
                    )
                })}
            </div>
            <br />

            Twoje zdjecia:
            <div className="photos">
                {yourPhotos.map((element, index) => {
                    return (
                        <Photo key={index} data={element} />
                    )
                })}
            </div>
        </>
    )


}

export default Profile