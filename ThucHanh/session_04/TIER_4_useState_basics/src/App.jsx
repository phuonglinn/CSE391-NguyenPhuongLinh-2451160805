import { useState } from "react";

// ==========================================
// 4.1 — USESTATE VỚI SỐ & THỬ THÁCH MÀU SẮC
// ==========================================
function NumberState() {
    const [count, setCount] = useState(0);

    // Thử thách: Thay đổi màu chữ động theo giá trị của count
    let textColor = "black";
    let statusText = "Số không";
    
    if (count > 0) {
        textColor = "#2ecc71"; // Xanh lá
        statusText = "Số dương";
    } else if (count < 0) {
        textColor = "#e74c3c"; // Đỏ
        statusText = "Số âm";
    }

    return (
        <div style={{ padding: "15px", border: "1px solid #ddd", marginBottom: "15px", borderRadius: "8px", background: "#fdfefe" }}>
            <h3>4.1 Bộ đếm kỹ thuật số</h3>
            <h1 style={{ color: textColor, margin: "10px 0" }}>{count} ({statusText})</h1>
            
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button onClick={() => setCount(count + 1)}>Tăng (+1)</button>
                <button onClick={() => setCount(count - 1)}>Giảm (-1)</button>
                {/* Thử thách: Thêm nút tăng 5 */}
                <button onClick={() => setCount(count + 5)} style={{ background: "#3498db", color: "white" }}>Tăng (+5)</button>
                <button onClick={() => setCount(count * 2)}>Nhân đôi (x2)</button>
                <button onClick={() => setCount(0)} style={{ background: "gray", color: "white" }}>Reset</button>
            </div>
        </div>
    );
}

// ==========================================
// 4.2 — USESTATE VỚI CHUỖI & THỬ THÁCH INPUT
// ==========================================
function StringState() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // Thử thách: State ẩn/hiện mật khẩu
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Thử thách: Kiểm tra email hợp lệ realtime
    const isEmailValid = email.includes("@");

    return (
        <div style={{ padding: "15px", border: "1px solid #ddd", marginBottom: "15px", borderRadius: "8px", background: "#fdfefe" }}>
            <h3>4.2 Kiểm soát dữ liệu Input</h3>
            
            {/* Input Tên + Thử thách đếm ký tự */}
            <div style={{ marginBottom: "10px" }}>
                <label>Họ và tên: </label>
                <input value={name} maxLength={100} onChange={(e) => setName(e.target.value)} placeholder="Nhập họ tên..." />
                <span style={{ fontSize: "12px", color: "gray", marginLeft: "10px" }}>
                    {name.length}/100 ký tự
                </span>
            </div>

            {/* Input Email + Thử thách validate @ */}
            <div style={{ marginBottom: "10px" }}>
                <label>Địa chỉ Email: </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email..." />
                {email && (
                    <span style={{ fontSize: "13px", marginLeft: "10px", color: isEmailValid ? "green" : "red", fontWeight: "bold" }}>
                        {isEmailValid ? "✅ Email hợp lệ" : "❌ Thiếu ký tự '@'"}
                    </span>
                )}
            </div>

            {/* Thử thách: Ô nhập mật khẩu có nút ẩn/hiện */}
            <div style={{ marginBottom: "10px" }}>
                <label>Mật khẩu bí mật: </label>
                <input 
                    type={isPasswordVisible ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Nhập mật khẩu..." 
                />
                <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} style={{ marginLeft: "5px", padding: "2px 8px", fontSize: "12px" }}>
                    {isPasswordVisible ? "🙈 Ẩn" : "👁️ Hiện"}
                </button>
            </div>

            {name && (
                <p style={{ background: "#e8f8f5", padding: "10px", borderRadius: "4px", fontSize: "14px" }}>
                    Realtime Preview: Xin chào <strong>{name}</strong>! Email của bạn là <i>{email || "..."}</i>
                </p>
            )}
        </div>
    );
}

