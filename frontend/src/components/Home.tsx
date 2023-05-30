import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Photo, { PhotoData } from "./Photo";
import "../assets/scss/modules/_home.scss";

function Home() {
    const [photos, setPhotos] = useState([] as PhotoData[])
    const [photoToUpload, setphotoToUpload] = useState(null as File | null)

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
            console.log("loadPhotos - data", data);


            setPhotos(data);
        }
    }

    function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files === null) {
            return
        }

        setphotoToUpload(
            e.target.files[0]
        )
    }

    async function postFileToServer() {
        if (photoToUpload === null || !photoToUpload) {
            console.log("postFileToServer - no file");
            return
        }

        const formData = new FormData()
        formData.append("file", photoToUpload as File)
        formData.append("album", "test")

        const response = await fetch("https://dev.juliandworzycki.pl/api/photos", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            loadPhotos();
            return;
        }
        throw new Error("Error while uploading file");
    }

    return (
        <>
            <div className="navbar">
                <h1>Home</h1>
                <Link to={'/profile'}>Profile</Link>
            </div>

            <div className="uploadPhoto">
                Upload file
                <label htmlFor="file">Select photo:</label>
                <input id="file" type="file" name="file" onChange={(e) => onChangeFile(e)} />

                <button onClick={() => postFileToServer()}>Add photo</button>
            </div>

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