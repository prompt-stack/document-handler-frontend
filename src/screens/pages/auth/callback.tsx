import { useEffect, useState } from 'react';
import { cognitoCallbackService } from '../../../service/cognitoCallbackService';
import ReusableButton from '../../components/ReusableButton';

const Callback = () => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        handleCallback()
    }, []); 

    async function handleCallback() {
       const error = await cognitoCallbackService.handleCallback();
       if (error) {
           console.error("Error during callback:", error);
           setError(error);
       }
    }

    if(error) {
        return (
            <div className="flex items-center justify-center flex-col">
                <h1 className="text-3xl font-bold text-red-500">Login failed: {error}</h1>
                <br />
                <ReusableButton type="button" label="Go to Login" onClickHandler={() => window.location.href = '/login'} />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">Logging in...</h1>
        </div>
    );
}

export default Callback;