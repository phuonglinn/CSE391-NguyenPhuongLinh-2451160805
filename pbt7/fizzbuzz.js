// =================================================================
// VERSION 1: CLASSIC FIZZBUZZ (In từ 1 đến 100)
// =================================================================
console.log("=== VERSION 1: CLASSIC FIZZBUZZ ===");

for (let i = 1; i <= 100; i++) {
    // Phải kiểm tra điều kiện chia hết cho cả 3 và 5 trước
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}


// =================================================================
// VERSION 2: CUSTOM FIZZBUZZ (Nâng cao - Chạy theo luật động)
// =================================================================
console.log("\n=== VERSION 2: CUSTOM FIZZBUZZ ===");

function customFizzBuzz(n, rules) {
    // Vòng lặp chạy từ 1 đến n
    for (let i = 1; i <= n; i++) {
        let output = ""; // Chuỗi rỗng để cộng dồn chữ (Fizz, Buzz, Jazz...)

        // Duyệt qua từng quy tắc (rule) có trong mảng rules
        for (let j = 0; j < rules.length; j++) {
            let currentRule = rules[j];
            
            // Nếu số i chia hết cho divisor của quy tắc hiện tại
            if (i % currentRule.divisor === 0) {
                output += currentRule.word; // Cộng dồn chữ vào output
            }
        }

        // Kiểm tra kết quả sau khi đi qua hết các luật
        if (output === "") {
            // Nếu output vẫn rỗng tức là không thỏa mãn luật nào -> In ra số i
            console.log(i);
        } else {
            // Nếu có chữ -> In số kèm chữ theo định dạng đề bài yêu cầu để dễ quan sát
            console.log(`${i} = "${output}"`);
        }
    }
}

// --- BỘ TEST CASES ĐỂ KIỂM TRA ĐẦU RA ---
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);