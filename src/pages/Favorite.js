import search from "../assets/search.svg";
import Card from "../component/Card/Card";
import {useContext, useEffect} from "react";
import axios from "axios";
import AppContext from "../context";

function Favorite () {
    const {favorites, addFavorite, addItemToBasket} = useContext(AppContext)
    return (
        <div className="main__wrapper">
            <div className="main__header">
                <h1>Мои закладки</h1>
            </div>
            <div className="main__cards">
                {favorites?.map(item => {
                    return (
                        <Card key={item.id}
                              addItemToBasket={(obj) => addItemToBasket(obj)}
                              addFavorite={(obj) => addFavorite(obj)}
                              itemId={item.id}
                              image={item.image} title={item.title}
                              price={item.price}
                              favorite
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Favorite