import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import UserCard from "./components/UserCard";

function App() {
    // Dữ liệu danh sách sản phẩm
    const products = [
        { id: 1, name: "iPhone 15 Pro Max", originalPrice: 34990000, salePrice: 29990000, image: "https://vcdn-sohoa.vnecdn.net/2023/09/13/iphone-15-pro-max-natural-titanium-pure-back-iphone-15-pro-max-natural-titanium-pure-front-2-8613-1694553258.jpg" },
        { id: 2, name: "Samsung Galaxy S24 Ultra", originalPrice: 31990000, salePrice: 26490000, image: "https://images.samsung.com/is/image/samsung/p6pim/vn/2401/gallery/vn-galaxy-s24-s928-sm-s928bztqxxv-thumb-539316024" },
        { id: 3, name: "Xiaomi 14 Ultra", originalPrice: 22990000, salePrice: 19990000, image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14-ultra.jpg" }
    ];

    // Thử thách 3: Mảng dữ liệu 3 Users khác nhau
    const users = [
        { id: 1, name: "Nguyễn Văn Minh (Admin)", email: "minh.admin@gmail.com", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Minh" },
        { id: 2, name: "Trần Thị An (Khách VIP)", email: "an.vip@gmail.com", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=An" },
        { id: 3, name: "Lê Hoàng Linh (Moderator)", email: "linh.mod@gmail.com", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Linh" }
    ];

    return (
        <div style={{ fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto", padding: "10px" }}>
            {/* 1. Ghép bộ khung trang web */}
            <Header />
            
            {/* 2. Thử thách 1 & 3: Khu vực hiển thị danh sách UserCards */}
            <main style={{ marginTop: "20px" }}>
                <h3>👥 Thành viên tích cực của hệ thống</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "10px" }}>
                    {users.map(user => (
                        <UserCard 
                            key={user.id} 
                            name={user.name} 
                            email={user.email} 
                            avatar={user.avatar} 
                        />
                    ))}
                </div>

                <hr style={{ margin: "30px 0", border: "0.5px solid #eee" }} />

                {/* 3. Khu vực hiển thị danh sách sản phẩm */}
                <h3>🔥 Sản phẩm khuyến mãi HOT nhất</h3>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
                    {products.map(product => (
                        <ProductCard 
                            key={product.id}
                            name={product.name}
                            originalPrice={product.originalPrice}
                            salePrice={product.salePrice}
                            image={product.image}
                        />
                    ))}
                </div>
            </main>

            {/* 4. Ghép bộ khung trang web */}
            <Footer />
        </div>
    );
}

export default App;