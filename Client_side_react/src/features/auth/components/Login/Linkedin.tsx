import { LinkedIn } from 'react-linkedin-login-oauth2';
import { toAbsoluteUrl } from '../../../../helpers/AssetHelpers';


function LinkedinBtn() {
  return (
    <LinkedIn
      clientId=""
      redirectUri={`${window.location.origin}/linkedin`}
      onSuccess={(code) => {
        console.log(code);
      }}
      onError={(error) => {
        console.log(error);
      }}
    >
      {({ linkedInLogin }) => (
        <button
          onClick={linkedInLogin}
          className="w-[250px] border-[#D3D3D3] pl-[12px]	h-[38px] border-[1px] rounded-[5px] m-[5px]"
        >
          <div className="flex justify-start items-center  ">
            <img
              src={toAbsoluteUrl('/assets/icons/linkedin.png')}
              alt="Sign in with Linked In"
              className="h-5 w-5"
            />
            <span className=" font-normal px-[10px] tracking-[0.25px] text-darkBlue">
              {' '}
              Login with Linkedin
            </span>
          </div>
        </button>
      )}
    </LinkedIn>
  );
}
export default LinkedinBtn;
