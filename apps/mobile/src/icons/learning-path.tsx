import Svg, { Path } from 'react-native-svg';

export default function LearningPathIcon({ focused }: { focused: boolean }) {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
                d="M24 24L19.5 0H13.5V1.5H10.5V0H4.5L0 24H10.5V18H13.5V24H24ZM10.5 4.5H13.5V7.5H10.5V4.5ZM10.5 15V10.5H13.5V15H10.5Z"
                fill={focused ? '#3FB7E6' : '#CFCFCF'}
            />
        </Svg>
    );
}
