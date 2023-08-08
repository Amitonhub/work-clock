'use client'
import { useState, useEffect } from 'react';
import { getServerSession } from '../../utils/getServerSession';
import LogInPage from '../../views/LogIn';
import { useRouter } from 'next/navigation'; 
import Loader from '@/components/Loader/Loader';

function Page() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const session = await getServerSession();
      if (session) {
        router.push('/dashboard');
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    }

    checkSession(); 

  }, [router]);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      <LogInPage />
    }
  }, [loading, isLoggedIn, router]);

  if (loading) {
    return <Loader />;
  }

  return isLoggedIn ? null : <LogInPage />;
}

export default Page;
