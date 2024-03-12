import { GoogleLogin } from 'react-google-login';
import { toAbsoluteUrl } from '../../../../helpers/AssetHelpers';

function GoogleBtn() {
    const onSuccess = (response: any) => {
        console.log(response);
    };

    const onFailure = (error: any) => {
        console.log(error);
    };

    return (
        <GoogleLogin
            clientId=""
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
                <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="w-[250px] border-[#D3D3D3] pl-[12px] h-[38px] border-[1px] rounded-[5px] m-[5px] cursor-pointer"
                >
                    <div className="flex justify-start items-start  ">
                        <img
                            src={toAbsoluteUrl('/assets/icons/google.png')}
                            alt="Sign in with Google"
                            className="h-5 w-5"
                        />
                        <span className=" font-normal px-[10px] tracking-[0.25px] text-darkBlue">
                            {' '}
                            Login with Google
                        </span>
                    </div>
                </button>
            )}
        />
    );
}

export default GoogleBtn;
