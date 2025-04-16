// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const isDark = body.getAttribute('data-theme') === 'dark';
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Sidebar Toggle
const toggleSidebar = document.querySelector('.toggle-sidebar');
const sidebar = document.querySelector('.sidebar');

toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Mock Data for Table
const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Inactive' },
    { id: 6, name: 'Diana Miller', email: 'diana@example.com', status: 'Active' },
    { id: 7, name: 'Ethan Davis', email: 'ethan@example.com', status: 'Active' },
    { id: 8, name: 'Fiona Clark', email: 'fiona@example.com', status: 'Inactive' }
];

// Render Table
function renderTable(users = mockUsers) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <span class="status-badge ${user.status.toLowerCase()}">
                    ${user.status}
                </span>
            </td>
            <td>
                <button class="action-btn edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Table Search
const tableSearch = document.querySelector('.table-search');
tableSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredUsers);
});

// Chart Data
const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 2,
        tension: 0.4
    }]
};

// Mock Chart
function createMockChart() {
    const canvas = document.getElementById('revenueChart');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = 300;

    // Draw grid
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--border-color');
    ctx.lineWidth = 1;

    // Draw horizontal lines
    for (let i = 0; i <= 5; i++) {
        const y = i * 60;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Draw data points and lines
    const maxValue = Math.max(...chartData.datasets[0].data);
    const scale = 240 / maxValue;
    
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--primary-color');
    ctx.lineWidth = 2;
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--primary-color');

    chartData.datasets[0].data.forEach((value, index) => {
        const x = (index + 1) * (canvas.width / 7);
        const y = canvas.height - (value * scale) - 30;

        // Draw point
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw line
        if (index > 0) {
            const prevX = index * (canvas.width / 7);
            const prevY = canvas.height - (chartData.datasets[0].data[index - 1] * scale) - 30;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    });
}

// Chart Period Toggle
const chartPeriods = document.querySelectorAll('.chart-actions button');
chartPeriods.forEach(button => {
    button.addEventListener('click', () => {
        chartPeriods.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        createMockChart(); // Update chart with new data
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    createMockChart();

    // Handle window resize
    window.addEventListener('resize', () => {
        createMockChart();
    });
}); 