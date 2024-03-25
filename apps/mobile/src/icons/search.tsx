import Svg, { Path } from 'react-native-svg';

export default function SearchIcon() {
    const color = '#666666';

    return (
        <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <Path
                d="M6.41667 11.0833C8.99401 11.0833 11.0833 8.99401 11.0833 6.41667C11.0833 3.83934 8.99401 1.75 6.41667 1.75C3.83934 1.75 1.75 3.83934 1.75 6.41667C1.75 8.99401 3.83934 11.0833 6.41667 11.0833Z"
                stroke={color}
                stroke-width="1.16667"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M12.25 12.2504L9.71252 9.71289"
                stroke={color}
                stroke-width="1.16667"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </Svg>
    );
}
