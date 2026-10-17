
const MEMBER_STORAGE_KEY = "miawMembers";
const CURRENT_MEMBER_KEY = "miawCurrentMember";

function getMemberList() {
    try {
        const members = JSON.parse(
            localStorage.getItem(MEMBER_STORAGE_KEY)
        );

        return Array.isArray(members) ? members : [];
    } catch (error) {
        return [];
    }
}

function getLoggedInMember() {
    try {
        return JSON.parse(
            localStorage.getItem(CURRENT_MEMBER_KEY)
        );
    } catch (error) {
        return null;
    }
}

function formatMemberDate(dateValue) {
    if (!dateValue) return "-";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function displayMemberInfo() {
    const member = getLoggedInMember();

    const nameElements = document.querySelectorAll("[data-member-name]");
    const emailElements = document.querySelectorAll("[data-member-email]");
    const phoneElements = document.querySelectorAll("[data-member-phone]");
    const dateElements = document.querySelectorAll("[data-member-date]");

    if (!member) {
        nameElements.forEach(element => {
            element.textContent = "Guest";
        });

        emailElements.forEach(element => {
            element.textContent = "-";
        });

        phoneElements.forEach(element => {
            element.textContent = "-";
        });

        dateElements.forEach(element => {
            element.textContent = "-";
        });

        return;
    }

    nameElements.forEach(element => {
        element.textContent = member.name || "-";
    });

    emailElements.forEach(element => {
        element.textContent = member.email || "-";
    });

    phoneElements.forEach(element => {
        element.textContent = member.phone || "-";
    });

    dateElements.forEach(element => {
        element.textContent = formatMemberDate(member.joinDate);
    });
}

function checkMemberLogin() {
    const member = getLoggedInMember();

    const loginRequiredElements = document.querySelectorAll(
        "[data-login-required]"
    );

    if (!member) {
        loginRequiredElements.forEach(element => {
            element.textContent = "Silakan login untuk mengakses fitur member.";
        });
    }
}

function logoutMember() {
    localStorage.removeItem(CURRENT_MEMBER_KEY);

    alert("Kamu berhasil logout dari Miaw Petshop!");

    window.location.href = "member-login.html";
}

document.addEventListener("DOMContentLoaded", function () {
    displayMemberInfo();
    checkMemberLogin();

    document.querySelectorAll("[data-member-logout]").forEach(button => {
        button.addEventListener("click", logoutMember);
    });
});
