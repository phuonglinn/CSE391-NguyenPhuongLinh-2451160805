// --- Selectors ---
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const filters = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// --- State ---
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all'; // 'all' | 'active' | 'completed'

// --- Helpers ---
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// --- Render Logic ---
function render() {
    // Chỉ dùng innerHTML để xóa container, KHÔNG dùng để tạo thẻ li bên trong
    todoList.innerHTML = ''; 

    // Lọc data theo currentFilter
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    // Tạo elements với createElement
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.dataset.id = todo.id;
        if (todo.completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text; // An toàn, chống XSS

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '❌';

        li.appendChild(span);
        li.appendChild(editInput);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    // Cập nhật Count (Chỉ đếm item chưa completed)
    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

// --- Add Todo ---
function addTodo() {
    const text = todoInput.value.trim();
    if (text !== '') {
        todos.push({
            id: Date.now().toString(),
            text: text,
            completed: false
        });
        todoInput.value = '';
        saveTodos();
        render();
    }
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

// --- EVENT DELEGATION cho #todoList ---

// 1. Click (Toggle completed & Delete)
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const id = li.dataset.id;
    
    // Nút Xóa
    if (e.target.classList.contains('delete-btn')) {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        render();
    } 
    // Click vào Text để Toggle
    else if (e.target.classList.contains('todo-text')) {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        saveTodos();
        render();
    }
});

// 2. Double-Click (Vào chế độ Edit)
todoList.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('todo-text')) {
        const li = e.target.closest('li');
        li.classList.add('editing');
        const editInput = li.querySelector('.edit-input');
        
        editInput.focus();
        // Đưa con trỏ nháy về cuối text
        editInput.selectionStart = editInput.selectionEnd = editInput.value.length;
    }
});

// 3. Xử lý Save khi Edit xong (Lắng nghe focusout và keypress Enter)
// 'focusout' hoạt động giống 'blur' nhưng có cơ chế bubbling nên xài được Event Delegation
todoList.addEventListener('focusout', (e) => {
    if (e.target.classList.contains('edit-input')) {
        finishEdit(e.target);
    }
});

todoList.addEventListener('keypress', (e) => {
    if (e.target.classList.contains('edit-input') && e.key === 'Enter') {
        e.target.blur(); // Gọi hàm blur sẽ tự trigger sự kiện focusout ở trên
    }
});

function finishEdit(inputElement) {
    const li = inputElement.closest('li');
    if (!li.classList.contains('editing')) return;

    const id = li.dataset.id;
    const newText = inputElement.value.trim();

    if (newText === '') {
        // Nếu edit thành chuỗi rỗng -> xóa luôn todo đó
        todos = todos.filter(t => t.id !== id);
    } else {
        const todo = todos.find(t => t.id === id);
        todo.text = newText;
    }

    li.classList.remove('editing');
    saveTodos();
    render();
}

// --- Filters ---
filters.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove class active ở nút cũ
        document.querySelector('.filter-btn.active').classList.remove('active');
        // Add class active vào nút mới
        e.target.classList.add('active');
        
        currentFilter = e.target.dataset.filter;
        render();
    });
});

// --- Clear Completed ---
clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    render();
});

// --- Init Render ---
render();