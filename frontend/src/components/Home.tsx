import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Photo, { PhotoData } from "./Photo";
import UploadPhoto from "./UploadPhoto";

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
            <div className="navbar">
                <h1>Home</h1>
                <Link to={'/profile'}>Profile</Link>
            </div>

            <UploadPhoto photoType="photo" loadPhotos={loadPhotos} />

            <div className="photos">
                {photos.map((element, index) => {
                    return (
                        <Photo key={index} data={element} />
                    )
                })}
            </div>
        </>
    )
}

export default Home