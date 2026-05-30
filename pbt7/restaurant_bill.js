// 1. Định nghĩa danh sách món ăn đầu vào (Test case giống đề bài)
const orderItems = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

// Hàm dùng để định dạng số thành tiền tệ dạng "200.000đ"
function formatMoney(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

// Hàm hỗ trợ căn đều khoảng trắng hai bên để vẽ khung hóa đơn
function TaoDongHoaDon(trai, phai, chieuRong = 36) {
    const soKhoangTrang = chieuRong - trai.length - phai.length;
    if (soKhoangTrang < 0) return `║ ${trai} ${phai} ║`; // Phòng hờ chữ quá dài
    return `║ ${trai}${" ".repeat(soKhoangTrang)}${phai} ║`;
}

// 2. HÀM CHÍNH TÍNH TOÁN VÀ IN HÓA ĐƠN
function inHoaDonNhaHang(items, coTip = true, ngayTuyChon = null) {
    // --- BƯỚC 1: TÍNH TỔNG TIỀN CHƯA GIẢM ---
    let tongCong = 0;
    for (let i = 0; i < items.length; i++) {
        tongCong += items[i].price * items[i].quantity;
    }

    // --- BƯỚC 2: XỬ LÝ QUY TẮC GIẢM GIÁ ---
    let phanTramGiam = 0;
    if (tongCong > 1000000) {
        phanTramGiam = 15; // Giảm 15% nếu > 1 triệu
    } else if (tongCong > 500000) {
        phanTramGiam = 10; // Giảm 10% nếu > 500k
    }

    // Kiểm tra ngày thứ 4 (Wednesday). Trong JS: 0 = Chủ Nhật, 1 = Thứ 2,..., 3 = Thứ 4 (Wednesday)
    // Để làm bài linh hoạt, nếu truyền ngayTuyChon vào thì lấy ngày đó, không thì lấy ngày hôm nay.
    const ngayHienTai = ngayTuyChon ? ngayTuyChon : new Date();
    if (ngayHienTai.getDay() === 3) {
        phanTramGiam += 5; // Giảm thêm 5% vào ngày Wednesday
    }

    let tienGiamGia = tongCong * (phanTramGiam / 100);
    let tongSauGiam = tongCong - tienGiamGia;

    // --- BƯỚC 3: TÍNH VAT VÀ TIP ---
    let vat = tongSauGiam * 0.08; // VAT 8% tính trên số tiền sau giảm giá
    let tip = coTip ? (tongSauGiam * 0.05) : 0; // Tip 5% (optional)

    let thanhToan = tongSauGiam + vat + tip;

    // --- BƯỚC 4: VẼ VÀ IN HÓA ĐƠN ĐẸP MẮT ---
    console.log("╔══════════════════════════════════════╗");
    console.log("║          HÓA ĐƠN NHÀ HÀNG            ║");
    console.log("╠══════════════════════════════════════╣");

    // In từng món ăn
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let thanhTienMon = item.price * item.quantity;
        
        // Tạo chuỗi hiển thị bên trái và bên phải
        let cotTrai = `${i + 1}. ${item.name.padEnd(10)} x${item.quantity}`;
        let cotPhai = `@${(item.price / 1000)}k = ${(thanhTienMon / 1000)}k`;
        
        console.log(TaoDongHoaDon(cotTrai, cotPhai));
    }

    console.log("╠══════════════════════════════════════╣");
    
    // In các dòng tổng kết tiền bạc
    console.log(TaoDongHoaDon("Tổng cộng:", formatMoney(tongCong)));
    console.log(TaoDongHoaDon(`Giảm giá (${phanTramGiam}%):`, formatMoney(tienGiamGia)));
    console.log(TaoDongHoaDon("VAT (8%):", formatMoney(vat)));
    console.log(TaoDongHoaDon(`Tip (${coTip ? '5%' : '0%'}):`, formatMoney(tip)));
    
    console.log("╠══════════════════════════════════════╣");
    console.log(TaoDongHoaDon("THANH TOÁN:", formatMoney(thanhToan)));
    console.log("╚══════════════════════════════════════╝");
}

// 3. CHẠY THỬ CHƯƠNG TRÌNH
// Trường hợp 1: Chạy test case cơ bản giống hệt đề bài (Không rơi vào ngày Thứ 4 để check 0%)
// Mình sẽ giả lập ngày là Thứ Hai (getDay = 1) để test
console.log("\nHÓA ĐƠN 1:");
inHoaDonNhaHang(orderItems, true, new Date("2026-06-01")); // Ngày 1/6/2026 là Thứ Hai

// Trường hợp 2: Test thử một hóa đơn khủng > 1 triệu vào đúng ngày Thứ Tư (Wednesday) để xem giảm giá cộng dồn
console.log("\nHÓA ĐƠN 2:");
const orderKhung = [
    { name: "Lẩu Cá Hồi", price: 600000, quantity: 2 },
    { name: "Bia Kyoto", price: 50000, quantity: 5 }
];
inHoaDonNhaHang(orderKhung, true, new Date("2026-06-03")); // Ngày 3/6/2026 là Thứ Tư (Wednesday)