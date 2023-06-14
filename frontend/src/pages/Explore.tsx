import React from 'react'
import { Typography, Divider, Image } from 'antd'

function Explore() {
    const { Title } = Typography;

    return (
        <>
            <div className='explore'>
                <Title>Explore</Title>

                <Divider />

                {/* <div className='postAuthor'>
                    <Title level={4}>User profile photo</Title>
                    {userProfilePhoto.map((element, index) => {
                        return (
                            <Image
                                key={index}
                                className='profilePhoto'
                                preview={false}
                                width={200}
                                style={{ borderRadius: "20px" }}
                                src={url + "/photos/show/" + element.id + "?t=" + new Date().getTime()}
                            />
                        )
                    })}
                </div>

                <Divider />

                <Title level={4}>User posts</Title>
                <div className="userPosts">
                    {userPhotos.map((element, index) => {
                        return (
                            <Post key={index} data={element} />
                        )
                    })}
                </div> */}
            </div>
        </>
    )
}

export default Explore