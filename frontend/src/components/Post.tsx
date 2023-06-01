import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const handleClick = () => {
        if (!data.profile) {
            navigate("/post/" + data.id);
        }
    };

    return (
        <div className="photo" onClick={() => handleClick()}>
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

    )
}

export default Post