import plus from "../../assets/plus.svg";
import arrow from "../../assets/arrow.svg";
import {EmptyBasket} from "./EmptyBasket";
import {useState} from "react";
import axios from "axios";
import {useCountPrice} from "../../hooks/useCountPrice";
import styles from "./Basket.module.scss"

function Basket({ onBasketClose, onDeleteBasketItem, URL1, URL2, opened }) {
    const [isOrderComplete, setIsOrderComplete] = useState(false)
    const [isOrderId, setIsOrderId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { setBasketItem, basketItem, price } = useCountPrice()
    const onOrderClick = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post(URL2 + "/orders", {items: basketItem})
            setIsOrderId(data.id)
            setIsOrderComplete(true)
            setBasketItem([])

            for(let item of basketItem) {
               await axios.delete(URL1 + `/card/${item.id}`)
            }

        } catch (err) {
            alert("Something went wrong")
        }
        setIsLoading(false)
    }
    return (
        <section className={`${styles.basket__overlay} ${opened ? styles.basket__overlayVisible : ''}`}>
            <div className={styles.basket__body}>
                <div className={styles.basket__header}>
                    <h2>Корзина</h2>
                    <button className={styles.basket__close_btn} onClick={onBasketClose}>
                        <img width={14} height={14} src={plus} alt="Close"/>
                    </button>
                </div>
                {basketItem.length ? (
                    <div className={styles.basket__elements}>
                        <div className={styles.basket__wrapper}>
                            {basketItem?.map((item) => {
                                return (
                                    <div key={item.image} className={styles.basket__card}>
                                        <div>
                                            <img
                                                className={styles.basket__card_img}
                                                src={process.env.PUBLIC_URL + `${item.image}`}
                                                alt="Sneakers"
                                            />
                                        </div>
                                        <div>
                                            <p>{item.title}</p>
                                            <span>{item.price?.toFixed(2)} USD</span>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => onDeleteBasketItem(item?.id)}
                                                className={styles.basket__close_btn}
                                            >
                                                <img width={14} height={14} src={plus} alt="Close"/>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <ul className={styles.basket__footer}>
                            <li>
                                <span>Итого: </span>
                                <div></div>
                                <b>{price.toFixed(2)} USD</b>
                            </li>
                            <li>
                                <span>VAT 5%: </span>
                                <div></div>
                                <b>{(price * 0.05).toFixed(2)} USD</b>
                            </li>
                        </ul>
                        <button disabled={isLoading} className="greenButton" onClick={onOrderClick}>
                            Оформить заказ
                            <img src={arrow} alt="arrow"/>
                        </button>
                    </div>
                ) :
                <EmptyBasket image={isOrderComplete ? "/img/complete-order.jpg" :`/img/empty-cart.jpg`}
                             title={isOrderComplete ? `Ваш заказ #${isOrderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
                             header={isOrderComplete ? "Заказ оформлен!" :'Корзина пустая'}
                             ordered={isOrderComplete}
                />}
            </div>
        </section>
    );
}

export default Basket