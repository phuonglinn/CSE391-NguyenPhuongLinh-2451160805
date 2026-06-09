import PriceTag from "./PriceTag";

function ProductCard({ name, originalPrice, salePrice, image }) {
    return (
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", width: "180px", textAlign: "center", background: "white", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
            <img src={image} alt={name} style={{ width: "100%", height: "120px", objectFit: "contain", marginBottom: "10px" }} />
            <h4 style={{ margin: "10px 0", minHeight: "40px" }}>{name}</h4>
            
            {/* Gọi Component PriceTag và truyền dữ liệu xuống */}
            <PriceTag originalPrice={originalPrice} salePrice={salePrice} />
            
            <button style={{ background: "#3498db", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer", marginTop: "12px", width: "100%" }}>
                Thêm vào giỏ
            </button>
        </div>
    );
}
export default ProductCard;