import { useState, useEffect, useContext } from 'react';
import LogoutButton from '../components/LogoutButton';
import UploadPhoto from '../components/UploadPhoto';
import Post, { PhotoData } from '../components/Post';
import { useAuth } from '@/contexts/AuthContext';
import UrlContext from '@/contexts/UrlContext';
import { Divider, Typography, Image } from 'antd';

function Profile() {
    const [profilePhoto, setProfilePhoto] = useState([] as PhotoData[])
    const [yourPhotos, setYourPhotos] = useState([] as PhotoData[])

    const { user } = useAuth();
    const { url } = useContext(UrlContext);

    const { Title, Text } = Typography;

    useEffect(() => {
        loadPhotos();
    }, []);

    useEffect(() => {
        console.log(profilePhoto);
    }, [profilePhoto]);


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
        <div className='profile'>
            <Title>Profile</Title>

            <div className='profileInfo'>
                <LogoutButton></LogoutButton>

                <UploadPhoto photoType="profile" loadPhotos={loadPhotos}></UploadPhoto>

                <Text>Your posts:</Text>
                <div className="profilePhoto">
                    {profilePhoto.map((element, index) => {
                        return (
                            <Post key={index} data={element} />
                        )
                    })}
                </div>
                <Image
                    width={200}
                    src={``}
                    placeholder={
                        <Image
                            preview={false}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                            width={200}
                        />
                    }
                />
            </div>


            <Divider />

            <Text>Your posts:</Text>
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