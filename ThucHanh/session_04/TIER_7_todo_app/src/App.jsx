import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";

function App() {
    // Khởi tạo State lấy dữ liệu lưu trữ từ localStorage
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("react_todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all");

    // Đồng bộ danh sách công việc vào localStorage khi trạng thái todos thay đổi
    useEffect(() => {
        localStorage.setItem("react_todos", JSON.stringify(todos));
    }, [todos]);
    
    // Thêm công việc mới
    function addTodo() {
        if (inputValue.trim() === "") return;
        
        const newTodo = {
            id: Date.now(),
            text: inputValue.trim(),
            done: false
        };
        
        setTodos([...todos, newTodo]);
        setInputValue("");
    }
    
    function handleKeyPress(event) {
        if (event.key === "Enter") addTodo();
    }
    
    // Thay đổi trạng thái Hoàn thành / Chưa hoàn thành
    function toggleTodo(id) {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
    }
    
    // Xóa công việc
    function deleteTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }
    
    // Lọc danh sách hiển thị
    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.done;
        if (filter === "completed") return todo.done;
        return true;
    });
    
    // Tính toán số lượng thống kê
    const activeCount = todos.filter(todo => !todo.done).length;
    const completedCount = todos.filter(todo => todo.done).length;
    
    return (
        <div style={{ 
            maxWidth: "450px", 
            margin: "50px auto", 
            padding: "20px",
            background: "#ffffff",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            fontFamily: "system-ui, sans-serif"
        }}>
            <h2 style={{ textAlign: "center", color: "#1e293b", margin: "0 0 20px 0" }}>📋 Quản Lý Công Việc</h2>
            
            {/* Thanh nhập dữ liệu */}
            <div style={{ display: "flex", marginBottom: "20px" }}>
                <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Hôm nay bạn cần làm gì?..."
                    style={{ 
                        flex: 1, 
                        padding: "12px", 
                        fontSize: "15px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px 0 0 8px",
                        outline: "none"
                    }}
                />
                <button 
                    onClick={addTodo}
                    style={{ 
                        padding: "0 20px", 
                        fontSize: "15px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "0 8px 8px 0",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Thêm
                </button>
            </div>
            
            {/* Bộ lọc */}
            <TodoFilter filter={filter} setFilter={setFilter} />
            
            {/* Khu vực render danh sách */}
            <div style={{ marginTop: "10px" }}>
                {filteredTodos.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "30px", color: "#94a3b8", fontSize: "14px" }}>
                        {todos.length === 0 ? "🍃 Thảnh thơi quá, chưa có việc gì cần làm!" : "Không tìm thấy công việc phù hợp lọc."}
                    </div>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem 
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    ))
                )}
            </div>
            
            {/* Thanh thống kê dưới Footer */}
            {todos.length > 0 && (
                <div style={{ 
                    display: "flex",
                    justifycontent: "space-between",
                    alignItems: "center",
                    marginTop: "20px",
                    paddingTop: "15px",
                    borderTop: "1px solid #e2e8f0",
                    fontSize: "13px",
                    color: "#64748b"
                }}>
                    <span>⏳ Còn <strong>{activeCount}</strong> việc chưa làm</span>
                    {completedCount > 0 && (
                        <span style={{ color: "#16a34a", fontWeight: "500" }}>
                            🎉 Đã hoàn thành {completedCount} việc
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;