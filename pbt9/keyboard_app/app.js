// --- Mock Data 9 bức ảnh ---
const imagesData = [
    { id: 1, title: "Hồ Gươm Mùa Thu", url: "https://picsum.photos/id/10/600/400" },
    { id: 2, title: "Sapa Mờ Sương", url: "https://picsum.photos/id/15/600/400" },
    { id: 3, title: "Bình Minh Biển Nha Trang", url: "https://picsum.photos/id/28/600/400" },
    { id: 4, title: "Phố Cổ Hội An Đèn Lồng", url: "https://picsum.photos/id/43/600/400" },
    { id: 5, title: "Ruộng Bậc Thang Mù Cang Chải", url: "https://picsum.photos/id/65/600/400" },
    { id: 6, title: "Đỉnh Phan-Xi-Păng Hùng Vĩ", url: "https://picsum.photos/id/76/600/400" },
    { id: 7, title: "Hoàng Hôn Trại Mát Đà Lạt", url: "https://picsum.photos/id/119/600/400" },
    { id: 8, title: "Đại Nội Kinh Thành Huế", url: "https://picsum.photos/id/133/600/400" },
    { id: 9, title: "Chợ Nổi Cái Răng Cần Thơ", url: "https://picsum.photos/id/192/600/400" }
];

// --- Selectors ---
const mainImage = document.getElementById('mainImage');
const imageTitle = document.getElementById('imageTitle');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicatorsContainer');
const slideshowBadge = document.getElementById('slideshowBadge');

const paletteOverlay = document.getElementById('paletteOverlay');
const paletteInput = document.getElementById('paletteInput');
const paletteList = document.getElementById('paletteList');

// --- State phần mềm ---
let currentIndex = 0;
let isSlideshowPlaying = false;
let slideshowIntervalId = null;
let isPaletteOpen = false;
let selectedCommandIndex = 0;
let filteredCommands = [];

// --- Danh sách Lệnh Hệ thống cho Command Palette ---
const commandsData = [
    { id: "next", name: "Chuyển sang ảnh tiếp theo", shortcut: "→", action: () => nextImage() },
    { id: "prev", name: "Quay lại ảnh phía trước", shortcut: "←", action: () => prevImage() },
    { id: "play", name: "Bật Slideshow chạy tự động", shortcut: "Space", action: () => startSlideshow() },
    { id: "pause", name: "Tạm dừng Slideshow tự động", shortcut: "Space", action: () => stopSlideshow() },
    { id: "img1", name: "Nhảy nhanh đến Ảnh số 1", shortcut: "1", action: () => jumpToImage(0) },
    { id: "img5", name: "Nhảy nhanh đến Ảnh số 5", shortcut: "5", action: () => jumpToImage(4) },
    { id: "img9", name: "Nhảy nhanh đến Ảnh số 9", shortcut: "9", action: () => jumpToImage(8) }
];

