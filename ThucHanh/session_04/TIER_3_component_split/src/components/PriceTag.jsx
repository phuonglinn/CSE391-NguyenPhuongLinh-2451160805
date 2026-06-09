// Component con chuyên hiển thị giá và tính toán số tiền giảm giá
function PriceTag({ originalPrice, salePrice }) {
    const tietKiem = originalPrice - salePrice;
    return (
        <div>
            <span style={{ color: "#e74c3c", fontWeight: "bold", fontSize: "18px", marginRight: "10px" }}>
                {salePrice.toLocaleString("vi-VN")}đ
            </span>
            <span style={{ color: "#95a5a6", textDecoration: "line-through", fontSize: "14px" }}>
                {originalPrice.toLocaleString("vi-VN")}đ
            </span>
            <p style={{ color: "#27ae60", fontSize: "12px", margin: "5px 0 0 0" }}>
                (Tiết kiệm: {tietKiem.toLocaleString("vi-VN")}đ)
            </p>
        </div>
    );
}
export default PriceTag;