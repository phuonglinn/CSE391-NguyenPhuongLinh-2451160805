# PHẦN A

## Câu A1:

- Đoạn 1: undefined. Vì var bị hoisting nên biến được tạo trước nhưng chưa gán giá trị sẽ mặc định là undefined
- Đoạn 2: Lỗi. Vì `let` cũng hoisting nhưng nằm trong Temporal Dead Zone nên không truy cập được trước khi khai báo.
- Đoạn 3: Lỗi vì `const` không cho gán lại giá trị
- Đoạn 4: `arr = [1, 2, 3, 4]`. Vì`const` không đổi được biến tham chiếu, nhưng vẫn sửa được phần tử bên trong array/object
- Đoạn 5:
  - Trong block a = 2
  - Ngoài block a = 1  
    Vì `let` có block scope nên biến bên trong {} khác biến bên ngoài

## Câu A2:

```javascript
console.log(typeof null); // object
console.log(typeof undefined); // undefined
console.log(typeof NaN); // number
console.log("5" + 3); // "53"
console.log("5" - 3); // 2
console.log("5" * "3"); // 15
console.log(true + true); // 2
console.log([] + []); // ""
console.log([] + {}); // [object Object]
console.log({} + []); // [object Object]
```

- "5" + 3 và "5" - 3 cho kết quả khác nhau vì :
  - Vì toán tử `+` khi có string sẽ ưu tiên nối chuỗi
  - Vì toán tử `-` không thể nối chuỗi nên sẽ ép kiểu "5" thành number

## Câu A3:

```javascript
console.log(5 == "5"); // true
console.log(5 === "5"); // false
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(NaN == NaN); // false
console.log(0 == false); // true
console.log(0 === false); // false
console.log("" == false); // true
```

- Nên dùng `===` vì nó so sánh cả giá trị và kiểu dữ liệu nên an toàn hơn. Còn `==` tự ép kiểu nên dễ bug.

## Câu A4:

- Các giá trị Falsy trong JS: false, 0, "", null, undefined, NaN

```javascript
if ("0") console.log("A"); // có in
if ("") console.log("B"); // không in
if ([]) console.log("C"); // có in
if ({}) console.log("D"); // có in
if (null) console.log("E"); // không in
if (0) console.log("F"); // không in
if (-1) console.log("G"); // có in
if (" ") console.log("H"); // có in
```

## Câu A5:

- Cách 1:

```javascript
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

```javascript
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

```javascript
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```


# Phần C

## Câu C1:

- Lỗi 1: `if (giaSauGiam = 0)`.
  - `=` là phép gán không phải phép so sánh
  - Sửa: `if (giaSauGiam === 0)`

- Lỗi 2: `tinhGiaGiamGia("100000", 20)`
  - "100000" là kiểu string
  - Sửa: `tinhGiaGiamGia(100000, 20)`
- Lỗi 3: `var giamGia`
  - `var` có function scope, dễ bug
  - Sửa: `let giamGia`
- Lỗi 4: Chưa kiểm tra `giaBan` hợp lệ
  - Sửa: nên thêm
  ```javascript
  if (giaBan < 0) {
    return "Giá bán không hợp lệ";
  }
  ```
- Lỗi 5: Dùng `var` trong vòng lặp với `setTimeout`:
  - `var` không có block scope nên sẽ in ra 5 `Item 5`
  - sửa `for (let i = 0; i < 5; i++)`
