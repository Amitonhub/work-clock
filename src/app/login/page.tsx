import { getServerIp, getServerSession } from "@/utils/getServerSession"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"
import dynamic from 'next/dynamic';

const LogIn = dynamic(() => import('@/views/LogIn/LogIn'));

async function Page(request: NextRequest) {

  const session = await getServerSession()
  // const userIp = await getServerIp(request)
  // console.log(userIp)
  if (session) {
    redirect('/dashboard')
  }else{
    return <LogIn />
  }
}
export default Page
