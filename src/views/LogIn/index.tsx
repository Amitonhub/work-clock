'use client'
import styles from "./style.module.scss"
import Image from "next/image"
import Clock from './icons/work-clock.png'
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginForm } from "./types"
import { getUserLocation } from "@/utils/getUserLocation"
import axios from 'axios';
import { INVALID_REGISTRAION, LOGIN_ERROR, SIGNED_IN } from "./constants"
import { ToastError, ToastSuccess } from "@/utils/showToastAlerts"
import { useDispatch } from 'react-redux'
import { logIn } from "@/redux/features/authSlice"
import CryptoJS from "crypto-js";
import { useLogInMutation } from "@/redux/services/authApi"
import Loader from "@/components/Loader/Loader"
import { useEffect } from "react"
import { useAppSelector } from "@/redux/store"

function LogInPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()
  const dispatch = useDispatch()
  const checkTheme = useAppSelector((state) => state.theme.darkMode)
  const [LoginAction, { isLoading, isSuccess, error, isError }] = useLogInMutation();
  const secretPass = "XkhZG4fW2t2W";

  const onSubmit: SubmitHandler<LoginForm> = async (formData) => {
    const { latitude, longitude } = await getUserLocation();
    const updatedFormData = { ...formData, latitude, longitude };
    formData.password = CryptoJS.AES.encrypt(
      JSON.stringify(formData.password),
      secretPass
    ).toString();
    const updatedFormDataState = { ...formData, latitude, longitude };
    try {
      await LoginAction({ ...updatedFormData })
      dispatch(logIn(updatedFormDataState))
    } catch (error) {
      ToastError(INVALID_REGISTRAION)
    }
  };

  useEffect(() => {
    if(isSuccess){
      router.push('/dashboard');
      ToastSuccess(SIGNED_IN)
    }
  
    if (isError) {
      ToastError(LOGIN_ERROR);
    }
  
    if(isLoading){
      <Loader/>
    }
  }, [isSuccess, isLoading, isError])
  return (
    <div className={`${styles.container} ${checkTheme ? styles.darkContainer : ''}`}>
      <div className={styles.ellipse1} />
      <div className={styles.ellipse2} />
      <div className={styles.logoContainer}>
        <div>
          <Image className={`${styles.logoImage} w-100 h-100 mr-2`} src={Clock} width={100} height={100} priority alt="Natrix_Mini_Logo" />
        </div>
        <div className={styles.workClockHeading}>
          Work Clock
        </div>
        <div className={styles.ellipse3} />
      </div>
      <h1 className={styles.SignInText}>
        Enter credentials to login
      </h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          className={styles.input}
          placeholder="name@natrixsoftware.com"
          {...register("email", { required: true })}
          autoComplete="on"
        />
        {errors.email && <span className={styles.error}>email is required</span>}

        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          className={styles.input}
          placeholder="********"
          {...register("password", { required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/})}
          autoComplete="on"
        />
        {errors.password && <span className={styles.error}>password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</span>}

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <div className={styles.ellipse4} />
    </div>
  )
}

export default LogInPage
