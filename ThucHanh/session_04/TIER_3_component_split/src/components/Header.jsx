function Header() {
    return (
        <header style={{ background: "#2c3e50", color: "white", padding: "10px 20px", display: "flex", justifyContent: "between", alignItems: "center", borderRadius: "5px" }}>
            <h2 style={{ margin: 0 }}>📱 Mobile Store</h2>
            <nav style={{ marginLeft: "auto" }}>
                <a href="#" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>Trang chủ</a>
                <a href="#" style={{ color: "white", textDecoration: "none" }}>Sản phẩm</a>
            </nav>
        </header>
    );
}
export default Header;