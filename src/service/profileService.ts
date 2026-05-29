
export const profileService = {
    async getProfile(): Promise<any | null> {
        return fetch(import.meta.env.BASE_URL + '/me', {
            credentials: 'include',
        }).then(res => {
            if (!res.ok) throw new Error('Unauthorized');
            return res.json();
        }).catch(() => null);
    }
}