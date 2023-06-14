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

function Post(props: { data: PhotoData, profilePhotoId: number }) {
    const { data, profilePhotoId } = props;
    const { url } = useContext(UrlContext);

    const navigate = useNavigate();
    const { Text, Title } = Typography;

    const showThisPost = () => {
        if (!data.profile) {
            navigate("/post/" + data.id);
        }
    };

    const showThisAuthor = () => {
        console.log(data);

        // if (!data.profile) {
        //     navigate("/user/" + data.id);
        // }
    }

    return (
        <>
            <Card className="post" title={
                <>
                    {profilePhotoId &&
                        < div className='postAuthor' onClick={() => showThisAuthor()}>
                            <Image
                                className='profilePhoto'
                                preview={false}
                                width={50}
                                src={url + "/photos/show/" + profilePhotoId + "?t=" + new Date().getTime()}
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
            </Card >
        </>
    )
}

export default Post