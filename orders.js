
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("orders-content");
    const orders = JSON.parse(localStorage.getItem("miawOrders") || "[]");

    if (!orders.length) {
        container.innerHTML = `
            <div class="panel empty">
                <span>📦</span>
                <h2>Belum ada pesanan</h2>
                <p>Pesanan yang kamu buat akan muncul di sini.</p>
                <a class="btn" href="products.html">Mulai Belanja</a>
            </div>`;
        return;
    }

    container.innerHTML = [...orders].reverse().map(order => `
        <article class="panel order-card">
            <h2>${order.id}</h2>
            <p>Tanggal: ${order.date}</p>
            <p>Nama penerima: ${safe(order.name)}</p>
            <p>Nomor telepon: ${safe(order.phone)}</p>
            <p>Alamat: ${safe(order.address)}</p>
            <p>Metode pembayaran: ${safe(order.payment)}</p>
            <p>Total: ${money(order.total)}</p>
            <p>Status: <strong>${safe(order.status)}</strong></p>
        </article>
    `).join("");
});

function money(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}

function safe(value) {
    const element = document.createElement("span");
    element.textContent = value || "";
    return element.innerHTML;
}
