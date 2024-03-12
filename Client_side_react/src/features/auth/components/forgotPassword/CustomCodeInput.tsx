import React, { ForwardedRef } from 'react';

interface InputProps {
    id: string;
    name: string;
    maxLength?: number;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: () => void;
    ref?: ForwardedRef<HTMLInputElement>;
}

const CustomInput: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(
    ({ id, name, maxLength, value, onChange, onKeyUp }, ref) => {
        return (
            <input
                className='rounded-full bg-[#E4F6F8] text-center pl-[15px] w-[60px] h-[60px] border-inputBorderColor border-[solid] focus:border-[#4eb8dd] focus:bg-[#edf8fc] focus:shadow-[0px_2px_10px_rgba(0,0,0,0.1)] focus:outline-none'
                type='number'
                id={id}
                name={name}
                maxLength={maxLength}
                value={value}
                onChange={onChange}
                onKeyUp={onKeyUp}
                ref={ref}
            />
        );
    }
);

export default CustomInput;
