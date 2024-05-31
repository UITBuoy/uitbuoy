import Svg, { Path } from 'react-native-svg';

export default function ChevronIcon({ color = 'black' }: { color?: string }) {
    return (
        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <Path
                d="M4.5 6.75L9 11.25L13.5 6.75"
                stroke={color}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </Svg>
    );
}
