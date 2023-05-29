import { useState } from 'react';
import { useAuth } from "../services/auth/context/AuthContext";

function LogoutButton() {
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const { logout } = useAuth();

    const handleLogout = () => {
        setShowConfirmBox(true);
    };

    const handleConfirm = () => {
        logout();

        setShowConfirmBox(false);
    };

    const handleCancel = () => {
        setShowConfirmBox(false);
    };

    return (
        <div>
            {showConfirmBox ? (
                <div>
                    <p>Are you sure you want to logout?</p>
                    <button onClick={handleConfirm}>Confirm</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <button onClick={handleLogout}>Logout</button>
            )}
        </div>
    );
}

export default LogoutButton;