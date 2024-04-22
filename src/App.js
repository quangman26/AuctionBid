a;
import React, { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import AuctionABI from "./AuctionABI.json";
import "bulma/css/bulma.min.css";
import "./App.css";
import { AddressContext } from "./AddressContext";

const AuctionContractAddress = "0x9708F18f22Dc9F8FB5300F9a6306c1d1fa920a34";

function App() {
  const [web3, setWeb3] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [highestBidder, setHighestBidder] = useState("");
  const [highestBid, setHighestBid] = useState("");
  const { address, setAddress, balance, setBalance } =
    useContext(AddressContext);
  const [auctionTimeLeft, setAuctionTimeLeft] = useState(0);

  const userBalance = localStorage.getItem("userBalance")
    ? parseFloat(localStorage.getItem("userBalance")).toFixed(3)
    : "0.000";

  useEffect(() => {
    const storedAddress = localStorage.getItem("userAddress");
    const storedBalance = localStorage.getItem("userBalance");

    if (storedAddress && storedBalance) {
      setAddress(storedAddress);
      setBalance(storedBalance);
    }

    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          setWeb3(web3Instance);
        } else if (window.web3) {
          const web3Instance = new Web3(window.web3.currentProvider);
          setWeb3(web3Instance);
        } else {
          throw new Error("Không tìm thấy Web3");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    initWeb3();
  }, []);

  const handleBid = async () => {
    try {
      if (!web3) {
        throw new Error("Web3 is not initialized");
      }

      const accounts = await web3.eth.getAccounts();
      const userAccount = accounts[0];

      const userBalanceWei = await web3.eth.getBalance(userAccount);
      const userBalanceEther = web3.utils.fromWei(userBalanceWei, "ether");

      if (parseFloat(userBalanceEther) < parseFloat(bidAmount)) {
        throw new Error("Số dư không đủ để đấu giá");
      }

      const auctionContract = new web3.eth.Contract(
        AuctionABI,
        AuctionContractAddress
      );
      const tx = await auctionContract.methods.bid().send({
        from: userAccount,
        value: web3.utils.toWei(bidAmount, "ether"),
      });

      if (tx.events && tx.events.highestBidIncrease) {
        const newHighestBidder =
          tx.events.highestBidIncrease.returnValues.bidder;
        const newHighestBid = web3.utils.fromWei(
          tx.events.highestBidIncrease.returnValues.amount,
          "ether"
        );

        setHighestBidder(newHighestBidder);
        setHighestBid(newHighestBid);

        console.log("New highest bidder:", newHighestBidder);
        console.log("New highest bid:", newHighestBid);
      }

      const updatedBalance =
        parseFloat(userBalanceEther) - parseFloat(bidAmount);
      setBalance(updatedBalance.toString());
      localStorage.setItem("userBalance", updatedBalance.toString());

      console.log("Số dư hiện tại trước khi đặt giá:", balance);
      console.log("Số dư đã cập nhật sau khi đặt giá:", updatedBalance);
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  const handleWithdraw = async () => {
    try {
      if (!web3) {
        throw new Error("Web3 is not initialized");
      }

      const accounts = await web3.eth.getAccounts();
      const userAccount = accounts[0];

      const auctionContract = new web3.eth.Contract(
        AuctionABI,
        AuctionContractAddress
      );

      const result = await auctionContract.methods.withdraw().send({
        from: userAccount,
      });

      if (result) {
        alert("Rút tiền thành công!");

        // You can add more logic here to update the balance or other UI elements
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };
  console.log("Người đặt giá cào nhất", highestBidder, " Giá: ", highestBidder);
  console.log("giá trị của bạn đã ");
  console.log("Địa chỉ đã đăng nhập:", address);
  console.log("balance:", balance);
  return (
    <div className="container">
      <header className="headerApp">
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
              <a className="navbar-item" href="#">
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
          <div className="columns is-centered">
            <div className="">
              <h1 className="has-text-centered" style={{ fontSize: "30px" }}>
                Đấu giá
              </h1>
              {/* Thêm hình ảnh vào đây */}
              <div className="has-text-centered  box has-shadow">
                <p className="has-text-left" style={{ fontSize: "20px" }}>
                  Thời gian đấu giá còn lại: {auctionTimeLeft} giây
                </p>
              </div>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="Số Ether đặt giá"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                </div>
                <div className="control">
                  <button className="button is-info" onClick={handleBid}>
                    Đặt Giá
                  </button>
                  <button className="button is-danger" onClick={handleWithdraw}>
                    Rút Tiền
                  </button>
                </div>
              </div>

              <div className="content">
                <p>Tài khoản: {address}</p>
                <p>Số dư: {userBalance} ETH</p>
                {highestBidder && (
                  <p>Người đặt giá cao nhất: {highestBidder}</p>
                )}
                {highestBid && <p>Giá cao nhất: {highestBid} ETH</p>}
              </div>
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

export default App;
