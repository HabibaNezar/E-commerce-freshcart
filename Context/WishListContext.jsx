import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {
    let [WishList, setWishList] = useState(null);

    let headers = {
        token: localStorage.getItem('userToken')
    };

    function addToWishList(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            { productId },
            { headers }
        ).then(response => response)
        .catch(error => error);
    }

    function getWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, 
            { headers }
        ).then(response => response)
        .catch(error => error);
    }

    function removeWishListProducts(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            { headers:headers }
        ).then(response => response)
        .catch(error => error);
    }

    async function getWishListProduct() {
        try {
            let response = await getWishList();
            setWishList(response.data);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    }

    useEffect(() => {
        getWishListProduct();
    }, []);

    return (
        <WishListContext.Provider value={{ addToWishList, getWishList, removeWishListProducts, WishList, setWishList }}>
            {props.children}
        </WishListContext.Provider>
    );
}
