import { useEffect, useState } from "react";
import { authService } from "../../service/authService";

const LoginHook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loginUrl, setLoginUrl] = useState<string | null>("");

    useEffect(() => {
        console.log("LoginHook mounted");
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
            console.log("error: ", error);
            
            // window.location.href = '/login';
            return;
        }

        if (code) {
            return;
        }

        fetchLoginUrl()
    }, []);

    async function fetchLoginUrl() {
        setIsLoading(true);
        try {
            const url = await authService.getLoginUrl();
            setLoginUrl(url);
        } catch (error) {
            console.error("Error fetching login URL:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, loginUrl };
}

export default LoginHook;