import { useState } from "react";

// ==========================================
// BÀI 1.1 — LIFECYCLE DEMO (RENDER LẦN ĐẦU)
// ==========================================
function LifecycleDemo() {
    console.log("1️⃣ Component LifecycleDemo được gọi!");
    
    return (
        <div style={{ padding: "15px", border: "2px solid #3498db", margin: "10px 0" }}>
            <h2>1. Lifecycle Demo</h2>
            <p>Mở Console (F12) để xem nhật ký log.</p>
            <p>Component này chỉ render một lần khi trang được nạp.</p>
        </div>
    );
}

// ==========================================
// BÀI 1.2 — COUNTER TỆ (DÙNG BIẾN THƯỜNG)
// ==========================================
function BadCounter() {
    let count = 0; // Biến bình thường
    
    function handleClick() {
        count = count + 1;
        console.log("Biến thường count tăng lên:", count);
    }
    
    return (
        <div style={{ padding: "15px", border: "2px solid #e74c3c", margin: "10px 0" }}>
            <h2>2. ❌ Counter Tệ (Biến thường)</h2>
            <p>Bộ đếm hiện tại: <strong>{count}</strong></p>
            <button onClick={handleClick} style={{ padding: "5px 10px", cursor: "pointer" }}>
                Tăng (+1)
            </button>
            <p style={{ color: "red", fontSize: "13px" }}>
                ⚠️ Bấm nút: Số trong Console tăng, nhưng số trên màn hình đứng im!
            </p>
        </div>
    );
}

// ==========================================
// BÀI 1.2 — COUNTER TỐT (DÙNG USESTATE)
// ==========================================
function GoodCounter() {
    // Khai báo useState đặc biệt
    const [count, setCount] = useState(0);
    
    console.log("🔄 Component GoodCounter đang re-render! Giá trị hiện tại là:", count);
    
    function handleClick() {
        setCount(count + 1); // Kích hoạt re-render
    }
    
    return (
        <div style={{ padding: "15px", border: "2px solid #2ecc71", margin: "10px 0" }}>
            <h2>3. ✅ Counter Tốt (useState)</h2>
            <p>Bộ đếm hiện tại: <strong>{count}</strong></p>
            <button onClick={handleClick} style={{ padding: "5px 10px", cursor: "pointer" }}>
                Tăng (+1)
            </button>
            <p style={{ color: "green", fontSize: "13px" }}>
                ✅ Bấm nút: Màn hình lập tức cập nhật số mới!
            </p>
        </div>
    );
}

// ==========================================
// BÀI 1.3 — FLOW DEMO (LUỒNG HOẠT ĐỘNG)
// ==========================================
function FlowDemo() {
    const [step, setStep] = useState(1);
    
    return (
        <div style={{ padding: "15px", border: "2px solid #9b59b6", margin: "10px 0" }}>
            <h2>4. Luồng Hoạt Động (Flow Demo)</h2>
            <p>Bước hiện tại: <strong>{step}</strong></p>
            
            <button onClick={() => setStep(step + 1)} style={{ marginRight: "10px" }}>
                Bước tiếp theo →
            </button>
            <button onClick={() => setStep(1)}>Quay lại đầu</button>
            
            <div style={{ marginTop: "15px", padding: "10px", background: "#f0f0f0", borderRadius: "5px" }}>
                {step === 1 && <p>👋 Bước 1: Xin chào!</p>}
                {step === 2 && <p>📖 Bước 2: Đang học React</p>}
                {step === 3 && <p>🎯 Bước 3: Hiểu useState</p>}
                {step === 4 && <p>🎉 Bước 4: Hoàn thành Tier 1!</p>}
            </div>
        </div>
    );
}

// ==========================================
// COMPONENT CHÍNH ĐỂ HIỂN THỊ TẤT CẢ
// ==========================================
function App() {
    return (
        <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
            <h1 style={{ textAlign: "center" }}>Học Luồng Hoạt Động Của React 🚀</h1>
            <hr />
            <LifecycleDemo />
            <BadCounter />
            <GoodCounter />
            <FlowDemo />
        </div>
    );
}

export default App;