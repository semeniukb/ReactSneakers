import styles from "../component/Card/Card.module.scss";
import Skeleton from "../component/Skeleton/Skeleton";

export const renderSkeleton = () => {
    return (
        [...Array(8)].map(elem => {
            return (
                <div className={styles.main__card}>
                    <Skeleton/>
                </div>)
        })
    )
}