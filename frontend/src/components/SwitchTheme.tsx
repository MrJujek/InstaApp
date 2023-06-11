import { ThemeContext } from '@/contexts/ThemeContext';
import { Switch } from 'antd';

function SwitchTheme() {
    return (
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
    );
}
export default SwitchTheme;