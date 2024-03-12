import { toAbsoluteUrl } from "../../../../helpers/AssetHelpers"
import ActiveSection from "./ActiveSection"
import CustomSection from "./CustomSection"
export default function VerticalStepper() {
    return (
        <div className="absolute top-[8%] left-[18%] flex h-[85%] w-[45%] flex-col"
        >
            <div>
                <img src={toAbsoluteUrl('/assets/images/logos/logo.png')} alt='logo_shape' className="h-[150px] w-auto-[150px] max-w-[100%] mb-[20px]" />
            </div>
            <div className="flex flex-col items-start">
                <ActiveSection num='1' title='Sign Up' description="Create Your Account" />
                <div style={{ borderLeft: '3px solid #05445E', height: '100px', marginLeft: '3.5%', opacity: "50%" }}>{" "}</div>
                <CustomSection num='2' title='Profiling' description="Let's Know About You More" />
                <div style={{ borderLeft: '3px solid #05445E', height: '100px', marginLeft: '3.5%', opacity: "50%" }}>{" "}</div>
                <CustomSection num='3' title='Payment' description="Get Access To Your Courses" />
            </div>

        </div>
    )
}