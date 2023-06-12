import { useEffect, useState, useContext } from "react";
import Post, { PhotoData } from "@/components/Post";
import UrlContext from "@/contexts/UrlContext";
import { Typography, Button, Divider, Empty } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

function Home() {
    const [photos, setPhotos] = useState([] as PhotoData[])
    const { url } = useContext(UrlContext);
    const { user } = useAuth();
    const navigate = useNavigate();
    const { Text, Title } = Typography;

    useEffect(() => {
        if (!(user && typeof (user) === "object")) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        loadPhotos();
    }, []);

    async function loadPhotos() {
        const response = await fetch(url + "/photos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();

            setPhotos(data.filter((element: PhotoData) => element.profile === false));
        }
    }

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
                            <Divider />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home