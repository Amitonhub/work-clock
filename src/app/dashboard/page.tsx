import { getServerSession } from "@/utils/getServerSession";
import { redirect } from "next/navigation";
import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('@/views/dashboard/Dashboard'));

async function page() {
  const session = await getServerSession()
  if (!session) {
    redirect('/login')
  } else {
    return <Dashboard />
  }
}

export default page;
