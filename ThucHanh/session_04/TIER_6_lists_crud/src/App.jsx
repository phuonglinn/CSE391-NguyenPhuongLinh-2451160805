import { useState, useRef } from "react";

// ==========================================
// 6.1 — RENDER LIST & THỬ THÁCH ĐỒNG BỘ DỮ LIỆU
// ==========================================
function ListBasics() {
    const [fruits] = useState(["Táo", "Chuối", "Cam", "Nho"]);
    const [students] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 },
        { id: 4, name: "Dũng", age: 22 }
    ]);

    // Thử thách 3: Tính toán tuổi trung bình của danh sách sinh viên
    const totalAge = students.reduce((sum, student) => sum + student.age, 0);
    const averageAge = students.length > 0 ? (totalAge / students.length).toFixed(1) : 0;

    return (
        <div style={{ padding: "15px", border: "1px solid #ddd", marginBottom: "15px", borderRadius: "8px", background: "#fff" }}>
            <h3>6.1 Hiển thị Danh sách (Read)</h3>
            
            <h4>🍎 Trái cây nhiệt đới:</h4>
            <p style={{ fontSize: "14px", color: "gray" }}>{fruits.join(" • ")}</p>
            
            <h4>🎓 Danh sách lớp học:</h4>
            {students.map((student, index) => {
                // Thử thách 2: Hiển thị sinh viên có tuổi >= 20 bằng màu xanh lá
                const isSenior = student.age >= 20;
                return (
                    <div key={student.id} style={{ 
                        padding: "8px", margin: "5px 0", borderRadius: "4px",
                        background: isSenior ? "#e8f8f5" : "#fbfcfc",
                        borderLeft: isSenior ? "4px solid #2ecc71" : "4px solid #bdc3c7",
                        display: "flex", justifyContent: "space-between"
                    }}>
                        {/* Thử thách 1: Hiển thị số thứ tự (STT) bắt đầu từ 1 */}
                        <span><strong>#{index + 1}</strong> - {student.name}</span>
                        <span style={{ color: isSenior ? "#27ae60" : "#34495e", fontWeight: isSenior ? "bold" : "normal" }}>
                            {student.age} tuổi {isSenior && "(Lớn tuổi)"}
                        </span>
                    </div>
                );
            })}
            
            <div style={{ marginTop: "10px", padding: "8px", background: "#f2f4f4", borderRadius: "4px", fontSize: "14px", fontWeight: "bold", textAlign: "right" }}>
                📊 Tuổi trung bình toàn lớp: <span style={{ color: "#e67e22" }}>{averageAge} tuổi</span>
            </div>
        </div>
    );
}

// ==========================================
// 6.2 — THÊM PHẦN TỬ (CREATE) & THỬ THÁCH VALIDATE
// ==========================================
function CreateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" }
    ]);
    const [newName, setNewName] = useState("");
    // Thử thách 2: State thông báo thành công
    const [successMessage, setSuccessMessage] = useState("");
    
    // Sử dụng useRef giúp quản lý con trỏ chuột (Focus) chuẩn React
    const inputRef = useRef(null);

    function handleAdd() {
        // Thử thách 1: Kiểm tra chống nhập chuỗi trống hoặc toàn dấu cách
        if (newName.trim() === "") {
            alert("Tên môn học không được phép để trống!");
            return;
        }

        const newItem = {
            id: Date.now(),
            name: newName.trim()
        };

        setItems([...items, newItem]); // Thêm phần tử mới xuống cuối mảng
        setNewName("");
        setSuccessMessage(`🎉 Đã thêm thành công môn: ${newItem.name}!`);
        
        // Thử thách 3: Focus tự động đưa con trỏ chuột quay lại ô input
        if (inputRef.current) {
            inputRef.current.focus();
        }

        // Tự động xóa thông báo thành công sau 3 giây
        setTimeout(() => setSuccessMessage(""), 3000);
    }

    return (
        <div style={{ padding: "15px", border: "1px solid #ddd", marginBottom: "15px", borderRadius: "8px", background: "#fff" }}>
            <h3>6.2 Tạo mới Bản ghi (Create)</h3>
            
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                <input 
                    ref={inputRef}
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)} 
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                    placeholder="Nhập tên môn học..." 
                    style={{ padding: "8px", flex: 1 }}
                />
                <button onClick={handleAdd} style={{ background: "#3498db", color: "white", border: "none", padding: "0 15px", borderRadius: "4px", cursor: "pointer" }}>
                    ➕ Thêm môn
                </button>
            </div>

            {successMessage && <p style={{ color: "green", fontSize: "13px", margin: "5px 0", fontWeight: "bold" }}>{successMessage}</p>}

            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginTop: "10px" }}>
                {items.map(item => (
                    <span key={item.id} style={{ background: "#ebf5fb", color: "#2980b9", padding: "4px 10px", borderRadius: "20px", fontSize: "13px", border: "1px solid #aec6cf" }}>
                        📚 {item.name}
                    </span>
                ))}
            </div>
        </div>
    );
}

