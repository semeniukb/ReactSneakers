import Card from "../component/Card/Card";
import React, { useEffect } from "react";
import axios from "axios";
import {renderSkeleton} from "../utils/renderSkeleton";

function Favorite ({ URL2 }) {
    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    useEffect(() => {
        (async () => {
            try {
                const responceOrders = await axios.get(URL2 + "/orders")
                setOrders(responceOrders.data)
                setIsLoading(false)
            } catch (e) {
                alert("Can't show orders, please try again")
                console.error(e)
            }
        })()
    }, [])
    const allOrders = orders.reduce((prev, next) => [...prev, ...next.items] ,[])

    return (
        <div className="main__wrapper">
            <div className="main__header">
                <h1>My Orders</h1>
            </div>
            <div className="main__cards">
                {isLoading ? renderSkeleton() : allOrders?.map(item => {
                    return (
                        <Card key={item.id}
                              itemId={item.id}
                              image={item.image}
                              title={item.title}
                              price={item.price}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Favorite