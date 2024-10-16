import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext =createContext(null);

const StoreContextProvider=(props)=>{
    const [userAd,setUserAd]=useState({});
    const url="http://localhost:4000";
    const [token,setToken]=useState("");
    const [userId,setUserId]=useState("");

    let locations = [
        {
            "latitude": 25.27083,
            "longitude": 82.9824016,
            "placeName": "Varanasi, Uttar Pradesh"
        },
        {
            "latitude": 28.6139,
            "longitude": 77.2090,
            "placeName": "New Delhi, Delhi"
        },
        {
            "latitude": 19.0760,
            "longitude": 72.8777,
            "placeName": "Mumbai, Maharashtra"
        },
       
    ]
    const [cproducts, setCproducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const handleClick = () => {

        const searchUrl = url + '/api/product/search?search=' + search +'&loc=' + localStorage.getItem('userLoc');
        axios.get(searchUrl)
            .then((res) => {
                console.log(res.data.products)
                setCproducts(res.data.products);
                setIsSearch(true);
            })
            .catch((err) => {
                alert('page not found');
            });
    };

    const removeFromProfile= async (itemId)=>{
        // setUserAd((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        // if(token){
        //     await axios.post(url+"/api/profile/remove",{itemId},{headers:{token}})
        // }
    }

    const fetchProductList=async()=>{
        // const response=await axios.get(url+"/api/product/list")
        // setProductList(response.data.data)
    }

    const loadProfileData=async(token)=>{
        // const response=await axios.post(url+"/api/profile/get",{},{headers:{token}})
        // setUserAd(response.data.cartData)
    }

    useEffect(()=>{
        async function loadData(){
            await fetchProductList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadProfileData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])


    const contextValue={
        userAd,
        setUserAd,
        removeFromProfile,
        url,
        token,setToken,
        userId,setUserId,
        search,setSearch,
        isSearch,setIsSearch,
        cproducts,setCproducts,
        handleClick,locations
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;