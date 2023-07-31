import Image from 'next/image';
import styles from "./style.module.scss"
import { LoaderIcon } from '../../assets/icons'

function Loader() {
    return (
        <div className={styles.loader_wrap}>
            <Image
                src={LoaderIcon}
                alt="Loading..."
                priority
                quality={20}
            />
        </div>
    )
}

export default Loader