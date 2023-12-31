'use client'
import { useState, useEffect } from 'react';
import { getServerSession } from "../../utils/getServerSession";
import Dashboard from "../../views/dashboard";
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import { ToastError } from '@/utils/showToastAlerts';
import { SESSION_EXPIRED } from '@/constants';
import { useDispatch } from 'react-redux';
import { token } from '@/redux/features/tokenSlice';
import { useAppSelector } from '@/redux/store';

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const dispatch = useDispatch()
  const checkTheme = useAppSelector((state) => state?.theme?.darkMode)

  useEffect(() => {
    checkSession();
  }, [router]);

  async function checkSession() {
    const session = await getServerSession();
    dispatch(token(session))
    if (!session) {
      setIsLoggedIn(false);
      ToastError(SESSION_EXPIRED)
    } else {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login');
    }
  }, [loading, isLoggedIn, router]);

  if (loading) {
    return <Loader />;
  }

  return isLoggedIn ?
    <>
      <div className={checkTheme ? 'dark-dashboard-layout' : 'light-dashboard-layout'}>
        <Dashboard />
      </div>
    </>
    : null;


  //  return <Dashboard />;
}

export default Page;
