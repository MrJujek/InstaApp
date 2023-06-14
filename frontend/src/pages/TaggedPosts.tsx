import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Typography, Divider } from 'antd'
import Post, { PhotoData } from '@/components/Post';
import { usePhotos } from '@/contexts/PhotosContext';


function TaggedPosts() {
    const { allPhotos, loadAllPhotos } = usePhotos();

    const { tag } = useParams();
    const { Title } = Typography;

    const [taggedPosts, setTaggedPosts] = useState([] as PhotoData[]);

    useEffect(() => {
        if (allPhotos.length === 0)
            loadAllPhotos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTaggedPosts(allPhotos.filter((element: PhotoData) => element.tags.includes(String(tag))));
    }, [allPhotos]);

    return (
        <div className='taggedPosts'>
            <Title>Tag: #{tag}</Title>

            <Divider />

            {taggedPosts &&
                <div className="postsWithTags">
                    {taggedPosts.map((element, index) => {
                        return (
                            <Post key={index} data={element} />
                        )
                    })}
                </div>
            }

        </div>
    )
}

export default TaggedPosts