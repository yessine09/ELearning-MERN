
import { BsThreeDots } from "react-icons/bs";
type ManageComponentProps = {
    handleEdit: () => void,

    onClick: () => void
}

export default function ManageComponent({ onClick, handleEdit }: ManageComponentProps) {

    return (


        <div className="d-flex flex-column flex-justify-between align-items-center form-control form-control-lg  shadow-sm " style={{ position: 'absolute', right: '10%', top: '1%', height: '100px', width: '100px' }}>
            <BsThreeDots className='text-fancy-blue' onClick={onClick} style={{ width: "25px", height: "25px" }} />
            <button className="text-dark-blue" style={{ border: 'none', backgroundColor: 'transparent', fontFamily: 'Segoe UI', fontWeight: 'bold', fontSize: '15px' }} onClick={handleEdit}>Edit</button>
        </div>

    )
}
