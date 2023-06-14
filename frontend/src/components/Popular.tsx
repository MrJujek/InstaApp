import { useEffect, useContext, useState } from 'react'
import { Typography } from 'antd';
import UrlContext from '@/contexts/UrlContext';
import { usePhotos } from '@/contexts/PhotosContext';

function Popular() {
    const { Title, Text } = Typography
    const { url } = useContext(UrlContext);
    const { allPhotos } = usePhotos();

    const [popularTags, setPopularTags] = useState<{ id: number, name: string, popularity: number }[]>([])

    useEffect(() => {
        loadPopularTags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        loadPopularTags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allPhotos])

    async function loadPopularTags() {
        const response = await fetch(url + "/tags", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();

            const top10 = data.slice(0);
            top10.sort(function (a: { id: number, name: string, popularity: number }, b: { id: number, name: string, popularity: number }) {
                return b.popularity - a.popularity;
            });
            top10.splice(10);

            setPopularTags(top10.filter((tag: { id: number, name: string, popularity: number }) => tag.popularity > 0))
        }
    }

    return (
        <aside className='popular'>
            <Title level={2}>Popular</Title>

            {popularTags.length > 0 &&
                popularTags.map((tag, index) => {
                    return (
                        <div key={index}>
                            <Text>#{tag.name} - {tag.popularity}</Text>
                        </div>
                    )
                })
            }
        </aside>
    )
}

export default Popular