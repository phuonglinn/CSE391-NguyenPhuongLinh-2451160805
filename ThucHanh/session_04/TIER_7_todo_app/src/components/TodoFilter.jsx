function TodoFilter({ filter, setFilter }) {
    const filters = [
        { key: "all", label: "🎯 Tất cả" },
        { key: "active", label: "⏳ Chưa xong" },
        { key: "completed", label: "✅ Đã xong" }
    ];
    
    return (
        <div style={{ display: "flex", marginBottom: "15px", gap: "8px" }}>
            {filters.map(f => (
                <button 
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    style={{ 
                        flex: 1,
                        padding: "8px 12px",
                        background: filter === f.key ? "#3b82f6" : "#f1f5f9",
                        color: filter === f.key ? "white" : "#475569",
                        fontWeight: "6px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s"
                    }}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
}

export default TodoFilter;