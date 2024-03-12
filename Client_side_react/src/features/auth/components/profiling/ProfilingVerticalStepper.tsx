import { toAbsoluteUrl } from "../../../../helpers/AssetHelpers";
import ActiveSection from "../register/ActiveSection";


export default function ProfilingVerticalStepper() {

    return (
        <div className="absolute top-[8%] left-[18%] flex h-[85%] w-[45%] flex-col"
            style={{ backgroundColor: 'transparent' }}
        >
            <div>
                <img src={toAbsoluteUrl('/assets/images/logos/logo.png')} alt='logo_shape' style={{ height: '150px auto', width: '150px ', maxWidth: '100%', marginBottom: '20px' }} />
            </div>
            <div className="d-flex flex-column">
                <ActiveSection num='1' title='Sign Up' description="Create Your Account" />
                <div style={{ borderLeft: '3px solid #05445E', height: '100px', marginLeft: '3.5%' }}>{" "}</div>
                <ActiveSection num='2' title='Profiling' description="Let's Know About You More" style={{ paddingLeft: '40px' }} />
            </div>

        </div>
    )

}
