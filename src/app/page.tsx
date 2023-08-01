'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getServerSession } from '../utils/getServerSession';
import Loader from '@/components/Loader/Loader';

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
    
    async function checkSession() {
      const session = await getServerSession();
      if (!session) {
        router.push('/login');
      } else {
        router.push('/dashboard');
      }
      setLoading(false);
    }
  }, [router]);
  

  if (loading) {
    return <Loader />;
  }

  return null;
}

export default Page;
