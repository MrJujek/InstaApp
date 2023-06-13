import { useEffect, useState, useContext } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import UrlContext from '@/contexts/UrlContext';
// import UploadPhoto from '@/components/UploadPhoto';
import { Select, type SelectProps, Input, Button, Typography, message, Upload, Modal, Divider, Image, Col, InputNumber, Row, Slider, Space } from 'antd';
import type { RcFile } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

function CreatePost() {
  const { TextArea } = Input;
  const { Text, Title } = Typography;

  const { user } = useAuth();
  const { url } = useContext(UrlContext);

  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [options, setOptions] = useState([] as SelectProps['options']);
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [usedFilters, setUsedFilters] = useState<string>("original");

  const [filterOpen, setFilterOpen] = useState(false);
  const [originalImage, setOriginalImage] = useState('');

  useEffect(() => {
    loadTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("fileList", fileList);
  }, [fileList]);

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

  const [inputValue, setInputValue] = useState(100);

  const onChange = (newValue: number) => {
    setInputValue(newValue);
  };

  return (
    <div className="createPost">
      <Title>Create post</Title>

      <div className="uploadPhoto">
        <ImgCrop rotationSlider>
          <Upload
            listType="picture-card"
            fileList={fileList}
            multiple={false}
            beforeUpload={(file) => {
              setFilterOpen(true);
              setOriginalImage(URL.createObjectURL(file));

              setFileList([...fileList, file]);

              return false;
            }}
          >
            {fileList.length >= 8 ? null :
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            }
          </Upload>
        </ImgCrop>

        <Modal
          open={filterOpen}
          title={"Choose filter"}
          cancelText="Delete photo"
          okText="Save filter"
          onOk={() => {
            setFilterOpen(false);
            setUsedFilters("original");
          }}
          onCancel={() => {
            setFilterOpen(false);
            setFileList(fileList.slice(0, -1));
            setUsedFilters("original");
          }}
        >
          <>
            <div className='imagePreview'>
              <Image alt="example" style={{ width: '100%', filter: usedFilters != "original" ? usedFilters + "(" + inputValue + "%)" : "" }} src={originalImage} />
            </div>

            <Divider />

            <div className="filters">
              <div className='filterButtons'>
                <Button onClick={() => {
                  setUsedFilters("original");
                }}>Original</Button>

                <Button onClick={() => {
                  setUsedFilters("grayscale");

                }}>Grayscale</Button>

                <Button onClick={() => {
                  setUsedFilters("invert");
                }}>Invert</Button>

                <Button onClick={() => {
                  setUsedFilters("saturate");
                }}>Saturate</Button>

                <Button onClick={() => {
                  setUsedFilters("contrast");
                }}>Contrast</Button>
              </div>

              <Row style={{ width: "100%" }}>
                <Col span={16}>
                  <Slider
                    min={1}
                    max={100}
                    onChange={onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={1}
                    max={100}
                    style={{ margin: '0 16px' }}
                    value={inputValue}
                    onChange={onChange}
                  />
                </Col>
              </Row>
            </div>

            <Divider />
          </>
        </Modal>
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
