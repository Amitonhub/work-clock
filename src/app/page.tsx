'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getServerSession } from '../utils/getServerSession';
import Loader from '@/components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { token } from '@/redux/features/tokenSlice';

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    checkSession();
    
    async function checkSession() {
      const session = await getServerSession();
      dispatch(token(session))
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
