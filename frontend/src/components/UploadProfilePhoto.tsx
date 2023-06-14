import { useState, useContext } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UrlContext from '@/contexts/UrlContext';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { usePhotos } from '@/contexts/PhotosContext';

function UploadProfilePhoto() {
    const { user } = useAuth();
    const { url } = useContext(UrlContext);
    const { loadAllPhotos } = usePhotos();

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        setUploading(true);

        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file as RcFile);
        });
        formData.append("user", user!.email)
        formData.append("photoType", "profile")
        formData.append("description", '');
        formData.append("tags", '[]')

        await fetch(url + "/photos", {
            method: "POST",
            body: formData
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success('Upload successfully.');

                loadAllPhotos();
            })
            .catch(() => {
                message.error('Upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([file]);

            return false;
        },
        fileList,
        listType: "picture",
        maxCount: 1
    };

    return (
        <div className="UploadProfilePhoto">
            <ImgCrop rotationSlider>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Select new photo</Button>
                </Upload>
            </ImgCrop>

            <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
            >
                {uploading ? 'Uploading' : 'Upload photo'}
            </Button>
        </div>
    )
}

export default UploadProfilePhoto