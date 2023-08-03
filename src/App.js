import React, { useEffect } from 'react';
import Card from "./component/Card/Card";
import Header from "./component/Header/Header";
import Basket from "./component/Basket/Basket";
import axios from "axios";
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import AppContext from "./context";

function App() {
    const [basketOpen, setBasketOpen] = React.useState(false)
    const [data, setData] = React.useState([])
    const [basketItem, setBasketItem] = React.useState([])
    const [findSneakers, setFindSneaker] = React.useState('')
    const [favorites, setFavorites] = React.useState([])
    const [loadingCards, setLoadingCards] = React.useState(true)

    const URL1 = "https://645bd8daa8f9e4d6e774c846.mockapi.io";
    const URL2 = "https://648630b3a795d24810b7c9e6.mockapi.io";

    useEffect(() => {
        (async function fetchData  () {
            const responceItems = await axios.get(URL1 + "/items")
            const responceCard = await axios.get(URL1 + "/card")
            const responceFavorite = await axios.get(URL2 + "/favorite")

            setBasketItem(responceCard.data)
            setFavorites(responceFavorite.data)
            setData(responceItems.data)
            setLoadingCards(false);
        })();
        }, [])

    const addItemToBasket = (obj) => {
        const sameItemIndex = basketItem.findIndex(i => i.image === obj.image);
        if (sameItemIndex === -1) {
            axios.post(URL1 + "/card", obj)
                .then(res => setBasketItem(prev => [...prev, res.data]))
                .catch(error => console.error(error));
        } else {
            axios.delete(URL1 + `/card/${basketItem[sameItemIndex].id}`)
                .catch(error => console.error(error));
            setBasketItem(prevState => prevState.filter(item => item.image !== obj.image));
        }
    };

    const addFavorite = async  (obj) => {
        try {
            if(favorites.find(item => item.id === obj.itemId)) {
                await axios.delete(URL2 + `/favorite/${obj.itemId}`)
                await axios.get(URL2 + "/favorite").then(res => setFavorites(res.data))
            } else {
                const { data } = await axios.post(URL2 + "/favorite", obj)
                setFavorites(prev => [...prev, data])
            }
        } catch (error) {
            alert("Something went wrong, please try again")
        }
    }

    const onDeleteBasketItem = (id) => {
        setBasketItem(prevState => {
            return prevState.filter(item => item.id !== id)
        })
        axios.delete(URL1 + `/card/${id}`)
    }

    const isItemAdded = (image) => {
      return basketItem.some(elem => elem.image === image)
    }

  return (
 <div className="wrapper">
     <AppContext.Provider value={{favorites, addItemToBasket, addFavorite, isItemAdded, basketItem, loadingCards, data, findSneakers, setFindSneaker }}>
         {basketOpen && <Basket onDeleteBasketItem={onDeleteBasketItem} setBasketItem={setBasketItem} basketItem={basketItem} onBasketClose={() => setBasketOpen(false)}/>}
         <Header onBasketOpen={() => setBasketOpen(true)}/>
         <main>
             <Routes>
                 <Route path='/' exact element={ <Home /> } />
                 <Route path='/favorites' exact element={ <Favorite/> } />
             </Routes>
         </main>
     </AppContext.Provider>


 </div>
  );
}

export default App;
