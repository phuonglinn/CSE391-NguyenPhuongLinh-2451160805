// =================================================================
// 1. pipe() — Nối chuỗi các hàm (Function Composition)
// Chạy từ trái qua phải, kết quả hàm trước là đầu vào hàm sau
// =================================================================
function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((acc, fn) => fn(acc), initialValue);
    };
}


// =================================================================
// 2. memoize() — Caching kết quả tính toán
// Lưu lại kết quả dựa trên đối số truyền vào, nếu trùng thì lấy luôn từ bộ nhớ cache
// =================================================================
function memoize(fn) {
    const cache = {}; // Thùng chứa cache private nhờ Closure
    
    return function(...args) {
        // Chuyển mảng arguments thành chuỗi String để làm Key cho Object cache
        const key = JSON.stringify(args);
        
        if (key in cache) {
            return cache[key]; // Nếu có trong bộ nhớ -> Trả về ngay lập tức
        }
        
        // Nếu chưa có -> Tính toán, lưu vào cache rồi trả về
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}


// =================================================================
// 3. debounce() — Trì hoãn thực thi (Chờ user ngừng gõ mới chạy)
// Cực kỳ hữu ích khi làm tính năng Auto-complete Search để tránh spam API
// =================================================================
function debounce(fn, delay) {
    let timeoutId;
    
    return function(...args) {
        // Cứ mỗi khi hàm được gọi -> Xóa bộ đếm thời gian cũ đi
        clearTimeout(timeoutId);
        
        // Thiết lập bộ đếm thời gian mới
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}


// =================================================================
// 4. retry() — Tự động thử lại hành động Async nếu gặp lỗi
// Thường dùng khi gọi API / kết nối Database bị chập chờn mạng
// =================================================================
async function retry(fn, maxAttempts = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn(); // Thử chạy hàm async
        } catch (error) {
            lastError = error;
            console.log(`[Retry] Lần thử ${attempt}/${maxAttempts} thất bại...`);
        }
    }
    
    // Nếu đi hết vòng lặp mà vẫn lỗi -> Ném ra lỗi cuối cùng
    throw new Error(`Đã thử lại ${maxAttempts} lần nhưng vẫn thất bại! Lỗi gốc: ${lastError.message}`);
}


// =================================================================
// BỘ KIỂM THỬ (TEST CASES) THEO ĐỀ BÀI
// =================================================================

// --- TEST FUNCTION 1: PIPE ---
console.log("=== 1. TEST PIPE ===");
const processPipe = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log(processPipe(5)); // Kỳ vọng: "Kết quả: 20"


// --- TEST FUNCTION 2: MEMOIZE ---
console.log("\n=== 2. TEST MEMOIZE ===");
const expensiveCalc = memoize((n) => {
    console.log("Đang tính toán nặng mệt mỏi...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("Lần 1 gọi hàm:");
console.log(expensiveCalc(1000000)); // Hiện chữ "Đang tính toán..."

console.log("Lần 2 gọi hàm với cùng tham số:");
console.log(expensiveCalc(1000000)); // KHÔNG hiện chữ "Đang tính toán...", lấy từ cache vèo vèo!


// --- TEST FUNCTION 3: DEBOUNCE ---
console.log("\n=== 3. TEST DEBOUNCE ===");
const search = debounce((query) => {
    console.log("-> Kích hoạt API Searching với từ khóa:", query);
}, 500);

console.log("User đang gõ phím liên tục...");
search("iPh");
search("iPho");
search("iPhone 16"); // Chỉ lần cuối cùng này được giữ lại sau 500ms lặng im


// --- TEST FUNCTION 4: RETRY ---
// Giả lập một hàm gọi API lúc được lúc không (Flaky API)
let counter = 0;
const fakeFetchData = async () => {
    counter++;
    if (counter < 3) {
        throw new Error("Mạng chập chờn 502 Bad Gateway");
    }
    return { status: 200, data: "Dữ liệu mật từ Server!" };
};

// Vì debounce và retry chạy bất đồng bộ (Async/setTimeout) 
// nên mình gom chúng vào cuối để quan sát log cho đẹp
setTimeout(async () => {
    console.log("\n=== 4. TEST RETRY ===");
    try {
        const response = await retry(fakeFetchData, 3);
        console.log("Kết quả thành công rực rỡ:", response);
    } catch (err) {
        console.error(err.message);
    }
}, 1000);