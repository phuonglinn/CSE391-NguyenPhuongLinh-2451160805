// 1. Máy tự động random một số ngẫu nhiên từ 1 đến 100
const soBiMat = Math.floor(Math.random() * 100) + 1;

// Khởi tạo các biến quản lý trò chơi
const soLuotToiDa = 7;
let soLuotDaDoan = 0;
let mangLichSuDoan = []; // Mảng dùng để lưu lại các số user đã đoán nhằm kiểm tra trùng lặp
let daChienThang = false;

alert("Máy đã chọn xong một số bí mật từ 1 đến 100. Bạn có tối đa 7 lượt đoán. Bắt đầu nào!");

// 2. Dùng vòng lặp while để duy trì trò chơi cho đến khi hết lượt hoặc chiến thắng
while (soLuotDaDoan < soLuotToiDa) {
    // Hiển thị hộp thoại bắt người dùng nhập số
    let input = prompt(`Lượt thứ ${soLuotDaDoan + 1}/${soLuotToiDa}:\nMời bạn nhập số từ 1 đến 100:`);

    // Trường hợp người dùng bấm nút "Hủy" (Cancel) trên hộp thoại prompt
    if (input === null) {
        alert("Bạn đã thoát trò chơi. Hẹn gặp lại!");
        break; 
    }

    // Chuyển chuỗi nhập vào thành số nguyên
    let soDoan = parseInt(input);

    // BƯỚC YÊU CẦU THÊM 1: Validate input (Kiểm tra xem có phải số hợp lệ từ 1-100 không)
    if (isNaN(soDoan) || soDoan < 1 || soDoan > 100) {
        alert("Lỗi: Vui lòng chỉ nhập số nguyên trong khoảng từ 1 đến 100!");
        continue; // Lệnh này giúp bỏ qua đoạn code phía dưới, quay lại vòng lặp và KHÔNG bị mất lượt
    }

    // BƯỚC YÊU CẦU THÊM 2: Kiểm tra trùng lặp (User nhập cùng 1 số 2 lần)
    if (mangLichSuDoan.includes(soDoan)) {
        alert(`Bạn đã đoán số ${soDoan} này rồi! Hãy chọn số khác.`);
        continue; // Quay lại vòng lặp nhập số mới, KHÔNG bị mất lượt
    }

    // Nếu vượt qua các bước kiểm tra trên -> Số đoán hợp lệ -> Lưu vào lịch sử và tính là 1 lượt đoán
    mangLichSuDoan.push(soDoan);
    soLuotDaDoan++;

    // 3. So sánh số đoán với Số Bí Mật
    if (soDoan === soBiMat) {
        alert(`Đúng rồi! Bạn đoán đúng sau ${soLuotDaDoan} lần!`);
        daChienThang = true;
        break; // Đoán đúng thì dừng trò chơi luôn
    } else if (soDoan < soBiMat) {
        alert("Cao hơn! (Số bí mật lớn hơn số bạn vừa đoán)");
    } else {
        alert("Thấp hơn! (Số bí mật nhỏ hơn số bạn vừa đoán)");
    }
}

// 4. Xử lý khi hết 7 lượt mà vẫn chưa đoán đúng (Thua cuộc)
if (!daChienThang && soLuotDaDoan === soLuotToiDa) {
    alert(`Hết lượt! Bạn đã thua rồi. 😢 Đáp án đúng là: ${soBiMat}`);
}