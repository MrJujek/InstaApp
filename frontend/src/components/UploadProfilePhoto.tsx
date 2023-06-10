import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UrlContext from '@/contexts/UrlContext';
import { Upload } from 'antd';
// import ImgCrop from 'antd-img-crop'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'

function UploadProfilePhoto(props: { photoType: string, loadPhotos: () => void }) {
    const { photoType, loadPhotos } = props;

    const [photoToUpload, setphotoToUpload] = useState(null as File | null)

    const inputRef = React.useRef<HTMLInputElement>(null);

    const { user } = useAuth();
    const { url } = React.useContext(UrlContext);

    // const [fileList, setFileList] = useState<UploadFile[]>([])

    // const onChange: UploadProps['onChange'] = ({ fileList: new })

    function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files === null) {
            return
        }

        setphotoToUpload(
            e.target.files[0]
        )
    }

    async function postFileToServer() {
        if (photoToUpload === null || !photoToUpload || inputRef.current == null || inputRef.current.files == null) {
            console.log("postFileToServer - no file");
            return
        }

        console.log("user", user);

        const formData = new FormData()
        for (let i = 0; i < inputRef.current.files.length; i++) {
            formData.append("file", inputRef.current.files[i])
        }
        formData.append("user", user!.email)
        formData.append("photoType", photoType)
        formData.append("description", '[]');
        formData.append("tags", '[]')

        const response = await fetch(url + "/photos", {
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
        <div className="UploadProfilePhoto">
            Upload file
            {photoType}
            <label htmlFor="file">Select photo:</label>
            <input id="file" type="file" name="file" onChange={(e) => onChangeFile(e)} ref={inputRef} />

            <button onClick={() => postFileToServer()}>Add photo</button>
        </div>
    )
}

export default UploadProfilePhoto