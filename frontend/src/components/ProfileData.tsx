import { useState, useContext } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UrlContext from '@/contexts/UrlContext';
import { Typography, Button } from 'antd';
import { usePhotos } from '@/contexts/PhotosContext';

function ProfileData() {
    const { loadAllPhotos } = usePhotos();

    const { user, setUser, changeData } = useAuth();
    const { url } = useContext(UrlContext);
    const { Title, Text, Paragraph } = Typography;

    const [userNickName, setUserNickName] = useState(user?.nickName);
    const [userName, setUserName] = useState(user?.name);
    const [userLastName, setUserLastName] = useState(user?.lastName);
    const [userEmail, setUserEmail] = useState(user?.email);

    const [loading, setLoading] = useState(false);

    const checkForChanges = userNickName === user?.nickName && userName === user?.name && userLastName === user?.lastName && userEmail === user?.email;

    async function updateData() {
        if (!userNickName || !userName || !userLastName || !userEmail) {
            return
        }

        setLoading(true);

        const response = await fetch(url + "/user/update", {
            method: "PATCH",
            body: JSON.stringify({
                lastEmail: user?.email,
                newName: userName,
                newLastName: userLastName,
                newEmail: userEmail,
                newNickName: userNickName,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);

            await changeData(userName, userLastName, userEmail, userNickName);

            setLoading(false);

            loadAllPhotos();
        }
    }

    return (
        <div className='profileData'>
            <Title level={4}>Profile data</Title>
            <Text>Nickname:</Text><Paragraph editable={{ onChange: setUserNickName }}>{userNickName}</Paragraph>
            <Text>Name:</Text><Paragraph editable={{ onChange: setUserName }}>{userName}</Paragraph>
            <Text>Lastname:</Text><Paragraph editable={{ onChange: setUserLastName }}>{userLastName}</Paragraph>
            <Text>Email:</Text><Paragraph editable={{ onChange: setUserEmail }}>{userEmail}</Paragraph>

            <Button
                type="primary"
                disabled={checkForChanges ? true : false}
                loading={loading}
                onClick={() => updateData()}
            >
                Update data
            </Button>
        </div>
    )
}

export default ProfileData