import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
    console.log("XXXXXXXXXXXXXXXXX");

    const { data } = props;
    const navigate = useNavigate();

    const [profilePhoto, setProfilePhoto] = useState({} as PhotoData);

    useEffect(() => {
        console.log("props-data", data);

        console.log("profilephoto", profilePhoto);
        loadProfilePhoto();
    }, [])

    useEffect(() => {
        console.log("profilephoto", profilePhoto);
    }, [profilePhoto])

    async function loadProfilePhoto() {
        const response = await fetch("https://dev.juliandworzycki.pl/api/photos", {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            console.log("fetch-data", data);
            console.log(data.filter((element: PhotoData) => element.user == "a@a.a" && element.profile == true));


            setProfilePhoto(data.filter((element: PhotoData) => element.user === props.data.user && element.profile === true)[0]);
        }
    }

    const handleClick = () => {
        if (!data.profile) {
            navigate("/post/" + data.id);
        }
    };

    return (
        <div className="post" onClick={() => handleClick()}>
            {profilePhoto && <div className='postAuthor'>
                <img className='profilePhoto' alt='profilePhoto' src={"/api/photos/show/" + profilePhoto.id + "?t=" + new Date().getTime()}></img>
                {data.user}
            </div>}

            <div className='postContent'>
                <img alt="Photo" src={"/api/photos/show/" + data.id + "?t=" + new Date().getTime()}></img>

                <div className="photoData">
                    <span>{data.name}</span>
                    <span>{data.type}</span>
                    <span>{data.path}</span>
                    <span>{data.user}</span>
                    <span>Profilowe? {String(data.profile)}</span>
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
        </div>

    )
}

export default Post