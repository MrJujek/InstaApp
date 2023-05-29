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
    album: string;
    history: ModificationHistory[];
    tags: TagsObject[];
}

function Photo(props: { data: PhotoData }) {
    const { data } = props;
    console.log("Photo", data);


    return (
        <>
            <img alt="Photo" src={"/api/photos/show/" + data.id}></img>
            {data.name}
            {data.type}
            {data.path}
            {data.album}
            {data.history.map((element, index) => {
                console.log("element", element);
                return (
                    <>
                        {element.date}
                        {element.status}
                    </>
                )
            })}
            {data.tags.map((element, index) => {
                console.log("element", element);
                return (
                    <>
                        {element.id}
                        {element.name}
                        {element.popularity}
                    </>
                )
            })}
            <br></br>
        </>
    )
}

export default Photo