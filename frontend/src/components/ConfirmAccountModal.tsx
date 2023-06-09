import { useEffect } from 'react'
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';

function ConfirmAccountModal() {
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    const { registerData } = useAuth();

    useEffect(() => {
        modal.info({
            title: 'You must confirm account before login',
            content: (
                <div>
                    <p>Click OK to confirm, otherwise you won't be able to log into your account.</p>
                </div>
            ),
            icon: <ExclamationCircleFilled />,
            async onOk() {
                const response = await fetch(registerData.data.link!, {
                    method: "GET"
                });
                if (response.ok) {
                    Modal.destroyAll()
                    navigate("/")
                }
            },
        });
    }, []);

    return (
        <div>{contextHolder}</div>
    );
}

export default ConfirmAccountModal