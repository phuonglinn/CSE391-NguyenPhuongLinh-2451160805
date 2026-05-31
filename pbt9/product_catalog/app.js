// --- Dữ liệu sản phẩm (Hơn 12 sản phẩm thuộc 4 categories khác nhau) ---
const products = [
    { id: 1, name: "iPhone 16 Pro Max", price: 34990000, category: "phone", image: "https://placehold.co/200", rating: 4.9, inStock: true },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 29990000, category: "phone", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 3, name: "Google Pixel 9 Pro", price: 25500000, category: "phone", image: "https://placehold.co/200", rating: 4.6, inStock: false },
    { id: 4, name: "MacBook Air M3", price: 27990000, category: "laptop", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 5, name: "Dell XPS 13 Plus", price: 42000000, category: "laptop", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 6, name: "ASUS ROG Zephyrus G14", price: 38990000, category: "laptop", image: "https://placehold.co/200", rating: 4.9, inStock: false },
    { id: 7, name: "Sony WH-1000XM5", price: 6490000, category: "audio", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 8, name: "AirPods Pro 2 USB-C", price: 5690000, category: "audio", image: "https://placehold.co/200", rating: 4.4, inStock: true },
    { id: 9, name: "Marshall Motif II A.N.C", price: 4990000, category: "audio", image: "https://placehold.co/200", rating: 4.3, inStock: true },
    { id: 10, name: "Logitech MX Master 3S", price: 2490000, category: "accessory", image: "https://placehold.co/200", rating: 4.9, inStock: true },
    { id: 11, name: "Bàn phím Keychron K2 V2", price: 1850000, category: "accessory", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 12, name: "Sạc Dự Phòng Anker GaN 140W", price: 2200000, category: "accessory", image: "https://placehold.co/200", rating: 4.5, inStock: false },
    { id: 13, name: "iPad Pro M4", price: 28990000, category: "tablet", image: "https://placehold.co/200", rating: 5.0, inStock: true }
];

// --- Selectors & State Quản lý ---
const productGrid = document.getElementById('productGrid');
const categoryContainer = document.getElementById('categoryContainer');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const cartBadge = document.getElementById('cartBadge');
const themeToggle = document.getElementById('themeToggle');
const modalContainer = document.getElementById('modalContainer');

let currentCategory = 'all';
let currentSearchKeyword = '';
let currentSortCriteria = 'default';
let cartCount = 0;

// Tiện ích Format Tiền VNĐ
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// --- 1. Function Render Products ---
function renderProducts(productsToRender) {
    productGrid.innerHTML = ''; // Clear grid trước khi render mới

    if (productsToRender.length === 0) {
        const noProductMsg = document.createElement('p');
        noProductMsg.textContent = 'Không tìm thấy sản phẩm nào khớp với bộ lọc.';
        noProductMsg.style.gridColumn = '1 / -1';
        noProductMsg.style.textAlign = 'center';
        noProductMsg.style.padding = '40px';
        productGrid.appendChild(noProductMsg);
        return;
    }

    productsToRender.forEach(product => {
        // Tạo thẻ bao bọc Product Card
        const card = document.createElement('div');
        card.className = 'product-card';

        // Tạo ảnh sản phẩm
        const img = document.createElement('img');
        img.className = 'product-img';
        img.src = product.image;
        img.alt = product.name;

        // Tạo tên sản phẩm
        const name = document.createElement('h3');
        name.className = 'product-name';
        name.textContent = product.name;

        // Tạo dòng thông tin phụ (Giá & Rating)
        const infoRow = document.createElement('div');
        infoRow.className = 'product-info-row';

        const price = document.createElement('span');
        price.className = 'product-price';
        price.textContent = formatCurrency(product.price);

        const rating = document.createElement('span');
        rating.className = 'product-rating';
        rating.textContent = `⭐ ${product.rating}`;

        infoRow.appendChild(price);
        infoRow.appendChild(rating);

        // Tạo trạng thái kho hàng
        const stock = document.createElement('span');
        stock.className = `stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`;
        stock.textContent = product.inStock ? 'Còn hàng' : 'Hết hàng';

        // Tạo nút thêm vào giỏ
        const addCartBtn = document.createElement('button');
        addCartBtn.className = 'btn-add-cart';
        addCartBtn.textContent = 'Thêm giỏ';
        if (!product.inStock) {
            addCartBtn.disabled = true;
            addCartBtn.style.backgroundColor = '#ccc';
            addCartBtn.style.cursor = 'not-allowed';
        }

        // --- Gắn Sự Kiện ---
        // Click nút Thêm giỏ (Stop Propagation tránh kích hoạt mở modal)
        addCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            cartCount++;
            cartBadge.textContent = cartCount;
        });

        // Click nguyên Card mở Modal chi tiết
        card.addEventListener('click', () => {
            openProductModal(product);
        });

        // Append tất cả các nhánh vào thẻ card chính
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(infoRow);
        card.appendChild(stock);
        card.appendChild(addCartBtn);

        // Đẩy card ra ngoài giao diện hiển thị
        productGrid.appendChild(card);
    });
}

