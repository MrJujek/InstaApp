import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Photo, { PhotoData } from "./Photo";

function Home() {
    const [photos, setPhotos] = useState([] as PhotoData[])

    useEffect(() => {
        async function loadPhotos() {

            const response = await fetch("https://dev.juliandworzycki.pl/api/photos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();

                setPhotos(data);
            }

        }
        loadPhotos();
    }, []);

    console.log("Home", photos);

    return (
        <>
            <div className="navbar">
                <h1>Home</h1>
                <Link to={'/profile'}>Profile</Link>
            </div>


            <div className="photos">
                {photos.map((element, index) => {
                    return (
                        <>
                            <Photo key={index} data={element} />
                        </>
                    )

                })}
            </div>
        </>
    )
}

export default Home