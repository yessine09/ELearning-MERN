import { toAbsoluteUrl } from "../../../../helpers/AssetHelpers";
import Sidebar from "../../SideBarShaper";
import Stepper from "./personalnfo/Stepper";

export default function ProfileSetting() {
    return (
        < div className="flex h-fit" >
            <Sidebar />
            <div className="flex-1  bg-gray-100 px-[10%] py-[1%]">
                <div className="flex">
                    <img src={toAbsoluteUrl('/assets/icons/settings.svg')} alt="settings" />
                    <div className=""><h3 className="font-font font-[400] px-[10px] text-darkBlue text-[20px]">Settings</h3></div>
                </div>
                <div className=" flex py-[1%]">
                    <div className=""><h3 className="font-font font-[600] text-darkBlue text-[26px]">Profile Settings</h3></div>
                    <div className="ml-10 mt-[9px] border-b-2 border-gray-200 w-[550px] h-5"> {" "} </div>
                    <div className="flex ml-10 ">
                        <div className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-white mr-2 shadow-lg">
                            <img src={toAbsoluteUrl('/assets/icons/message.svg')} alt="" />
                        </div>
                        <div className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-white mr-2 shadow-lg">
                            <img src={toAbsoluteUrl('/assets/icons/ring.svg')} alt="" />
                        </div>
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className="flex-1">
                        <Stepper />
                    </div>
                </div>
            </div>
        </div >
    )
}
