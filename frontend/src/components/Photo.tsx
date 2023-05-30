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

function Photo(props: { data: PhotoData }) {
    const { data } = props;

    return (
        <div className="photo">
            <img alt="Photo" src={"/api/photos/show/" + data.id}></img>

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

export default Photo