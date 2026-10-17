

function getMembers() {
    try {
        return JSON.parse(localStorage.getItem("miawMembers")) || [];
    } catch (error) {
        return [];
    }
}

function saveMembers(members) {
    localStorage.setItem("miawMembers", JSON.stringify(members));
}

function escapeText(value) {
    const element = document.createElement("span");
    element.textContent = value || "";
    return element.innerHTML;
}

function getCurrentMember() {
    const email = localStorage.getItem("miawCurrentMember");

    return getMembers().find(member => member.email === email);
}

// ============================
// REGISTRASI MEMBER
// ============================

function registerMember(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email")
        .value.trim().toLowerCase();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !phone || !password) {
        alert("Semua kolom wajib diisi.");
        return;
    }

    if (password.length < 6) {
        alert("Password minimal 6 karakter.");
        return;
    }

    const members = getMembers();

    const emailExists = members.some(member => member.email === email);

    if (emailExists) {
        alert("Email sudah terdaftar. Silakan login.");
        return;
    }

    const member = {
        id: "MIAW" + Date.now().toString().slice(-7),
        name: name,
        email: email,
        phone: phone,
        password: password,
        joined: new Date().toLocaleDateString("id-ID")
    };

    members.push(member);
    saveMembers(members);

    localStorage.setItem("miawCurrentMember", email);

    alert("Pendaftaran berhasil! Selamat bergabung di Miaw Petshop.");

    window.location.href = "member-card.html";
}

// ============================
// LOGIN MEMBER
// ============================

function loginMember(event) {
    event.preventDefault();

    const email = document.getElementById("email")
        .value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const members = getMembers();

    const member = members.find(item =>
        item.email === email && item.password === password
    );

    if (!member) {
        alert("Email atau password salah. Silakan coba lagi.");
        return;
    }

    localStorage.setItem("miawCurrentMember", member.email);

    alert("Login berhasil. Selamat datang kembali!");

    window.location.href = "member-card.html";
}

// ============================
// LOGOUT MEMBER
// ============================

function logoutMember() {
    localStorage.removeItem("miawCurrentMember");
    window.location.href = "member-login.html";
}

// ============================
// TAMPILKAN KARTU MEMBER
// ============================

function renderMemberCard() {
    const container = document.getElementById("member-card-content");

    if (!container) return;

    const member = getCurrentMember();

    if (!member) {
        container.innerHTML = `
            <div class="panel">
                <h2>Kamu belum login</h2>
                <p>Silakan login untuk melihat kartu member.</p>
                <a class="btn" href="member-login.html">Login Member</a>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="member-card">
            <div>
                <span class="eyebrow">MIAW PETSHOP</span>
                <h2>Digital Member Card</h2>
                <p>Everyday Care, Made Lovely.</p>
            </div>

            <div>
                <p>Nama Member</p>
                <h2>${escapeText(member.name)}</h2>
                <div class="member-number">
                    ${escapeText(member.id)}
                </div>
                <small>
                    Member sejak ${escapeText(member.joined)}
                </small>
            </div>
        </div>

        <div class="panel">
            <h2>Informasi Member</h2>
            <p><strong>Email:</strong> ${escapeText(member.email)}</p>
            <p><strong>Nomor telepon:</strong> ${escapeText(member.phone)}</p>

            <div class="actions">
                <a class="btn" href="products.html">Mulai Belanja</a>
                <a class="btn secondary" href="profile.html">Profil Saya</a>
                <button type="button" class="danger" id="logout-button">
                    Logout
                </button>
            </div>
        </div>
    `;

    document.getElementById("logout-button")
        .addEventListener("click", logoutMember);
}

// ============================
// TAMPILKAN PROFIL MEMBER
// ============================

function renderMemberProfile() {
    const container = document.getElementById("profile-content");

    if (!container) return;

    const member = getCurrentMember();

    if (!member) {
        container.innerHTML = `
            <div class="panel">
                <h2>Kamu belum login</h2>
                <p>Silakan login untuk melihat profil.</p>
                <a class="btn" href="member-login.html">Login Member</a>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="panel">
            <h2>Profil Saya</h2>

            <p><strong>ID Member:</strong> ${escapeText(member.id)}</p>
            <p><strong>Nama:</strong> ${escapeText(member.name)}</p>
            <p><strong>Email:</strong> ${escapeText(member.email)}</p>
            <p><strong>Nomor telepon:</strong> ${escapeText(member.phone)}</p>
            <p><strong>Terdaftar sejak:</strong> ${escapeText(member.joined)}</p>

            <div class="actions">
                <a class="btn" href="member-card.html">
                    Lihat Kartu Member
                </a>
                <button type="button" class="danger" id="profile-logout">
                    Logout
                </button>
            </div>
        </div>
    `;

    document.getElementById("profile-logout")
        .addEventListener("click", logoutMember);
}

// ============================
// JALANKAN FUNGSI SESUAI HALAMAN
// ============================

document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("member-login-form");

    if (registerForm) {
        registerForm.addEventListener("submit", registerMember);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", loginMember);
    }

    renderMemberCard();
    renderMemberProfile();
});
