import { ReactNode } from 'react';
import '../../../features/auth/components/Login/index';

type SubmitButtonProps = {
    children: ReactNode;
    type: 'submit' | 'button';
    clickHandler?: () => void;
    disabled?: boolean;
};

export default function Button({
    children,
    type,
    clickHandler,
    disabled
}: SubmitButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={clickHandler}
            className="bg-yellow w-[130px] ml-[35%] h-[40px] text-darkBlue font-semibold rounded-[3px] mt-[20px] shadow-[-5px_11px_11px_4px_rgba(213,213,213,0.75)]"
        >
            {children}
        </button>
    );
}
