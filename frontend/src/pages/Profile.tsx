import { useState, useEffect, useContext } from 'react';
import LogoutButton from '@/components/LogoutButton';
import Post, { PhotoData } from '../components/Post';
import { useAuth } from '@/contexts/AuthContext';
import UrlContext from '@/contexts/UrlContext';
import { Divider, Typography, Image } from 'antd';
import UploadProfilePhoto from '@/components/UploadProfilePhoto';
import ProfileData from '@/components/ProfileData';

function Profile() {
    const [profilePhoto, setProfilePhoto] = useState([] as PhotoData[])
    const [yourPhotos, setYourPhotos] = useState([] as PhotoData[])

    const { user, logout } = useAuth();
    const { url } = useContext(UrlContext);

    const { Title } = Typography;

    useEffect(() => {
        if (!(user && typeof (user) === "object")) {
            logout();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        loadPhotos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function loadPhotos() {
        console.log('load photos');

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
        <div className='profile'>
            <Title>Profile</Title>

            <div className='profileInfo'>
                <div className='profilePhotoData'>
                    <Title level={4}>Profile photo</Title>

                    <div className="profilePhoto">
                        {profilePhoto.map((element, index) => {
                            return (
                                <Image
                                    key={index}
                                    width={200}
                                    src={url + "/photos/show/" + element.id + "?t=" + new Date().getTime()}
                                    preview={false}
                                    style={{ borderRadius: "10px" }}
                                />
                            )
                        })}

                        <UploadProfilePhoto loadPhotos={loadPhotos} />
                    </div>
                </div>

                <ProfileData />
            </div>

            <Divider />

            <LogoutButton />

            <Divider />

            <Title level={3}>Your posts:</Title>
            <div className="photos">
                {yourPhotos.map((element, index) => {
                    return (
                        <Post key={index} data={element} />
                    )
                })}
            </div>
        </div>
    )
}

export default Profile