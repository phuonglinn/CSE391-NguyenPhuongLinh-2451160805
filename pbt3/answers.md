# PHIẾU BÀI TẬP 03
## PHẦN A: ĐỌC HIỂU
### Câu A1:

3 cách nhúng css vào html:
- Inline CSS (trong thẻ)
    - vd: `<h1 style="color: red; font-size: 24px;">Phương Linh</h1>`
    - Ưu điểm:
        - Nhanh, đơn giản
        - Áp dụng ngay cho 1 phần tử cụ thể
        - Không cần tạo file CSS riêng
    - Nhược điểm:
        - Code khó đọc khi nhiều style
        - Khó tái sử dụng
        - Khó bảo trì
        - Làm HTML dài và rối
    - Khi nào nên dùng: 
        - Test nhanh giao diện
        - Chỉnh tạm 1 phần từ nhỏ
        - Email html thường dùng inline css
- Internal CSS text `(trong <style>)`
    - vd:
    ```text
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                p {
                    color: blue;
                    font-size: 18px;
                }
            </style>
        </head>

        <body>
            <p>Phương Linh</p>
        </body>
        </html>
    ```
    - Ưu điểm:
        - Code gọn hơn
        - Dễ quản lý hơn
        - Áp dụng cho nhiều phần tử trong cùng trang
    - Nhược điểm:
        - Chỉ dùng cho 1 file html
        - Không tái sử dụng giữa nhiều trang
        - File html dài
    - Khi nào nên dùng:
        - Web nhỏ
        - Trang demo hoặc bài tập
        - css chỉ dùng riêng cho 1 trang
- External CSS (file riêng) 
    - vd:
        - File html:
        ```text
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="style.css">
        </head>

        <body>
            <p>Xin chào</p>
        </body>
        </html>
        ```
        - File css:
        ```text
        p {
            color: green;
            font-size: 22px;
        }
        ```
    - Ưu điểm:
        - Quản lý chuyên nghiệp
        - Tái sử dụng cho nhiều trang
        - html sạch và dễ lọc
        - dễ bảo trì
        - Web tải nhanh hơn nhờ cache css
    - Nhược điểm:
        - cần thêm file riêng
        - sai đường dẫn thì css không hoạt động
    - Khi nào nên dùng:
        - dự án thật
        - Web nhiều trang
        - làm việc nhóm
        - css lớn và phức tạp

Câu hỏi thêm: Thứ tự ưu tiên: Inline CSS > Internal CSS > External CSS

### Câu A2:

1. `h1 `-> Chọn: ShopTLU
2. `.price `-> Chọn: 25.990.000đ, 45.990.000đ
3. `#app header` -> Chọn: ShopTLU, Home, Products, About
4. `nav a:first-child ` -> Chọn: Home
5. `.product.featured h2` -> Chọn: MacBook Pro
6. `article > p` -> Chọn: 25.990.000đ, Mô tả sản phẩm..., 45.990.000đ, Mô tả sản phẩm...
7. `a[href="/"]` -> Chọn: Home
8. `.top-bar.dark h1` -> Chọn: ShopTLU

### Câu A3:

- Trường hợp 1:
  - Chiều rộng hiển thị = 450
  - Không gian chiếm trên trang = 470
- Trường hợp 2:
  - Chiều rộng hiển thị = 400
  - Kích thước content thực tế = 350
  - Không gian chiếm trên trang = 420
- Trường hợp 3:
  - Khoảng cách giữa box-a và box-b = 40
  - Không phải là 65px vì CSS lấy giá trị lớn hơn

- Nếu .box-a có margin-bottom: -10px và .box-b có margin-top: 40px, khoảng cách = 40 + (-10) = 30px

### Câu A4:

1.
- Rule A:
  - ID: 0
  - Class: 0
  - tag `p`: 1
  - specificity: (0,0,1)
- Rule B:
  - ID: 0
  - Class `.price`: 1
  - tag: 0
  - specificity: (0,1,0)
- Rule C:
  - ID `#main-price`: 1
  - Class: 0
  - tag: 0
  - specificity: (1,0,0)
- Rule D:
  - ID: 0
  - Class `.price`: 1
  - tag `p`: 1
  - specificity: (0,1,1)

2.
- Element sẽ có màu đỏ
- Vì CSS ưu tiên ID > class > tag mà `#main-price { color: red; }` mạnh nhất

3. Nếu thêm `<p class="price" id="main-price" style="color: orange;">` thì element sẽ có màu cam.
4. Nếu Rule A thêm !important, element có màu đen. Vì khi một thuộc tính được gán !important, nó sẽ phá vỡ mọi quy tắc tính điểm specificity thông thường và chiếm quyền ưu tiên cao nhất (cao hơn cả Inline style và ID selector).