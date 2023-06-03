import { useEffect, useState } from "react";
import Post, { PhotoData } from "../components/Post";
import UploadPhoto from "../components/UploadPhoto";

function Home() {
    const [photos, setPhotos] = useState([] as PhotoData[])

    useEffect(() => {
        loadPhotos();
    }, []);

    async function loadPhotos() {
        const response = await fetch("https://dev.juliandworzycki.pl/api/photos", {
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

            <UploadPhoto photoType="photo" loadPhotos={loadPhotos} />

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