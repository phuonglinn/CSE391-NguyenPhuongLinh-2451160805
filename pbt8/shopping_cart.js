function createCart() {
    // Các biến Private - Nằm bảo mật bên trong Closure, bên ngoài không thể sửa đổi bừa bãi
    let items = [];
    let discountCode = null;
    
    // Hàm nội bộ dùng để tính toán số tiền được giảm giá
    function getDiscountAmount(subtotal) {
        if (!discountCode) return 0;
        switch (discountCode) {
            case "SALE10":
                return subtotal * 0.1;  // Giảm 10%
            case "SALE20":
                return subtotal * 0.2;  // Giảm 20%
            case "FREESHIP":
                return Math.min(subtotal, 30000); // Giảm tối đa 30k (Tránh trừ âm tiền)
            default:
                return 0;
        }
    }

    return {
        // 1. Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                // Sử dụng Spread operator (...) để copy thuộc tính và thêm trường quantity
                items.push({ ...product, quantity });
            }
        },
        
        // 2. Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        // 3. Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);
            if (item) {
                if (newQuantity <= 0) {
                    this.removeItem(productId); // Nếu cập nhật về 0 hoặc âm -> Tự động xóa khỏi giỏ
                } else {
                    item.quantity = newQuantity;
                }
            }
        },
        
        // 4. Tính tổng tiền sau khi đã áp dụng mã giảm giá
        getTotal() {
            const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const discountAmount = getDiscountAmount(subtotal);
            return subtotal - discountAmount;
        },
        
        // 5. Áp dụng mã giảm giá
        applyDiscount(code) {
            const validCodes = ["SALE10", "SALE20", "FREESHIP"];
            if (validCodes.includes(code)) {
                discountCode = code;
            } else {
                console.log(`Mã giảm giá '${code}' không hợp lệ!`);
            }
        },
        
        // 6. Lấy tổng số sản phẩm trong giỏ (tổng các quantity)
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        
        // 7. Xóa toàn bộ giỏ hàng
        clearCart() {
            items = [];
            discountCode = null;
        },
        
        // 8. In giỏ hàng dạng bảng chuẩn đẹp mắt theo đề bài yêu cầu
        printCart() {
            if (items.length === 0) {
                console.log("Giỏ hàng của bạn đang trống!");
                return;
            }

            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");
            console.log("├──────────────────────────────────────────────┤");

            items.forEach((item, index) => {
                const stt = String(index + 1).padEnd(1);
                const name = item.name.padEnd(13);
                const qty = String(item.quantity).padStart(2);
                const price = item.price.toLocaleString('vi-VN').padStart(10);
                const total = (item.price * item.quantity).toLocaleString('vi-VN').padStart(10);
                
                console.log(`│ ${stt} │ ${name} │ ${qty} │ ${price} │ ${total} │`);
            });

            console.log("├──────────────────────────────────────────────┤");
            
            // Định dạng dòng hiển thị Tổng cộng tiền
            const finalTotalStr = this.getTotal().toLocaleString('vi-VN') + "đ";
            const totalLabel = "Tổng cộng:";
            const spacesNeeded = 44 - totalLabel.length - finalTotalStr.length;
            
            console.log(`│ ${totalLabel}${" ".repeat(spacesNeeded)}${finalTotalStr} │`);
            console.log("└──────────────────────────────────────────────┘");
        }
    };
}

// ==========================================
// KỊCH BẢN BỘ TEST CASES THEO ĐỀ BÀI
// ==========================================
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng số lượng lên 2

console.log("--- GIỎ HÀNG BAN ĐẦU ---");
cart.printCart();

console.log("\n--- ÁP DỤNG MÃ GIẢM GIÁ SALE10 ---");
cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP hiện tại:", cart.getItemCount()); // Kỳ vọng: 4

console.log("\n--- XÓA AIRPODS PRO (ID: 3) ---");
cart.removeItem(3);
console.log("Sau xóa, số SP còn lại:", cart.getItemCount()); // Kỳ vọng: 2