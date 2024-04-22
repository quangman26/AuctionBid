import React, { useState, useContext } from 'react';
import Web3 from 'web3';
import 'bulma/css/bulma.min.css';
import { useHistory } from "react-router-dom";
import { AddressContext } from './AddressContext';
import './Login.css'

function Login() {
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const { setAddress: setUserAddress } = useContext(AddressContext);
  const [balance, setBalance] = useState(0);

  console.log(address);
  console.log(balance);

  const login = async () => {
    try {
      if (!address || !privateKey) {
        throw new Error("Vui lòng nhập địa chỉ và private key");
      }

      const web3 = new Web3("http://localhost:7545"); // Địa chỉ của nút Ganache
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const retrievedAddress = account.address;
      const balance = await web3.eth.getBalance(retrievedAddress); // Lấy số dư từ blockchain
      const balanceInEther = web3.utils.fromWei(balance, "ether"); // Chuyển đổi số dư từ wei sang Ether

      //retrievedAddress truy xuất địa chỉ
      if (retrievedAddress.toLowerCase() === address.toLowerCase()) {
        // console.log(retrievedAddress); // Đây sẽ là giá trị mới nhất của retrievedAddress
        // console.log("Đăng nhập thành công!"); // Thêm console.log ở đây
        // console.log(setUserAddress);
        // Lưu địa chỉ và số dư vào localStorage
        localStorage.setItem("userAddress", retrievedAddress);
        localStorage.setItem("userBalance", balanceInEther);
        setLoggedIn(true); // Đặt loggedIn thành true
        setUserAddress(retrievedAddress); // Cập nhật giá trị của address
        setBalance(balance); // Cập nhật số dư
        history.push("/App"); // Chuyển hướng người dùng đến trang App
        window.location.reload(); // Tải lại trang
      } else {
        throw new Error("Sai địa chỉ hoặc private key");
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="container" style={{ fontFamily: "monospace" }}>
      <header>
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

      <main>
        <section className="section">
          <div className="columns is-centered ">
            <div className="column is-half box has-shadow ">
              <h1 className="title has-text-centered">Đăng Nhập</h1>
              <div className="field">
                <label className="label">Địa chỉ</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Account address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Mật khẩu</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="Private Key"
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button
                    className="button is-primary is-fullwidth"
                    onClick={login}
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>
              {loggedIn && (
                <p className="has-text-centered">Đăng nhập thành công!</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;