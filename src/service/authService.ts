export const authService = {
    async getLoginUrl() {
        return fetch(import.meta.env.BASE_URL + "/auth/login", {
                credentials: 'include',
            })
            .then(response => response.json())
            .then(data => {
                return data.loginUrl;
            })
            .catch(error => {
                console.error("Error during login:", error);
                throw error;
            });

    },
    async logout(): Promise<string | null> {
        return fetch(import.meta.env.BASE_URL + "/auth/logout", {
                method: 'POST',
                credentials: 'include',
            })
            .then(async response => {
                if (!response.ok) {
                    console.error("Logout failed:", response.statusText);
                    return
                }

                const data = await response.json();
                return data.logoutUrl
            })
            .catch(error => {
                console.error("Error during logout:", error);
                return null
            });
    }

}