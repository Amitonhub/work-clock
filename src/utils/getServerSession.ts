import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
axios.defaults.withCredentials = true
import { BASE_URL } from '@/constants';

// export const getServerSession = async () => {
//     const cookie = cookies()
//     const accessToken = cookie.get('accessToken')
//     console.log(accessToken)
//     return accessToken;
// };

export const getServerSession = async () => {

  try {
    const response = await axios.get(`${BASE_URL}/users/auth`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;
    if(data){
      return data;
    }else{
      return null;
    }
  } catch (error) {
    console.log("Session Expired!");
    return null;
  }
}

// getserverIp not working have to make api for this

// export async function getServerIp(request: NextRequest) {
//   const res = NextResponse.next();
//   let ip = request.ip ?? request.headers.get('x-real-ip')
//   const forwardedFor = request.headers.get('x-forwarded-for')
//   if (!ip && forwardedFor) {
//     ip = forwardedFor.split(',').at(0) ?? 'Unknown'
//     console.log(res)
//   }
//   console.log(res)
//   return res;
// }