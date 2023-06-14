import { useEffect, useState, useContext } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import UrlContext from '@/contexts/UrlContext';
import { Select, type SelectProps, Input, Button, Typography, message, Upload, Modal, Divider } from 'antd';
import type { RcFile } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { usePhotos } from '@/contexts/PhotosContext';

function CreatePost() {
  const { TextArea } = Input;
  const { Text, Title } = Typography;

  const { user, logout } = useAuth();
  const { url } = useContext(UrlContext);
  const { loadAllPhotos } = usePhotos();

  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [options, setOptions] = useState([] as SelectProps['options']);
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const [usedFilter, setUsedFilter] = useState<string>("original");

  const [filterOpen, setFilterOpen] = useState(false);
  const [originalImage, setOriginalImage] = useState('');

  useEffect(() => {
    loadTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!(user && typeof (user) === "object")) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function loadTags() {
    const response = await fetch(url + "/tags", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();

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
    formData.append("filter", usedFilter)

    fetch(url + "/photos", {
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
        setTags([]);
        setDescription("");
        setUploading(false);
      });
  }

  const handleTagSelect = (value: string[]) => {
    setTags(value)
  };

  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <div className="createPost">
      <Title>Create post</Title>

      <Divider />

      <div className="uploadPhoto">
        <ImgCrop rotationSlider>
          <Upload
            listType="picture"
            accept="image/*"
            fileList={fileList}
            multiple={false}
            maxCount={1}
            onPreview={() => { setPreviewOpen(true) }}
            onRemove={(file) => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFileList(newFileList);
            }}
            beforeUpload={(file) => {
              setUsedFilter("original")
              setFilterOpen(true);
              setOriginalImage(URL.createObjectURL(file));

              setFileList([...fileList, file]);

              return false;
            }}
          >
            {fileList.length >= 1 ? null :
              <div>
                <Button type={"primary"} style={{ marginTop: 8 }}><PlusOutlined />Choose photo</Button>
              </div>
            }
          </Upload>
        </ImgCrop>

        <Modal open={previewOpen} title={"Image preview"} footer={null} onCancel={() => { setPreviewOpen(false) }}>
          <div className='imagePreview'>
            <img alt="example" style={{ width: '100%', filter: usedFilter != "original" ? usedFilter + "(100%)" : "" }} src={originalImage} />
          </div>
        </Modal>

        <Modal
          open={filterOpen}
          title={"Choose filter"}
          cancelText="Delete photo"
          okText="Save filter"
          onOk={() => {
            setFilterOpen(false);
          }}
          onCancel={() => {
            setFilterOpen(false);
            setFileList(fileList.slice(0, -1));
          }}
        >
          <>
            <div className='imagePreview'>
              <img className={usedFilter == "tint" ? 'tint' : ''} alt="example" style={{ width: '100%', filter: usedFilter == "grayscale" ? "grayscale(100%)" : usedFilter == "negate" ? "invert(1)" : undefined, transform: usedFilter == "flip" ? 'scaleX(-1)' : usedFilter == "flop" ? 'scaleY(-1)' : undefined }} src={originalImage} />
            </div>

            <Divider />

            <div className="filters">
              <div className='filterButtons'>
                <Button type={usedFilter == "original" ? "primary" : "default"} onClick={() => {
                  setUsedFilter("original");
                }}>Original</Button>

                <Button type={usedFilter == "grayscale" ? "primary" : "default"} onClick={() => {
                  setUsedFilter("original");
                  setUsedFilter("grayscale");
                }}>Grayscale</Button>

                <Button type={usedFilter == "flip" ? "primary" : "default"} onClick={() => {
                  setUsedFilter("original");
                  setUsedFilter("flip");
                }}>Flip</Button>

                <Button type={usedFilter == "flop" ? "primary" : "default"} onClick={() => {
                  setUsedFilter("original");
                  setUsedFilter("flop");
                }}>Flop</Button>

                <Button type={usedFilter == "negate" ? "primary" : "default"} danger onClick={() => {
                  setUsedFilter("original");
                  setUsedFilter("negate");
                }}>Invert</Button>

                <Button type={usedFilter == "tint" ? "primary" : "default"} danger onClick={() => {
                  setUsedFilter("original");
                  setUsedFilter("tint");
                }}>Tint</Button>
              </div>
            </div>

            <Divider />
          </>
        </Modal>
      </div>

      <Text>Add tags:</Text>
      <Select
        mode="tags"
        style={{ width: 400 }}
        placeholder="Choose tags"
        onChange={handleTagSelect}
        options={options}
        value={tags}
      />

      <Text>Add description:</Text>
      <TextArea
        name="description"
        id="description"
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: 400, height: 100 }}
        showCount
        maxLength={500}
        value={description}
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
