// --- Selectors ---
const form = document.getElementById('registerForm');
const submitBtn = document.getElementById('submitBtn');

const inputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword')
};

// UI Elements cho Validation
const nameIcon = document.getElementById('nameIcon');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const confirmError = document.getElementById('confirmError');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

// Modal Elements
const modal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// --- State Validation ---
// Form chỉ submit được khi tất cả value trong object này là true
const validState = {
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false
};

// Hàm kiểm tra tổng thể form để Enable/Disable nút Submit
function checkFormValidity() {
    const isFormValid = Object.values(validState).every(state => state === true);
    submitBtn.disabled = !isFormValid;
}

// --- 1. Tên (2-50 ký tự, Hiện ✅ ❌ ngay khi gõ) ---
inputs.name.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val.length >= 2 && val.length <= 50) {
        nameIcon.textContent = '✅';
        inputs.name.classList.add('valid');
        inputs.name.classList.remove('invalid');
        validState.name = true;
    } else {
        nameIcon.textContent = '❌';
        inputs.name.classList.add('invalid');
        inputs.name.classList.remove('valid');
        validState.name = false;
        if(val.length === 0) nameIcon.textContent = ''; // Xóa icon nếu trống
    }
    checkFormValidity();
});

// --- 2. Email (Regex, Hiện thông báo lỗi bên dưới) ---
inputs.email.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (val === '') {
        emailError.textContent = '';
        inputs.email.classList.remove('invalid', 'valid');
        validState.email = false;
    } else if (emailRegex.test(val)) {
        emailError.textContent = '';
        inputs.email.classList.add('valid');
        inputs.email.classList.remove('invalid');
        validState.email = true;
    } else {
        emailError.textContent = 'Email không đúng định dạng (VD: abc@domain.com)';
        inputs.email.classList.add('invalid');
        inputs.email.classList.remove('valid');
        validState.email = false;
    }
    checkFormValidity();
});

// --- 3. Phone (10 chữ số, Auto format: 0901-234-567) ---
inputs.phone.addEventListener('input', (e) => {
    // Xóa mọi ký tự không phải số
    let val = e.target.value.replace(/\D/g, '');
    
    // Giới hạn max 10 số
    if (val.length > 10) val = val.slice(0, 10);
    
    // Format thành dạng XXXX-XXX-XXX
    let formatted = val;
    if (val.length > 7) {
        formatted = `${val.slice(0, 4)}-${val.slice(4, 7)}-${val.slice(7, 10)}`;
    } else if (val.length > 4) {
        formatted = `${val.slice(0, 4)}-${val.slice(4, 7)}`;
    }
    
    // Gán lại value cho input
    e.target.value = formatted;

    // Validate logic (Phải đủ 10 số)
    if (val.length === 10) {
        phoneError.textContent = '';
        inputs.phone.classList.add('valid');
        inputs.phone.classList.remove('invalid');
        validState.phone = true;
    } else {
        phoneError.textContent = val.length > 0 ? 'Số điện thoại phải đủ 10 chữ số' : '';
        inputs.phone.classList.add('invalid');
        inputs.phone.classList.remove('valid');
        validState.phone = false;
    }
    checkFormValidity();
});

// --- 4. Password Strength Meter ---
inputs.password.addEventListener('input', (e) => {
    const val = e.target.value;
    
    const hasChar = /[a-zA-Z]/.test(val);
    const hasNum = /[0-9]/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);

    // Mặc định reset
    strengthBar.style.width = '0%';
    strengthText.textContent = '';
    validState.password = false;

    if (val.length > 0) {
        if (val.length >= 8 && hasUpper && hasLower && hasNum && hasSpecial) {
            // Mạnh (Màu xanh)
            strengthBar.style.width = '100%';
            strengthBar.style.backgroundColor = '#1e8e3e';
            strengthText.textContent = 'Mạnh';
            strengthText.style.color = '#1e8e3e';
            validState.password = true;
        } 
        else if (val.length >= 8 && hasChar && hasNum) {
            // Trung bình (Màu vàng/cam)
            strengthBar.style.width = '66%';
            strengthBar.style.backgroundColor = '#f9ab00';
            strengthText.textContent = 'Trung bình';
            strengthText.style.color = '#f9ab00';
            validState.password = true; 
        } 
        else {
            // Yếu (Màu đỏ)
            strengthBar.style.width = '33%';
            strengthBar.style.backgroundColor = '#d93025';
            strengthText.textContent = 'Yếu (Cần ít nhất 8 ký tự, có chữ và số)';
            strengthText.style.color = '#d93025';
            validState.password = false;
        }
    }

    // Khi password thay đổi, gọi lại check Confirm Password ngay
    checkConfirmPassword();
    checkFormValidity();
});

// --- 5. Confirm Password (Real-time check khớp) ---
function checkConfirmPassword() {
    const pwd = inputs.password.value;
    const confirmPwd = inputs.confirmPassword.value;

    if (confirmPwd === '') {
        confirmError.textContent = '';
        inputs.confirmPassword.classList.remove('invalid', 'valid');
        validState.confirmPassword = false;
    } else if (pwd === confirmPwd) {
        confirmError.textContent = '';
        inputs.confirmPassword.classList.add('valid');
        inputs.confirmPassword.classList.remove('invalid');
        validState.confirmPassword = true;
    } else {
        confirmError.textContent = 'Mật khẩu không khớp';
        inputs.confirmPassword.classList.add('invalid');
        inputs.confirmPassword.classList.remove('valid');
        validState.confirmPassword = false;
    }
}

inputs.confirmPassword.addEventListener('input', () => {
    checkConfirmPassword();
    checkFormValidity();
});

// --- 6. Xử lý Submit & Modal ---
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn form load lại trang

    // Lấy data đẩy lên Modal
    document.getElementById('modalName').textContent = inputs.name.value;
    document.getElementById('modalEmail').textContent = inputs.email.value;
    document.getElementById('modalPhone').textContent = inputs.phone.value;

    // Hiện Modal
    modal.classList.add('show');
});

// Đóng Modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    // Có thể thêm form.reset() tại đây nếu muốn làm sạch form sau khi đăng ký
});