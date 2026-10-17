
function adminLogin(event) {
    event.preventDefault();

    const username = document.getElementById("admin-username").value.trim();
    const password = document.getElementById("admin-password").value;

    if (username === "admin" && password === "miaw123") {
        sessionStorage.setItem("miawAdminLoggedIn", "true");
        location.href = "admin-dashboard.html";
    } else {
        alert("Username atau password admin salah.");
    }
}

function adminLogout() {
    sessionStorage.removeItem("miawAdminLoggedIn");
    location.href = "admin-login.html";
}

function escapeAdminText(value) {
    const element = document.createElement("span");
    element.textContent = value || "";
    return element.innerHTML;
}

function adminMoney(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("admin-login-form")
        ?.addEventListener("submit", adminLogin);

    const dashboard = document.getElementById("admin-dashboard-content");
    if (!dashboard) return;

    if (sessionStorage.getItem("miawAdminLoggedIn") !== "true") {
        location.replace("admin-login.html");
        return;
    }

    const orders = JSON.parse(localStorage.getItem("miawOrders") || "[]");
    const members = JSON.parse(localStorage.getItem("miawMembers") || "[]");
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);

    dashboard.innerHTML = `
        <div class="admin-header">
            <div>
                <span class="eyebrow">MIAW PETSHOP</span>
                <h1>Dashboard Admin</h1>
                <p>Ringkasan aktivitas website.</p>
            </div>
            <button id="admin-logout">Logout</button>
        </div>

        <div class="admin-stats">
            <div class="stat">
                Total Member
                <strong>${members.length}</strong>
            </div>
            <div class="stat">
                Total Pesanan
                <strong>${orders.length}</strong>
            </div>
            <div class="stat">
                Total Nilai Pesanan
                <strong>${adminMoney(revenue)}</strong>
            </div>
        </div>

        <section class="admin-section">
            <h2>Data Pesanan</h2>
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>ID Pesanan</th>
                            <th>Pelanggan</th>
                            <th>Total</th>
                            <th>Pembayaran</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.length ? orders.map(order => `
                            <tr>
                                <td>${escapeAdminText(order.id)}</td>
                                <td>
                                    ${escapeAdminText(order.name)}<br>
                                    ${escapeAdminText(order.phone)}
                                </td>
                                <td>${adminMoney(order.total)}</td>
                                <td>${escapeAdminText(order.payment)}</td>
                                <td>${escapeAdminText(order.status)}</td>
                            </tr>
                        `).join("") : `
                            <tr><td colspan="5">Belum ada pesanan.</td></tr>
                        `}
                    </tbody>
                </table>
            </div>
        </section>

        <section class="admin-section">
            <h2>Data Member</h2>
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>ID Member</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Telepon</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${members.length ? members.map(member => `
                            <tr>
                                <td>${escapeAdminText(member.id)}</td>
                                <td>${escapeAdminText(member.name)}</td>
                                <td>${escapeAdminText(member.email)}</td>
                                <td>${escapeAdminText(member.phone)}</td>
                            </tr>
                        `).join("") : `
                            <tr><td colspan="4">Belum ada member.</td></tr>
                        `}
                    </tbody>
                </table>
            </div>
        </section>
    `;

    document.getElementById("admin-logout")
        .addEventListener("click", adminLogout);
});
