import { useState, useEffect, useContext } from 'react'
import { PhotoData } from '@/components/Post'
import { useParams, useNavigate } from 'react-router-dom';
import UrlContext from '@/contexts/UrlContext';
import { usePhotos } from '@/contexts/PhotosContext';
import { Card, Image, Typography, Tag } from 'antd';

function ShowPost() {
    const { Text, Title } = Typography;
    const navigate = useNavigate();

    const { id } = useParams();
    const { url } = useContext(UrlContext);
    const { allPhotos } = usePhotos();

    const [post, setPost] = useState({} as PhotoData)
    const [userProfile, setUserProfile] = useState({} as PhotoData);

    useEffect(() => {
        setPost(allPhotos.filter((element: PhotoData) => element.id == Number(id))[0]);
    }, []);

    useEffect(() => {
        setUserProfile(allPhotos.filter((element: PhotoData) => element.user === post.user && element.profile === true)[0]);
    }, [post]);

    const showThisAuthor = () => {
        if (!post.profile && post.user) {
            navigate("/user/" + post.user);
        }
    }

    return (
        <>
            <div className="showPost">
                <Card className="post" title={
                    <>
                        {userProfile && userProfile.id &&
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
                        {post && post.id &&
                            <div className='postContent'>
                                <Image
                                    alt="Photo"
                                    src={url + "/photos/show/" + post.id + "?t=" + new Date().getTime()}
                                    width={400}
                                    style={{ borderRadius: "10px" }}
                                />

                                {post.tags && post.description &&
                                    <>
                                        {post.tags && post.tags.length > 0 &&
                                            <div className="tags">
                                                <Title level={5}>Tags:</Title>
                                                <div>
                                                    {post.tags.map((tag, index) => (
                                                        <Tag key={index}>#{tag}</Tag>
                                                    ))}
                                                </div>
                                            </div>
                                        }

                                        {post.description && post.description.length > 0 &&
                                            <div className="description">
                                                <Title level={5}>Description:</Title>
                                                <div>
                                                    {post.description}
                                                </div>
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                        }
                    </>
                </Card>
            </div>
        </>
    )
}

export default ShowPost