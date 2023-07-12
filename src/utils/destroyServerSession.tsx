import { cookies } from 'next/headers';

export const destroyServerSession = async () => {
    const cookie = cookies()
    const accessToken = cookie.get('accessToken')
    return accessToken;
};
