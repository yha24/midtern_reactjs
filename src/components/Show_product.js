import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Show.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from '../Cart';
const Show = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const json = await response.json();
      setData(json);
      setSearchResults(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButton = () => {
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    alert("Đã thêm vào giỏ hàng");
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  return (
    <div className="container">
      <br></br>
      <h3 className="colection">SẢN PHẨM NỔI BẬT</h3>    <br></br>
      <input type="text" placeholder="Search..."value={searchTerm} onChange={handleSearch} className='input'/>
      <button className='button' onClick={handleSearchButton}>Tìm kiếm</button>
      <br></br> <br></br>
      <div className="row">
        {searchResults.map((e) => (
          <div className="col-md-3" key={e.id}>
            <div className="card">
              <img src={e.image} alt={e.name} className="card-img-top" />
              <div className="card-body">
                <h4 className="card-title">{e.name}</h4>
                <p className="card-text">{e.color}</p>
                <p className="card_price"> {e.materrial}</p>
                <p className="card_price"> {e.expiry_date}</p>
                <p className="card_price"> {e.origin}</p>
                <p className="card_price"> {e.description}</p>
                <p className="card_price"> {e.tinhtranghang}</p>
                <div className="function">
                  <button className="button1" onClick={() => addToCart(e)}>
                    THÊM GIỎ HÀNG
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
};

export default Show;
