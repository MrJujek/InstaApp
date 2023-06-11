import { useState, useContext } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UrlContext from '@/contexts/UrlContext';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'

function UploadProfilePhoto({ loadPhotos }: { loadPhotos: () => void }) {
    // const { photoType, loadPhotos } = props;

    // const [photoToUpload, setPhotoToUpload] = useState(null as File | null)

    // const inputRef = React.useRef<HTMLInputElement>(null);

    const { user } = useAuth();
    const { url } = useContext(UrlContext);

    // const [fileList, setFileList] = useState<UploadFile[]>([])

    // const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    //     setFileList(newFileList);
    // };

    // function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    //     if (e.target.files === null) {
    //         return
    //     }

    //     setPhotoToUpload(
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
    //     formData.append("photoType", photoType)
    //     formData.append("description", '[]');
    //     formData.append("tags", '[]')

    //     const response = await fetch(url + "/photos", {
    //         method: "POST",
    //         body: formData
    //     });

    //     if (response.ok) {
    //         loadPhotos();
    //         return;
    //     }
    //     throw new Error("Error while uploading file");
    // }

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file as RcFile);
        });
        formData.append("user", user!.email)
        formData.append("photoType", "profile")
        formData.append("description", '');
        formData.append("tags", '[]')
        setUploading(true);

        console.log("fileList", fileList);

        await fetch(url + "/photos", {
            method: "POST",
            body: formData
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success('Upload successfully.');
            })
            .catch(() => {
                message.error('Upload failed.');
            })
            .finally(() => {
                setUploading(false);
                loadPhotos();
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