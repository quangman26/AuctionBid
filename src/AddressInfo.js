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
    <div
      className="container "
      style={{ fontFamily: "monospace", fontSize: "16px" }}
    >
      <header
        className="headerApp box has-shadow "
        style={{ marginBottom: "20px", fontSize: "16px" }}
      >
        <nav className="navbar is-centered">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">☰</a>
            <div className="navbar-dropdown">
              <a className="navbar-item" href="/App">
                Đấu giá
              </a>
              <a className="navbar-item" href="/ListProduct">
                Sản phẩm
              </a>
              <a className="navbar-item" href="/about">
                Người chiến thắng
              </a>
              <a className="navbar-item" href="/AddressInfo">
                Thông tin người dùng
              </a>
            </div>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" href="/App">
                Đấu giá
              </a>
              <a className="navbar-item" href="/ListProduct">
                Sản phẩm
              </a>
              <a className="navbar-item" href="/about">
                Người chiến thắng
              </a>
              <a className="navbar-item" href="/AddressInfo">
                Thông tin người dùng
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="main box has-shadow">
        <section className="section ">
          <div className="columns is-centered">
            <div className="column">
              <h1
                className="has-text-centered "
                style={{ fontSize: "30px", marginBottom: "30px" }}
              >
                Thông tin của bạn
              </h1>
              <div className="column box has-shadow">
                <div className="has-text-centered" style={{ height: "100%" }}>
                  {/* Avatar */}
                  <img
                    src="anime.jpg"
                    alt="Avatar"
                    style={{
                      width: "100px",
                      height: "auto",
                      borderRadius: "10%",
                    }}
                  />
                  {/* Name */}
                  <p
                    style={{
                      fontSize: "25px",
                      marginBottom: "30px",
                    }}
                  >
                    {address && address.slice(-6)}
                  </p>
                  <p>
                    Số tài khoản:{" "}
                    <span style={{ color: "red" }}>{address}</span>
                  </p>
                  <p>
                    Số dư: <span style={{ color: "red" }}>{userBalance}</span>
                    {" Eth"}
                  </p>
                </div>
              </div>
              <div className="column box has-shadow">
                <p>
                  <strong>Cài đặt</strong>
                </p>
                <div className="column">
                  <p>Quản lý tài khoản và thẻ</p>
                  <p>Cài đặt thanh toán</p>
                  <p>Đăng nhập và bao mật</p>
                  <p>Cài đặt thông báo</p>
                </div>
              </div>
              <div className="column box has-shadow">
                <p>
                  <strong>Tiện ích</strong>
                </p>
                <div className="column">
                  <p>Quản lý đấu thầu</p>
                  <p>Thanh toán online</p>
                  <p>Lịch sử giao dịch</p>
                </div>
              </div>
              <div className="column box has-shadow">
                <p>
                  <strong>Tiện ích</strong>
                </p>
                <div className="columns">
                  <div className="column is-half">Trung tâm hỗ trợ {">"}</div>
                  <div className="column is-half">Thông tin chung {">"}</div>
                </div>
              </div>
              <div className="column">
                <button className="button is-focused">
                  <a href="/Login" className="footer-link">
                    <strong style={{ color: "black" }}>Đăng xuất</strong>
                  </a>
                </button>
                {"     "}
                <button className="button is-focused">
                  <a href="/Login" className="footer-link">
                    <strong style={{ color: "black" }}>Đổi tài khoản</strong>
                  </a>
                </button>
              </div>

              {/* <div className="column is-half">abc</div> */}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="content has-text-centered">
          <p className="is-size-15">
            © since 2024 for Auction | code{" "}
            <a href="manquang087@mail.com" className="footer-link">
              manquang087@
            </a>
          </p>
          <p>
            <a href="/App" className="footer-link">
              Đấu giá{" "}
            </a>
            <span className="footer-separator">|</span>
            <a href="/terms" className="footer-link">
              {" "}
              Danh sách người chiến thắng{" "}
            </a>
            <span className="footer-separator">|</span>
            <a href="/AddressInfo" className="footer-link">
              {" "}
              Thông tin người dùng
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AddressInfo;
