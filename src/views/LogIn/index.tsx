'use client'
import styles from "./style.module.scss"
import Image from "next/image"
import Natrix_Mini_Logo from './icons/natrix_mini_logo.svg'
import { BASE_URL } from "@/constants"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginForm } from "./types"
import { getUserLocation } from "@/utils/getUserLocation"

function LogIn() {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()
  
    const onSubmit: SubmitHandler<LoginForm> = async (formData) => {
        const { latitude, longitude } = await getUserLocation()
        const updatedFormData = {...formData, latitude, longitude}
      
        const res = await fetch(`${BASE_URL}/users/login`, {
          credentials: 'include',
          method: "POST",
          body: JSON.stringify(updatedFormData),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await res.json()
      
        if (data.status === 401 || !data) {
          alert("Invalid Registration")
          console.log("Invalid Registration")
        } else {
          alert("Signed in Successful")
          console.log(updatedFormData)
          console.log("Signed in Successful")
          router.push('/dashboard')
        }
      }
      
    return (
        <div className={styles.container}>
            <div className={styles.ellipse1} />
            <div className={styles.ellipse2} />
            <div className={styles.logoContainer}>
                <div>
                    <Image className="w-100 h-100 mr-2" src={Natrix_Mini_Logo} width={100} height={100} alt="Natrix_Mini_Logo" />
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

export default LogIn
