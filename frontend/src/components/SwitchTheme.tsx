import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { Switch } from 'antd';
import { useTheme } from '@/contexts/ThemeContext';

function SwitchTheme() {
    const { isDarkTheme, changeTheme } = useTheme();

    const handleToggleTheme = () => {
        changeTheme();
    };

    return (
        <>

            <ThemeContext.Consumer>
                {({ isDarkTheme, changeTheme }) => (
                    <Switch
                        checked={isDarkTheme}
                        checkedChildren="Dark Mode"
                        unCheckedChildren="Light Mode"
                        onChange={changeTheme}
                    />
                )}
            </ThemeContext.Consumer>
        </>
    );
};
export default SwitchTheme;