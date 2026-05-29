import { useEffect } from 'react';
import LoginHook from '../../custom-hooks/loginHook';

const Login = () => {
    const { isLoading, loginUrl } = LoginHook();

    useEffect(() => {
        if (loginUrl) {
            console.log("Redirecting to login URL:", loginUrl);
            window.location.href = loginUrl;
        }
    }, [loginUrl]);

    if(isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">Loading...</h1>
            </div>
        );
    }


    // window.location.href = loginUrl ?? ""
    return (<></>);
}

export default Login;