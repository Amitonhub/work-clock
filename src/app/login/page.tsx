import { getServerIp, getServerSession } from "@/utils/getServerSession"
import { LogIn } from "@/views"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

async function Page(request: NextRequest) {

  const session = await getServerSession()
  // const userIp = await getServerIp(request)
  // console.log(userIp)
  // replace if line with below line for IP verification 
  // if (session && userIp) {
  if (session) {
    redirect('/dashboard')
  }else{
    return <LogIn />
  }
}
export default Page
