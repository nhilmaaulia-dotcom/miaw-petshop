
function getCheckoutCart() {
    return JSON.parse(localStorage.getItem("miawCart") || "[]");
}

function checkoutMoney(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("checkout-form");
    const summary = document.getElementById("checkout-summary");

    if (!form || !summary) return;

    const cart = getCheckoutCart();
    const products = window.MIAW_PRODUCTS || [];
    let total = 0;

    const rows = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return "";

        const subtotal = product.price * item.qty;
        total += subtotal;

        return `<p>${product.name} × ${item.qty}
            — ${checkoutMoney(subtotal)}</p>`;
    }).join("");

    summary.innerHTML = cart.length
        ? `${rows}<hr><h3>Total: ${checkoutMoney(total)}</h3>`
        : `<p>Keranjang kamu masih kosong.</p>
           <a class="btn" href="products.html">Pilih Produk</a>`;

    form.addEventListener("submit", event => {
        event.preventDefault();

        const currentCart = getCheckoutCart();

        if (currentCart.length === 0) {
            alert("Keranjang masih kosong. Pilih produk terlebih dahulu.");
            return;
        }

        const orders = JSON.parse(localStorage.getItem("miawOrders") || "[]");

        const order = {
            id: "ORD" + Date.now().toString().slice(-7),
            name: document.getElementById("customer-name").value.trim(),
            phone: document.getElementById("customer-phone").value.trim(),
            address: document.getElementById("customer-address").value.trim(),
            payment: document.getElementById("payment").value,
            items: currentCart,
            total,
            date: new Date().toLocaleString("id-ID"),
            status: "Menunggu konfirmasi"
        };

        orders.push(order);
        localStorage.setItem("miawOrders", JSON.stringify(orders));
        localStorage.removeItem("miawCart");

        alert("Pesanan berhasil disimpan di website demo.");
        location.href = "orders.html";
    });
});
