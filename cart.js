
function cartProducts() {
    return JSON.parse(localStorage.getItem("miawCart") || "[]");
}

function cartMoney(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}

function changeQty(id, amount) {
    const cart = cartProducts();
    const item = cart.find(product => product.id === id);

    if (item) item.qty += amount;

    const updatedCart = cart.filter(product => product.qty > 0);
    localStorage.setItem("miawCart", JSON.stringify(updatedCart));
    updateCartPage();
}

function removeItem(id) {
    const updatedCart = cartProducts().filter(item => item.id !== id);
    localStorage.setItem("miawCart", JSON.stringify(updatedCart));
    updateCartPage();
}

function updateCartPage() {
    const container = document.getElementById("cart-content");
    if (!container) return;

    const cart = cartProducts();
    const products = window.MIAW_PRODUCTS || [];

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty">
                <span>🛒</span>
                <h2>Keranjang masih kosong</h2>
                <p>Yuk pilih kebutuhan untuk hewan kesayanganmu.</p>
                <a class="btn" href="products.html">Lihat Produk</a>
            </div>`;
        return;
    }

    let total = 0;

    const rows = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return "";

        const subtotal = product.price * item.qty;
        total += subtotal;

        return `
            <tr>
                <td>${product.emoji} ${product.name}</td>
                <td>${cartMoney(product.price)}</td>
                <td>
                    <button class="secondary"
                        onclick="changeQty(${product.id}, -1)">−</button>
                    ${item.qty}
                    <button class="secondary"
                        onclick="changeQty(${product.id}, 1)">+</button>
                </td>
                <td>${cartMoney(subtotal)}</td>
                <td><button class="danger"
                    onclick="removeItem(${product.id})">Hapus</button></td>
            </tr>`;
    }).join("");

    container.innerHTML = `
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Produk</th><th>Harga</th><th>Jumlah</th>
                        <th>Subtotal</th><th>Aksi</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
        <h2>Total: ${cartMoney(total)}</h2>
        <a class="btn" href="checkout.html">Lanjut Checkout</a>
        <a class="btn secondary" href="products.html">Tambah Produk</a>`;
}

document.addEventListener("DOMContentLoaded", updateCartPage);
