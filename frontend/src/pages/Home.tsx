import { useEffect, useState } from "react";
import Post, { PhotoData } from "@/components/Post";
import { Typography, Button, Empty } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePhotos } from "@/contexts/PhotosContext";

function Home() {
    const { user, logout } = useAuth();
    const { allPhotos, loadAllPhotos } = usePhotos();

    const navigate = useNavigate();
    const { Text, Title } = Typography;

    const [photos, setPhotos] = useState([] as PhotoData[])

    useEffect(() => {
        if (!(user && typeof (user) === "object")) {
            logout();
        }
    }, [user, navigate]);

    useEffect(() => {
        if (allPhotos.length === 0)
            loadAllPhotos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setPhotos(allPhotos.filter((element: PhotoData) => element.profile === false));
    }, [allPhotos]);

    return (
        <div className="home">
            <Title>Home</Title>

            {photos.length === 0 &&
                <div className="noPhotos">
                    <Empty
                        imageStyle={{ height: 100 }}
                        description={
                            <Text>No photos to show</Text>
                        }
                    >
                        <Link to="/createPost"><Button type="primary">Create post</Button></Link>
                    </Empty>
                </div>
            }

            <div className="photos">
                {photos.map((element, index) => {
                    return (
                        <div key={index}>
                            <Post data={element} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home