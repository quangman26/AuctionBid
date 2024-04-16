import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import AuctionABI from './AuctionABI.json';
import 'bulma/css/bulma.min.css';

// Địa chỉ của hợp đồng thông minh đấu giá
const AuctionContractAddress = '0x09a7BE594A4e321AF6e00c2cFcaE9A0C6F18632b';

function App() {
  // Khai báo các state cho ứng dụng
  const [web3, setWeb3] = useState(null);
  const [auctionContract, setAuctionContract] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [account, setAccount] = useState(null);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [highestBidder, setHighestBidder] = useState('');
  const [highestBid, setHighestBid] = useState('');

  useEffect(() => {
    // Hàm khởi tạo Web3 và tạo kết nối với hợp đồng thông minh
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Kích hoạt tài khoản MetaMask
          await window.ethereum.enable();
          // Tạo instance của Web3
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          // Lấy danh sách tài khoản MetaMask
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          // Tạo instance của hợp đồng thông minh đấu giá
          const auctionInstance = new web3Instance.eth.Contract(AuctionABI, AuctionContractAddress);
          setAuctionContract(auctionInstance);

          // Lắng nghe sự kiện khi phiên đấu giá kết thúc
          auctionInstance.events.auctionEnded({}, (error, event) => {
            if (error) {
              console.error('Error during auctionEnded event:', error);
            } else {
              setAuctionEnded(true);
              setHighestBidder(event.returnValues.winner);
              setHighestBid(event.returnValues.amount);
            }
          });
        } catch (error) {
          alert('Không thể kích hoạt Ethereum.');
          console.error(error);
        }
      } else {
        alert('Vui lòng cài đặt MetaMask!');
      }
    };

    initWeb3();
  }, []);

  // Xử lý sự kiện khi người dùng đặt giá
  const handleBid = async () => {
    if (!auctionContract || !account) {
      alert('Hợp đồng thông minh hoặc tài khoản không khả dụng.');
      return;
    }

    try {
      // Gửi giao dịch đặt giá tới hợp đồng thông minh
      await auctionContract.methods.bid().send({
        from: account,
        value: web3.utils.toWei(bidAmount, 'ether')
      });
      alert('Đặt giá thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi đặt giá.');
      console.error(error);
    }
  };

  // Trả về giao diện của ứng dụng
  return (
    <div className="container">
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-half">
            <h1 className="title has-text-centered">Đấu Giá</h1>
            {/* Form nhập số Ether để đặt giá */}
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
            {/* Thông báo kết quả sau khi phiên đấu giá kết thúc */}
            {auctionEnded && (
              <div className="notification is-success">
                <p>Phiên đấu giá đã kết thúc.</p>
                <p>Người chiến thắng: {highestBidder}</p>
                <p>Số tiền đấu giá cao nhất: {web3.utils.fromWei(highestBid, 'ether')} Ether</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