// --- 2. Function Filter By Category ---
function filterByCategory(category) {
    currentCategory = category;
    updateCatalogPipeline();
}

// --- 3. Function Search Products ---
function searchProducts(keyword) {
    currentSearchKeyword = keyword.toLowerCase().trim();
    updateCatalogPipeline();
}

// --- 4. Function Sort Products ---
function sortProducts(criteria, productsToSort) {
    const sortedList = [...productsToSort]; // Sao chép nông mảng để không gây ảnh hưởng mảng gốc
    
    if (criteria === 'price-asc') {
        sortedList.sort((a, b) => a.price - b.price);
    } else if (criteria === 'price-desc') {
        sortedList.sort((a, b) => b.price - a.price);
    } else if (criteria === 'name-asc') {
        sortedList.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    } else if (criteria === 'rating-desc') {
        sortedList.sort((a, b) => b.rating - a.rating);
    }
    
    return sortedList;
}

// --- HỆ THỐNG PIPELINE KẾT HỢP (Gọi đồng thời cả Lọc, Tìm kiếm & Sắp xếp) ---
function updateCatalogPipeline() {
    let result = products;

    // Tiến hành lọc Category
    if (currentCategory !== 'all') {
        result = result.filter(p => p.category === currentCategory);
    }

    // Tiến hành lọc Realtime Search
    if (currentSearchKeyword !== '') {
        result = result.filter(p => p.name.toLowerCase().includes(currentSearchKeyword));
    }

    // Tiến hành Sắp xếp
    result = sortProducts(currentSortCriteria, result);

    // Render kết quả cuối cùng
    renderProducts(result);
}

// --- 5. Dynamic Render các nút Danh mục (Category Buttons) ---
function initCategoryFilters() {
    // Thu thập danh sách các category không trùng nhau từ mảng gốc
    const uniqueCategories = ['all', ...new Set(products.map(p => p.category))];

    uniqueCategories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `cat-btn ${cat === 'all' ? 'active' : ''}`;
        btn.textContent = cat === 'all' ? 'Tất cả' : cat;
        btn.dataset.category = cat;

        btn.addEventListener('click', (e) => {
            // Xóa class active ở nút cũ
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            // Thêm class active vào nút hiện tại được click
            e.target.classList.add('active');
            
            filterByCategory(cat);
        });

        categoryContainer.appendChild(btn);
    });
}

// --- 6. Function Render Modal Chi Tiết Sản Phẩm ---
function openProductModal(product) {
    modalContainer.innerHTML = ''; // Đảm bảo làm sạch container trước khi tạo mới

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const content = document.createElement('div');
    content.className = 'modal-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', closeModal);

    const title = document.createElement('h2');
    title.textContent = product.name;

    const img = document.createElement('img');
    img.className = 'modal-img';
    img.src = product.image;
    img.alt = product.name;

    const categoryText = document.createElement('p');
    categoryText.innerHTML = `<strong>Danh mục:</strong> <span style="text-transform: capitalize;">${product.category}</span>`;

    const ratingText = document.createElement('p');
    ratingText.innerHTML = `<strong>Đánh giá:</strong> ⭐ ${product.rating} / 5`;

    const priceText = document.createElement('p');
    priceText.style.color = 'var(--accent-color)';
    priceText.style.fontWeight = 'bold';
    priceText.style.fontSize = '20px';
    priceText.style.margin = '10px 0';
    priceText.textContent = formatCurrency(product.price);

    const description = document.createElement('p');
    description.className = 'modal-desc';
    description.textContent = `Đây là thông tin mô tả chi tiết cho sản phẩm ${product.name}. Sản phẩm chất lượng cao, đi kèm chính sách bảo hành chính hãng 12 tháng tại cửa hàng.`;

    // Gộp tất cả các node vào thẻ chung
    content.appendChild(closeBtn);
    content.appendChild(title);
    content.appendChild(img);
    content.appendChild(categoryText);
    content.appendChild(ratingText);
    content.appendChild(priceText);
    content.appendChild(description);
    overlay.appendChild(content);

    // Lắng nghe sự kiện click bên ngoài vùng content để đóng modal nhanh
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    modalContainer.appendChild(overlay);
}

function closeModal() {
    modalContainer.innerHTML = '';
}

// --- 7. Dark Mode Toggle ---
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Cập nhật text hiển thị trên nút toggle tương ứng trạng thái hiện tại
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        themeToggle.textContent = '🌙 Dark Mode';
    }
});

// --- Lắng Nghe Sự Kiện Thanh Điều Khiển ---
// Tìm kiếm realtime bằng sự kiện 'input'
searchInput.addEventListener('input', (e) => {
    searchProducts(e.target.value);
});

// Sắp xếp sản phẩm bằng sự kiện 'change'
sortSelect.addEventListener('change', (e) => {
    currentSortCriteria = e.target.value;
    updateCatalogPipeline();
});

// --- Khởi tạo ứng dụng khi load trang ---
initCategoryFilters();
updateCatalogPipeline();