import { useState } from "react";

interface CustomButtonProps {
    label: string;
    onClick: () => void;
    backgroundColor?: string;
    className?: string;
    active?: boolean; // Add this prop
}

export default function CustomButton({ label, onClick, backgroundColor, className, active }: CustomButtonProps) {
    const [hovered, setHovered] = useState(false);
    const handleClick = () => {
        onClick();
    };
    return (
        <button
            className={`cancelBtn ${className}`}
            style={{
                backgroundColor: active ? '#05445E' : (hovered ? '#05445E' : 'transparent'),
                color: active ? 'white' : (hovered ? 'white' : '#05445E'),
                border: '1px solid #05445E',
            }}
            type='submit'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
        >
            {label}
        </button>
    );
}
