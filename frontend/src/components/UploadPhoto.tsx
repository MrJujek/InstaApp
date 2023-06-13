import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UrlContext from '@/contexts/UrlContext';
import { InboxOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps as UploadPropsInterface } from 'antd/es/upload';
import { message, Upload, Modal } from 'antd'
import { useNavigate } from 'react-router-dom';

function UploadPhoto({ photosToUpload, setPhotosToUpload }: { photosToUpload: File[] | null, setPhotosToUpload: React.Dispatch<React.SetStateAction<File[] | null>> }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { url } = React.useContext(UrlContext);
    const { Dragger } = Upload;

    // const [photoToUpload, setphotoToUpload] = useState(null as File | null)

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');



    // function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    //     if (e.target.files === null) {
    //         return
    //     }

    //     setphotoToUpload(
    //         e.target.files[0]
    //     )
    // }

    // async function postFileToServer() {
    //     if (photoToUpload === null || !photoToUpload || inputRef.current == null || inputRef.current.files == null) {
    //         console.log("postFileToServer - no file");
    //         return
    //     }

    //     console.log("user", user);

    //     const formData = new FormData()
    //     for (let i = 0; i < inputRef.current.files.length; i++) {
    //         formData.append("file", inputRef.current.files[i])
    //     }
    //     formData.append("user", user!.email)
    //     formData.append("photoType", 'photo')
    //     formData.append("description", '[]');
    //     formData.append("tags", '[]')

    //     const response = await fetch(url + "/photos", {
    //         method: "POST",
    //         body: formData
    //     });

    //     if (response.ok) {
    //         navigate('/');
    //         return;
    //     }
    //     throw new Error("Error while uploading file");
    // }

    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    // const handleChange: UploadPropsInterface['onChange'] = ({ fileList: newFileList }) =>
    //     setPhotosToUpload(newFileList);

    const uploadProps: UploadPropsInterface = {
        name: 'file',
        multiple: false,
        listType: "picture",
        action: url + "/photos123",
        onDrop(e) {
            console.log(e.dataTransfer.files);

        },
        // fileList: photosToUpload,
        onPreview: handlePreview
    }

    return (
        <div className="uploadPhoto">
            <Dragger {...uploadProps}>
                <p className='ant-upload-drag-icon'><InboxOutlined /></p>
                <p className="ant-upload-text">Click or drag file to this area to upload.</p>
            </Dragger>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}

export default UploadPhoto