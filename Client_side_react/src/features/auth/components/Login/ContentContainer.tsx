import { toAbsoluteUrl } from "../../../../helpers/AssetHelpers";
import './index';

export default function SignInContent() {
  return (
    <div className="content-wrapper">
      <div>
        <img src={toAbsoluteUrl('/assets/images/logos/logo.png')} alt="logo_shape" className="h-[120px] w-[150px] " />
      </div>
      <div className="flex flex-col items-center justify-between ">
        <div>
          <span className="content-header">
            Start Taking Control Of Your Career
          </span>
        </div>
        <div className="text-center">
          <span className="content-text">
            Gain practical experience, mentorship and guidance you need
            <br />
            to start your new career
          </span>
        </div>
      </div>
    </div>

  );
}
