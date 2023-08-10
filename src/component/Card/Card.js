import React, {useContext} from "react";
import unliked from "../../assets/unliked.svg";
import liked from "../../assets/liked.svg";
import btnPlus from "../../assets/btn-plus.svg";
import btnChecked from "../../assets/btn-checked.svg";
import styles from "./Card.module.scss"
import AppContext from "../../context";
function Card({ title, price, image, addItemToBasket, addFavorite, itemId, favorite = false}) {
    const { isItemAdded } = useContext(AppContext)
    const [isFavorite, setIsFavorite] = React.useState(favorite)

    const handleButtonPlus = () => {
        addItemToBasket({title, image, price})
    }
    const handleFavorite = () => {
        setIsFavorite(!isFavorite)
        addFavorite({title, image, price, itemId})
    }
    return (
            <div className={styles.main__card}>
                <img width={133} height={112} src={process.env.PUBLIC_URL + `${image}`} alt="Sneakers_1"/>
                {addFavorite && <img className={styles.main__card_unliked} onClick={handleFavorite} src={isFavorite ?  liked : unliked} alt="Unliked"/>}
                <p className={styles.main__card_text}>{title}</p>
                <div className={styles.main__card_price}>
                    <div>
                        <p>Цена</p>
                        <span>{price?.toFixed(2)} USD</span>
                    </div>
                    {addItemToBasket && <img onClick={handleButtonPlus} className={styles.btn} src={isItemAdded(image) ? btnChecked : btnPlus} alt="Plus"/>}
                </div>
            </div>

    )
}

export default Card