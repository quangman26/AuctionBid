import 'bulma/css/bulma.min.css';
import './App.css';

function ListProduct() {

  const products = [
  {
    id: 1,
    name: "Sản phẩm 1",
    image: "davang.jpg",
    description: "Mô tả sản phẩm 1"
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    image: "davang.jpg",
    description: "Mô tả sản phẩm 2"
  },
    {
    id: 3,
    name: "Sản phẩm 3",
    image: "davang.jpg",
    description: "Mô tả sản phẩm 2"
  },
    {
    id: 4,
    name: "Sản phẩm 4",
    image: "davang.jpg",
    description: "Mô tả sản phẩm 2"
  },
    {
    id: 5,
    name: "Sản phẩm 5",
    image: "davang.jpg",
    description: "Mô tả sản phẩm 2"
  },

  {
    id: 6,
    name: "sản phẩm6",
    image: "davang.jpg",
    description: "Mô tả sản phẩm 2"
  },
];


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
        <div className="column" style={{marginBottom: "35px"}}>
            <form className="field has-addons has-text-centered">
              <div className="control ">
              <input 
                  className="input" 
                  type="text" 
                  placeholder="Nhập tên sản phẩm..." 
                  // Đặt giá trị và sự kiện tìm kiếm tại đây
                  />
              </div>
              <div className="control is-narrow">
                <button className="button is-info">
                Tìm kiếm
                </button>
              </div>
            </form>
          </div>
      <div className="columns is-multiline box has-shadow" style={{marginBottom: "35px"}}>
        {products.map(product => (
          <div key={product.id} className="column is-one-third">
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={product.image} alt={product.name} />
                </figure>
              </div>
              <div className="card-content">
                <p className="title is-4">{product.name}</p>
                <div className="content">
                  {product.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
        <div className='columns  box has-shadow'>
         <div className="column is-one-third">
    <div className="card">
      <div className="card-content">
        <p className="title">Tin tức 1</p>
        <p className="subtitle">Ngày đăng: 16/04/2024</p>
        <div className="content">
          Nội dung tin tức 1...
        </div>
      </div>
    </div>
  </div>

  {/* Tin tức 2 */}
  <div className="column is-one-third">
    <div className="card">
      <div className="card-content">
        <p className="title">Tin tức 2</p>
        <p className="subtitle">Ngày đăng: 15/04/2024</p>
        <div className="content">
          Nội dung tin tức 2...
        </div>
      </div>
    </div>
  </div>

  {/* Tin tức 3 */}
  <div className="column is-one-third">
    <div className="card">
      <div className="card-content">
        <p className="title">Tin tức 3</p>
        <p className="subtitle">Ngày đăng: 14/04/2024</p>
        <div className="content">
          Nội dung tin tức 3...
        </div>
      </div>
    </div>
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


export default ListProduct;
