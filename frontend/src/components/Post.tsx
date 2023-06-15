import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import UrlContext from '@/contexts/UrlContext';
import { Card, Image, Typography, Tag } from 'antd';
import { usePhotos } from '@/contexts/PhotosContext';

interface ModificationHistory {
    date: Date;
    status: string;
}

export interface PhotoData {
    id: number;
    name: string;
    type: string;
    path: string;
    user: string;
    profile: boolean;
    history: ModificationHistory[];
    tags: string[];
    description: string[];
}

function Post(props: { data: PhotoData, profileId?: number }) {
    const { data, profileId } = props;

    if (profileId) {
        console.log("profileid", profileId);
    }

    const { url } = useContext(UrlContext);
    const { allPhotos } = usePhotos();

    const navigate = useNavigate();
    const { Text, Title } = Typography;

    const [profilePhoto, setProfilePhoto] = useState({} as PhotoData);

    useEffect(() => {
        if (!profileId)
            setProfilePhoto(allPhotos.filter((element: PhotoData) => element.user === data.user && element.profile === true)[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const showThisPost = () => {
        if (!data.profile && data.id) {
            navigate("/post/" + data.id);
        }
    };

    const showThisAuthor = () => {
        if (!data.profile && data.user) {
            console.log("no user");

            navigate("/user/" + data.user);
        }
    }

    return (
        <>
            <Card className="post" title={
                <>
                    {!profileId && profilePhoto && profilePhoto.id &&
                        <div className='postAuthor' onClick={() => showThisAuthor()}>
                            <Image
                                className='profilePhoto'
                                preview={false}
                                width={50}
                                src={url + "/photos/show/" + profilePhoto.id + "?t=" + new Date().getTime()}
                            />

                            <Text style={{ marginLeft: "20px" }}>{data.user}</Text>
                        </div>
                    }
                    {profileId &&
                        <div className='postAuthor' onClick={() => showThisAuthor()}>
                            <Image
                                className='profilePhoto'
                                preview={false}
                                width={50}
                                src={url + "/photos/show/" + profileId + "?t=" + new Date().getTime()}
                            />

                            <Text style={{ marginLeft: "20px" }}>{data.user}</Text>
                        </div>
                    }
                </>
            }>
                <>
                    {data.id &&
                        <div className='postContent'>
                            <Image
                                alt="Photo"
                                src={url + "/photos/show/" + data.id + "?t=" + new Date().getTime()}
                                width={400}
                                style={{ borderRadius: "10px" }}
                                onClick={() => showThisPost()}
                            />

                            {data.tags && data.tags.length > 0 &&
                                <div className="tags">
                                    <Title level={5}>Tags:</Title>
                                    <div>
                                        {data.tags.map((tag, index) => (
                                            <Tag key={index}>#{tag}</Tag>
                                        ))}
                                    </div>
                                </div>
                            }

                            {data.description && data.description.length > 0 &&
                                <div className="description">
                                    <Title level={5}>Description:</Title>
                                    <div>
                                        {data.description}
                                    </div>
                                </div>
                            }

                        </div>
                    }
                </>
            </Card>
        </>
    )
}

export default Post