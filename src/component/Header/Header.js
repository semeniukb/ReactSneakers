import logo from "../../assets/logo.png";
import cart from "../../assets/cart.svg";
import heart from "../../assets/heart.svg";
import user from "../../assets/user.svg";
import {Link} from "react-router-dom";
import styles from "./Header.module.scss"
function Header ({onBasketOpen}) {
    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
                <Link to='/' >
                    <div className={styles.header__left}>
                        <img width={40} height={40} src={logo} alt="Logo"/>
                        <div className={styles.header__leftContent}>
                            <p>REACT SNEAKERS</p>
                            <span>Магазин лучших кроссовок</span>
                        </div>
                    </div>
                </Link>
                <div className={styles.header__right}>
                    <ul className={styles.header__rightList} >
                        <li className={styles.header__rightListItem} onClick={onBasketOpen} >
                            <img width={18} height={18} src={cart} alt="cart"/>
                            <span>1205 грн</span>
                        </li>
                        <Link to="/favorites">
                            <li>
                                <img width={18} height={18} src={heart} alt="heart"/>
                            </li>
                        </Link>
                        <li>
                            <img width={18} height={18} src={user} alt="user"/>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header