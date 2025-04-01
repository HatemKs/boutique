const produkte = [
    { name: "Dior Sauvage", price: 72, gender: "herren", type: "würzig", image: "https://cdn.flaconi.de/media/catalog/product/3/3/3348901250153.jpg?w=1019" },
    { name: "Bleu de Chanel", price: 99, gender: "herren", type: "holzig", image: "https://cdn.flaconi.de/media/catalog/product/3/1/3145891071702_c.jpg?r=1Tn8UV%3Fc%3Dde&w=1019&fl=progressive&fit=scale&q=80&f=webp" },
    { name: "Invictus", price: 59, gender: "herren", type: "frisch", image: "https://cdn.flaconi.net/media/catalog/product/3/3/3349668515660_c.jpg" },
    { name: "Versace Eros", price: 55, gender: "herren", type: "orientalisch", image: "https://cdn.flaconi.de/media/catalog/product/v/e/versace-eros-eau-de-parfum-100-ml-8011003861224.jpg" },
    { name: "Acqua di Giò", price: 69, gender: "herren", type: "aquatisch", image: "https://cdn.flaconi.de/media/catalog/product/3/6/3614273955553_c.jpg" },
    { name: "Tom Ford Noir", price: 105, gender: "herren", type: "würzig", image: "https://cdn.flaconi.de/media/catalog/product/t/o/tom-ford-noir-eau-de-parfum-100-ml-888066015509.jpg" },
    
    { name: "Chanel No. 5", price: 130, gender: "damen", type: "blumig", image: "https://www.pieper.de/media/image/06/c7/ed/3145891255300_600x600@2x.jpg" },
    { name: "YSL Libre", price: 69.99, gender: "damen", type: "blumig", image: "https://cdn.flaconi.de/media/catalog/product/3/6/3614272648401.jpg" },
    { name: "La Vie Est Belle", price: 75, gender: "damen", type: "süß", image: "https://cdn.flaconi.de/media/catalog/product/3/6/3605532612690.jpg" },
    { name: "My Way", price: 88, gender: "damen", type: "frisch", image: "https://cdn.flaconi.de/media/catalog/product/g/i/giorgio-armani-my-way-eau-de-parfum-30-ml-3614272907652.jpg" },
    { name: "Flowerbomb", price: 85, gender: "damen", type: "orientalisch", image: "https://cdn.flaconi.de/media/catalog/product/3/3/3360374000004.jpg" },
    { name: "Daisy", price: 59, gender: "damen", type: "fruchtig", image: "https://cdn.flaconi.net/media/catalog/product/3/6/3614229159035_c.jpg" },
    
    { name: "CK One", price: 30, gender: "unisex", type: "zitrisch", image: "https://cdn.notinohttps://cdn.flaconi.de/media/catalog/product/0/8/088300107681_c.jpg?w=1019&fl=progressive&fit=scale&q=80&f=webpimg.com/images/articles/ckn/3614228834964/Calvin-Klein-CK-One-Eau-de-Toilette-fur-Herren-und-Damen.jpeg" },
    { name: "Santal 33", price: 185, gender: "unisex", type: "holzig", image: "https://cdn.cosmeticsnow.com.au/images/sku/l/l/Le-Labo-Santal-33-Eau-De-Parfum-Spray-100ml-3.4oz.jpg" },
    { name: "Neroli Portofino", price: 210, gender: "unisex", type: "zitrisch", image: "https://whttps://cdn.idealo.com/folder/Product/4554/5/4554550/s1_produktbild_gross/tom-ford-neroli-portofino-eau-de-parfum-30-ml.jpgww.tomford.com/dw/image/v2/BDFJ_PRD/on/demandware.static/-/Sites-tomford-master-catalog/default/dw07c8023c/images/T0-NEPF/T0-NEPF_prd.jpg" },
    { name: "Gypsy Water", price: 180, gender: "unisex", type: "holzig", image: "https://media.selfridges.com/is/image/selfridges/11160601_GYPSYWATER_M?$PDP_M_ZOOM$" },
    { name: "Lime Basil & Mandarin", price: 67, gender: "unisex", type: "frisch", image: "https://i.ebayimg.com/images/g/B7wAAOSwPC1e1PW~/s-l1600.jpg" },
    { name: "Baccarat Rouge 540", price: 235, gender: "unisex", type: "süß", image: "htthttps://www.pieper.de/media/image/bf/a0/6e/3700559603116-0-2-70ml_600x600@2x.jpgps://media.parfumo.de/b/300x800/94535d8ab22156b945cac208de09813b.jpg" }
    ];
    
    function renderProdukte() {
    const grid = document.querySelector('.grid');
    if (!grid) return;
    
    const geschlechtFilter = document.getElementById('filter').value;
    const typFilter = document.getElementById('duftrichtung').value;
    const searchTerm = document.getElementById('search').value.toLowerCase();
    
    grid.innerHTML = "";
    
    produkte
    .filter(p =>
    (geschlechtFilter === 'alle' || p.gender === geschlechtFilter) &&
    (typFilter === 'alle' || p.type === typFilter) &&
    p.name.toLowerCase().includes(searchTerm)
    )
    .forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
    <img src="${p.image}" alt="${p.name}" />
    <h3>${p.name}</h3>
    <p><strong>${p.price.toFixed(2)} €</strong></p>
    <p>${p.type.charAt(0).toUpperCase() + p.type.slice(1)} Duft</p>
    <button onclick="addToCart('${p.name}', ${p.price})">In den Warenkorb</button>
    `;
    grid.appendChild(div);
    });
    }
    
    function addToCart(name, price) {
    let warenkorb = JSON.parse(localStorage.getItem("warenkorb")) || [];
    const existing = warenkorb.find(item => item.name === name);
    if (existing) {
    existing.qty++;
    } else {
    warenkorb.push({ name, price, qty: 1 });
    }
    localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
    renderCart();
    }
    
    function renderCart() {
    const list = document.getElementById('cart-items');
    const total = document.getElementById('total');
    const versand = document.getElementById('versand');
    if (!list || !total) return;
    
    let warenkorb = JSON.parse(localStorage.getItem("warenkorb")) || [];
    list.innerHTML = "";
    let sum = 0;
    
    warenkorb.forEach((p, index) => {
    sum += p.price * p.qty;
    const li = document.createElement('li');
    li.innerHTML = `
    <strong>${p.name}</strong><br>
    Preis: €${p.price.toFixed(2)}<br>
    Menge: <button onclick="updateQty(${index}, -1)">−</button> ${p.qty} <button onclick="updateQty(${index}, 1)">+</button>
    <button onclick="removeFromCart(${index})">Entfernen</button>
    `;
    list.appendChild(li);
    });
    
    let shipping = sum >= 99 ? 0 : 4.99;
    if (versand) versand.textContent = shipping > 0 ? `Versand: €${shipping.toFixed(2)}` : "Versand: Kostenlos";
    total.textContent = (sum + shipping).toFixed(2) + " €";
    }
    
    function updateQty(index, change) {
    let warenkorb = JSON.parse(localStorage.getItem("warenkorb")) || [];
    warenkorb[index].qty += change;
    if (warenkorb[index].qty <= 0) {
    warenkorb.splice(index, 1);
    }
    localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
    renderCart();
    }
    
    function removeFromCart(index) {
    let warenkorb = JSON.parse(localStorage.getItem("warenkorb")) || [];
    warenkorb.splice(index, 1);
    localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
    renderCart();
    }
    
    function applyCoupon() {
    let warenkorb = JSON.parse(localStorage.getItem("warenkorb")) || [];
    const total = document.getElementById('total');
    let sum = warenkorb.reduce((s, p) => s + p.price * p.qty, 0);
    const input = document.getElementById('coupon').value;
    if (input === "Informatik2025") {
    const rabatt = sum * 0.2;
    total.textContent = (sum - rabatt).toFixed(2) + " € (mit Rabatt)";
    } else {
    alert("Ungültiger Rabattcode!");
    }
    }
    
    function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    
    function startIntroAnimation() {
    const overlay = document.getElementById('start-overlay');
    if (overlay) {
    setTimeout(() => {
    overlay.classList.add('fade-out');
    setTimeout(() => {
    overlay.style.display = 'none';
    }, 1000);
    }, 2500);
    }
    }
    
    function startTicker() {
    const ticker = document.getElementById('ticker');
    if (!ticker) return;
    const messages = [
    "Jetzt neu: Versandkostenfrei ab 99€!",
    "Frühlingsangebote – bis zu 30% auf Damendüfte!",
    "Duft des Monats: Santal 33 von Le Labo!"
    ];
    let i = 0;
    setInterval(() => {
    ticker.textContent = messages[i % messages.length];
    i++;
    }, 4000);
    }
    
    window.onload = () => {
    renderProdukte();
    renderCart();
    startIntroAnimation();
    startTicker();
    
    document.getElementById('filter').addEventListener('change', renderProdukte);
    document.getElementById('duftrichtung').addEventListener('change', renderProdukte);
    document.getElementById('search').addEventListener('input', renderProdukte);
    };
    