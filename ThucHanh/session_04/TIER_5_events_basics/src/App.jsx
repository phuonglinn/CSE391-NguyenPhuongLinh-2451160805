import { useState, useEffect } from "react";

// ==========================================
// 5.1 — CLICK EVENTS & THỬ THÁCH ĐỔI MÀU / LIKE
// ==========================================
function ClickEventsDemo() {
    const [message, setMessage] = useState("Chưa hành động");
    // Thử thách 2: Đếm số lần click vào từng nút riêng biệt
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);
    // Thử thách 1: Đổi màu ngẫu nhiên cho một div
    const [divColor, setDivColor] = useState("#34495e");
    // Thử thách 3: Nút Like toggle ❤️/🤍
    const [isLiked, setIsLiked] = useState(false);

    function handleRandomColor() {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        setDivColor(randomColor);
        setMessage(`Đã đổi màu div thành ${randomColor}`);
    }

    return (
        <div style={{ padding: "15px", border: "1px solid #ddd", marginBottom: "15px", borderRadius: "8px", background: "#fff" }}>
            <h3>5.1 Sự kiện Click chuột</h3>
            <p style={{ color: "gray" }}>Hệ thống ghi nhận: <strong>{message}</strong></p>
            
            {/* Thử thách 1: Khối div đổi màu ngẫu nhiên */}
            <div style={{ width: "100%", height: "50px", backgroundColor: divColor, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", transition: "0.3s" }}>
                Khối sắc màu ngẫu nhiên
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                <button onClick={handleRandomColor}>🎨 Đổi màu ngẫu nhiên</button>
                
                {/* Thử thách 2: Đếm click riêng biệt */}
                <button onClick={() => { setCountA(countA + 1); setMessage("Click nút A"); }}>Nút A ({countA})</button>
                <button onClick={() => { setCountB(countB + 1); setMessage("Click nút B"); }}>Nút B ({countB})</button>
                
                {/* Thử thách 3: Toggle Like */}
                <button onClick={() => setIsLiked(!isLiked)} style={{ background: isLiked ? "#fce4d6" : "#f0f0f0" }}>
                    {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
                </button>
            </div>
        </div>
    );
}

// ==========================================
// 5.2 — INPUT EVENTS & THỬ THÁCH ĐẾM TỪ
// ==========================================
function InputEventsDemo() {
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");
    
    // Thử thách 3: Đếm số từ (không phải đếm ký tự)
    const countWords = (str) => {
        const trimmed = str.trim();
        return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
    };

    // Thử thách 1: Validation Email có ký tự '@'
    const isValidEmail = email.includes("@");

    return (
        <div style={{ padding: "15px", border: "1px solid #ddd", marginBottom: "15px", borderRadius: "8px", background: "#fff" }}>
            <h3>5.2 Sự kiện Input & Thực tế</h3>
            
            {/* Nhập text & Đếm từ */}
            <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Nhập đoạn văn ngắn:</label>
                <textarea 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Gõ gì đó vào đây..." 
                    style={{ width: "95%", padding: "8px" }}
                />
                <p style={{ margin: "5px 0 0 0", fontSize: "13px", color: text.length > 80 ? "red" : "gray" }}>
                    Ký tự: {text.length} | 📝 <strong>Số từ: {countWords(text)} từ</strong>
                </p>
            </div>

            {/* Nhập email & Validation */}
            <div>
                <label style={{ display: "block", marginBottom: "5px" }}>Nhập Email kiểm tra:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" style={{ padding: "6px", width: "60%" }} />
                {email && (
                    <span style={{ marginLeft: "10px", fontWeight: "bold", color: isValidEmail ? "green" : "red", fontSize: "14px" }}>
                        {isValidEmail ? "✅ Định dạng đúng" : "❌ Thiếu ký tự '@'"}
                    </span>
                )}
            </div>

            {/* Thử thách 2: Preview Realtime kết hợp từ cả 2 ô */}
            {(text || email) && (
                <div style={{ marginTop: "10px", background: "#f9f9f9", padding: "10px", borderLeft: "4px solid #3498db", fontSize: "13px" }}>
                    <strong>🔍 Xem trước nội dung:</strong>
                    <p style={{ margin: "5px 0 0 0" }}>Email gửi: {email || "(Trống)"} | Nội dung: {text || "(Trống)"}</p>
                </div>
            )}
        </div>
    );
}

// ==========================================
// 5.3 — KEYBOARD EVENTS & GAME ĐOÁN PHÍM / DI CHUYỂN
// ==========================================
function KeyboardEventsDemo() {
    // Thử thách 1: Game đoán phím ngẫu nhiên
    const keyPool = ["A", "S", "D", "F", "W", "E", "R"];
    const [targetKey, setTargetKey] = useState("A");
    const [gameState, setGameState] = useState("Nhấn đúng phím phía dưới!");

    // Thử thách 2: Di chuyển ô vuông bằng phím mũi tên
    const [squarePos, setSquarePos] = useState({ x: 50, y: 10 });

    // Thử thách 3: Khởi tạo phím tắt Ctrl + D đổi màu nền toàn trang
    const [ctrlDColor, setCtrlDColor] = useState("#ffffff");

    function handleGlobalKeyDown(event) {
        // Xử lý game đoán phím
        if (event.key.toUpperCase() === targetKey) {
            setGameState("🎉 CHÍNH XÁC! Hệ thống đã tự đổi phím mới.");
            const nextKey = keyPool[Math.floor(Math.random() * keyPool.length)];
            setTargetKey(nextKey);
        } else {
            if (event.key !== "Control" && event.key !== "d" && !event.key.includes("Arrow")) {
                setGameState(`❌ Sai rồi! Bạn vừa bấm phím "${event.key.toUpperCase()}"`);
            }
        }

        // Xử lý di chuyển ô vuông (Arrow keys)
        if (event.key === "ArrowUp") setSquarePos(p => ({ ...p, y: Math.max(0, p.y - 10) }));
        if (event.key === "ArrowDown") setSquarePos(p => ({ ...p, y: Math.min(100, p.y + 10) }));
        if (event.key === "ArrowLeft") setSquarePos(p => ({ ...p, x: Math.max(0, p.x - 5) }));
        if (event.key === "ArrowRight") setSquarePos(p => ({ ...p, x: Math.min(90, p.x + 5) }));

        // Xử lý phím tắt Ctrl + D (Ngăn hành vi bookmark mặc định của trình duyệt)
        if (event.ctrlKey && event.key.toLowerCase() === "d") {
            event.preventDefault();
            const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            setCtrlDColor(randomColor);
            setGameState("⌨️ Kích hoạt phím tắt [Ctrl + D]: Đã đổi màu khung nền!");
        }
    }

    return (
        <div 
            onKeyDown={handleGlobalKeyDown}
            tabIndex={0} // Bắt buộc phải có tabIndex để div có thể nhận tiêu điểm (focus) bàn phím
            style={{ padding: "15px", border: "1px solid #ddd", marginBottom: "15px", borderRadius: "8px", backgroundColor: ctrlDColor, transition: "background-color 0.3s" }}
        >
            <h3>5.3 Sự kiện Bàn phím (Click vào vùng này để kích hoạt)</h3>
            
            {/* Game đoán phím */}
            <div style={{ background: "rgba(255,255,255,0.8)", padding: "10px", borderRadius: "4px", marginBottom: "10px" }}>
                <p style={{ margin: "0 0 5px 0" }}>🎮 Game đoán phím nhanh: Hãy bấm phím: <strong style={{ fontSize: "20px", color: "#e74c3c" }}>{targetKey}</strong></p>
                <span style={{ fontSize: "13px", fontWeight: "bold", color: "#2c3e50" }}>{gameState}</span>
            </div>

            {/* Di chuyển ô vuông */}
            <div style={{ background: "rgba(255,255,255,0.8)", padding: "10px", borderRadius: "4px" }}>
                <p style={{ margin: "0 0 5px 0", fontSize: "13px" }}>🕹️ Thử thách: Dùng phím mũi tên <strong>↑ ↓ ← →</strong> để lái ô vuông:</p>
                <p style={{ fontSize: "11px", color: "gray", margin: "0 0 5px 0" }}>💡 Mẹo: Nhấn phím tắt <strong>[Ctrl + D]</strong> để đổi màu nền của vùng này.</p>
                <div style={{ width: "100%", height: "130px", border: "1px dashed #aaa", position: "relative", background: "#fcfcfc", borderRadius: "4px" }}>
                    <div style={{ 
                        width: "25px", height: "25px", backgroundColor: "#9b59b6", color: "white", 
                        fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center",
                        position: "absolute", left: `${squarePos.x}%`, top: `${squarePos.y}px`, transition: "0.1s ease-out"
                    }}>
                        🚀
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// 5.4 — FORM EVENTS & THỬ THÁCH XÁC NHẬN MẬT KHẨU
// ==========================================
function FormEventsDemo() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Thử thách 3: Hiển thị lỗi realtime khi nhập sai dữ liệu
    let errorMessage = "";
    if (email && !email.includes("@")) {
        errorMessage = "Email đăng ký bắt buộc phải chứa ký tự '@'!";
    } else if (password && confirmPassword && password !== confirmPassword) {
        errorMessage = "Mật khẩu xác nhận không trùng khớp với mật khẩu ban đầu!";
    }

    function handleFormSubmit(event) {
        event.preventDefault(); // CHỐNG reload lại trang web khi submit form
        
        if (errorMessage || !email || !password || !confirmPassword) {
            alert("Dữ liệu biểu mẫu không hợp lệ hoặc đang trống!");
            return;
        }
        setSubmitted(true);
    }

    return (
        <div style={{ padding: "15px", border: "1px solid #ddd", marginBottom: "15px", borderRadius: "8px", background: "#fff" }}>
            <h3>5.4 Quản lý Sự kiện Form</h3>
            
            {!submitted ? (
                <form onSubmit={handleFormSubmit}>
                    <div style={{ marginBottom: "8px" }}>
                        <label>Email: </label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@gmail.com" />
                    </div>
                    <div style={{ marginBottom: "8px" }}>
                        <label>Mật khẩu: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {/* Thử thách 2: Thêm trường xác nhận mật khẩu */}
                    <div style={{ marginBottom: "8px" }}>
                        <label>Xác nhận lại: </label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    {/* Hiển thị lỗi realtime */}
                    {errorMessage && (
                        <p style={{ color: "red", fontSize: "13px", margin: "5px 0" }}>⚠️ {errorMessage}</p>
                    )}

                    <button type="submit" disabled={!!errorMessage} style={{ background: "black", color: "white", padding: "5px 15px", cursor: "pointer" }}>
                        Gửi thông tin
                    </button>
                </form>
            ) : (
                <div style={{ background: "#d4edda", padding: "12px", borderRadius: "4px", color: "#155724" }}>
                    <h4>✅ Gửi dữ liệu Form thành công (Không reload trang)!</h4>
                    <p>Tài khoản đã đăng ký: {email}</p>
                    <button onClick={() => { setSubmitted(false); setEmail(""); setPassword(""); setConfirmPassword(""); }}>Làm lại form mới</button>
                </div>
            )}
        </div>
    );
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================
function App() {
    return (
        <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto", padding: "10px" }}>
            <h2 style={{ textAlign: "center", color: "#2c3e50", margin: "10px 0" }}>Tier 5 — Kiểm Soát Sự Kiện (Events) ⚡</h2>
            <p style={{ textAlign: "center", color: "gray", fontSize: "14px", marginTop: "0" }}>Tương tác trực tiếp chuột và bàn phím trong thời gian thực.</p>
            <hr />
            <ClickEventsDemo />
            <InputEventsDemo />
            <KeyboardEventsDemo />
            <FormEventsDemo />
        </div>
    );
}

export default App;