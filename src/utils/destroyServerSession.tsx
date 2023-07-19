import { cookies } from 'next/headers';

export const destroyServerSession = async () => {
    const cookie = cookies()
    const accessToken = cookie.set({
        name: 'accessToken',
        value: '',
        expires: 0,
        path: '/', // For all paths
      })
    return accessToken;
};