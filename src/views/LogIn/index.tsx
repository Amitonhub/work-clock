'use client'
import styles from "./style.module.scss"
import Image from "next/image"
import { Natrix_Mini_Logo } from '@/assets/icons'
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
import { useLogInMutation } from "@/redux/services/logInApi"

function LogInPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()
  const dispatch = useDispatch()
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
      if (isError) {
        ToastError(LOGIN_ERROR);
      } else {
        router.push('/dashboard');
        ToastSuccess(SIGNED_IN)
      }
    } catch (error) {
      ToastError(INVALID_REGISTRAION)
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.ellipse1} />
      <div className={styles.ellipse2} />
      <div className={styles.logoContainer}>
        <div>
          <Image className={`${styles.logoImage} w-100 h-100 mr-2`} src={Natrix_Mini_Logo} width={100} height={100} priority alt="Natrix_Mini_Logo" />
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
          {...register("password", { required: true })}
          autoComplete="on"
        />
        {errors.password && <span className={styles.error}>password is required</span>}

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <div className={styles.ellipse4} />
    </div>
  )
}

export default LogInPage
