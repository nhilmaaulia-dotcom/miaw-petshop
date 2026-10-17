
const PRODUCTS = [
    // --- PRODUK LAMA (MENGGUNAKAN EMOJI) ---
    { id: 1, name: "Makanan Kucing Salmon", category: "Makanan", price: 65000, emoji: "🐟", desc: "Makanan kucing lezat dengan rasa salmon segar.", type: "image", image: "images/salmon.jpg" },
    { id: 2, name: "Royal canin persian", category: "Snack", price: 28000, emoji: "🐟", desc: "Makanan kering khusus kucing Persia yang diformulasikan untuk menjaga kesehatan kulit, membuat bulu panjang tetap berkilau, mendukung pencernaan, serta membantu mengurangi pembentukan hairball..", type: "image", image: "images/royal_canin_persian.jpg" },
    { id: 3, name: "Shampoo Pet Kucing", category: "Perawatan", price: 42000, emoji: "🧴", desc: "Shampoo khusus untuk menjaga kebersihan bulu kucing.", type: "image", image: "images/sampo.jpg" },
    { id: 4, name: "Kalung Pita Kucing", category: "Aksesoris", price: 35000, emoji: "🎀", desc: "Aksesori manis dan nyaman untuk anabul kesayangan.", type: "image", image: "images/pita.jpg" },
    { id: 5, name: "Pasir Kucing Wangi", category: "Perawatan", price: 50000, emoji: "🐾", desc: "Pasir gumpal wangi untuk kebutuhan litter box kucing.", type: "image", image: "images/pasir.jpg" },
    { id: 6, name: "Bola Mainan Lonceng", category: "Aksesoris", price: 18000, emoji: "🎾", desc: "Mainan seru berlonceng untuk aktivitas si meong.", type: "image", image: "images/bola_lonceng.jpg" },
    { id: 7, name: "Wishkash sachet kitten", category: "Makanan", price: 12000, emoji: "🥫", desc: "Makanan basah lezat dalam kemasan praktis untuk kitten.", type: "image", image: "images/wishkash_kitten.jpg" },
    { id: 8, name: "Biskuit Nutrisi Kucing", category: "Snack", price: 22000, emoji: "🍪", desc: "Snack renyah penambah nafsu makan.", type: "image", image: "images/biskuit.jpg" },

    // --- PRODUK BARU (MENGGUNAKAN FOTO ASLI DARI GAMBAR ANDA) ---
    { id: 9, name: "Mangkuk Makan Ganda Pink", category: "Aksesoris", price: 45000, emoji: "🥣", desc: "Tempat makan ganda bahan stainless steel anti slip[cite: 3].", type: "image", image: "images/tempat_makan.jpg" },
    { id: 10, name: "Tas Ransel Kucing Pink", category: "Aksesoris", price: 135000, emoji: "🎒", desc: "Tas astronot transparan dengan ventilasi udara nyaman[cite: 4].", type: "image", image: "images/tas_kucing.jpg" },
    { id: 11, name: "Harness Vest & Tali Pink", category: "Aksesoris", price: 55000, emoji: "🦺", desc: "Harness dada lembut dan bernapas lengkap dengan tali[cite: 5].", type: "image", image: "images/herness_kucing.jpg" },
    { id: 12, name: "Matras Air Bermain Kucing", category: "Aksesoris", price: 68000, emoji: "🌊", desc: "Matras sensorik berisi air untuk melatih ketangkasan[cite: 6].", type: "image", image: "images/shein_kucing.jpg" }
];

window.MIAW_PRODUCTS = PRODUCTS;

function rupiah(n) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(n);
}

function getCart() {
    try {
        return JSON.parse(localStorage.getItem("miawCart")) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem("miawCart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const el = document.getElementById("cart-count");
    if (el) {
        el.textContent = getCart().reduce((total, item) => total + item.qty, 0);
    }
}

function addToCart(id) {
    const cart = getCart();
    const item = cart.find(product => product.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ id, qty: 1 });
    }

    saveCart(cart);
    alert("Produk berhasil ditambahkan ke keranjang!");
}