// --- GALLERY LOGIC ---
function renderGallery() {
    const currentImg = imagesData[currentIndex];
    mainImage.src = currentImg.url;
    mainImage.alt = `Ảnh số ${currentIndex + 1}: ${currentImg.title}`;
    imageTitle.textContent = `${currentIndex + 1}. ${currentImg.title}`;

    // Cập nhật nút active indicator
    const buttons = indicatorsContainer.querySelectorAll('.ind-btn');
    buttons.forEach((btn, idx) => {
        if (idx === currentIndex) {
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        }
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % imagesData.length;
    renderGallery();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
    renderGallery();
}

function jumpToImage(index) {
    if (index >= 0 && index < imagesData.length) {
        currentIndex = index;
        renderGallery();
    }
}

// --- SLIDESHOW AUTOMATION ---
function startSlideshow() {
    if (isSlideshowPlaying) return;
    isSlideshowPlaying = true;
    slideshowBadge.textContent = "Slideshow: ON";
    slideshowBadge.classList.add('playing');
    slideshowIntervalId = setInterval(nextImage, 2500); // 2.5s chuyển ảnh tự động
}

function stopSlideshow() {
    if (!isSlideshowPlaying) return;
    isSlideshowPlaying = false;
    slideshowBadge.textContent = "Slideshow: OFF";
    slideshowBadge.classList.remove('playing');
    clearInterval(slideshowIntervalId);
}

function toggleSlideshow() {
    if (isSlideshowPlaying) stopSlideshow();
    else startSlideshow();
}

// --- COMMAND PALETTE LOGIC ---
function openCommandPalette() {
    isPaletteOpen = true;
    paletteOverlay.classList.add('open');
    paletteOverlay.setAttribute('aria-expanded', 'true');
    paletteInput.value = "";
    paletteInput.focus();
    filterCommands(""); // Render toàn bộ danh sách lệnh ban đầu
}

function closeCommandPalette() {
    isPaletteOpen = false;
    paletteOverlay.classList.remove('open');
    paletteOverlay.setAttribute('aria-expanded', 'false');
    paletteInput.blur();
}

function filterCommands(keyword) {
    const cleanKeyword = keyword.toLowerCase().trim();
    filteredCommands = commandsData.filter(cmd => 
        cmd.name.toLowerCase().includes(cleanKeyword)
    );

    renderCommandsList();
}

function renderCommandsList() {
    paletteList.innerHTML = "";
    selectedCommandIndex = 0; // Reset điểm chọn về dòng đầu tiên

    if (filteredCommands.length === 0) {
        const li = document.createElement('li');
        li.className = 'palette-item';
        li.textContent = "Không tìm thấy lệnh nào khớp...";
        li.style.color = '#9ca3af';
        paletteList.appendChild(li);
        return;
    }

    filteredCommands.forEach((cmd, idx) => {
        const li = document.createElement('li');
        li.className = `palette-item ${idx === selectedCommandIndex ? 'selected' : ''}`;
        li.role = "option";
        li.setAttribute('aria-selected', idx === selectedCommandIndex ? 'true' : 'false');
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = cmd.name;

        const hintSpan = document.createElement('span');
        hintSpan.className = 'shortcut-hint';
        hintSpan.textContent = cmd.shortcut;

        li.appendChild(nameSpan);
        li.appendChild(hintSpan);

        // Gắn sự kiện click chuột bổ trợ
        li.addEventListener('click', () => {
            cmd.action();
            closeCommandPalette();
        });

        paletteList.appendChild(li);
    });
}

function updateCommandSelection(direction) {
    if (filteredCommands.length === 0) return;

    const items = paletteList.querySelectorAll('.palette-item');
    items[selectedCommandIndex].classList.remove('selected');
    items[selectedCommandIndex].setAttribute('aria-selected', 'false');

    if (direction === 'down') {
        selectedCommandIndex = (selectedCommandIndex + 1) % filteredCommands.length;
    } else if (direction === 'up') {
        selectedCommandIndex = (selectedCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
    }

    items[selectedCommandIndex].classList.add('selected');
    items[selectedCommandIndex].setAttribute('aria-selected', 'true');
    // Tự động cuộn danh sách theo con trỏ phím
    items[selectedCommandIndex].scrollIntoView({ block: 'nearest' });
}

// --- GLOBAL KEYDOWN LISTENER (Xử lý Phím tắt) ---
window.addEventListener('keydown', (e) => {
    
    // 1. Tổ hợp phím Ctrl + K (Mở Command Palette ở bất kỳ đâu)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); // Chặn hành vi tìm kiếm mặc định của trình duyệt
        openCommandPalette();
        return;
    }

    // 2. NGỮ CẢNH: Khi Hộp lệnh Command Palette ĐANG MỞ
    if (isPaletteOpen) {
        if (e.key === 'Escape') {
            e.preventDefault();
            closeCommandPalette();
        } 
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            updateCommandSelection('down');
        } 
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            updateCommandSelection('up');
        } 
        else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredCommands[selectedCommandIndex]) {
                filteredCommands[selectedCommandIndex].action(); // Thực thi hàm lệnh
                closeCommandPalette();
            }
        }
        return; // Khóa, không cho phím lọt xuống vùng xử lý Gallery bên dưới
    }

    // 3. NGỮ CẢNH: Khi Hộp lệnh ĐANG ĐÓNG (Điều khiển Gallery ảnh)
    // Phím Mũi tên trái / phải
    if (e.key === 'ArrowRight') {
        nextImage();
    } 
    else if (e.key === 'ArrowLeft') {
        prevImage();
    }
    // Phím Spacebar (Bật/tắt Slideshow)
    else if (e.key === ' ' || e.key === 'Spacebar') {
        // Chỉ kích hoạt khi user không focus vào các nút điều hướng
        if (document.activeElement.tagName !== 'BUTTON') {
            e.preventDefault(); // Tránh cuộn trang màn hình xuống dưới
            toggleSlideshow();
        }
    }
    // Phím số từ 1 đến 9 để nhảy ảnh nhanh
    else if (e.key >= '1' && e.key <= '9') {
        const imageNumIndex = parseInt(e.key) - 1;
        jumpToImage(imageNumIndex);
    }
});

// --- LẮNG NGHE SỰ KIỆN TRÊN ELEMENT (Click & Input) ---
// Thay đổi từ khóa tìm lệnh realtime
paletteInput.addEventListener('input', (e) => {
    filterCommands(e.target.value);
});

// Click chuột các nút cơ bản
prevBtn.addEventListener('click', () => { stopSlideshow(); prevImage(); });
nextBtn.addEventListener('click', () => { stopSlideshow(); nextImage(); });

// Khởi tạo các nút chỉ số tròn phía dưới (Indicators) động từ JS bằng createElement
function initIndicators() {
    imagesData.forEach((_, idx) => {
        const btn = document.createElement('button');
        btn.className = 'ind-btn';
        btn.textContent = idx + 1;
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-label', `Xem ảnh số ${idx + 1}`);
        
        btn.addEventListener('click', () => {
            stopSlideshow();
            jumpToImage(idx);
        });
        
        indicatorsContainer.appendChild(btn);
    });
}

// Khởi chạy ứng dụng
initIndicators();
renderGallery();