// ==========================================
// 6.3 — XÓA PHẦN TỬ (DELETE) & THỬ THÁCH HOÀN TÁC (UNDO)
// ==========================================
function DeleteItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Trần Văn Minh" },
        { id: 2, name: "Nguyễn Hồng An" },
        { id: 3, name: "Lê Thùy Linh" }
    ]);
    
    // Thử thách 1 & 2: Quản lý thông báo xóa và lưu trữ dữ liệu đệm để phục vụ Hoàn tác (Undo)
    const [alertMessage, setAlertMessage] = useState("");
    const [backupData, setBackupData] = useState(null);
    const undoTimeoutRef = useRef(null);

    function handleDelete(id, name) {
        // Thử thách 3: Chỉ thực hiện hành động khi người dùng bấm xác nhận (Confirm)
        if (!window.confirm(`Bạn có chắc chắn muốn xóa sinh viên: ${name}?`)) {
            return;
        }

        // Tìm vị trí và lưu trữ bản ghi vào bộ nhớ tạm trước khi loại bỏ khỏi danh sách chính
        const targetIndex = items.findIndex(item => item.id === id);
        setBackupData({ item: items[targetIndex], index: targetIndex });
        
        // Cập nhật danh sách mới loại bỏ phần tử qua hàm .filter()
        setItems(items.filter(item => item.id !== id));
        setAlertMessage(`❌ Đã xóa sinh viên [${name}].`);

        // Nếu có bộ đếm thời gian cũ đang chạy, xóa đi để thiết lập bộ đếm mới
        if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);

        // Giới hạn thời gian hiển thị nút Hoàn tác trong đúng 5 giây
        undoTimeoutRef.current = setTimeout(() => {
            setAlertMessage("");
            setBackupData(null);
        }, 5000);
    }

    function handleUndo() {
        if (!backupData) return;
        
        // Khôi phục lại mảng dữ liệu gốc chính xác tại vị trí cũ
        const restoredItems = [...items];
        restoredItems.splice(backupData.index, 0, backupData.item);
        
        setItems(restoredItems);
        setAlertMessage("🔄 Đã hoàn tác danh sách thành công!");
        setBackupData(null);
        if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
        setTimeout(() => setAlertMessage(""), 2000);
    }

    return (
        <div style={{ padding: "15px", border: "1px solid #ddd", marginBottom: "15px", borderRadius: "8px", background: "#fff" }}>
            <h3>6.3 Loại bỏ Bản ghi (Delete)</h3>

            {alertMessage && (
                <div style={{ background: "#fdf2e9", padding: "10px", borderRadius: "4px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: "4px solid #e67e22" }}>
                    <span style={{ fontSize: "13px", color: "#d35400", fontWeight: "bold" }}>{alertMessage}</span>
                    {/* Thử thách 2: Nút hoàn tác tồn tại trong vòng 5 giây */}
                    {backupData && (
                        <button onClick={handleUndo} style={{ background: "#e67e22", color: "white", border: "none", padding: "3px 8px", borderRadius: "3px", cursor: "pointer", fontSize: "12px" }}>
                            ↩️ Hoàn tác (5s)
                        </button>
                    )}
                </div>
            )}

            {items.length === 0 ? (
                <p style={{ color: "gray", textAlign: "center", fontSize: "14px" }}>Danh sách trống hoàn toàn.</p>
            ) : (
                items.map(item => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px dashed #eee", alignItems: "center" }}>
                        <span>👤 {item.name}</span>
                        <button onClick={() => handleDelete(item.id, item.name)} style={{ background: "#e74c3c", color: "white", border: "none", padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}>
                            Xóa
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

// ==========================================
// 6.4 — SỬA PHẦN TỬ (UPDATE) & THỬ THÁCH HIGHLIGHT / VALIDATE
// ==========================================
function UpdateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Đặng Quang Minh", age: 20 },
        { id: 2, name: "Bùi Tuấn An", age: 21 }
    ]);

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");
    const [toast, setToast] = useState("");

    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditAge(item.age.toString());
    }

    function saveEdit() {
        // Thử thách 2: Không cho phép lưu nếu tên bị xóa trống
        if (editName.trim() === "" || editAge.trim() === "") {
            alert("Tên và tuổi không được để trống!");
            return;
        }

        // Chạy vòng lặp .map() quét qua danh sách để chỉnh sửa đối tượng trùng ID
        setItems(items.map(item => 
            item.id === editingId 
                ? { ...item, name: editName.trim(), age: parseInt(editAge) }
                : item
        ));

        setEditingId(null); // Thoát trạng thái chỉnh sửa inline
        setToast("✅ Đã cập nhật thông tin thành công!"); // Thử thách 3: Hiển thị thông báo "Đã lưu!"
        setTimeout(() => setToast(""), 3000);
    }

    return (
        <div style={{ padding: "15px", border: "1px solid #ddd", marginBottom: "15px", borderRadius: "8px", background: "#fff" }}>
            <h3>6.4 Cập nhật dữ liệu Inline (Update)</h3>
            
            {toast && <p style={{ color: "green", fontWeight: "bold", fontSize: "13px", margin: "0 0 10px 0" }}>{toast}</p>}

            {items.map(item => (
                <div key={item.id} style={{ padding: "10px", margin: "6px 0", background: "#fdfefe", border: "1px solid #f0f0f0", borderRadius: "6px" }}>
                    {editingId === item.id ? (
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {/* Thử thách 1: Highlight ô nhập bằng đường viền xanh dương nổi bật */}
                            <input 
                                value={editName} 
                                onChange={(e) => setEditName(e.target.value)}
                                style={{ padding: "5px", flex: 2, border: "2px solid #3498db", borderRadius: "4px", outline: "none" }}
                                placeholder="Sửa tên..."
                            />
                            <input 
                                type="number" 
                                value={editAge} 
                                onChange={(e) => setEditAge(e.target.value)}
                                style={{ padding: "5px", flex: 1, border: "2px solid #3498db", borderRadius: "4px", outline: "none" }}
                                placeholder="Sửa tuổi..."
                            />
                            <button onClick={saveEdit} style={{ background: "#2ecc71", color: "white", border: "none", padding: "4px 10px", borderRadius: "4px", cursor: "pointer" }}>Lưu</button>
                            <button onClick={() => setEditingId(null)} style={{ background: "#bdc3c7", color: "black", border: "none", padding: "4px 10px", borderRadius: "4px", cursor: "pointer" }}>Hủy</button>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span><strong>{item.name}</strong> — {item.age} tuổi</span>
                            <button onClick={() => startEdit(item)} style={{ background: "#3498db", color: "white", border: "none", padding: "4px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}>
                                ✏️ Chỉnh sửa
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// ==========================================
// ĐIỀU PHỐI CHÍNH TOÀN BỘ ỨNG DỤNG TIER 6
// ==========================================
function App() {
    return (
        <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto", padding: "10px" }}>
            <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "0" }}>Tier 6 — Vận Hành Danh Sách Biến Động 🚀</h2>
            <p style={{ textAlign: "center", color: "gray", fontSize: "14px", marginTop: "5px" }}>Làm chủ hoàn toàn luồng xử lý mảng và cấu trúc dữ liệu CRUD.</p>
            <hr />
            <ListBasics />
            <CreateItem />
            <DeleteItem />
            <UpdateItem />
        </div>
    );
}

export default App;