// Fungsi Kartu Produk (Bisa otomatis mendeteksi pakai Emoji atau Gambar Asli)
function productCard(product) {
    let mediaContent = "";
    if (product.type === "image") {
        mediaContent = `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.parentNode.innerHTML='<span style=\\'font-size:55px\\'>${product.emoji}</span>';">`;
    } else {
        mediaContent = product.emoji;
    }

    return `
        <article class="product-card">
            <div class="product-media" style="text-align: center; height: 160px; overflow: hidden; background: #fff5f8; border-radius: 12px; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; font-size: 55px;">
                ${mediaContent}
            </div>
            <div class="product-info">
                <span class="eyebrow">${product.category}</span>
                <h3 style="font-size: 16px; margin: 6px 0;">${product.name}</h3>
                <p style="font-size: 13px; color: #666; margin-bottom: 10px; height: 36px; overflow: hidden;">${product.desc}</p>
                <div class="price" style="font-weight: bold; color: #d63384; font-size: 16px; margin-bottom: 10px;">${rupiah(product.price)}</div>
                <button onclick="addToCart(${product.id})" class="btn btn-primary" style="width: 100%; border-radius: 6px;">
                    + Keranjang
                </button>
                <a class="btn secondary"
                   style="display:block; text-align:center; margin-top:8px; text-decoration: none;"
                   href="product-detail.html?id=${product.id}">
                   Detail Produk
                </a>
            </div>
        </article>
    `;
}

function renderProducts(elementId, products) {
    const container = document.getElementById(elementId);
    if (!container) return;

    container.innerHTML = products.length
        ? products.map(productCard).join("")
        : "<p>Produk tidak ditemukan.</p>";
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    renderProducts("featured-products", PRODUCTS.slice(0, 4));
    renderProducts("products-list", PRODUCTS);

    const search = document.getElementById("product-search");
    const filter = document.getElementById("category-filter");
    const params = new URLSearchParams(location.search);

    if (filter && params.get("category")) {
        filter.value = params.get("category");
    }

    function filterProducts() {
        const keyword = (search?.value || "").toLowerCase();
        const category = filter?.value || "";

        const result = PRODUCTS.filter(product =>
            product.name.toLowerCase().includes(keyword) &&
            (!category || product.category === category)
        );

        renderProducts("products-list", result);
    }

    search?.addEventListener("input", filterProducts);
    filter?.addEventListener("change", filterProducts);

    const detail = document.getElementById("product-detail");

    if (detail) {
        const id = Number(params.get("id"));
        const product = PRODUCTS.find(item => item.id === id);

        if (!product) {
            detail.innerHTML = "<h2>Produk tidak ditemukan.</h2>";
            return;
        }

        let detailMedia = product.type === "image" 
            ? `<img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;" onerror="this.onerror=null; this.parentNode.innerHTML='${product.emoji}';">` 
            : product.emoji;

        detail.innerHTML = `
            <div class="product-detail-layout" style="display: flex; gap: 30px; align-items: center;">
                <div class="product-emoji detail-emoji" style="font-size: 80px; background: #fff5f8; padding: 20px; border-radius: 16px; width: 220px; height: 220px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                    ${detailMedia}
                </div>
                <div>
                    <span class="eyebrow">${product.category}</span>
                    <h1>${product.name}</h1>
                    <p>${product.desc}</p>
                    <h2 class="price">${rupiah(product.price)}</h2>
                    <button onclick="addToCart(${product.id})" class="btn btn-primary" style="margin-top: 10px;">
                        Tambah ke Keranjang
                    </button>
                    <p style="margin-top: 15px;"><a href="products.html">← Kembali ke produk</a></p>
                </div>
            </div>
        `;
    }
});