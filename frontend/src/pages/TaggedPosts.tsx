import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { Typography, Divider, Empty, Button } from 'antd'
import Post, { PhotoData } from '@/components/Post';
import { usePhotos } from '@/contexts/PhotosContext';


function TaggedPosts() {
    const { allPhotos, loadAllPhotos } = usePhotos();

    const { tag } = useParams();
    const { Title, Text } = Typography;

    const [taggedPosts, setTaggedPosts] = useState([] as PhotoData[]);

    useEffect(() => {
        if (allPhotos.length === 0)
            loadAllPhotos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTaggedPosts(allPhotos.filter((element: PhotoData) => element.tags.includes(String(tag))));
    }, [tag]);

    useEffect(() => {
        setTaggedPosts(allPhotos.filter((element: PhotoData) => element.tags.includes(String(tag))));
    }, [allPhotos]);

    return (
        <div className='taggedPosts'>
            <Title>Tag: #{tag}</Title>

            <Divider />

            {taggedPosts && taggedPosts.length > 0 &&
                <div className="postsWithTags">
                    {taggedPosts.map((element, index) => {
                        return (
                            <Post key={index} data={element} />
                        )
                    })}
                </div>
            }
            {taggedPosts && taggedPosts.length === 0 &&
                <div className="noTags">
                    <Empty
                        imageStyle={{ height: 100 }}
                        description={
                            <Text>No photos with this tag</Text>
                        }
                    >
                        <Link to="/createPost"><Button type="primary">Create post</Button></Link>
                    </Empty>
                </div>
            }

        </div>
    )
}

export default TaggedPosts