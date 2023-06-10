import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UrlContext from '@/contexts/UrlContext';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps as UploadPropsInterface } from 'antd';
import { message, Upload } from 'antd'

function UploadPhoto(props: { loadPhotos: () => void }) {
    const { loadPhotos } = props;

    const [photoToUpload, setphotoToUpload] = useState(null as File | null)

    const inputRef = React.useRef<HTMLInputElement>(null);

    const { user } = useAuth();
    const { url } = React.useContext(UrlContext);

    const { Dragger } = Upload;

    const uploadProps: UploadPropsInterface = {
        name: 'file',
        multiple: true,
        onChange(info) {
            const { status } = info.file;
            console.log(status);

        },
        onDrop(e) {
            console.log(e.dataTransfer.files);

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
        formData.append("photoType", 'photo')
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
        <div className="uploadPhoto">

            {/* <label htmlFor="file">Select photo:</label>
            <input id="file" type="file" name="file" onChange={(e) => onChangeFile(e)} ref={inputRef} />

            <button onClick={() => postFileToServer()}>Add photo</button> */}

            <Dragger {...uploadProps}>
                <p className='ant-upload-drag-icon'><InboxOutlined /></p>
                <p className="ant-upload-text">Click or drag file to this area.</p>
            </Dragger>
        </div>
    )
}

export default UploadPhoto