// Mảng dữ liệu sản phẩm E-Commerce ban đầu
const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 }
];

// ==========================================
// 1. Lọc sản phẩm còn hàng (stock > 0)
// Sử dụng .filter() để giữ lại các phần tử thỏa mãn điều kiện
// ==========================================
function getInStock(products) {
    return products.filter(p => p.stock > 0);
}

// ==========================================
// 2. Lọc theo category VÀ khoảng giá
// Sử dụng .filter() kết hợp toán tử logic &&
// ==========================================
function filterProducts(products, category, minPrice, maxPrice) {
    return products.filter(p => p.category === category && p.price >= minPrice && p.price <= maxPrice);
}

// ==========================================
// 3. Sắp xếp theo giá (tăng/giảm)
// Sử dụng .sort(). Lưu ý: Dùng [...products] để tạo bản sao, tránh làm đảo lộn mảng gốc
// ==========================================
function sortByPrice(products, order = "asc") {
    return [...products].sort((a, b) => {
        if (order === "asc") return a.price - b.price; // Tăng dần
        return b.price - a.price; // Giảm dần
    });
}

// ==========================================
// 4. Tìm sản phẩm rẻ nhất mỗi category
// Sử dụng .reduce() để gom nhóm dữ liệu và so sánh giá
// ==========================================
function cheapestByCategory(products) {
    return products.reduce((acc, p) => {
        // Nếu danh mục này chưa có trong kết quả (acc), hoặc tìm thấy sản phẩm rẻ hơn sản phẩm hiện tại
        if (!acc[p.category] || p.price < acc[p.category].price) {
            acc[p.category] = p; // Cập nhật sản phẩm rẻ nhất cho danh mục đó
        }
        return acc;
    }, {}); // Khởi tạo kết quả là một đối tượng rỗng {}
}

// ==========================================
// 5. Tính tổng giá trị kho (price × stock cho mỗi SP)
// Sử dụng .reduce() để tích lũy (cộng dồn) tổng số tiền
// ==========================================
function totalInventoryValue(products) {
    return products.reduce((total, p) => total + (p.price * p.stock), 0);
}

// ==========================================
// 6. Tạo mảng chỉ chứa { name, formattedPrice }
// Sử dụng .map() để biến đổi hình dáng của từng phần tử trong mảng
// ==========================================
function formatProductList(products) {
    return products.map(p => ({
        name: p.name,
        formattedPrice: p.price.toLocaleString('vi-VN') + 'đ'
    }));
}

// ==========================================
// 7. Tính rating trung bình toàn bộ
// Sử dụng .reduce() tính tổng rating rồi chia cho số lượng phần tử
// ==========================================
function averageRating(products) {
    if (products.length === 0) return 0;
    const totalRating = products.reduce((total, p) => total + p.rating, 0);
    return Math.round((totalRating / products.length) * 10) / 10; // Làm tròn 1 chữ số thập phân
}

// ==========================================
// 8. Tìm sản phẩm theo keyword (tìm trong name, case-insensitive)
// Sử dụng .filter() kết hợp .toLowerCase() và .includes()
// ==========================================
function searchProducts(products, keyword) {
    const lowKeyword = keyword.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(lowKeyword));
}

console.log("=== IN-STOCK PRODUCTS ===");
console.log(getInStock(products));

console.log("\n=== PHONES 15-25 TRIỆU ===");
console.log(filterProducts(products, "phone", 15000000, 25000000));

console.log("\n=== CHEAPEST BY CATEGORY ===");
console.log(cheapestByCategory(products));

console.log("\n=== TOTAL INVENTORY VALUE ===");
console.log(totalInventoryValue(products).toLocaleString() + "đ");

