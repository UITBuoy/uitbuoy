import Svg, { Path } from 'react-native-svg';

export default function MessageIcon() {
    const color = '#666666';

    return (
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <Path
                d="M11.3333 25.3337H10.6666C5.33329 25.3337 2.66663 24.0003 2.66663 17.3337V10.667C2.66663 5.33366 5.33329 2.66699 10.6666 2.66699H21.3333C26.6666 2.66699 29.3333 5.33366 29.3333 10.667V17.3337C29.3333 22.667 26.6666 25.3337 21.3333 25.3337H20.6666C20.2533 25.3337 19.8533 25.5337 19.6 25.867L17.6 28.5337C16.72 29.707 15.28 29.707 14.4 28.5337L12.4 25.867C12.1866 25.5737 11.6933 25.3337 11.3333 25.3337Z"
                stroke={color}
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M21.3286 14.667H21.3397"
                stroke={color}
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M15.9939 14.667H16.0051"
                stroke={color}
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M10.6593 14.667H10.6705"
                stroke={color}
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </Svg>
    );
}
