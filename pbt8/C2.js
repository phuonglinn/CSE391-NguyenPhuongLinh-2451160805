const miniArray = {
    // 1. Tự viết hàm map: Biến đổi từng phần tử và trả về mảng mới có cùng độ dài
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // fn nhận vào 3 tham số: phần tử hiện tại, chỉ số index, và mảng gốc
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    // 2. Tự viết hàm filter: Sàng lọc phần tử, chỉ giữ lại các phần tử thỏa mãn điều kiện (true)
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // Nếu hàm callback trả về giá trị truthy (đúng)
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]); // Giữ phần tử đó lại
            }
        }
        return result;
    },

    // 3. Tự viết hàm reduce: Gom nhóm mảng thành một giá trị duy nhất (số, chuỗi, object...)
    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;
        let startIndex = 0;

        // Xử lý Edge Case: Giống hệt đặc tả ECMAScript của Array.prototype.reduce
        // Nếu người dùng KHÔNG truyền initialValue (tham số thứ 3 bị bỏ trống)
        if (initialValue === undefined) {
            if (arr.length === 0) {
                throw new TypeError("Reduce of empty array with no initial value");
            }
            // Lấy luôn phần tử đầu tiên làm giá trị khởi tạo ban đầu
            accumulator = arr[0];
            // Vòng lặp sẽ phải bắt đầu chạy từ phần tử thứ hai (index = 1)
            startIndex = 1;
        }

        // Chạy vòng lặp tích lũy dữ liệu
        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }

        return accumulator;
    }
};

// =================================================================
// BỘ KIỂM THỬ (TEST CASES) THEO ĐỀ BÀI YÊU CẦU
// =================================================================

console.log("=== TEST CUSTOM MAP ===");
console.log(miniArray.map([1, 2, 3], x => x * 2));        
// Kết quả kỳ vọng: [2, 4, 6]

console.log("\n=== TEST CUSTOM FILTER ===");
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));    
// Kết quả kỳ vọng: [3, 4]

console.log("\n=== TEST CUSTOM REDUCE ===");
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); 
// Kết quả kỳ vọng: 10


// --- TEST NÂNG CAO: Kiểm tra tính năng bỏ trống initialValue của hàm reduce ---
console.log("\n=== TEST ADVANCED REDUCE (KHÔNG CÓ INITIAL VALUE) ===");
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b)); 
// Kết quả kỳ vọng vẫn là 10 (máy tự lấy số 1 làm accumulator và cộng tiếp với 2, 3, 4)