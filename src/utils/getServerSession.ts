import { cookies } from 'next/headers';

export const getServerSession = async () => {
    const cookie = cookies()
    const accessToken = cookie.get('accessToken')
    console.log(accessToken)
    return accessToken;
};