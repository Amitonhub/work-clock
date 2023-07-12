import { getServerSession } from "@/utils/getServerSession"
import { LogIn } from "@/views"
import { redirect } from "next/navigation"

async function Page() {

  const session = await getServerSession()
  if (session) {
    redirect('/dashboard')
  }else{
    return <LogIn />
  }
}
export default Page
