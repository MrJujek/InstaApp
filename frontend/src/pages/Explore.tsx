import { useState, useEffect, useContext } from 'react'
import { Typography, Divider, Tag } from 'antd'
import UrlContext from '@/contexts/UrlContext';
import { Link } from 'react-router-dom';

function Explore() {
    const { Title, Text } = Typography;
    const { url } = useContext(UrlContext);

    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        loadTags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

            const tags = data.map((tag: { id: number, name: string, value: string }) => {
                return tag.name
            })

            setTags(tags)
        }
    }

    useEffect(() => {
        console.log(tags);
    }, [tags]);

    return (
        <>
            <div className='explore'>
                <Title>Explore</Title>

                <Divider />

                {tags && tags.length > 0 &&
                    <div className="tags">
                        {tags.map((element, index) => {
                            return (
                                <Link to={"/tag/" + element}><Tag key={index}><Text>#{element}</Text></Tag></Link>
                            )
                        })}
                    </div>
                }
            </div>
        </>
    )
}

export default Explore