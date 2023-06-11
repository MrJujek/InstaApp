import { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

function LogoutButton() {
    const { logout } = useAuth();

    const [showModal, setShowModal] = useState(false);

    return (
        <div className='logout'>
            <Button type="primary" onClick={() => setShowModal(true)}>
                <PoweroffOutlined />Logout
            </Button>
            <Modal
                title="You are about to logout"
                centered
                width={400}
                open={showModal}
                onOk={() => {
                    logout();
                    setShowModal(false)
                }}
                onCancel={() => setShowModal(false)}
            >
            </Modal>
        </div >
    );
}

export default LogoutButton;