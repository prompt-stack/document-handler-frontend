export const cognitoCallbackService = {
    async handleCallback(): Promise<void | string> {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error_description');

        if (error) {
            console.log("error: ", error);
            return error;
        }

        if (!code || !state) {
            return "Missing code or state in callback URL";
        }

        try {
            await fetch(import.meta.env.VITE_API_URL + "/auth/callback", {
                credentials: 'include',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, state }),
            });
            window.location.href = '/';
        } catch (error) {
            console.error("Error during login:", error);
            return "An error occurred during login. Please try again.";
        }
    }
}