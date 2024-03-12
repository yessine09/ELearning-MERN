import { toAbsoluteUrl } from "../../../../helpers/AssetHelpers";

function AccessCourse() {
    return (
        <div className="relative mx-[3%] mt-[3.5%] mb-[3%] font-font">
            <img src={toAbsoluteUrl("/assets/icons/accessbg.png")} alt="" className="rounded-xl h-full" />
            <div className="absolute inset-0 bg-gradient-to-b rounded-xl opacity-90 from-[#ccf7f4] to-[#eed991]"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white mx-[4%]">
                <h1 className="text-center text-yellow font-bold  text-[35px]">It looks like you haven't finished the current week tasks</h1>
                <h1 className="text-center text-darkBlue text-[24px] font-semibold">Please complete all the tasks and challenges in your current week to unlock this one</h1>
            </div>
        </div>
    );
}

export default AccessCourse;
