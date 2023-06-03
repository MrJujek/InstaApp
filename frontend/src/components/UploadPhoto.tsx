import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function UploadPhoto(props: { photoType: string, loadPhotos: () => void }) {
    const { photoType, loadPhotos } = props;

    const [photoToUpload, setphotoToUpload] = useState(null as File | null)

    const { user } = useAuth();

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
        formData.append("user", user?.email as string)
        formData.append("photoType", photoType)

        const response = await fetch("/api/photos", {
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
        <div className="uploadPhoto">
            Upload file
            {photoType}
            <label htmlFor="file">Select photo:</label>
            <input id="file" type="file" name="file" onChange={(e) => onChangeFile(e)} />

            <button onClick={() => postFileToServer()}>Add photo</button>
        </div>
    )
}

export default UploadPhoto