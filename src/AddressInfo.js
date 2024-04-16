import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import { useContext } from 'react';
import { AddressContext } from './AddressContext';
import './AddressInfo.css'




function AddressInfo() {
  const { address, setAddress} = useContext(AddressContext);
  const { balance, setBalance } = useContext(AddressContext);
  const userBalance = localStorage.getItem('userBalance') 
        ? parseFloat(localStorage.getItem('userBalance')).toFixed(3)
        : '0.000'; // Lấy và làm tròn số dư đến 2 chữ số sau dấu thập phân từ localStorage

useEffect(() => {

  const storedAddress = localStorage.getItem('userAddress');
  const storedBalance = localStorage.getItem('userBalance');

    if (storedAddress && storedBalance) {
        setAddress(storedAddress);
        setBalance(storedBalance);
    }
      }, []);


  return (
<div className="container">
    <header>
        <nav className="navbar is-centered">
            <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">☰</a>
                <div className="navbar-dropdown">
                    <a className="navbar-item" href="/App">Đấu giá</a>
                    <a className="navbar-item" href="/ListProduct">Sản phẩm</a>
                    <a className="navbar-item" href="/about">Người chiến thắng</a>
                    <a className="navbar-item" href="/AddressInfo">Thông tin người dùng</a>
                </div>
            </div>
        <div className="navbar-menu">
            <div className="navbar-start">
                <a className="navbar-item" href="/App">Đấu giá</a>
                <a className="navbar-item" href="/ListProduct">Sản phẩm</a>
                <a className="navbar-item" href="/about">Người chiến thắng</a>
                <a className="navbar-item" href="/AddressInfo">Thông tin người dùng</a>
            </div>
        </div>
     </nav>
    </header>
      <main>
        <section className="section">
          <div className="columns is-centered ">
            <div className="column is-half">
              <h1 className="has-text-centered" style={{fontSize:"30px", marginBottom:"30px"}}>Thông tin của bạn</h1>
              <div className="content box has-shadow">
                <p>Tài khoản: <strong>{address}</strong></p>
                <p>Số dư: <strong>{userBalance}</strong> <span style={{ color: 'red' }}>ethereum</span></p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
          <div className="content has-text-centered">
            <p className="is-size-15">© since 2024 for Auction | code <a href="manquang087@mail.com" className="footer-link">manquang087@</a></p>
            <p>
              <a href="/App" className="footer-link">Đấu giá </a>
              <span className="footer-separator">|</span>
              <a href="/terms" className="footer-link"> Danh sách người chiến thắng </a>
              <span className="footer-separator">|</span>
              <a href="/AddressInfo" className="footer-link"> Thông tin người dùng</a>
            </p>
          </div>
      </footer>


    </div>
  );
}

export default AddressInfo;
