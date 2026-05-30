const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// --- KHỞI TẠO CÁC BIẾN ĐỂ LƯU KẾT QUẢ THỐNG KÊ ---
let countGioi = 0, countKha = 0, countTrungBinh = 0, countYeu = 0;

// Khởi tạo điểm cao nhất/thấp nhất để so sánh
let maxTB = -1, minTB = 11; 
let maxStudent = "", minStudent = "";

// Biến tính tổng điểm các môn toàn lớp
let totalMath = 0, totalPhysics = 0, totalCS = 0;

// Biến tính điểm theo giới tính (Bonus)
let totalScoreM = 0, countM = 0;
let totalScoreF = 0, countF = 0;

// --- IN TIÊU ĐỀ BẢNG KẾT QUẢ ---
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

// --- BẮT ĐẦU VÒNG LẶP DUYỆT QUA TỪNG SINH VIÊN ---
for (let i = 0; i < students.length; i++) {
    let sv = students[i];

    // 1. Tính điểm trung bình (TB) theo công thức: Toán * 0.4 + Lý * 0.3 + Tin * 0.3
    let tb = sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
    // Làm tròn lấy 1 chữ số thập phân
    tb = Math.round(tb * 10) / 10;

    // 2. Xếp loại bằng if / else và tăng biến đếm tương ứng
    let xepLoai = "";
    if (tb >= 8.0) {
        xepLoai = "Giỏi";
        countGioi++;
    } else if (tb >= 6.5) {
        xepLoai = "Khá";
        countKha++;
    } else if (tb >= 5.0) {
        xepLoai = "Trung bình";
        countTrungBinh++;
    } else {
        xepLoai = "Yếu";
        countYeu++;
    }

    // 3. In dòng dữ liệu sinh viên ra bảng
    // Mẹo nhỏ: dùng .padEnd() để các cột chữ thẳng hàng đẹp mắt trong Terminal
    let stt = (i + 1).toString().padEnd(3);
    let ten = sv.name.padEnd(6);
    let diemInRa = tb.toFixed(1).padEnd(4);
    let xl = xepLoai.padEnd(11);
    console.log(`| ${stt} | ${ten} | ${diemInRa} | ${xl} |`);

    // 4. Tìm SV có điểm TB cao nhất và thấp nhất
    if (tb > maxTB) {
        maxTB = tb;
        maxStudent = sv.name;
    }
    if (tb < minTB) {
        minTB = tb;
        minStudent = sv.name;
    }

    // 5. Cộng dồn điểm để tí nữa tính điểm TB môn của cả lớp
    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCS += sv.cs;

    // 6. Bonus: Cộng dồn điểm và đếm số lượng theo giới tính
    if (sv.gender === "M") {
        totalScoreM += tb;
        countM++;
    } else if (sv.gender === "F") {
        totalScoreF += tb;
        countF++;
    }
}
console.log("|-----|--------|------|-------------|");

// --- IN CÁC KẾT QUẢ THỐNG KÊ XUỐNG DƯỚI BẢNG ---

// Đếm số SV mỗi xếp loại
console.log(`\n* ĐẾM SỐ SV MỖI XẾP LOẠI:`);
console.log(`- Giỏi: ${countGioi} SV`);
console.log(`- Khá: ${countKha} SV`);
console.log(`- Trung bình: ${countTrungBinh} SV`);
console.log(`- Yếu: ${countYeu} SV`);

// SV cao nhất và thấp nhất
console.log(`\n* THỐNG KÊ ĐIỂM CAO/THẤP NHẤT:`);
console.log(`- SV có điểm TB cao nhất: ${maxStudent} (${maxTB.toFixed(1)})`);
console.log(`- SV có điểm TB thấp nhất: ${minStudent} (${minTB.toFixed(1)})`);

// Tính điểm TB toàn lớp cho từng môn
let tổngSốSV = students.length;
console.log(`\n* ĐIỂM TB TOÀN LỚP THEO MÔN:`);
console.log(`- Toán (Math): ${(totalMath / tổngSốSV).toFixed(2)}`);
console.log(`- Vật lý (Physics): ${(totalPhysics / tổngSốSV).toFixed(2)}`);
console.log(`- Tin học (CS): ${(totalCS / tổngSốSV).toFixed(2)}`);

// Bonus: Tính điểm TB theo giới tính
console.log(`\n* ĐIỂM TB THEO GIỚI TÍNH:`);
console.log(`- Nam (M): ${(totalScoreM / countM).toFixed(2)}`);
console.log(`- Nữ (F): ${(totalScoreF / countF).toFixed(2)}`);