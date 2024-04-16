import 'bulma/css/bulma.min.css';
import './App.css';

function ListProduct() {

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
          <div className="container">
            <h1 className="title has-text-centered">Danh sách sản phẩm</h1>
            
            <div className="columns is-multiline">
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


export default ListProduct;