// ==========================================
// 4.3 — USESTATE BOOLEAN & THỬ THÁCH ACCORDION
// ==========================================
function BooleanState() {
    const [isVisible, setIsVisible] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    // Thử thách: Bật/Tắt bóng đèn 💡
    const [isBulbOn, setIsBulbOn] = useState(false);
    // Thử thách: Trạng thái đóng/mở Accordion
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    return (
        <div style={{ 
            padding: "15px", border: "1px solid #ddd", marginBottom: "15px", borderRadius: "8px",
            backgroundColor: isDarkMode ? "#2c3e50" : "#fff", color: isDarkMode ? "#fff" : "#333" 
        }}>
            <h3>4.3 Công tắc Boolean (Toggle)</h3>
            
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? "Ẩn văn bản" : "Hiện văn bản"}</button>
                <button onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode ? "☀️ Chế độ sáng" : "🌙 Chế độ tối"}</button>
                
                {/* Thử thách: Bật/Tắt bóng đèn */}
                <button onClick={() => setIsBulbOn(!isBulbOn)} style={{ background: isBulbOn ? "#f1c40f" : "#bdc3c7", color: "black" }}>
                    {isBulbOn ? "💡 Đèn đang BẬT" : "⚫ Đèn đang TẮT"}
                </button>
            </div>

            {isVisible && <p style={{ fontStyle: "italic" }}>Giao diện này phản hồi tức thì nhờ trạng thái true/false.</p>}

            {/* Thử thách: Accordion thành phần tự chế */}
            <div style={{ border: "1px solid #ccc", borderRadius: "4px", marginTop: "10px" }}>
                <div 
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)} 
                    style={{ padding: "10px", background: "#f1f1f1", cursor: "pointer", display: "flex", justifyContent: "space-between", color: "black" }}
                >
                    <strong>❓ Click vào đây để xem hướng dẫn giải bài tập</strong>
                    <span>{isAccordionOpen ? "▲" : "▼"}</span>
                </div>
                {isAccordionOpen && (
                    <div style={{ padding: "10px", background: "#fff", color: "black", fontSize: "14px" }}>
                        🎉 Bạn đã mở thành công Accordion! Dùng toán tử && kết hợp với biến state boolean để ẩn/hiện khối div này.
                    </div>
                )}
            </div>
        </div>
    );
}

// ==========================================
// 4.4 — KẾT HỢP NHIỀU USESTATE VÀ VALIDATE FORM
// ==========================================
function MultipleStates() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    // Thử thách 1: Thêm trường Email vào form đăng ký
    const [email, setEmail] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit() {
        // Thử thách 2: Validate tuổi phải từ 1 đến 99 và email phải hợp lệ
        if (name.trim() === "" || age === "" || email.trim() === "") {
            alert("Vui lòng không để trống bất kỳ trường thông tin nào!");
            return;
        }
        
        const ageNum = parseInt(age);
        if (ageNum <= 0 || ageNum >= 100) {
            alert("❌ Lỗi: Số tuổi nhập vào phải lớn hơn 0 và nhỏ hơn 100!");
            return;
        }

        if (!email.includes("@")) {
            alert("❌ Lỗi: Định dạng email đăng ký không hợp lệ!");
            return;
        }

        setSubmitted(true);
    }

    return (
        <div style={{ padding: "15px", border: "1px solid #ddd", marginBottom: "15px", borderRadius: "8px", background: "#fdfefe" }}>
            <h3>4.4 Biểu mẫu đăng ký tổng hợp</h3>
            
            {!submitted ? (
                <div>
                    <div style={{ marginBottom: "8px" }}><label>Tên: </label><input value={name} onChange={(e) => setName(e.target.value)} /></div>
                    <div style={{ marginBottom: "8px" }}><label>Tuổi: </label><input type="number" value={age} onChange={(e) => setAge(e.target.value)} /></div>
                    {/* Thử thách thêm trường Email */}
                    <div style={{ marginBottom: "8px" }}><label>Email: </label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" /></div>
                    
                    <div style={{ marginBottom: "10px" }}>
                        <label>
                            <input type="checkbox" checked={isStudent} onChange={(e) => setIsStudent(e.target.checked)} />
                            Tôi hiện đang là sinh viên
                        </label>
                    </div>
                    <button onClick={handleSubmit} style={{ background: "#2ecc71", color: "white", padding: "6px 15px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Đăng ký ngay</button>
                </div>
            ) : (
                <div style={{ background: "#d4edda", padding: "15px", borderRadius: "4px", color: "#155724" }}>
                    {/* Thử thách 3: Hiển thị lời chào kèm tên khi nhập xong */}
                    <h3>🎉 Xin chào {name}! Đăng ký thành công hệ thống.</h3>
                    <p>📧 Email liên hệ: {email}</p>
                    <p>🎂 Tuổi đời: {age} tuổi</p>
                    <p>🎓 Trạng thái sinh viên: {isStudent ? "Đang đi học" : "Đã đi làm"}</p>
                    <button onClick={() => { setSubmitted(false); setName(""); setAge(""); setEmail(""); setIsStudent(false); }} style={{ marginTop: "10px" }}>Đăng ký tài khoản khác</button>
                </div>
            )}
        </div>
    );
}

// ==========================================
// COMPONENT CHÍNH ĐIỀU PHỐI TOÀN BỘ TIER 4
// ==========================================
function App() {
    return (
        <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto", padding: "10px" }}>
            <h2 style={{ textAlign: "center", color: "#2c3e50" }}>Tier 4 — Quản Lý Trạng Thái Với useState ⚡</h2>
            <hr />
            <NumberState />
            <StringState />
            <BooleanState />
            <MultipleStates />
        </div>
    );
}

export default App;