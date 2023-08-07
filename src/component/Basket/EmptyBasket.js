import arrow from "../../assets/arrow.svg";
import styles from "./Basket.module.scss"
import {useContext} from "react";
import AppContext from "../../context";

export const EmptyBasket = ({image, title, header, ordered}) => {
    const {setBasketOpen} = useContext(AppContext);
    return (
        <div className={styles.emptyBasket} >
            <img
                src={process.env.PUBLIC_URL + image}
                alt="empty"
                className={styles.emptyImage}
            />
            <h2 className={ordered ? styles.emptyGreenHeader: ""}>{header}</h2>
            <p className={styles.emptyTitle}>{title}</p>
            <button className={styles.emptyButton} onClick={() => setBasketOpen(false)}>
                <img src={arrow} alt="arrow"/>
                Вернуться назад
            </button>
        </div>
    )
}