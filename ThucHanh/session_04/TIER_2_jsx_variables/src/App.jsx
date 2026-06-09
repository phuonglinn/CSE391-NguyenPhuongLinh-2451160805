import { useState } from "react";

// ==========================================
// BÀI 2.1 — HIỂN THỊ BIẾN & THỬ THÁCH BMI
// ==========================================
function SimpleVariables() {
    const ten = "Nguyễn Văn Minh";
    const tuoi = 20;
    const queQuan = "Hà Nội";
    
    // Thử thách: Chào theo thời gian thực
    const gioHienTai = new Date().getHours();
    const loiChao = gioHienTai < 12 ? "🌅 Chào buổi sáng" : gioHienTai < 18 ? "☀️ Chào buổi chiều" : "🌙 Chào buổi tối";

    // Thử thách: Tính toán BMI
    const canNang = 65; // kg
    const chieuCao = 1.7; // mét
    const bmi = (canNang / (chieuCao * chieuCao)).toFixed(2);

    return (
        <div style={{ padding: "15px", border: "1px solid #3498db", margin: "10px 0" }}>
            <h2>1. Biến Đơn Giản & Thử Thách 1</h2>
            <p><strong>{loiChao}, {ten}!</strong></p>
            <p>Tuổi: {tuoi} | Quê quán: {queQuan}</p>
            <p>📊 Chỉ số BMI của bạn: <strong>{bmi}</strong> (Cân nặng: {canNang}kg, Chiều cao: {chieuCao}m)</p>
        </div>
    );
}

// ==========================================
// BÀI 2.2 — CONDITIONAL RENDERING (ĐIỀU KIỆN)
// ==========================================
function ConditionalDemo() {
    const isLoggedIn = true; // Thử đổi thành false để xem menu ẩn/hiện
    const isOnline = true;   // Thử đổi thành false để xem icon đổi màu
    const stock = 0;         // Số lượng hàng trong kho

    return (
        <div style={{ padding: "15px", border: "1px solid #2ecc71", margin: "10px 0" }}>
            <h2>2. Hiển Thị Có Điều Kiện & Thử Thách 2</h2>
            
            {/* Thử thách: Trạng thái online/offline */}
            <p>Trạng thái hệ thống: {isOnline ? "🟢 Đang hoạt động" : "🔴 Mất kết nối"}</p>

            {/* Thử thách: Ẩn hiện menu dựa vào trạng thái đăng nhập */}
            {isLoggedIn ? (
                <nav style={{ background: "#e8f8f5", padding: "5px" }}>
                    ℹ️ [Menu Thành Viên]: Trang chủ | Hồ sơ | Đăng xuất
                </nav>
            ) : (
                <p style={{ color: "gray" }}>🔒 Vui lòng đăng nhập để xem menu bí mật.</p>
            )}

            {/* Thử thách: Hiển thị hết hàng khi stock = 0 */}
            <div style={{ marginTop: "10px" }}>
                <span>Sản phẩm sản xuất giới hạn: </span>
                {stock > 0 ? (
                    <span style={{ color: "green" }}>Còn lại {stock} sản phẩm</span>
                ) : (
                    <strong style={{ color: "red", background: "#fce4d6", padding: "2px 5px" }}>⚠️ HẾT HÀNG</strong>
                )}
            </div>
        </div>
    );
}

// ==========================================
// BÀI 2.3 — RENDER DANH SÁCH & THỬ THÁCH SẢN PHẨM
// ==========================================
function ListRenderingDemo() {
    // Thử thách: Danh sách 5 sản phẩm (giá tính theo VNĐ)
    const dsSanPham = [
        { id: 101, name: "Chuột Gaming", price: 350000 },
        { id: 102, name: "Bàn phím cơ", price: 1200000 },
        { id: 103, name: "Tai nghe chống ồn", price: 2500000 },
        { id: 104, name: "Lót chuột cỡ lớn", price: 150000 },
        { id: 105, name: "Màn hình 2K 144Hz", price: 4500000 }
    ];

    // Thử thách: Tính tổng giá tất cả sản phẩm bằng hàm reduce dữ liệu
    const tongTien = dsSanPham.reduce((sum, item) => sum + item.price, 0);

    return (
        <div style={{ padding: "15px", border: "1px solid #9b59b6", margin: "10px 0" }}>
            <h2>3. Vòng Lặp Danh Sách & Thử Thách 3</h2>
            <p>Giá hiển thị màu đỏ nếu sản phẩm đắt hơn 1.000.000đ:</p>
            
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                    <tr style={{ background: "#f2f2f2" }}>
                        <th style={{ padding: "8px", border: "1px solid #ddd" }}>Tên sản phẩm</th>
                        <th style={{ padding: "8px", border: "1px solid #ddd" }}>Giá thành</th>
                    </tr>
                </thead>
                <tbody>
                    {dsSanPham.map((sp) => (
                        <tr key={sp.id}>
                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{sp.name}</td>
                            <td style={{ 
                                padding: "8px", 
                                border: "1px solid #ddd",
                                // Thử thách: Giá > 1 triệu thì chữ màu đỏ và in đậm
                                color: sp.price > 1000000 ? "red" : "black",
                                fontWeight: sp.price > 1000000 ? "bold" : "normal"
                            }}>
                                {sp.price.toLocaleString("vi-VN")} đ
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h4 style={{ marginTop: "15px", textAlign: "right", color: "#2c3e50" }}>
                💰 Tổng giá trị giỏ hàng: {tongTien.toLocaleString("vi-VN")} đ
            </h4>
        </div>
    );
}

// ==========================================
// COMPONENT CHÍNH ĐỂ HIỂN THỊ TOÀN BỘ TIER 2
// ==========================================
function App() {
    return (
        <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Tier 2 — Làm Chủ Biến Trong JSX 🎨</h1>
            <p style={{ textAlign: "center", color: "gray" }}>Dữ liệu Javascript đã được hiển thị mượt mà lên giao diện HTML.</p>
            <hr />
            <SimpleVariables />
            <ConditionalDemo />
            <ListRenderingDemo />
        </div>
    );
}

export default App;