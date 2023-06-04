import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

function CreatePost() {
  const [photosToUpload, setPhotosToUpload] = useState<File[] | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [description, setDescription] = useState<string>("")

  const { user } = useAuth();

  useEffect(() => {
    console.log(description);
  }, [description])

  useEffect(() => {
    console.log(tags);
  }, [tags])

  function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) {
      return
    }

    console.log(e.target.files);


    setPhotosToUpload(
      [...e.target.files]
    )
  }

  async function postFileToServer() {
    if (photosToUpload === null || !photosToUpload) {
      console.log("postFileToServer - no file");
      return
    }

    const formData = new FormData()
    formData.append("file", JSON.stringify(photosToUpload as File[]))
    formData.append("user", user?.email as string)
    formData.append("photoType", "photo")
    formData.append("tags", JSON.stringify(tags))
    formData.append("description", description)

    const response = await fetch("/api/photos", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      // loadPhotos();
      console.log("file uploaded");

      return;
    }
    throw new Error("Error while uploading file");
  }

  return (
    <div className="createPost">
      Create post
      <label htmlFor="file">Select photo:</label>
      <input id="file" multiple type="file" name="file" onChange={(e) => onChangeFile(e)} />

      Add tags:
      <input type="text" name="tags" onChange={(e) => setTags([...tags, e.target.value])} />

      Add description:
      <textarea name="description" id="description" cols={30} rows={10} onChange={(e) => setDescription(e.target.value)}></textarea>

      <button onClick={() => postFileToServer()}>Add photo</button>
    </div>
  )
}

export default CreatePost
