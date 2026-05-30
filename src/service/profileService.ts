
export const profileService = {
    async getProfile(): Promise<any | null> {
        return fetch(import.meta.env.VITE_API_URL + '/me', {
            credentials: 'include',
        }).then(res => {
            if (!res.ok) throw new Error('Unauthorized');
            return res.json();
        }).catch(() => null);
    }
}