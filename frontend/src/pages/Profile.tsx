import { useState, useEffect, useContext } from 'react';
import LogoutButton from '@/components/LogoutButton';
import Post, { PhotoData } from '../components/Post';
import { useAuth } from '@/contexts/AuthContext';
import UrlContext from '@/contexts/UrlContext';
import { Divider, Typography } from 'antd';
import UploadProfilePhoto from '@/components/UploadProfilePhoto';
import ProfileData from '@/components/ProfileData';
import { usePhotos } from '@/contexts/PhotosContext';
import { Spin } from 'antd';

function Profile() {
    const [profilePhoto, setProfilePhoto] = useState([] as PhotoData[])
    const [yourPhotos, setYourPhotos] = useState([] as PhotoData[])

    const { user, logout } = useAuth();
    const { url } = useContext(UrlContext);
    const { allPhotos, loadAllPhotos } = usePhotos();

    const { Title } = Typography;

    useEffect(() => {
        if (!(user && typeof (user) === "object")) {
            logout();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        loadAllPhotos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log("nowe zdjęcie");
        console.log(allPhotos);

        const temp = [
            ...allPhotos
        ]

        setYourPhotos(temp.filter((element: PhotoData) => element.profile != true && element.user === user?.email));
        setProfilePhoto(temp.filter((element: PhotoData) => element.profile == true && element.user === user?.email));
    }, [allPhotos]);

    return (
        <div className='profile'>
            <Title>Profile</Title>

            <div className='profileInfo'>
                <div className='profilePhotoData'>
                    <Title level={4}>Profile photo</Title>

                    <div className="profilePhoto">
                        {profilePhoto && profilePhoto.map((element, index) => {
                            return (
                                <img
                                    key={index}
                                    src={url + "/photos/show/" + element.id + "?t=" + new Date().getTime()
                                    }
                                    style={{ borderRadius: "10px", width: "200px" }}
                                />
                            )
                        })}

                        <UploadProfilePhoto />
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
                        <Post key={index} data={element} profilePhotoId={profilePhoto[0].id} />
                    )
                })}
            </div>
            {/* <Spin size="large" /> */}
        </div>
    )
}

export default Profile