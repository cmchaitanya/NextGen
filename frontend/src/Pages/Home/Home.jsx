import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate} from "react-router-dom";
import axios from "axios";
import './Home.css';
import Categories from "../../Components/Categories/Categories";
import Item from '../../Components/Item/Item'

const Home = () => {
    const { url} = useContext(StoreContext);
    const { isSearch,setIsSearch,cproducts,setCproducts} = useContext(StoreContext);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const new_url = url + '/api/product/get-products';
        axios.get(new_url)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Error');
            });
    }, []);


    const handleProduct = (id) => {
        navigate('/product/' + id);
    };

    return (
        <div className='home'>
            <Categories/>
            <div className="header">
                <h1>Explore All Ads</h1>
            </div>
            
            {isSearch && cproducts && (
                <div className="search-results">
                    <h5> SEARCH RESULTS
                        <button className="clear-btn" onClick={() => setIsSearch(false)}>CLEAR</button>
                    </h5>
                    {cproducts.length === 0 && <h5>No Results Found</h5>}
                </div>
            )}

            <div className="products-grid">
                {(isSearch ? cproducts : products).map((item, index) => (
                    <div key={item._id} className="home-card" onClick={() => handleProduct(item._id)}>
                        <Item product={item}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
