'use client'
import Image from 'next/image';
import styles from "./style.module.scss"
import { LoaderIcon } from '../../assets/icons'
import { Watch } from "react-loader-spinner";

function Loader() {
    return (

        // natrix loader 
        // <div className={styles.loader_wrap}>
        //     <Image
        //         src={LoaderIcon}
        //         alt="Loading..."
        //         priority
        //         quality={20}
        //     />
        // </div>

        // custom Loader
        <div className={styles.loader_wrap}>
            <Watch
                height="80"
                width="80"
                radius="48"
                color="darkred"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loader