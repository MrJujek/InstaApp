import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext'
import UrlContext from '@/contexts/UrlContext';
// import UploadPhoto from '@/components/UploadPhoto';
import { Select, type SelectProps, Input, Button, Typography, message, Upload, Modal, Divider } from 'antd';
import type { RcFile, UploadProps as UploadPropsInterface } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

function CreatePost() {
  const navigate = useNavigate();
  const { TextArea } = Input;
  const { Text, Title } = Typography;
  const { Dragger } = Upload;

  const { user } = useAuth();
  const { url } = useContext(UrlContext);

  const [photosToUpload, setPhotosToUpload] = useState<File[] | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [options, setOptions] = useState([] as SelectProps['options']);
  const [uploading, setUploading] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleCancel = () => setPreviewOpen(false);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    console.log("handlePreview");

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadPropsInterface['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  }

  useEffect(() => {
    console.log("fileList", fileList);
  }, [fileList])

  useEffect(() => {
    loadTags();
  }, []);

  async function loadTags() {
    const response = await fetch(url + "/tags", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("data", data);

      setOptions(data.map((tag: { id: number, name: string, value: string }) => {
        return {
          label: tag.name,
          value: tag.name
        }
      }))
    }
  }

  async function sharePost() {
    setUploading(true);

    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('file', file as RcFile);
    });
    formData.append("user", user?.email as string)
    formData.append("photoType", "photo")
    formData.append("tags", JSON.stringify(tags))
    formData.append("description", description)

    fetch(url + "/photos", {
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
      });
  }

  const handleTagSelect = (value: string[]) => {
    setTags(value)
  };

  return (
    <div className="createPost">
      <Title>Create post</Title>

      <div className="uploadPhoto">
        <ImgCrop rotationSlider>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            // multiple={false}
            // fileList={fileList}
            // // onDrop={(e) => {
            // //   const files = e.dataTransfer.files as unknown as UploadFile[];
            // //   setFileList([...fileList, files[0]]);
            // // }}
            // onPreview={() => {
            //   handlePreview
            // }}
            // onRemove={(file) => {
            //   const index = fileList.indexOf(file);
            //   const newFileList = fileList.slice();
            //   newFileList.splice(index, 1);
            //   setFileList(newFileList);
            // }}
            beforeUpload={(file) => {
              setFileList([...fileList, file]);

              return false;
            }}
          // onChange={handleChange}
          >
            {fileList.length >= 8 ? null :
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            }
          </Upload>
        </ImgCrop>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        {/* <ImgCrop rotationSlider>
          <Dragger {...uploadProps}>
            <p className='ant-upload-drag-icon'><InboxOutlined /></p>
            <p className="ant-upload-text">Click or drag file to this area to upload.</p>
          </Dragger>
        </ImgCrop>

        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal> */}
      </div>

      <Divider />

      <Text>Add tags:</Text>
      <Select
        mode="tags"
        style={{ width: 400 }}
        placeholder="Choose tags"
        onChange={handleTagSelect}
        options={options}
      />

      <Divider />

      <Text>Add description:</Text>
      <TextArea
        name="description"
        id="description"
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: 400, height: 100 }}
        showCount
        maxLength={500}
      >
      </TextArea>

      <Button
        className="share-button"
        type="primary"
        onClick={() => sharePost()}
        disabled={fileList.length === 0}
        loading={uploading}
      >
        Share
      </Button>
    </div >
  )
}

export default CreatePost
