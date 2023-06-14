import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Post, { PhotoData } from '@/components/Post';
import UrlContext from '@/contexts/UrlContext';
import { usePhotos } from '@/contexts/PhotosContext';
import { Typography, Image, Divider } from 'antd';

function UserProfile() {
    const { userEmail } = useParams();
    const { allPhotos } = usePhotos();
    const { url } = useContext(UrlContext);

    const { Title } = Typography;

    const [userProfilePhoto, setUserProfilePhoto] = useState([] as PhotoData[]);
    const [userPhotos, setUserPhotos] = useState([] as PhotoData[]);

    useEffect(() => {
        setUserProfilePhoto(allPhotos.filter((element: PhotoData) => element.user === userEmail && element.profile === true));
        setUserPhotos(allPhotos.filter((element: PhotoData) => element.user === userEmail && element.profile === false));
    }, [allPhotos]);

    return (
        <>
            <div className='userProfile'>
                <Title>User profile - {userEmail}</Title>

                <Divider />

                <div className='postAuthor'>
                    <Title level={4}>User profile photo</Title>
                    {userProfilePhoto.map((element, index) => {
                        return (
                            <Image
                                key={index}
                                className='profilePhoto'
                                preview={false}
                                width={200}
                                style={{ borderRadius: "20px" }}
                                src={url + "/photos/show/" + element.id + "?t=" + new Date().getTime()}
                            />
                        )
                    })}
                </div>

                <Divider />

                <Title level={4}>User posts</Title>
                <div className="userPosts">
                    {userPhotos.map((element, index) => {
                        return (
                            <Post key={index} data={element} />
                        )
                    })}
                </div>
            </div>
        </>
    )


}

export default UserProfile