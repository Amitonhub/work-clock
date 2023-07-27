import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";

export const getServerSession = async () => {
    const cookie = cookies()
    const accessToken = cookie.get('accessToken')
    console.log(accessToken)
    return accessToken;
};


// getserverIp not working have to make api for this

export async function getServerIp(request: NextRequest) {
  const res = NextResponse.next();
  let ip = request.ip ?? request.headers.get('x-real-ip')
  const forwardedFor = request.headers.get('x-forwarded-for')
  if(!ip && forwardedFor){
    ip = forwardedFor.split(',').at(0) ?? 'Unknown'
    console.log(res)
  }
  console.log(res)
  return res;
}