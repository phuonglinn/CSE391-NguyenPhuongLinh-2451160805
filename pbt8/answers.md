# Phần A

## Câu A1:

1. Function Declaration

```javascript
function tinhThueBaoHiem(luong){
    let thue = 0
    if (thue > 11000000){
        thue = luong * 0.1
    }
    return {
        thue: thue,
        thuc_nhan = luong - thue
    }
}
```

2. Function Expression

```javascript
const tinhThueBaoHiem = function(luong){
    let thue = 0
    if (thue > 11000000){
        thue = luong * 0.1
    }
    return {
        thue: thue,
        thuc_nhan = luong - thue
    }
}
```

3. Arrow Function

```javascript
const tinhThueBaoHiem = (luong) => {
    let thue = 0
    if (thue > 11000000){
        thue = luong * 0.1
    }
    return {
        thue: thue,
        thuc_nhan = luong - thue
    }
}
```

## Câu A2:

- Đoạn 1:

  ```javascript
  function counter() {
    let count = 0;
    return {
      increment: () => ++count,
      decrement: () => --count,
      getCount: () => count,
    };
  }
  const c = counter();
  console.log(c.increment()); // 1
  console.log(c.increment()); // 2
  console.log(c.increment()); // 3
  console.log(c.decrement()); // 2
  console.log(c.getCount()); // 2
  ```

- Đoạn 2:
  - var: 3
  - var: 3
  - var: 3
  - let: 0
  - let: 1
  - let: 2

- Vì `var` không có block scope mà chỉ có function scope nên toàn bộ vòng lặp dùng chung 1 biến i.
  - Lần lặp i = 0, 1, 2: mỗi lần `setTimeout` chỉ đăng ký callback chứ chưa chạy ngay
  - Khi thêm lần cuối `i = 3` thì callback mới bắt đầu chạy nên cả 3 callack đêu thấy `i = 3`
- `let` có block scope nên mỗi vòng lặp js sẽ tạo ra 1 biến mới hoàn toàn

## Câu A3:

1. Lấy các số chẵn

```javascript
const evenNums = nums.filter((n) => n % 2 === 0);
```

2. Nhân mỗi số với 3

```javascript
const boi3 = nums.map((n) => n * 3);
```

4. Tìm số đầu tiên > 7

```javascript
const res = nums.find((n) => n > 7);
```

5. Kiểm tra CÓ số > 10 không

```javascript
const check = nums.some((n) => n > 10);
```

6. Kiểm tra TẤT CẢ đều > 0

```javascript
const check = nums.every((n) => n > 10);
```

7. Tạo mảng "Số X là [chẵn/lẻ]" → ["Số 1 là lẻ", "Số 2 là chẵn", ...]

```javascript
const res = nums.map(n =>
    "Số " + n " là" + (n % 2 == 0 ? "số chẵn" : "số lẻ")
)
```

8. Đảo ngược mảng (không mutate gốc)

```javascript
const daoMang = (arr) => [...arr].reverse();
daoMang(nums);
```

## Câu A4:

```javascript
const product = {
  name: "iPhone 16",
  price: 25990000,
  specs: { ram: 8, storage: 256, color: "Titan" },
};

// Destructuring
const {
  name,
  price,
  specs: { ram, color },
} = product;
console.log(name, price, ram, color); // Iphone 16 25990000 8 Titan
console.log(specs); // Lỗi

// Spread
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price); // 23990000
console.log(updated.sale); // true
console.log(product.price); // 25990000

// Spread gotcha
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram); // 16 vì spread chỉ copy nông nên copy.specs và product.specs đang trỏ cùng đến 1 object
```

# Phần C

## Câu C1:

```javascript
const processOrders = (orders) =>
    orders.filter(order.status === 'completed' && order.total > 100000)
            .map(({id, customer, total}) =>( {
                id,
                customer,
                total,
                discount: total * 0.1,
                finalTotal = total * 0.9
            }))
            .sort((a, b) => b.finalTotal - a.finalTotal)
```