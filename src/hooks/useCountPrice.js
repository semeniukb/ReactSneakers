import {useContext} from "react";
import AppContext from "../context";

export const useCountPrice = () => {
    const { setBasketItem, basketItem,  } = useContext(AppContext);
    const price = basketItem.reduce((sum, next) => sum + next.price, 0)
    return { price, setBasketItem, basketItem }
}
