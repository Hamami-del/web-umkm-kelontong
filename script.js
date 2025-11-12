document.addEventListener("DOMContentLoaded", () => {

    // Variabel untuk menyimpan keranjang belanja
    let cart = [];

    // --- FUNGSI TOMBOL KUANTITAS (+/-) ---
    const quantityButtons = document.querySelectorAll('.quantity-btn');
    quantityButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Hentikan event agar tidak memicu modal
            
            const quantitySpan = e.target.parentElement.querySelector('.quantity');
            let currentQuantity = parseInt(quantitySpan.textContent);

            if (e.target.classList.contains('plus')) {
                currentQuantity++;
            } else if (e.target.classList.contains('minus') && currentQuantity > 0) {
                currentQuantity--;
            }
            
            quantitySpan.textContent = currentQuantity;
        });
    });

    // --- FUNGSI TOMBOL BELI (TAMBAH KE KERANJANG) ---
    const beliButtons = document.querySelectorAll('.btn-beli');
    beliButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Hentikan event agar tidak memicu modal

            // Ambil data dari card terdekat
            const card = e.target.closest('.product-card');
            const name = card.getAttribute('data-name');
            const priceString = card.getAttribute('data-price');
            const priceNumeric = parseInt(card.getAttribute('data-price-numeric'));
            const quantitySpan = card.querySelector('.quantity');
            const quantity = parseInt(quantitySpan.textContent);

            // Validasi: Pastikan jumlah lebih dari 0
            if (quantity === 0) {
                alert(`Silakan tentukan jumlah untuk ${name}.`);
                return; // Berhenti di sini jika jumlah 0
            }

            // Cek apakah produk sudah ada di keranjang
            const existingProductIndex = cart.findIndex(item => item.name === name);

            if (existingProductIndex > -1) {
                // Jika sudah ada, tambahkan jumlahnya
                cart[existingProductIndex].quantity += quantity;
            } else {
                // Jika belum ada, tambahkan produk baru ke keranjang
                cart.push({
                    name: name,
                    priceString: priceString,
                    priceNumeric: priceNumeric,
                    quantity: quantity
                });
            }

            // Beri notifikasi dan reset jumlah di card
            alert(`${quantity} buah ${name} telah ditambahkan ke keranjang.`);
            quantitySpan.textContent = '0'; // Reset jumlah di card

            // (Opsional) Tampilkan isi keranjang di console untuk debug
            console.log(cart);
        });
    });

    // --- FUNGSI MODAL (POP-UP) PRODUK ---
    // (Fungsi ini tetap sama, tidak perlu diubah)
    const modal = document.getElementById('product-modal');
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalPrice = document.getElementById('modal-price');
    const closeModal = document.querySelector('.close-btn');
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const name = card.getAttribute('data-name');
            const price = card.getAttribute('data-price');
            const img = card.getAttribute('data-img');

            modalImg.src = img;
            modalName.textContent = name;
            modalPrice.textContent = price;

            modal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    // --- FUNGSI LINK SIDEBAR (SESUAI SPEK ANDA) ---
    
    // Biografi Penjual
    document.getElementById('nav-profile').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Menampilkan Biografi dan Tentang Penjual...');
    });

    // Info Pengiriman
    document.getElementById('nav-delivery').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Menampilkan Info Pengiriman (Lacak Paket)...');
    });

    // ** FUNGSI CHECK OUT (DIUBAH) **
    document.getElementById('nav-checkout').addEventListener('click', (e) => {
        e.preventDefault();

        // Cek jika keranjang kosong
        if (cart.length === 0) {
            alert('Keranjang Anda masih kosong. Silakan pilih produk terlebih dahulu.');
            return;
        }

        let summary = '--- RINGKASAN CHECK OUT ---\n\n';
        let total = 0;

        // Buat daftar ringkasan dari isi keranjang
        cart.forEach(item => {
            summary += `Produk: ${item.name}\n`;
            summary += `Jumlah: ${item.quantity}\n`;
            summary += `Harga: ${item.quantity} x ${item.priceString}\n`;
            summary += `Subtotal: RP ${(item.quantity * item.priceNumeric).toLocaleString('id-ID')}\n`;
            summary += '--------------------\n';
            total += item.quantity * item.priceNumeric;
        });

        // Tambahkan Total
        summary += `\nTOTAL KESELURUHAN: RP ${total.toLocaleString('id-ID')}\n`;

        // Tambahkan Info Pembayaran
        summary += '\nMETODE PEMBAYARAN:\n';
        summary += 'Silakan lakukan pembayaran ke:\n';
        summary += '- DANA (0812-XXXX-XXXX)\n';
        summary += '- Transfer Bank BCA (123456789) a.n. Toko Hamami\n';
        
        // Tampilkan ringkasan
        alert(summary);

        // Setelah checkout, kosongkan keranjang
        cart = [];
    });

    // Message (WhatsApp)
    document.getElementById('nav-message').addEventListener('click', (e) => {
        e.preventDefault();
        const a = document.createElement('a');
        a.href = "https://wa.me/628123456789?text=Halo%20Toko%2S%20saya%20tertarik%20dengan%20produk%20Anda.";
        a.target = "_blank";
        a.click();
    });

});