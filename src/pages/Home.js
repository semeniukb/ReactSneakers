import search from "../assets/search.svg";
import Card from "../component/Card/Card";
import Skeleton from "../component/Skeleton/Skeleton";
import styles from "../component/Card/Card.module.scss";
import AppContext from "../context";
import {useContext} from "react";

function Home () {
    const { findSneakers, setFindSneaker, addItemToBasket, data, addFavorite, basketItem, loadingCards } = useContext(AppContext)
    const renderSkeleton = () => {
        return (
            [...Array(8)].map(elem => {
                return (
                    <div className={styles.main__card}>
                        <Skeleton/>
                    </div>)
            })
        )
    }
    const renderCards = () => {
       return data?.filter(item => item.title.toLowerCase().includes(findSneakers.toLowerCase())).map(item => (
                <Card key={item.imageURL}
                      addItemToBasket={(obj) => addItemToBasket(obj)}
                      addFavorite={(obj) => addFavorite(obj)}
                      image={item.imageURL}
                      title={item.title}
                      price={item.price}
                />
            )
        )
    }


    return (
        <div className="main__wrapper">
            <div className="main__header">
                <h1>Все кроссовки</h1>
                <div className="main__search">
                    <img src={search} alt="Search"/>
                    <input value={findSneakers} onChange={(e) => setFindSneaker(e.target.value)} type="text" placeholder="Поиск..."/>
                </div>
            </div>
            <div className="main__cards">
                {loadingCards ?
                    renderSkeleton()
                    :
                    renderCards()
                    }
            </div>
        </div>
    )
}

export default Home