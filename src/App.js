import React, { useState, useEffect, useContext } from 'react';
import Web3 from 'web3';
import AuctionABI from './AuctionABI.json';
import 'bulma/css/bulma.min.css';
import './App.css';
import { AddressContext } from './AddressContext';
import { useLocation } from 'react-router-dom';

// Địa chỉ của hợp đồng thông minh đấu giá
const AuctionContractAddress = '0x09a7BE594A4e321AF6e00c2cFcaE9A0C6F18632b';

function App() {
  // Khai báo các state cho ứng dụng
  const [web3, setWeb3] = useState(null); // Web3 instance
  const [auctionContract, setAuctionContract] = useState(null); // Hợp đồng đấu giá
  const [bidAmount, setBidAmount] = useState(''); // Số tiền đặt giá
  //const [account, setAccount] = useState(''); // Tài khoản
  const [auctionEnded, setAuctionEnded] = useState(false); // Biến xác định phiên đấu giá đã kết thúc
  const [highestBidder, setHighestBidder] = useState(''); // Người đặt giá cao nhất
  const [highestBid, setHighestBid] = useState(''); // Giá cao nhất
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


  // Xử lý sự kiện đặt giá
  const handleBid = async () => {
    // Code xử lý đặt giá
  };

  // Xử lý sự kiện kết thúc phiên đấu giá
  const auctionEnd = async () => {
    // Code xử lý kết thúc phiên đấu giá
  };


  //in ra cửa sổ console
  console.log("Địa chỉ đã đăng nhập: ", address);
  console.log("balance: ", balance);
  return (
    <div className="container">
      <header className="headerApp" >
        <nav className="navbar is-centered">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">☰</a>
            <div className="navbar-dropdown">
              <a className="navbar-item" href="/App">Đấu giá</a>
              <a className="navbar-item" href="/ListProduct">Sản phẩm</a>
              <a className="navbar-item" href="#">Người chiến thắng</a>
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
          <div className="columns is-centered">
            <div className="">
              <h1 className="has-text-centered" style={{fontSize:"30px"}}>Đấu giá</h1>
                      {/* Thêm hình ảnh vào đây */}
              <div className="has-text-centered  box has-shadow">
                <p className='has-text-left' style={{fontSize:"20px"}}>Thời gian đấu giá</p>
                <img
                  src="davang.jpg" // Đường dẫn đến hình ảnh của bạn
                  alt="Mô tả về hình ảnh" // Mô tả hình ảnh (điều này rất quan trọng cho truy cập)
                  style={{ maxWidth: '100%', height: 'auto' }} // Style cho hình ảnh
                />
                <p className='has-text-left is-size-20'><strong>Dây chuyền kim cương đá lục bảo</strong>
                <br/>Hình dạng: Mặt dây chuyền có dạng hình tròn.
                <br/>Chất liệu: Đá lục bảo, kim cương, dây kim loại vàng.
                <br/><strong>Kích thước</strong>
                <br/>
                Đá quý: đường kính khoảng 1 cm.
                <br/>Kim cương: đường kính khoảng 2 mm.      
                <br/>Sợi dây chuyền: dài khoảng 45 cm.</p>
                <p className='has-text-left is-size-20'>Giá khởi điểm: <strong>1.00 eth</strong></p>
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
                  <button className="button is-info" onClick={handleBid}>Đặt Giá</button>
                </div>
              </div>
              <div className="content">
                <p>Tài khoản: {address}</p>
                <p>Số dư: {userBalance} ETH</p>
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


export default App;
