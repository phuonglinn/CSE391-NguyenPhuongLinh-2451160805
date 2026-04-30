# PHIẾU BÀI TẬP 2
## PHẦN A: ĐỌC HIỂU
### CÂU A1:
1. type="email" → Ô nhập text, tự kiểm tra có @ → Dùng cho form đăng ký
2. type="password" -> Ô nhập text, ẩn kí tự -> Dùng cho đăng nhập
3. type="number" -> Ô nhập số, có tăng giảm, tự validate chỉ nhập số -> Dùng trong việc chọn số lượng sản phẩm
4. type="tel" -> Ô nhập số điện thoại, hiển thị bàn phím số trên mobile -> Dùng để nhập SĐT giao hàng
5. type="search" -> Ô tìm kiếm -> Dùng để tìm kiếm sản phẩm
6. type="url" -> Ô nhập link, kiểm tra đúng định dạng của URL -> Dùng để nhập link website shop
7. type="checkbox" -> Ô tích chọn nhiều -> Dùng cho việc lọc sản phẩm
8. type="radio" -> Chọn 1 trong nhiều option -> Dùng để chọn phương thức thann toán
9. type="date" -> Chọn ngày, tự validate định dạng ngày -> Dùng cho nhập ngày, tháng, năm, sinh
10. type="submit" -> Nút gửi form -> Dùng cho nút đặt hàng

### CÂU A2:
- Trường hợp 1: Không submit được. Vì thuộc tính required bắt buộc nhập phải có giá trị, khi người dùng để trống sẽ thông báo lỗi alt
![alt text](<A2-TH1.png>)

- Trường hợp 2: Không submit được. Vì type="email" sẽ kiểm tra định dạng email có @ hay không, khi người dùng nhập "abc"  thì sẽ thông báo lỗi
![alt text](<A2-TH2.png>)

- Trường hợp 3: Không submit được. Vì có thuộc tính min="1" và max="10", khi người dùng nhập 15 thì nó vượt qua khoảng này sẽ thông báo lỗi
![alt text](<A2-TH3.png>)

- Trường hợp 4: Không submit được. Vì thuộc tính pattern="[0-9]{10}" yêu cầu đúng 10 chữ số, khi nhập "abc123" chứa chữ cái và không đủ 10 kí tự thì sẽ báo lỗi
![alt text](<A2-TH4.png>)

- Trường hợp 5: Không submit được. Vì minlength="8" nghĩa là phải nhập tối thiểu 8 kí tự, khi người dùng nhập "123" nghĩa là chưa đủ độ dài tối thiểu nên thông báo lỗi
![alt text](<A2-TH5.png>)

### CÂU A3:
```
- <label for="email"> quan trọng cho người dùng screen reader vì:
    - screen reader sẽ đọc nội đung của label trước rồi mới đọc input
    - for="email" liên kết với id="email cho biết label này thuộc input nào
    - Nếu không có người dùng screen reader không biết nhập gì

- Dùng <fieldset> + <legend> dùng cho nhóm liên quan với nhau
    - <fieldset>: nhóm lại
    - <legend>: tiêu đề của nhóm
    - Ví dụ:

<fieldset>
    <legend>Giới tính</legend>

    <label><input type="radio" name="gender"> Nam</label>
    <label><input type="radio" name="gender"> Nữ</label>
</fieldset>

- aria-label dùng khi không có text hiển thị nhưng vẫn cần mô tả
Không nên dùng aria-label khi đã có <label> vì aria-label sẽ ghi đè nội dung trong screen reader, dễ gây sai lệch hoặc trùng thông tin
```

### CÂU A4:
1.
- loading="lazy" là thuộc tính trì hoãn việc tải ảnh cho đến khi ảnh đó chuẩn bị lọt vào khunh hình của người dùng
- Cải thiện:
    - Tăng tốc độ tải trang ban đầu: Trình duyệt không cần phải tốn băng thông để tải hàng chục tấm ảnh ở phía dưới trang lúc mới mở
    - Tiết kiệm dữ liệu: Người dùng chỉ tải những gì mà họ thấy. Nếu họ rời trang trước khi cuộn xuống dưới, các ảnh đó sẽ không bao giờ được tải
- Không nên dùng lazy cho ảnh banner, logo hoặc ảnh đầu tiên người dùng nhìn thấy khi mở trang. Nếu dùng lazy sẽ khiến cho ảnh hiện chậm, gây cảm giác trang bị trễ
2.
- Nên cung cấp nhiều `<source>` trong thẻ `<video>` vì không phải trình duyệt nào cũng hộ trợ cùng 1 định dạng video
- Dùng nhiều `<source>` để:
    - Tăng khả năng tương thích
    - Đảm bảo video luôn phát được
    - Fallback nếu format không chạy
- 3 format video web phổ biến:
    - mp4
    - webm
    - ogg
3.
- Thuộc tính alt trên img dùng để mô tả nội dung ảnh cho screen reader và hiển thị văn bản thay thế khi ảnh bị lỗi không hiển thị được
- Viết alt:
    - Ảnh sản phẩm iPhone 16: alt="IPhone 16"
    - Ảnh trang trí: alt="
    - Ảnh biểu đồ doanh thu Q1/2026: alt="Biểu đồ doanh thu quý 1 năm 2026"

### CÂU A5:
- Dùng C1 khi:
    - Ảnh chỉ minh họa trong đoạn văn
    - Không cần caption riêng
    - Không phải nội dung chính
    - vd:
    ```
    <p>iPhone 16 có thiết kế mới.</p>
    <img src="iphone.jpg" alt="iPhone 16">
    ```
- Dùng C2 khi:
    - Ảnh là nội dung quan trọng / độc lập
    - Cần chú thích (caption)
    - Có thể được tham chiếu riêng
    - vd:
    ```
    <figure>
        <img src="chart.png" alt="Biểu đồ doanh thu 2025">
        <figcaption>Hình 1: Doanh thu tăng 30%</figcaption>
    </figure>
    ```
## PHẦN B: THỰC HÀNH

## PHẦN C: PHÂN TÍCH VÀ SUY LUẬN
### CÂU C1:

