// Tier 3: Nhận dữ liệu và hàm điều khiển thông qua Props từ cha (App.jsx)
function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div style={{ 
            display: "flex",
            alignItems: "center",
            padding: "12px",
            margin: "6px 0",
            background: todo.done ? "#f8f9fa" : "#fff",
            border: todo.done ? "1px solid #e2e8f0" : "1px solid #cbd5e1",
            borderRadius: "6px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            transition: "all 0.2s ease"
        }}>
            {/* Tier 5: Lắng nghe sự kiện onChange để đảo trạng thái công việc */}
            <input 
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
                style={{ marginRight: "12px", width: "18px", height: "18px", cursor: "pointer" }}
            />
            
            {/* Tier 2: Render biến có điều kiện (Ternary Operator) để gạch ngang chữ khi làm xong */}
            <span style={{ 
                flex: 1,
                textDecoration: todo.done ? "line-through" : "none",
                color: todo.done ? "#94a3b8" : "#1e293b",
                fontWeight: todo.done ? "normal" : "500"
            }}>
                {todo.text}
            </span>
            
            {/* Tier 6: Nút Delete gọi ngược hàm xóa của component cha */}
            <button 
                onClick={() => onDelete(todo.id)}
                style={{ 
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px"
                }}
            >
                🗑 Xóa
            </button>
        </div>
    );
}

export default TodoItem;