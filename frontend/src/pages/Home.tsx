import { useEffect, useState, useContext } from "react";
import Post, { PhotoData } from "../components/Post";
import UrlContext from "@/contexts/UrlContext";

function Home() {
    const [photos, setPhotos] = useState([] as PhotoData[])
    const { url } = useContext(UrlContext);

    useEffect(() => {
        loadPhotos();
    }, []);

    async function loadPhotos() {
        const response = await fetch(url + "/photos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();

            setPhotos(data.filter((element: PhotoData) => element.profile === false));
        }
    }

    return (
        <>
            <h1>Home</h1>

            {/* <UploadPhoto photoType="photo" loadPhotos={loadPhotos} /> */}

            <div className="photos">
                {photos.map((element, index) => {
                    return (
                        <Post key={index} data={element} />
                    )
                })}
            </div>
        </>
    )
}

export default Home