import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import UrlContext from '@/contexts/UrlContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Image, Typography } from 'antd';

interface ModificationHistory {
    date: Date;
    status: string;
}

interface TagsObject {
    id: number;
    name: string;
    popularity: number;
}

export interface PhotoData {
    id: number;
    name: string;
    type: string;
    path: string;
    user: string;
    profile: boolean;
    history: ModificationHistory[];
    tags: TagsObject[];
}

function Post(props: { data: PhotoData }) {
    const { data } = props;
    const { url } = useContext(UrlContext);
    const { user } = useAuth();

    const navigate = useNavigate();
    const { Text } = Typography;

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
                            {/* <img className='profilePhoto' alt='profilePhoto' src={url + "/photos/show/" + profilePhoto.id + "?t=" + new Date().getTime()}></img> */}
                            <Text style={{ marginLeft: "20px" }}>{data.user}</Text>
                        </div>
                    }
                </>
            }>
                <>
                    <div className='postContent' onClick={() => showThisPost()}>
                        <img alt="Photo" src={url + "/photos/show/" + data.id + "?t=" + new Date().getTime()}></img>

                        <div className="photoData">
                            <span>{data.name}</span>
                            <span>{data.type}</span>
                            <span>{data.path}</span>
                            <span>{data.user}</span>
                            <span>Profilowe? {String(data.profile)}</span>
                            <span>{data.tags.map((tag) => tag.name)}</span>
                        </div>

                        {data.history.map((element, index) => {
                            return (
                                <div key={index}>
                                    <div>{(element.date).toString()}</div>
                                    <div>{element.status}</div>
                                </div>
                            )
                        })}

                        {data.tags.map((element, index) => {
                            return (
                                <div key={index}>
                                    <div>{element.id}</div>
                                    <div>{element.name}</div>
                                    <div>{element.popularity}</div>
                                </div>
                            )
                        })}
                    </div>
                </>
            </Card>
        </>


    )
}

export default Post