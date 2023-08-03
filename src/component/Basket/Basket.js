import plus from "../../assets/plus.svg";
import arrow from "../../assets/arrow.svg";

function Basket({ onBasketClose, basketItem, setBasketItem, onDeleteBasketItem }) {

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
                        <button className="greenButton">
                            Оформить заказ
                            <img src={arrow} alt="arrow"/>
                        </button>
                    </div>
                ) : (
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%"}} >
                        <img
                            src={process.env.PUBLIC_URL + `/img/empty-cart.jpg`}
                            alt="empty"
                        />
                        <h2>Корзина пустая</h2>
                        <p style={{textAlign: "center", marginTop: "20px", opacity: "0.4"}}>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Basket