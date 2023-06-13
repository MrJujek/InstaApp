import { useState, useEffect, useContext } from 'react'
import { PhotoData } from '@/components/Post'
import { useParams } from 'react-router-dom';
import UrlContext from '@/contexts/UrlContext';
import { Card, Image, Typography, Tag } from 'antd';

function ShowPost() {
    const { Text, Title } = Typography;

    const { id } = useParams();
    const { url } = useContext(UrlContext);

    const [post, setPost] = useState({} as PhotoData)
    const [userProfile, setUserProfile] = useState({} as PhotoData);

    useEffect(() => {
        getPost();
    }, []);

    useEffect(() => {
        loadUserProfile();
    }, [post]);

    async function getPost() {
        const response = await fetch(url + "/photos/" + id, {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();

            console.log("getPost", data);

            setPost(data);
        }
    }

    async function loadUserProfile() {
        const response = await fetch("/api/photos", {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();

            setUserProfile(data.filter((element: PhotoData) => element.user === post.user && element.profile === true)[0]);
        }
    }

    const showThisAuthor = () => {
        console.log();

        // if (!data.profile) {
        //     navigate("/user/" + data.id);
        // }
    }

    return (
        <>
            <Card className="post" title={
                <>
                    {userProfile &&
                        <div className='postAuthor' onClick={() => showThisAuthor()}>
                            <Image
                                className='profilePhoto'
                                preview={false}
                                width={50}
                                src={url + "/photos/show/" + userProfile.id + "?t=" + new Date().getTime()}
                            />

                            <Text style={{ marginLeft: "20px" }}>{userProfile.user}</Text>
                        </div>
                    }
                </>
            }>
                <>
                    <div className='postContent'>
                        <Image
                            alt="Photo"
                            src={url + "/photos/show/" + post.id + "?t=" + new Date().getTime()}
                            width={400}
                            style={{ borderRadius: "10px" }}
                        />

                        {post.tags && post.description &&
                            <>
                                <div className="tags">
                                    <Title level={5}>Tags:</Title>
                                    <div>
                                        {post.tags.map((tag, index) => (
                                            <Tag key={index}>#{tag}</Tag>
                                        ))}
                                    </div>
                                </div>

                                <div className="description">
                                    <Title level={5}>Description:</Title>
                                    <div>
                                        {...post.description.join("").split("\n")}
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </>
            </Card>
        </>
    )
}

export default ShowPost