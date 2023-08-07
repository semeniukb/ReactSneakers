import plus from "../../assets/plus.svg";
import arrow from "../../assets/arrow.svg";
import {EmptyBasket} from "./EmptyBasket";
import {useContext, useState} from "react";
import AppContext from "../../context";
import axios from "axios";

function Basket({ onBasketClose, onDeleteBasketItem }) {
    const [isOrderComplete, setIsOrderComplete] = useState(false)
    const [isOrderId, setIsOrderId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { setBasketItem, basketItem, URL1, URL2 } = useContext(AppContext);
    const onOrderClick = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post(URL2 + "/orders", {basketItem})
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
        <section className="basket__overlay">
            <div className="basket__body">
                <div className="basket__header">
                    <h2>Корзина</h2>
                    <button className="basket__close-btn" onClick={onBasketClose}>
                        <img width={14} height={14} src={plus} alt="Close"/>
                    </button>
                </div>
                {basketItem.length ? (
                    <div className="basket__elements">
                        <div className="basket__wrapper">
                            {basketItem?.map((item) => {
                                return (
                                    <div key={item.image} className="basket__card">
                                        <div className="basket__card-box">
                                            <img
                                                className="basket__card-img"
                                                src={process.env.PUBLIC_URL + `${item.image}`}
                                                alt="Sneakers"
                                            />
                                        </div>
                                        <div>
                                            <p>{item.title}</p>
                                            <span>{item.price}</span>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => onDeleteBasketItem(item?.id)}
                                                className="basket__close-btn"
                                            >
                                                <img width={14} height={14} src={plus} alt="Close"/>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <ul className="basket__footer">
                            <li className="basket__footer-margin">
                                <span>Итого: </span>
                                <div></div>
                                <b>21 498 руб. </b>
                            </li>
                            <li>
                                <span>Налог 5%: </span>
                                <div></div>
                                <b>1074 руб. </b>
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