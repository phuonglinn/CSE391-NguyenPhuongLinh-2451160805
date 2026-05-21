# PHIẾU BÀI TẬP 04
## PHẦN A: ĐỌC HIỂU
### CÂU A1:

| Position   | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí       | Cuộn theo trang? | Use case                                    |
| ---------- | ------------------------- | ----------------------- | ---------------- | ------------------------------------------- |
| `static`   | ✅                        | Không dùng              | ✅               | Mặc định — không cần viết                   |
| `relative` | ✅                        | Vị trí gốc của nó       | ✅               | Làm anchor cho absolute con, dịch nhẹ       |
| `absolute` | ❌                        | Cha `relative` gần nhất | ✅               | Badge, dropdown, tooltip, overlay           |
| `fixed`    | ❌                        | Viewport                | ✅               | Chat button, cookie banner, header cố định  |
| `sticky`   | ✅→❌                     | Viewport (khi dính)     | ✅, ❌           | Sticky header, sticky table header, sidebar |

- `absolute` tham chiếu `body` khi không tìm thấy parent nào có `relative`, `absolute`, `fixed`, `sticky`.
- `absolute` tham chiếu parent khi parent gần nhất có position khác static
- "nearest positioned ancestor" là thằng cha gần nhất có position khác static để làm mốc toạ độ cho element con. Khi 1 element dùng `position: absolute` thì nó sẽ đi tìm từ element đó lên các thằng cha phía trên. Nếu thằng cha gần nhất có position khác static thì nó lấy cha đấy làm mốc. Nếu tất cả cha đều là `static` thì nó sẽ bám theo toàn trang.

### Câu A2:

- Trường hợp 1: 4 items
  - Chia đều 1 cột, 4 hàng bằng nhau
  - ```text
     +----+----+----+----+
     | 1  | 2  | 3  | 4  |
     +----+----+----+----+
    ```
- Trường hợp 2: 6 items
  - Bố cục: 3 hàng, 2 cột
  - ```text
      +------+------+
      |  1   |  2   |
      +------+------+

      +------+------+
      |  3   |  4   |
      +------+------+

      +------+------+
      |  5   |  6   |
      +------+------+
    ```

- Trường hợp 3: 3 items
  - Bố cục: item đầu sát trái, item cuối sát phải, item nằm giữa với khoảng cách đều
  - ```text
      +-----------------------------------+
      |                                   |
      | 1              2               3  |
      |                                   |
      +-----------------------------------+
    ```
- Trường hợp 4: 3 items
  - Bố cục: 3 cột, cột 1 và 3 chiếm 200px, cột 2 chiếm 1fr
  - ```text
      +--------+------------------+--------+
      |   1    |        2         |   3    |
      | 200px  |       1fr        | 200px  |
      +--------+------------------+--------+
    ```
- Trường hợp 5: 7 items
  - Bố cục: 3 cột bằng nhau, item cuối nằm ở hàng 3 cột 1
  - ```text
      +----+----+----+
      | 1  | 2  | 3  |
      +----+----+----+

      +----+----+----+
      | 4  | 5  | 6  |
      +----+----+----+

      +----+----+----+
      | 7  |    |    |
      +----+----+----+
    ```

## PHẦN B: THỰC HÀNH
### CÂU B1:
