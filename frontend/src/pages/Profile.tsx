import { useState, useEffect, useContext } from 'react';
import LogoutButton from '@/components/LogoutButton';
import UploadPhoto from '@/components/UploadPhoto';
import Post, { PhotoData } from '../components/Post';
import { useAuth } from '@/contexts/AuthContext';
import UrlContext from '@/contexts/UrlContext';
import { Divider, Typography, Image, Button } from 'antd';
import UploadProfilePhoto from '@/components/UploadProfilePhoto';
import { useNavigate } from 'react-router-dom';
import ProfileData from '@/components/ProfileData';

function Profile() {
    const [profilePhoto, setProfilePhoto] = useState([] as PhotoData[])
    const [yourPhotos, setYourPhotos] = useState([] as PhotoData[])

    const { user } = useAuth();
    const { url } = useContext(UrlContext);
    const navigate = useNavigate();

    const { Title, Text, Paragraph } = Typography;

    useEffect(() => {
        if (!(user && typeof (user) === "object")) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        loadPhotos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log("profile photo changed");
        console.log(profilePhoto);
    }, [profilePhoto]);


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

    console.log(user);


    return (
        <div className='profile'>
            <Title>Profile</Title>

            <ProfileData></ProfileData>


            <div className='profileInfo'>
                <Text>Your photo:</Text>
                <div className="profilePhoto">
                    {profilePhoto.map((element, index) => {
                        return (
                            <Image
                                key={index}
                                width={200}
                                src={url + "/photos/show/" + element.id + "?t=" + new Date().getTime()}
                                preview={false}
                            />
                        )
                    })}
                </div>

                <UploadProfilePhoto loadPhotos={loadPhotos} />

                <LogoutButton />
            </div>

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