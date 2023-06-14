import { useState, useEffect, useContext } from 'react';
import LogoutButton from '@/components/LogoutButton';
import Post, { PhotoData } from '../components/Post';
import { useAuth } from '@/contexts/AuthContext';
import UrlContext from '@/contexts/UrlContext';
import { Divider, Typography } from 'antd';
import UploadProfilePhoto from '@/components/UploadProfilePhoto';
import ProfileData from '@/components/ProfileData';
import { usePhotos } from '@/contexts/PhotosContext';

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
        if (allPhotos.length === 0)
            loadAllPhotos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setYourPhotos(allPhotos.filter((element: PhotoData) => element.profile != true && element.user === user?.email));
        setProfilePhoto(allPhotos.filter((element: PhotoData) => element.profile == true && element.user === user?.email));
    }, [allPhotos]);

    return (
        <div className='profile'>
            <Title>Profile</Title>

            <Divider />

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

            {profilePhoto && profilePhoto.length > 0 && profilePhoto[0].id &&
                <div className="photos">
                    {yourPhotos.map((element, index) => {
                        return (
                            <Post key={index} data={element} profileId={profilePhoto[0].id} />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Profile