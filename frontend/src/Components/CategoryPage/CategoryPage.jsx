import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Categories from '../Categories/Categories';
import { StoreContext } from '../../Context/StoreContext';
import './CategoryPage.css';
import Item from '../Item/Item';

const CategoryPage = () => {
    const { url } = useContext(StoreContext);
    const param = useParams();
    const { isSearch,setIsSearch,cproducts} = useContext(StoreContext);
    const [products, setproducts] = useState([]);

    useEffect(() => {
        const new_url = url + '/api/product/get-products?catName=' + param.catName;
        axios.get(new_url)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    }, [param]);


    return (
        <div className="category-page-container">
            <Categories/>
            <div className="header">
                <h1>{param.catName}</h1>
            </div>

            {isSearch && cproducts && (
                <div className="search-results">
                    <h5> SEARCH RESULTS
                        <button className="clear-btn" onClick={() => setIsSearch(false)}>CLEAR</button>
                    </h5>
                    {cproducts.length === 0 && <h5>No Results Found</h5>}
                </div>
            )}

        <div className="category-grid">
            {(isSearch ? cproducts : products)
                .filter(item => item.category === param.catName) 
                .map((item) => (
                    <div className="category-card" key={item._id}>
                        <Item product={item} />
                    </div>
                ))
            }
        </div>

        </div>
    );
};

export default CategoryPage;
