import { useState } from "react";

type SaveCustomButtonProps = {
    onClick?: () => void;
    title?: string;

}

export default function SaveCustomButton({ onClick, title }: SaveCustomButtonProps) {
    const [loading, setLoading] = useState(false)


    return (
        <button
            type='submit'
            onClick={onClick}
            className='bg-yellow p-4 mr-4 rounded-md font-font font-[600] w-fit my-[20px] py-2 items-center'
        >
            {!loading && <span className='indicator-label'>{title}</span>}
            {loading && (
                <span className='indicator-progress' style={{ display: 'block' }}>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
            )}
        </button>
    )
}
