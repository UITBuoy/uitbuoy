import Svg, { Path } from 'react-native-svg';

export default function ProfileIcon({ focused }: { focused: boolean }) {
    return (
        <Svg width="22" height="24" viewBox="0 0 22 24" fill="none">
            <Path
                d="M11 12C14.3141 12 17 9.31406 17 6C17 2.68594 14.3141 0 11 0C7.68594 0 5 2.68594 5 6C5 9.31406 7.68594 12 11 12ZM15.2 13.5H14.4172C13.3766 13.9781 12.2187 14.25 11 14.25C9.78125 14.25 8.62812 13.9781 7.58281 13.5H6.8C3.32187 13.5 0.5 16.3219 0.5 19.8V21.75C0.5 22.9922 1.50781 24 2.75 24H19.25C20.4922 24 21.5 22.9922 21.5 21.75V19.8C21.5 16.3219 18.6781 13.5 15.2 13.5Z"
                fill={focused ? '#3FB7E6' : '#CFCFCF'}
            />
        </Svg>
    );
}
