import { useState } from "react"
type CanelCustomButtonProps = {
    onClick?: () => void;
    title?: string;

}

export default function CancelButton({ onClick, title }: CanelCustomButtonProps) {
    const [loading, setLoading] = useState(false)


    return (
        <button
            type='submit'
            onClick={onClick}
            className='border-inputBorderColor ml-4 border-[2px] border-[solid] p-4 rounded-md font-font font-[600] w-fit my-[20px] py-2 items-center'
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
