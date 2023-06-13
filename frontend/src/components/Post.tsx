import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import UrlContext from '@/contexts/UrlContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Image, Typography, Tag } from 'antd';

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

function Post(props: { data: PhotoData }) {
    const { data } = props;
    const { url } = useContext(UrlContext);
    const { user } = useAuth();

    const navigate = useNavigate();
    const { Text, Title } = Typography;

    const [profilePhoto, setProfilePhoto] = useState({} as PhotoData);

    useEffect(() => {
        loadProfilePhoto();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function loadProfilePhoto() {
        const response = await fetch(url + "/photos", {
            method: "GET"
        });
        if (response.ok) {
            const fetchData = await response.json();

            console.log("fetchData", fetchData);
            console.log("user", user);

            setProfilePhoto(fetchData.filter((element: PhotoData) => element.user === user!.email && element.profile === true)[0]);
        }
    }

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
                    {profilePhoto &&
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
                </>
            }>
                <>
                    <div className='postContent'>
                        <Image
                            alt="Photo"
                            src={url + "/photos/show/" + data.id + "?t=" + new Date().getTime()}
                            width={400}
                            style={{ borderRadius: "10px" }}
                            onClick={() => showThisPost()}
                        />

                        {/* <div className="tags">
                            {data.tags.map((tag) => (
                                <Tag>#{tag}</Tag>
                            ))}
                        </div> */}
                        <div className="tags">
                            <Title level={5}>Tags:</Title>
                            <div>
                                {data.tags.map((tag, index) => (
                                    <Tag key={index}>#{tag}</Tag>
                                ))}
                            </div>
                        </div>

                        <div className="description">
                            <Title level={5}>Description:</Title>
                            <div>
                                {data.description}
                            </div>
                        </div>
                    </div>
                </>
            </Card>
        </>


    )
}

export default Post