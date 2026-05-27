# TRACK A — BOOTSTRAP 5
## PHẦN A: ĐỌC HIỂU
### Câu A1:

| Kích thước | < 768px | 768px - 991px | ≥ 992px |
| ---------- | ------- | ------------- | ------- |
| Số cột     | 12      | 6             | 3       |
| Box layout | 1       | 2             | 4       |

- `col-md-6` nghĩa là từ breakpoint `md` trở lên (≥ 768px), phần tử chiếm 6/12 cột grid Bootstrap
- Không cần viết `col-sm-12` vì Bootstrap dùng Mobile-First đã áp dụng cho mọi kích thước mặc định rồi

### Câu A2:

1. `d-none d-md-block`

- `d-none`: mặc định ẩn element
- `d-md-block`: từ kích thước `md` trở lên (≥ 768px), element sẽ hiện dạng `display: block`

2.

- 5 spacing utilities (margin/padding):
  - `mt-3`: tạo margin top
  - `mb-auto`: margin-bottom tự động
  - `px-4`: padding-left và padding-right
  - `py-2`: padding-top và padding-bottom
  - `ms-5`: margin-left

3.

- `.container`: có `max-width` theo từng breakpoint
- `.container-fluid`: luôn full width 100%
- `.container-md`: trước md -> full width, từ md trở lên -> có max-width giống `.container`

## Phần C:
### Câu C1:

1. Đổi màu `$primary` từ xanh mặc định sang `#E63946`:

- Cần: mã nguồn Bootstrap Sass, Sass Compiler
- Quy trình:
  - Khai báo/Định nghĩa lại màu mới cho biến $primary
  - Import file cấu trúc gốc của Bootstrap nằm phía dưới dòng khai báo biến đó
  - Biên dịch (Compile)

2.  Không nên override trực tiếp` .btn-primary { background: red; }` mà nên dùng SASS variables vì:

- Chỉ đổi được 1 component
- Khó maintain
- Dễ bị specificity conflict


