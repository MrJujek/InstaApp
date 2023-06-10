import React, { useEffect, useState, useContext } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Select, type SelectProps, Input, Button, Typography } from 'antd';
import UrlContext from '@/contexts/UrlContext';
import UploadPhoto from '@/components/UploadPhoto';

function CreatePost() {
  const { TextArea } = Input;
  const { Text, Title } = Typography;

  const [photosToUpload, setPhotosToUpload] = useState<File[] | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [options, setOptions] = useState([] as SelectProps['options']);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const { user } = useAuth();
  const { url } = useContext(UrlContext);

  useEffect(() => {
    console.log("photosToUplad", photosToUpload);
  }, [photosToUpload]);


  useEffect(() => {
    loadTags();
  }, []);

  async function loadTags() {
    console.log("loadTags()");

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

  function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) {
      return
    }

    console.log("e.target.files", e.target.files);
    console.log([...e.target.files]);


    setPhotosToUpload(
      [...e.target.files]
    )
  }

  async function postFileToServer() {
    if (photosToUpload === null || !photosToUpload || inputRef.current == null || inputRef.current.files == null) {
      console.log("postFileToServer - no file");
      return
    }

    const formData = new FormData()
    for (let i = 0; i < inputRef.current.files.length; i++) {
      formData.append("file", inputRef.current.files[i])
    }
    formData.append("user", user?.email as string)
    formData.append("photoType", "photo")
    formData.append("tags", JSON.stringify(tags))
    formData.append("description", description)

    const response = await fetch(url + "/photos", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      // loadPhotos();
      console.log(response);

      console.log("file uploaded");

      return;
    }
    throw new Error("Error while uploading file");
  }

  const handleTagSelect = (value: string[]) => {
    setTags(value)
  };

  return (
    <div className="createPost">
      <Title>Create post</Title>
      <UploadPhoto></UploadPhoto>
      <label htmlFor="file">Select photo:</label>
      <input id="file" multiple type="file" name="file" onChange={(e) => onChangeFile(e)} ref={inputRef} />

      <Text>Add tags:</Text>
      <Select
        mode="tags"
        style={{ width: 400 }}
        placeholder="Choose tags"
        onChange={handleTagSelect}
        options={options}
      />

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

      <Button type="primary" onClick={() => postFileToServer()}>Share</Button>
    </div>
  )
}

export default CreatePost
