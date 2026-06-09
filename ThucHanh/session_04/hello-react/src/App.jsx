// ==========================================
// 1. Bài 0.2 - Component UserProfile
// ==========================================
function UserProfile() {
    return (
        <div className="profile">
            <h1>Hồ sơ cá nhân</h1>
            <img src="photo.jpg" alt="Ảnh đại diện" />
            <table>
                <tbody>
                    <tr>
                        <td>Họ tên:</td>
                        <td>Minh</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>Minh@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

// ==========================================
// 2. Bài 0.2 - Component ProductInfo
// ==========================================
function ProductInfo() {
    return (
        <div className="product">
            <h2>iPhone 15</h2>
            {/* class của HTML đã đổi thành className */}
            <p className="price">25.000.000đ</p>
            <ul>
                <li>Màn hình: 6.1 inch</li>
                <li>Camera: 48MP</li>
                <li>Pin: 3349 mAh</li>
            </ul>
            <button>Mua ngay</button>
        </div>
    );
}

// ==========================================
// 3. Component chính để React vẽ lên màn hình
// ==========================================
function App() {
    return (
        <div>
            <h1>Xin chào! Đây là Component đầu tiên của tôi 🚀</h1>
            <p>Hôm nay là một ngày đẹp trời để học React.</p>
            <hr />
            
            {/* Gọi Component UserProfile hiển thị ra */}
            <UserProfile />
            <hr />
            
            {/* Gọi Component ProductInfo hiển thị ra */}
            <ProductInfo />
        </div>
    );
}

export default App;