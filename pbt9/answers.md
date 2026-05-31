# Phần A

## Câu A1:

1. DOM Tree

```
div#app
│
├── header
│   │
│   ├── h1
│   │   └── "Todo App"
│   │
│   └── nav
│       │
│       ├── a.active
│       │   └── "All"
│       │
│       ├── a
│       │   └── "Active"
│       │
│       └── a
│           └── "Completed"
│
└── main
    │
    ├── form#todoForm
    │   │
    │   ├── input#todoInput
    │   │
    │   └── button
    │       └── "Add"
    │
    └── ul#todoList
        │
        ├── li.todo-item
        │   └── "Learn HTML"
        │
        └── li.todo-item.completed
            └── "Learn CSS"
```

2. Viết querySelector

- Chọn thẻ `<h1>`:
  - ```javascript
    const heading = document.querySelector("h1");
    ```

- Chọn input trong form
  - ```javascript
    const input = document.querySelector("#todoInput");
    ```
- Chọn tất cả `.todo-item`
  - ```javascript
    const todos = document.querySelectorAll(".todo-item");
    ```

- Chọn link đang active
  - ```javascript
    const activeLink = document.querySelector("a.active");
    ```
- Chọn `<li> `đầu tiên trong `#todoList`
  - ```javascript
    const firstTodo = document.querySelector("#todoList li:first-child");
    ```
- Chọn tất cả `<a> `bên trong `<nav>`
  - ```javascript
    const links = document.querySelectorAll("nav a");
    ```

## Câu A2:

- innerHTML:
  - Đọc/ghi nội dung dưới dạng HTML
  - HTML được trình duyệt phân tích và render
  - Chậm hơn
  - Có nguy cơ XSS
- textContent
  - Đọc/ghi nội dung dưới dạng text
  - HTML được hiển thị như văn bản bình thường
  - Nhanh hơn
  - An toàn hơn

Ví dụ:

- innerHTML: dùng khi muốn thêm HTML động
  ```javascript
  const div = document.querySelector("#demo");
  div.innerHTML = "<h2>Hello</h2>";
  ```
- textContent: khi hiển thị dữ liệu do người dùng nhập
  ```javascript
  const div = document.querySelector("#demo");
  div.textContent = "<h2>Hello</h2>";
  ```
- innerHTML có thể gây lỗ hổng XSS vì nó coi chuỗi được gán vào là mã HTML và sẽ phân tích (parse) nó thay vì hiển thị như văn bản thông thường. Nếu dữ liệu đến từ người dùng mà không được kiểm tra, kẻ tấn công có thể chèn các thẻ HTML hoặc JavaScript độc hại vào trang web

## Câu A3:

- Thứ tự console.log: BUTTON - INNER - OUTER
- Khi click vào button: BUTTON - INNER - OUTER
- Khi có stopPropagation(): BUTTON

# Phần C:

## Câu C1:

- Lỗi 1: `onclick` trong addEventListener. Sửa: `click`
- Lỗi 2: `countDisplay = count`. Sửa: `countDisplay.textContent = count`
- Lỗi 3: `historyList.innerHTML = null`. Sửa: `historyList.innerHTML = ""`
- Lỗi 4: `item.remove`. Sửa: `item.remove()`
- lỗi 5: `count = localStorage.getItem("count")`. Sửa: `count = parseInt(localStorage.getItem("count")) || 0`
- Lỗi 6: Không load lại history từ localStorage. Sửa: thêm `historyList.innerHTML = localStorage.getItem("history") || ""` ở sự kiện load
- Lỗi 7: History load lại nhưng mất event click. Sửa: Dùng Event Delegation hoặc bind lại

## Câu C2:

1.

- bind event lên 1000 elements riêng lẻ là BAD PRACTICE vì: mỗi phần tử sẽ có một event listener riêng. Nếu có 1000 phần tử thì trình duyệt phải quản lý 1000 listener, làm tốn bộ nhớ và giảm hiệu năng. Ngoài ra, khi thêm các phần tử mới vào trang, ta lại phải gắn thêm listener cho từng phần tử đó, khiến code khó bảo trì và dễ bị lặp lại
- Cách giải quyết của Event Delegation: thay vì gắn event cho từng phần tử con, ta chỉ gắn một event listener lên phần tử cha chứa chúng. Khi người dùng click vào một phần tử con, sự kiện sẽ nổi bọt (event bubbling) lên phần tử cha. Từ đó ta kiểm tra phần tử nào đã được click và xử lý tương ứng

2.  `DocumentFragment` nhanh hơn vì:

- Là một "DOM ảo" thu nhỏ, chỉ tồn tại cô lập trong bộ nhớ RAM.
- Số lần reflow 1 lần duy nhất. Khi bạn thay đổi `fragment`, trình duyệt không hề biết và không phải vẽ lại gì cả. Chỉ khi bạn đem `fragment` đập vào `body`, trình duyệt mới tính toán một thể.
- Tận dụng bộ nhớ đệm cực nhanh, giảm tải tối đa cho chip xử lý đồ họa của trình duyệt.