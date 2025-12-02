// ✅ LUXURY PARTICLE SYSTEM
function createLuxuryParticles() {
    const container = document.getElementById('luxury-particles');
    if (!container) return;
    
    const colors = ['#667eea', '#4ECDC4', '#74ebd5', '#9face6', '#FFD700', '#ffffff'];
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 25 + 8;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        particle.style.cssText = `
            position: absolute;
            background: ${color};
            width: ${size}px;
            height: ${size}px;
            border-radius: ${shape === 'circle' ? '50%' : shape === 'triangle' ? '0' : '4px'};
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float-luxury ${Math.random() * 15 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
            filter: blur(${Math.random() * 3 + 1}px);
            transform: rotate(${Math.random() * 360}deg);
            ${shape === 'triangle' ? 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);' : ''}
        `;
        
        container.appendChild(particle);
    }
}

// ✅ LUXURY THEME INITIALIZATION
function initLuxuryTheme() {
    console.log("💎 Initializing Blue & Mint Luxury Theme...");
    
    createLuxuryParticles();
    updateGlobalUserStatus();
    
    // Enhanced hover effects
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Luxury click effects
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            const btn = e.target;
            
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.5;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
                transform: scale(0);
                animation: luxury-ripple 0.8s ease-out;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 800);
            
            // Particle burst
            createClickParticles(e.clientX, e.clientY);
        }
    });
}

// Luxury ripple animation
const luxuryStyle = document.createElement('style');
luxuryStyle.textContent = `
    @keyframes luxury-ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes click-particle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(luxuryStyle);

function createClickParticles(x, y) {
    const container = document.getElementById('luxury-particles');
    const colors = ['#667eea', '#4ECDC4', '#FFD700'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.PI * 2 * i) / 8;
        const distance = Math.random() * 50 + 30;
        
        particle.style.cssText = `
            position: fixed;
            background: ${color};
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            --tx: ${Math.cos(angle) * distance}px;
            --ty: ${Math.sin(angle) * distance}px;
            animation: click-particle 0.6s ease-out forwards;
            z-index: 10000;
        `;
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 600);
    }
}

// Initialize when loaded
document.addEventListener('DOMContentLoaded', initLuxuryTheme);



// ✅ REGISTER SERVICE WORKER (tambahkan di awal file JavaScript)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('✅ ServiceWorker registration successful');
      })
      .catch(error => {
        console.log('❌ ServiceWorker registration failed: ', error);
      });
  });
}

// Override dengan styling tema neon Anda
window.alert = (msg) => Swal.fire({
    title: 'ℹ Info',
    text: msg,
    icon: 'info',
    confirmButtonText: 'OK',
    background: 'linear-gradient(145deg, #2d6a4f, #40916c)', // ✅ HIJAU TERANG
    color: '#ffffff',
    confirmButtonColor: '#ff416c',
    width: '300px',
    padding: '1.2rem',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        htmlContainer: 'custom-swal-text'
    }
});

window.confirm = (msg) => Swal.fire({
    title: '❓ Konfirmasi', 
    text: msg, 
    icon: 'question', 
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Tidak',
    background: 'linear-gradient(145deg, #2d6a4f, #40916c)', // ✅ HIJAU TERANG
    color: '#ffffff',
    confirmButtonColor: '#ff416c',
    cancelButtonColor: '#6c757d',
    width: '80px',
    padding: '1.2rem',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title', 
        htmlContainer: 'custom-swal-text'
    }
}).then(result => result.isConfirmed);

// Fungsi untuk menampilkan section tertentu
function showSection(sectionId) {
    console.log("🔄 Menampilkan section:", sectionId);
    
    // Sembunyikan semua section utama
    const sectionsToHide = ["dashboard", "photobooth-section", "pembayaran-section", "paket-section"];
    sectionsToHide.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = "none";
            console.log("❌ Sembunyikan:", id);
        }
    });
    
    // Sembunyikan semua content section sidebar
    const sections = document.querySelectorAll(".contentSection");
    sections.forEach(sec => {
        sec.style.display = "none";
        console.log("❌ Sembunyikan sidebar section:", sec.id);
    });
    
    // Tampilkan section yang dipilih
    if (sectionId === "dashboard") {
        document.getElementById("dashboard").style.display = "block";
        console.log("✅ Tampilkan: dashboard");
    } else if (sectionId === "photobooth") {
        if (!paketActive) {
            alert("Silakan pilih paket terlebih dahulu.");
            document.getElementById("dashboard").style.display = "block";
            return;
        }
        document.getElementById("photobooth-section").style.display = "block";
        console.log("✅ Tampilkan: photobooth-section");
        mulaiTimerPaket();
    } else if (sectionId === "pembayaran") {
        document.getElementById("pembayaran-section").style.display = "block";
        console.log("✅ Tampilkan: pembayaran-section");
    } else if (sectionId === "paket") {
        document.getElementById("paket-section").style.display = "block";
        console.log("✅ Tampilkan: paket-section");
    } else {
        // Untuk section sidebar (filesContent, guideContent, aboutContent)
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = "block";
            console.log("✅ Tampilkan sidebar section:", sectionId);
            console.log("📍 Posisi:", targetSection.getBoundingClientRect());
            console.log("🎨 Style display:", window.getComputedStyle(targetSection).display);
            
            // Force redraw dan beri border debug
            targetSection.style.border = "3px solid #00ff00";
            targetSection.style.background = "rgba(0,255,0,0.1)";
        } else {
            console.error("❌ Section tidak ditemukan:", sectionId);
        }
    }
}

// ===== VARIABLES & FUNGSI CAMERA =====
const video = document.getElementById('video');  
const canvas = document.getElementById('canvas');  
const frameOverlay = document.getElementById('frame-overlay');  
const countdownEl = document.getElementById('countdown');  
const startBtn = document.getElementById('startBtn');  
const stopBtn = document.getElementById('stopBtn');  
const captureBtn = document.getElementById('captureBtn');  
const deleteBtn = document.getElementById('deleteBtn');  
const timerSelect = document.getElementById('timerSelect');  
const filterSelect = document.getElementById('filterSelect');  
const gallery = document.getElementById('gallery');  
const videoBtn = document.getElementById('videoBtn');  
const videoControlsContainer = document.getElementById('videoControls');  
const startRecBtn = document.getElementById('startRecBtn');  
const stopRecBtn = document.getElementById('stopRecBtn');  
const pauseRecBtn = document.getElementById('pauseRecBtn');  
const prevBtn = document.getElementById('prevBtn');  
const nextBtn = document.getElementById('nextBtn');  
const videoTimerEl = document.getElementById('videoTimer');  
const frameSelect = document.getElementById('frameSelect');
const downloadBtn = document.getElementById('downloadBtn');
const printBtn = document.getElementById('printBtn');
const menuHome = document.getElementById('menuHome');

let lastCapturedData = null;
let fotoSiap = false;
let paketActive = false;
let paketDuration = 0;
let paketTimer = null;
let waktuSisa = 0;
let kameraAktif = false; 
let timerPaused = true;  
let startTime = null;    
let elapsedTime = 0; 
let stream = null;  
let currentFrame = "";  
let audioEnabled = false;  
let galleryImages = [];  
let currentIndex = 0;  
let showingPhoto = false;  
let isPreviewActive = false; 
let mediaRecorder = null;  
let recordedChunks = [];  
let videoTimerInterval = null;  
let videoStartTime = null;
let homeClickTimer = null; 
let sidebar = null;
let hamburgerMenu = null;
let isSidebarOpen = true;
let pembayaranVerified = false;
let currentUser = null;
let currentBuktiData = null;
let menuHubungi = null;
let paketFotoLimit = 0;
let paketVideoLimit = 0;
let editingItem = null;
let editingIndex = -1;
let originalData = null;
window.galleryImages = galleryImages;

function handleDownloadRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectId = urlParams.get('redirect_to_download');
    const userName = urlParams.get('name');
    
    if (redirectId && userName) {
        console.log("🔄 Redirect ke halaman download...");
        
        // Ambil data dari sessionStorage
        const downloadData = JSON.parse(sessionStorage.getItem(`download_data_${redirectId}`) || '{}');
        
        if (downloadData.id) {
            // Redirect ke visitor-download.html
            setTimeout(() => {
                window.location.href = `visitor-download.html?download=${redirectId}&name=${encodeURIComponent(userName)}`;
            }, 100);
        }
    }
}

// 🎯 FUNGSI KOMPRESI GAMBAR UNTUK UKURAN LEBIH KECIL
function compressImage(dataUrl, quality = 0.6) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = dataUrl;
        
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // 🎯 UKURAN LEBIH KECIL UNTUK KOMPRESI
            const maxWidth = 800;
            const maxHeight = 600;
            
            let width = img.width;
            let height = img.height;
            
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            ctx.drawImage(img, 0, 0, width, height);
            
            // 🎯 KOMPRESI DENGAN QUALITY LEBIH RENDAH
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedDataUrl);
        };
        
        img.onerror = function() {
            // 🎯 JIKA KOMPRESI GAGAL, PAKAI DATA ASLI
            resolve(dataUrl);
        };
    });
}

// 🎯 FUNGSI SIMPAN DATA DENGAN KOMPRESI & MANAGEMENT
async function enhancedSaveUserData() {
    if (!currentUser) {
        console.error("❌ Tidak ada user yang login");
        return false;
    }

    try {
        // 🎯 LIMIT JUMLAH ITEM DI GALLERY UNTUK HEMAT STORAGE
        const MAX_GALLERY_ITEMS = 15;
        
        if (currentUser.gallery && currentUser.gallery.length > MAX_GALLERY_ITEMS) {
            // 🎯 SIMPAN HANYA ITEM TERBARU
            currentUser.gallery = currentUser.gallery.slice(-MAX_GALLERY_ITEMS);
            console.log(`🎯 Gallery dibatasi ${MAX_GALLERY_ITEMS} item terbaru`);
        }

        const userDataStr = JSON.stringify(currentUser);
        const dataSize = new Blob([userDataStr]).size;
        
        console.log('💾 Ukuran data:', (dataSize / 1024 / 1024).toFixed(2), 'MB');

        // 🎯 CEK JIKA UKURAN MASIH TERLALU BESAR
        if (dataSize > 4000000) { // 4MB
            console.warn("⚠ Data hampir penuh, kompresi gallery...");
            await compressGalleryData();
            return await retrySaveUserData();
        }

        // 🎯 SIMPAN KE STORAGE
        localStorage.setItem('user_' + currentUser.email, userDataStr);
        localStorage.setItem('currentUser', userDataStr);
        
        console.log("✅ Data user berhasil disimpan permanen");
        return true;

    } catch (error) {
        console.error("💥 Gagal menyimpan data:", error);
        
        // 🎯 CLEANUP & RETRY
        if (await emergencyStorageCleanup()) {
            return await retrySaveUserData();
        }
        showStorageError();
        return false;
    }
}

// 🎯 FUNGSI KOMPRESI GALLERY DATA
async function compressGalleryData() {
    if (!currentUser || !currentUser.gallery) return;
    
    console.log("🎯 Melakukan kompresi gallery data...");
    
    for (let i = 0; i < currentUser.gallery.length; i++) {
        const item = currentUser.gallery[i];
        
        // 🎯 KOMPRESI HANYA FOTO (VIDEO TIDAK PERLU BASE64)
        if (item.type === 'photo' && item.data && item.data.startsWith('data:image')) {
            try {
                // 🎯 KOMPRESI GAMBAR DENGAN QUALITY RENDAH
                const compressedData = await compressImage(item.data, 0.5);
                item.data = compressedData;
                item.compressed = true;
                
                console.log(`🎯 Foto ${i+1} dikompresi`);
            } catch (e) {
                console.warn(`⚠ Gagal kompresi foto ${i+1}:`, e);
            }
        }
        
        // 🎯 HAPUS DATA VIDEO YANG BESAR (SIMPAN HANYA URL BLOB)
        if (item.type === 'video' && item.data && item.data.startsWith('blob:')) {
            // Video blob URL tidak bisa disimpan permanen, jadi kita skip
            // Atau konversi ke format yang lebih kecil
            item.data = ''; // Kosongkan data video besar
            item.videoUrl = 'session_only'; // Tandai sebagai session only
        }
    }
    
    // 🎯 HAPUS ITEM TERLAMA JIKA MASIH BESAR
    if (currentUser.gallery.length > 10) {
        currentUser.gallery = currentUser.gallery.slice(-10);
        console.log("🎯 Hapus item terlama, simpan 10 terbaru");
    }
}

// 🎯 FUNGSI LOAD USER DATA YANG ROBUST
function loadUserData() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            
            // 🎯 INISIALISASI JIKA DATA TIDAK LENGKAP
            if (!currentUser.gallery) currentUser.gallery = [];
            if (!currentUser.fotoTerambil) currentUser.fotoTerambil = 0;
            if (!currentUser.videoTerambil) currentUser.videoTerambil = 0;
            if (!currentUser.paket) currentUser.paket = null;
            if (!currentUser.waktuSisa) currentUser.waktuSisa = 0;
            
            // 🎯 LOAD GALLERY KE MEMORY
            galleryImages = [...currentUser.gallery];
            
            console.log(`✅ User data loaded: ${currentUser.gallery.length} items di gallery`);
            return true;
            
        } catch (e) {
            console.error("❌ Error loading user data:", e);
            return false;
        }
    }
    return false;
}

// Fungsi bantu untuk error storage
function showStorageError() {
    Swal.fire({
        title: '💾 Penyimpanan Penuh',
        html: `
        <div style="text-align: left;">
            <p><strong>Penyimpanan perangkat hampir penuh!</strong></p>
            <p>Beberapa foto/video mungkin tidak tersimpan permanen.</p>
            <p>Silakan hapus beberapa hasil lama atau download ke perangkat Anda.</p>
        </div>
        `,
        icon: 'warning',
        confirmButtonText: 'Mengerti'
    });
}

// ==================== FUNGSI BARU ====================
async function aggressiveCleanup() {
    if (!currentUser || !currentUser.gallery) return;
    
    console.log("🧹 Melakukan aggressive cleanup...");
    
    // Urutkan dari yang paling lama
    currentUser.gallery.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    // Simpan hanya 8 item terbaru (bisa disesuaikan)
    const itemsToKeep = 8;
    if (currentUser.gallery.length > itemsToKeep) {
        const deletedCount = currentUser.gallery.length - itemsToKeep;
        currentUser.gallery = currentUser.gallery.slice(-itemsToKeep);
        console.log(`🗑 Dihapus ${deletedCount} item terlama`);
    }
    
    // Juga hapus galleryImages yang sesuai
    galleryImages = [...currentUser.gallery];
    
    // Reload gallery UI
    loadUserGallery();
    
    showFeedback("🧹 Penyimpanan dibersihkan untuk menghemat space");
}

// 🎯 EMERGENCY CLEANUP YANG PINTAR
async function emergencyStorageCleanup() {
    try {
        console.log("🚨 SMART STORAGE CLEANUP!");
        
        // 🎯 1. HAPUS DATA USER LAMA
        const currentUserEmail = currentUser ? currentUser.email : '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('user_') && !key.includes(currentUserEmail)) {
                localStorage.removeItem(key);
                console.log("🗑 Hapus data user lama:", key);
            }
        }
        
        // 🎯 2. KOMPRESI GALLERY CURRENT USER
        if (currentUser && currentUser.gallery) {
            await compressGalleryData();
            
            // 🎯 3. HAPUS 50% ITEM TERLAMA JIKA MASIH BESAR
            if (currentUser.gallery.length > 8) {
                const keepCount = Math.floor(currentUser.gallery.length * 0.5);
                currentUser.gallery = currentUser.gallery.slice(-keepCount);
                galleryImages = [...currentUser.gallery];
                console.log(`🎯 Hapus 50% item terlama, simpan ${keepCount} terbaru`);
            }
        }
        
        console.log("✅ Smart cleanup completed");
        return true;
        
    } catch (e) {
        console.error("❌ Gagal smart cleanup:", e);
        return false;
    }
}

// ✅ INISIALISASI SIDEBAR
function initSidebar() {
    sidebar = document.getElementById('sidebar');
    hamburgerMenu = document.getElementById('hamburger-menu');
    menuHubungi = document.getElementById('menuHubungi'); // ✅ TAMBAH INI
    
    if (sidebar && hamburgerMenu) {
        console.log("✅ Sidebar dan hamburger menu berhasil diinisialisasi");
        updateSidebarState();
        hamburgerMenu.addEventListener('click', toggleSidebar);
        document.addEventListener('click', closeSidebarOnClickOutside);
        
        // ✅ TAMBAHKAN EVENT LISTENER UNTUK MENU HUBUNGI KAMI
        if (menuHubungi) {
            menuHubungi.addEventListener('click', function() {
                console.log("🎯 Menu Hubungi Kami diklik!");
                hubungiKami();
                closeSidebar();
            });
            console.log("✅ Event listener Hubungi Kami berhasil dipasang");
        } else {
            console.error("❌ Element menuHubungi tidak ditemukan");
        }
        
    } else {
        console.error("❌ Element sidebar atau hamburger menu tidak ditemukan");
    }
}


// ✅ TOGGLE SIDEBAR
function toggleSidebar(event) {
    if (event) event.stopPropagation();
    
    if (isSidebarOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

// ✅ BUKA SIDEBAR
function openSidebar() {
    if (sidebar) {
        sidebar.classList.remove('sidebar-closed');
        sidebar.classList.add('sidebar-open');
        isSidebarOpen = true;
        console.log("🔓 Sidebar dibuka");
    }
}

// ✅ TUTUP SIDEBAR
function closeSidebar() {
    if (sidebar) {
        sidebar.classList.remove('sidebar-open');
        sidebar.classList.add('sidebar-closed');
        isSidebarOpen = false;
        console.log("🔒 Sidebar ditutup");
    }
}

// ✅ TUTUP SIDEBAR KETIKA KLIK DI LUAR
function closeSidebarOnClickOutside(event) {
    if (!isSidebarOpen) return;
    
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnHamburger = hamburgerMenu.contains(event.target);
    
    if (!isClickInsideSidebar && !isClickOnHamburger) {
        closeSidebar();
    }
}

// ✅ UPDATE STATE SIDEBAR BERDASARKAN HALAMAN
function updateSidebarState() {
    const currentSection = getCurrentSection();
    console.log("📍 Current section:", currentSection);
    
    if (currentSection === 'dashboard') {
        // 🏠 HALAMAN UTAMA: Sidebar terbuka, hamburger TAMPIL
        openSidebar();
        if (hamburgerMenu) {
            hamburgerMenu.style.display = 'block';
            console.log("🏠 Halaman utama - Sidebar terbuka, hamburger tampil");
        }
    } else {
        // 📱 HALAMAN LAIN: Sidebar tertutup, hamburger TAMPIL
        closeSidebar();
        if (hamburgerMenu) {
            hamburgerMenu.style.display = 'block';
            console.log("📱 Halaman lain - Sidebar tertutup, hamburger tampil");
        }
    }
}

// ✅ DETEKSI HALAMAN AKTIF
function getCurrentSection() {
    if (document.getElementById('dashboard').style.display !== 'none') return 'dashboard';
    if (document.getElementById('photobooth-section').style.display !== 'none') return 'photobooth';
    if (document.getElementById('pembayaran-section').style.display !== 'none') return 'pembayaran';
    if (document.getElementById('paket-section').style.display !== 'none') return 'paket';
    return 'dashboard';
}

frameSelect.addEventListener('change', () => {
  const selectedFrame = frameSelect.value;
  if (!selectedFrame) {
    frameOverlay.style.display = 'none';
    currentFrame = "";
  } else {
    currentFrame = selectedFrame;
    frameOverlay.src = selectedFrame;
    frameOverlay.style.display = 'block';
  }
});  
// Mulai timer video  
// Mulai timer video
function startVideoTimer() {  
  videoTimerEl.style.display = 'block';  
  videoStartTime = Date.now();  
  videoTimerInterval = setInterval(updateVideoTimer, 500);  
}

// Hentikan timer video
function stopVideoTimer() {  
  clearInterval(videoTimerInterval);  
  videoTimerEl.style.display = 'none';  
}

// Jeda timer video
function pauseVideoTimer() {  
  if (videoTimerInterval) clearInterval(videoTimerInterval);  
  if (videoStartTime) {
    videoPausedTime = Date.now() - videoStartTime; // simpan durasi saat pause
  }
}

// Lanjutkan timer video setelah pause
function resumeVideoTimer() {  
  if (videoPausedTime == null) return;  
  videoStartTime = Date.now() - videoPausedTime; // hitung offset
  videoTimerInterval = setInterval(updateVideoTimer, 500);
}

// Fungsi pembaruan tampilan timer
function updateVideoTimer() {
  const diff = Math.floor((Date.now() - videoStartTime) / 1000);  
  const h = Math.floor(diff / 3600).toString().padStart(2,'0');  
  const m = Math.floor((diff % 3600 / 60)).toString().padStart(2,'0');  
  const s = (diff % 60).toString().padStart(2,'0');  
  videoTimerEl.textContent = `${h}:${m}:${s}`;
}

// --- FUNGSI addToGallery() DENGAN SCROLL OTOMATIS ---
async function addToGallery(item) {
    const index = galleryImages.length;

    let finalData = item;
    let compressed = false;

    // KOMPRESI OTOMATIS JIKA FOTO
    if (item.startsWith('data:image')) {
        try {
            finalData = await compressImage(item, 0.7);
            compressed = true;
            console.log("🎯 Foto dikompresi otomatis");
        } catch (e) {
            console.warn("⚠ Gagal kompresi, pakai data asli");
            finalData = item;
        }
    }

    // SIMPAN DATA FOTO
    const photoItem = {
        id: 'photo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        data: finalData,
        type: 'photo',
        frame: currentFrame,
        timestamp: new Date().toISOString(),
        storageType: 'base64',
        compressed: compressed
    };

    galleryImages.push(photoItem);

    const thumb = document.createElement('img');
    thumb.className = "thumb";
    thumb.src = finalData;
    thumb.setAttribute('data-id', photoItem.id);
    thumb.onclick = () => {
        currentIndex = index;
        showingPhoto = true;
        showOnCamera(index);
    };

    // STYLE THUMBNAIL
    thumb.style.width = "140px";
    thumb.style.height = "105px";
    thumb.style.objectFit = "cover";
    thumb.style.borderRadius = "12px";
    thumb.style.flexShrink = "0";
    thumb.style.display = "block";

    // TAMBAH KE GALLERY
    gallery.appendChild(thumb);
    

    // SIMPAN KE USER PROFILE
    if (currentUser) {
        if (!currentUser.gallery) currentUser.gallery = [];

        const isDuplicate = currentUser.gallery.some(existingItem =>
            existingItem.id === photoItem.id
        );
        if (!isDuplicate) {
            currentUser.gallery.push(photoItem);
            currentUser.fotoTerambil++;
            
            enhancedSaveUserData().then(success => {
                if (success) {
                    console.log("✅ Foto disimpan permanen");
                }
            });
        }
    }

    updatePackageCounter();
    updateEditButtonVisibility();

    // 🎯 SCROLL OTOMATIS KE FOTO BARU - PASTI SAMPAI UJUNG
    setTimeout(() => {
        const gallery = document.getElementById('gallery');
        if (gallery) {
            // 🎯 SCROLL PASTI KE UJUNG PALING KANAN
            gallery.scrollTo({
                left: gallery.scrollWidth,
                behavior: 'smooth'
            });
            
            // 🎯 UPDATE TOMBOL SETELAH SCROLL
            setTimeout(() => {
                updateScrollButtons();
                console.log('🎠 Auto-scroll ke ujung kanan');
            }, 400);
        }
    }, 300);
}

// ==================== FUNGSI addVideoToGallery() TANPA BATASAN ====================
function addVideoToGallery(videoURL) {
    const index = galleryImages.length;

    const videoItem = {
        id: 'video_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        data: videoURL,
        type: 'video',
        frame: currentFrame,
        timestamp: new Date().toISOString(),
        storageType: 'blob'
    };

    galleryImages.push(videoItem);

    const videoContainer = document.createElement('div');
    videoContainer.setAttribute('data-id', videoItem.id);

    // ✅ STYLE CONTAINER
    videoContainer.style.width = "120px";
    videoContainer.style.height = "90px";
    videoContainer.style.borderRadius = "12px";
    videoContainer.style.overflow = "hidden";
    videoContainer.style.flexShrink = "0";
    videoContainer.style.display = "block";
    videoContainer.style.position = "relative";

    const vid = document.createElement('video');
    vid.src = videoURL;
    vid.className = "thumb";
    vid.muted = true;
    vid.loop = true;
    vid.autoplay = true;
    vid.style.transform = "scaleX(1)";
    vid.controls = false;

    // ✅ STYLE VIDEO
    vid.style.width = "100%";
    vid.style.height = "100%";
    vid.style.objectFit = "cover";
    vid.style.borderRadius = "12px";

    // ✅ CONTROLS OVERLAY
    const controlsOverlay = document.createElement('div');
    controlsOverlay.style.position = 'absolute';
    controlsOverlay.style.bottom = '5px';
    controlsOverlay.style.left = '5px';
    controlsOverlay.style.right = '5px';
    controlsOverlay.style.background = 'rgba(0,0,0,0.7)';
    controlsOverlay.style.borderRadius = '8px';
    controlsOverlay.style.padding = '4px';
    controlsOverlay.style.display = 'flex';
    controlsOverlay.style.alignItems = 'center';
    controlsOverlay.style.gap = '6px';
    controlsOverlay.style.fontSize = '10px';
    controlsOverlay.style.color = 'white';

    const playBtn = document.createElement('button');
    playBtn.innerHTML = '▶';
    playBtn.style.background = 'none';
    playBtn.style.border = 'none';
    playBtn.style.color = 'white';
    playBtn.style.cursor = 'pointer';
    playBtn.style.fontSize = '10px';

    const timeDisplay = document.createElement('span');
    timeDisplay.textContent = '0:00';

    controlsOverlay.appendChild(playBtn);
    controlsOverlay.appendChild(timeDisplay);

    videoContainer.appendChild(vid);
    videoContainer.appendChild(controlsOverlay);

    // ✅ EVENT LISTENERS
    playBtn.onclick = (e) => {
        e.stopPropagation();
        if (vid.paused) {
            vid.play();
            playBtn.innerHTML = '❚❚';
        } else {
            vid.pause();
            playBtn.innerHTML = '▶';
        }
    };

    vid.ontimeupdate = () => {
        const minutes = Math.floor(vid.currentTime / 60);
        const seconds = Math.floor(vid.currentTime % 60);
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    videoContainer.onclick = () => {
        currentIndex = index;
        showVideoOnCamera(videoURL, true);
    };

    // ✅ TAMBAH KE GALLERY - TANPA BATASAN
    gallery.appendChild(videoContainer);

    // 🎯 SIMPAN KE USER PROFILE
    if (currentUser) {
        if (!currentUser.gallery) currentUser.gallery = [];

        const isDuplicate = currentUser.gallery.some(existingItem =>
            existingItem.id === videoItem.id
        );
        if (!isDuplicate) {
            currentUser.gallery.push(videoItem);
            currentUser.videoTerambil++;
            
            enhancedSaveUserData().then(success => {
                if (success) {
                    console.log("✅ Video metadata disimpan permanen");
                }
            });
        }
    }

    updatePackageCounter();
    updateEditButtonVisibility();
    // SCROLL KE THUMBNAIL BARU
    setTimeout(() => {
        const gallery = document.getElementById('gallery');
        if (gallery) {
            gallery.scrollLeft = gallery.scrollWidth;
            setTimeout(updateScrollButtons, 100);
        }
    }, 200);
}

// 🔊 Bunyi timer  
function playBeep() {  
  if (!audioEnabled) return;  
  const ctx = new AudioContext();  
  const osc = ctx.createOscillator();  
  osc.type = "square";  
  osc.frequency.value = 800;  
  const gain = ctx.createGain();  
  gain.gain.value = 0.1;  
  osc.connect(gain);  
  gain.connect(ctx.destination);  
  osc.start();  
  osc.stop(ctx.currentTime + 0.1);  
}  
  
// 🔊 Suara jepret  
function playShutter() {  
  if (!audioEnabled) return;  
  const shutterSound = new Audio("camera-13695.mp3");
  shutterSound.play().catch(err => console.warn("Gagal memutar suara jepret:", err));  
}  
  
async function startCamera() {
    try {
        const constraints = {
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'user'
            },
            audio: false
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);

        video.srcObject = stream;
        video.style.display = 'block';
        canvas.style.display = 'none';
        
        canvas.width = 1280;
        canvas.height = 720;

        if (currentFrame !== "") {
            frameOverlay.style.display = 'block';
            frameOverlay.style.transform = "scaleX(-1)";
        }

        audioEnabled = true;
        showingPhoto = false;
        video.style.filter = filterSelect.value || "none";
        videoControlsContainer.style.display = 'none';
        
        console.log("📷 Kamera berhasil dinyalakan");

        // ✅ TIMER: MULAI JALANKAN TIMER KETIKA KAMERA AKTIF
        if (paketActive && timerPaused) {
            mulaiTimerPaket();
            kameraAktif = true;
            timerPaused = false;
            console.log("⏱ Timer paket dimulai (kamera aktif)");
        }

    } catch (err) {
        alert("Tidak dapat mengakses kamera: " + err);
    }
    showingPhoto = false;
    isPreviewActive = false;
    updateEditButtonVisibility();
}

function stopCamera() {
    // ✅ TIMER: PAUSE TIMER KETIKA KAMERA DIMATIKAN
    if (paketActive && !timerPaused) {
        pauseTimerPaket();
        kameraAktif = false;
        timerPaused = true;
        console.log("⏸ Timer paket di-pause (kamera non-aktif)");
    }

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }

    video.srcObject = null;
    video.src = "";
    video.pause();
    video.style.display = 'none';
    canvas.style.display = 'none';
    frameOverlay.style.display = 'none';
    videoControlsContainer.style.display = 'none';
    videoTimerEl.style.display = 'none';
    stopVideoTimer();
    //gallery.style.display = 'flex';
    
    startRecBtn.style.display = 'none';
    pauseRecBtn.style.display = 'none';
    stopRecBtn.style.display = 'none';
    if (typeof resumeRecBtn !== 'undefined')
        resumeRecBtn.style.display = 'none';

    console.log("📷 Kamera dimatikan, timer di-pause");
}

function showCameraContainer() {
    const cameraContainer = document.getElementById('camera-container');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    
    if (cameraContainer) {
        cameraContainer.style.display = 'inline-block';
        console.log("  Container kamera ditampilkan (dalam keadaan mati)");
    }
    
    // Pastikan video dan canvas disembunyikan awalnya
    if (video) {
        video.style.display = 'none';
        video.srcObject = null;
    }
    if (canvas) {
        canvas.style.display = 'none';
    }
    
    // Sembunyikan kontrol video
    const videoControlsContainer = document.getElementById('videoControls');
    if (videoControlsContainer) {
        videoControlsContainer.style.display = 'none';
    }
    
    // Sembunyikan countdown dan timer
    const countdown = document.getElementById('countdown');
    const videoTimer = document.getElementById('videoTimer');
    if (countdown) countdown.style.display = 'none';
    if (videoTimer) videoTimer.style.display = 'none';
    
    // Tampilkan frame overlay jika ada frame yang dipilih
    const frameOverlay = document.getElementById('frame-overlay');
    if (frameOverlay && currentFrame !== "") {
        frameOverlay.style.display = 'block';
        frameOverlay.src = currentFrame;
    } else if (frameOverlay) {
        frameOverlay.style.display = 'none';
    }
    
    // Reset state
    showingPhoto = false;
    isPreviewActive = false;
    
    // Tampilkan gallery
    const gallery = document.getElementById('gallery');
    if (gallery) {
        gallery.style.display = 'flex';
    }
}
  
// 📸 Ambil foto                                                                                 capture
function capturePhoto() {
    // ✅ CEK LIMIT FOTO UNTUK SEMUA PAKET (TRIAL, BASIC, PREMIUM, VIP)
    if (currentUser && currentUser.paket) {
        if (currentUser.fotoTerambil >= currentUser.paketFotoLimit) {
            let pesan = '';
            if (currentUser.paket === "Trial") {
                pesan = 'Upgrade ke paket berbayar untuk foto unlimited!';
            } else if (currentUser.paket === "VIP") {
                pesan = 'Paket VIP Anda sudah mencapai batas foto.';
            } else {
                pesan = 'Anda sudah mencapai batas foto untuk paket ' + currentUser.paket;
            }
            
            Swal.fire({
                title: '❌ Limit Foto Habis',
                html: `
                    <div style="text-align: left; margin: 15px 0;">
                        <p><strong>Anda sudah mencapai batas foto untuk paket ${currentUser.paket}!</strong></p>
                        <p>📸 <strong>${currentUser.fotoTerambil}/${currentUser.paketFotoLimit}</strong> foto sudah diambil</p>
                        <p>⏱ Sisa waktu: <strong>${formatTime(currentUser.waktuSisa)}</strong></p>
                        <br>
                        <p>💡 <em>${pesan}</em></p>
                    </div>
                `,
                icon: 'warning',
                confirmButtonText: 'Mengerti',
                background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
                color: '#ffffff',
                confirmButtonColor: '#ff416c',
                width: '450px'
            });
            return;
        }
    }

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    ctx.save();

    // Terapkan filter sebelum menggambar video agar hasil foto ikut filter
    ctx.filter = filterSelect.value || "none";

    // Balik kamera (mirror)
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);

    ctx.restore();

    // Suara jepretan
    playShutter();

    const finalizeCapture = (imageData) => {
    // Set data foto dan flag siap simpan
    lastCapturedData = imageData;
    fotoSiap = true;
    console.log(" ✅ Foto diambil, data tersimpan:", !!lastCapturedData);

    // ✅ LANGSUNG SIMPAN KE GALLERY DENGAN ID UNIK
    addToGallery(imageData);

    // UPDATE COUNTER FOTO UNTUK SEMUA PAKET
    if (currentUser && currentUser.paket) {
        currentUser.fotoTerambil++;
        
        // ✅ SIMPAN PERUBAHAN COUNTER
        try {
            localStorage.setItem('user_' + currentUser.email, JSON.stringify(currentUser));
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } catch (e) {
            console.error(" ❌ Gagal menyimpan counter:", e);
            cleanupLocalStorage();
        }

        console.log(` ✅ Progress ${currentUser.paket}: ${currentUser.fotoTerambil}/${currentUser.paketFotoLimit} foto`);
        
        // ✅ TAMPILKAN NOTIFIKASI PROGRESS
        if (currentUser.fotoTerambil === currentUser.paketFotoLimit) {
            if (currentUser.paket === "VIP") {
                showFeedback(" 🎉 Batas foto VIP tercapai!");
            } else {
                showFeedback(" ⚠ Foto terpakai!");
            }
        } else {
            showFeedback(` 📸 Foto ${currentUser.fotoTerambil}/${currentUser.paketFotoLimit}`);
        }
    }
   canvas.style.display = 'block';

        if (currentFrame !== "") {
            frameOverlay.style.display = 'block';
        } else {
            frameOverlay.style.display = 'none';
        }

        canvas.classList.add('float-shrink-hold');

        canvas.addEventListener('animationend', function handler() {
            canvas.classList.remove('float-shrink-hold');
            canvas.style.display = 'none';
            canvas.removeEventListener('animationend', handler);
        });
    };

    if (currentFrame !== "") {
        // Jika frame aktif, gabungkan frame ke foto
        const frame = new Image();
        frame.src = currentFrame;
        frame.onload = function() {
            ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL("image/png");
            console.log("🖼 Foto dengan frame disimpan:", !!imageData);
            finalizeCapture(imageData);
        };
    } else {
        // Tanpa frame tetap finalize
        const imageData = canvas.toDataURL("image/png");
        console.log("🖼 Foto tanpa frame disimpan:", !!imageData);
        finalizeCapture(imageData);
    }
}

// 🖼 Tampilkan hasil foto/video di layar kamera  
function showOnCamera(index) {
  currentIndex = index;
  showingPhoto = true;

  // sembunyikan video saat menampilkan foto
  if (stream) video.style.display = 'none';

  const item = galleryImages[index];
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = item.data;

  img.onload = function() {
    canvas.width = video.videoWidth || 480;
    canvas.height = video.videoHeight || 360;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Flip horizontal agar efek cermin sama seperti saat pengambilan foto
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(img, -canvas.width, 0, canvas.width, canvas.height);
    ctx.restore();

    // tampilkan frame yang tersimpan di foto tersebut
    if (item.frame) {
      const frameImg = new Image();
      frameImg.src = item.frame;
      frameImg.onload = () => {
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
      };
    }

    canvas.style.display = 'block';
    frameOverlay.style.display = 'none'; // jangan tampilkan frame global
  };

  updateEditButtonVisibility();

}
  
function showVideoOnCamera(url, isPreview = false) {  
    video.pause();  
    video.srcObject = null;      
    video.src = url;  
    video.controls = true;  // ✅ TAMPILKAN KONTROL DEFAULT
    video.autoplay = true;  
    video.muted = false;  
    video.loop = false;  
    video.style.display = 'block';  
    video.style.transform = "scaleX(1)"; // ✅ VIDEO NORMAL (TIDAK MIRROR)
    canvas.style.display = 'none';  
    frameOverlay.style.display = 'none';  

    // ✅ HAPUS WRAPPER YANG MEMBUAT KONTROL TERBALIK
    let videoWrapper = document.getElementById('videoWrapper');
    if (videoWrapper) {
        videoWrapper.style.transform = "none"; // ✅ HAPUS TRANSFORM
        videoWrapper.remove(); // ✅ HAPUS WRAPPER SAMA SEKALI
    }

    if (isPreview) {  
        videoControlsContainer.style.display = 'none';  
        stopVideoTimer();  
    } else {  
        videoControlsContainer.style.display = 'flex';  
        startVideoTimer();  
    }  

    showingPhoto = false;
    isPreviewActive = isPreview;
    updateEditButtonVisibility();
}

function showNext(event) {  
  event.stopPropagation();  
  if (currentIndex < galleryImages.length - 1) {  
    currentIndex++;  
    showOnCamera(currentIndex);  
  }  
}  
  
// 🔹 Tombol kontrol video di dalam kamera  
videoBtn.onclick = async () => {
    if (!stream) {
        showCameraAlert("  Nyalakan kamera terlebih dahulu!");
        return;
    }

    await startCamera(); // Pastikan kamera aktif

    canvas.style.display = 'none';
    video.controls = false; //  SEMBUNYIKAN KONTROL SAAT MODE KAMERA
    showingPhoto = false;

    //  VIDEO LIVE: GUNAKAN MIRROR EFFECT
    video.style.transform = "scaleX(-1)";
    if(currentFrame !== "") {
        frameOverlay.style.display = 'block';
        frameOverlay.style.transform = "scaleX(-1)";
    } else {
        frameOverlay.style.display = 'none';
    }

    videoControlsContainer.style.display = 'flex';
    startRecBtn.style.display = 'inline-block';
    stopRecBtn.style.display = 'none';
    pauseRecBtn.style.display = 'none';
    stopVideoTimer();
};

// ==================== FUNGSI startRecording() LENGKAP YANG DIPERBAIKI ====================
async function startRecording() {
    // ✅ CEK LIMIT VIDEO UNTUK SEMUA PAKET
    if (currentUser && currentUser.paket) {
        if (currentUser.videoTerambil >= currentUser.paketVideoLimit) {
            let pesan = "";
            if (currentUser.paket === "Trial") {
                pesan = 'Upgrade ke paket berbayar untuk lebih banyak video!';
            } else if (currentUser.paket === "VIP") {
                pesan = 'Paket VIP Anda sudah mencapai batas video.';
            } else {
                pesan = 'Anda sudah mencapai batas video untuk paket ' + currentUser.paket;
            }

            Swal.fire({
                title: '🎥 Limit Video Habis',
                html: `
                <div style="text-align: left; margin: 15px 0;">
                    <p><strong>Anda sudah mencapai batas video untuk paket ${currentUser.paket}!</strong></p>
                    <p>🎥 <strong>${currentUser.videoTerambil}/${currentUser.paketVideoLimit}</strong> video sudah diambil</p>
                    <br>
                    <p>🎥 <em>${pesan}</em></p>
                </div>
                `,
                icon: 'warning',
                confirmButtonText: 'Mengerti',
                background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
                color: '#ffffff',
                confirmButtonColor: '#ff416c',
                width: '450px'
            });
            return;
        }
    }

    if (!stream) return;

    recordedChunks = [];

    // ✅ AMBIL AUDIO DENGAN QUALITY RINGAN
    let audioStream = null;
    try {
        audioStream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                sampleRate: 22050, // ✅ TURUNKAN SAMPLE RATE
                channelCount: 1,   // ✅ MONO SAJA
                echoCancellation: true,
                noiseSuppression: true
            } 
        });
    } catch (err) {
        console.warn("Tidak dapat mengakses mikrofon: ", err);
    }

    // ✅ SET RECORDING QUALITY YANG LEBIH RINGAN
    const recordingCanvas = document.createElement('canvas');
    recordingCanvas.width = 640;   // ✅ RESOLUSI LEBIH KECIL (640x480)
    recordingCanvas.height = 480;  // ✅ DARI 1280x720 → 640x480
    const rctx = recordingCanvas.getContext('2d');

    const filterValue = filterSelect.value || "none";
    let frameImage = null;
    let lastFrameSrc = "";

    const drawFrame = () => {
        if (!stream) return;

        rctx.clearRect(0, 0, recordingCanvas.width, recordingCanvas.height);
        rctx.filter = filterValue;
        
        // ✅ DRAW VIDEO KE CANVAS DENGAN UKURAN LEBIH KECIL
        rctx.drawImage(video, 0, 0, recordingCanvas.width, recordingCanvas.height);

        if (currentFrame && currentFrame !== lastFrameSrc) {
            frameImage = new Image();
            frameImage.src = currentFrame;
            lastFrameSrc = currentFrame;
            frameImage.onload = () => {
                rctx.drawImage(frameImage, 0, 0, recordingCanvas.width, recordingCanvas.height);
            };
        } else if (frameImage) {
            rctx.drawImage(frameImage, 0, 0, recordingCanvas.width, recordingCanvas.height);
        }

        requestAnimationFrame(drawFrame);
    };

    drawFrame();

    const canvasStream = recordingCanvas.captureStream(15); // ✅ TURUNKAN FPS (15 fps)

    const combinedStream = audioStream
        ? new MediaStream([...canvasStream.getVideoTracks(), ...audioStream.getAudioTracks()])
        : canvasStream;

    // ✅ SET DURASI REKAMAN MAX 15 DETIK UNTUK FILE LEBIH KECIL
    mediaRecorder = new MediaRecorder(combinedStream, { 
        mimeType: 'video/webm; codecs=vp9',
        videoBitsPerSecond: 1000000 // ✅ BITRATE LEBIH RENDAH (1 Mbps)
    });

    mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        
        // ✅ SOLUSI: SIMPAN SEBAGAI BLOB URL, BUKAN BASE64
        const videoURL = URL.createObjectURL(blob);
        
        console.log("🎥 Video disimpan sebagai Blob URL, size:", blob.size, "bytes");
        
        // ✅ TAMPILKAN VIDEO DI GALLERY
        addVideoToGallery(videoURL);
        
        // ✅ UPDATE COUNTER & SIMPAN KE USER DATA (TANPA SIMPAN DATA BESAR)
        if (currentUser && currentUser.paket) {
            currentUser.videoTerambil++;
            if (!currentUser.gallery) currentUser.gallery = [];
            
            // ✅ SIMPAN HANYA METADATA, BUKAN DATA VIDEO
            const videoItem = {
                id: 'video_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                data: videoURL, // ✅ SIMPAN BLOB URL UNTUK SESSION INI
                type: 'video',
                frame: currentFrame,
                timestamp: new Date().toISOString(),
                storageType: 'blob', // ✅ TANDAI SEBAGAI BLOB
                size: blob.size
            };
            
            currentUser.gallery.push(videoItem);
            
            // ✅ CLEANUP GALLERY JIKA TERLALU BANYAK
            if (currentUser.gallery.length > 10) {
                currentUser.gallery = currentUser.gallery.slice(-10);
                console.log("🧹 Gallery dibersihkan, simpan 10 item terbaru");
            }

            // ✅ SIMPAN KE STORAGE (UKURAN SANGAT KECIL)
            enhancedSaveUserData().then(success => {
                if (success) {
                    console.log("✅ Metadata video disimpan permanen");
                } else {
                    console.warn("⚠ Gagal menyimpan metadata video");
                }
            });
            
            console.log(`📊 Progress ${currentUser.paket}: ${currentUser.videoTerambil}/${currentUser.paketVideoLimit} video`);
            updatePackageCounter();
            
            if (currentUser.videoTerambil >= currentUser.paketVideoLimit) {
                showFeedback("🎥 Batas video tercapai!");
            } else {
                showFeedback(`🎥 Video ${currentUser.videoTerambil}/${currentUser.paketVideoLimit} direkam`);
            }
        }
        
        stopVideoTimer();
        
        // ✅ CLEANUP STREAMS
        if (audioStream) {
            audioStream.getTracks().forEach(track => track.stop());
        }
        recordingCanvas.remove();
    };

    // ✅ AUTO STOP SETELAH 15 DETIK UNTUK HINDARI FILE BESAR
    setTimeout(() => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            showFeedback("⏱ Rekaman dihentikan otomatis (max 15 detik)");
        }
    }, 15000); // ✅ 15 DETIK SAJA

    mediaRecorder.start();

    startRecBtn.style.display = 'none';
    pauseRecBtn.style.display = 'inline-block';
    stopRecBtn.style.display = 'inline-block';

    startVideoTimer();
}

function stopRecording() {  
  if (!mediaRecorder) return;  
  mediaRecorder.stop();
  
  // Setelah stop, tampilkan hanya tombol start lagi  
  startRecBtn.style.display = 'inline-block';  
  stopRecBtn.style.display = 'none';  
  pauseRecBtn.style.display = 'none';  
  if (typeof resumeRecBtn !== 'undefined')  
    resumeRecBtn.style.display = 'none';  
  videoControlsContainer.style.display = 'none';  
}

function pauseRecording() {  
  if (!mediaRecorder) return;  
  if (mediaRecorder.state === 'recording') {  
    mediaRecorder.pause();  
    pauseVideoTimer();  
    pauseRecBtn.style.display = 'none';  
    resumeRecBtn.style.display = 'inline-block';  
  }  
}

function resumeRecording() {  
  if (!mediaRecorder) return;  
  if (mediaRecorder.state === 'paused') {  
    mediaRecorder.resume();  
    resumeRecBtn.style.display = 'none';  
    pauseRecBtn.style.display = 'inline-block';  
    resumeVideoTimer();
  }  
}

// 🎬 Tombol kontrol utama  
startBtn.onclick = startCamera;  
stopBtn.onclick = stopCamera;  

captureBtn.onclick = () => {
  if (!stream) {
    showCameraAlert(); // tampilkan pop-up jika kamera belum aktif
    return;
  }

  // Jika sedang menampilkan hasil foto di layar kamera
  if (showingPhoto) {
    // 👉 Tekan pertama: kembali ke mode kamera, tidak mengambil foto
    showingPhoto = false;
    isPreviewActive = false;
    startCamera(); // aktifkan kembali mode kamera
    return;
  }

  // 👉 Tekan kedua atau normal: ambil foto seperti biasa
  handleCapture();
};


deleteBtn.onclick = () => {  
  if (galleryImages.length === 0) { 
    alert("Belum ada foto/video yang bisa dihapus!"); 
    return; 
  }  

  const deletedItem = galleryImages.splice(currentIndex, 1)[0]; // hapus item

  // Hapus thumbnail dari galeri
  if (gallery.children[currentIndex]) gallery.removeChild(gallery.children[currentIndex]);  

  // Tentukan index berikutnya yang akan ditampilkan
  if (currentIndex >= galleryImages.length) currentIndex = galleryImages.length - 1;  

  if (currentIndex >= 0) {
    const nextItem = galleryImages[currentIndex];
    if (nextItem.type === 'photo') {
      showOnCamera(currentIndex);
    } else if (nextItem.type === 'video') {
      showVideoOnCamera(nextItem.data, true);
    }
  } else {
    // Tidak ada item tersisa, kembalikan ke mode kamera
    startCamera();
  }
  setTimeout(updateEditButtonVisibility, 100);

};
  
filterSelect.addEventListener("change", () => {  
  video.style.filter = filterSelect.value;  
});  
  
function handleCapture() {  
  if (!stream) {  
    alert("⚠ Nyalakan kamera terlebih dahulu!");  
    return;  
  }  
  
  const seconds = parseInt(timerSelect.value);  
  if (seconds === 0) { capturePhoto(); return; }  
  
  countdownEl.style.display = 'block';  
  let count = seconds;  
  countdownEl.textContent = count;  
  
  const interval = setInterval(() => {  
    playBeep();  
    count--;  
    countdownEl.textContent = count;  
    if (count <= 0) {  
      clearInterval(interval);  
      countdownEl.style.display = 'none';  
      capturePhoto();  
    }  
  }, 1000);  
}  

// ✅ TAMBAHKAN FUNGSI showCameraAlert() JIKA BELUM ADA
function showCameraAlert(message = "🎥 Nyalakan kamera terlebih dahulu!") {
    Swal.fire({
        title: '⚠ Kamera Tidak Aktif',
        text: message,
        icon: 'warning',
        confirmButtonText: 'OK',
        background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
        color: '#ffffff',
        confirmButtonColor: '#ff416c',
        width: '400px'
    });
}

// ==================== FUNGSI BARU: Video Quality Settings ====================
function getVideoConstraints() {
    // ✅ QUALITY SETTINGS YANG LEBIH RINGAN
    return {
        video: {
            width: { ideal: 640 },  // ✅ TURUNKAN RESOLUSI
            height: { ideal: 480 }, // ✅ DARI 1280x720 → 640x480
            frameRate: { ideal: 15, max: 25 }, // ✅ TURUNKAN FPS
            facingMode: 'user',
            // ✅ KOMPRESI LEBIH BAIK
            aspectRatio: 1.333
        },
        audio: {
            sampleRate: 22050, // ✅ TURUNKAN SAMPLE RATE AUDIO
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true
        }
    };
}

// ==================== FUNGSI BARU: Batasi Durasi Video ====================
function setupVideoDurationLimit() {
    // ✅ BATASI DURASI VIDEO MAX 15 DETIK (bukan 30)
    setTimeout(() => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            showFeedback("⏱ Rekaman dihentikan otomatis (max 15 detik)");
        }
    }, 15000); // ✅ 15 DETIK SAJA
}

// === DASHBOARD HANDLER ===                                          yhkkl';l'''''''''''''''''''''''''''''''''''
function showSection(section) {
    console.log("🔄 Menampilkan section:", section);
    
    // Sembunyikan semua section utama
    const sectionsToHide = ["dashboard", "photobooth-section", "pembayaran-section", "paket-section"];
    sectionsToHide.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = "none";
            console.log("❌ Sembunyikan:", id);
        }
    });
    
    // Sembunyikan semua content section sidebar
    const sections = document.querySelectorAll(".contentSection");
    sections.forEach(sec => {
        sec.style.display = "none";
        console.log("❌ Sembunyikan sidebar section:", sec.id);
    });
    
    // Tampilkan section yang dipilih
    if (section === "dashboard") {
        document.getElementById("dashboard").style.display = "block";
        console.log("✅ Tampilkan: dashboard");
    } 

    else if (section === "photobooth") {
    // CEK: HARUS SUDAH LOGIN
    if (!currentUser) {
        showLoginMenu();
        document.getElementById("dashboard").style.display = "block";
        return;
    }

    // LOAD GALLERY USER
    loadUserGallery();

    // TAMPILKAN INFO COUNTER
    const trialInfo = document.getElementById('trialInfo');
    if (trialInfo) {
        if (currentUser.paket) {
            trialInfo.style.display = 'block';
            trialInfo.querySelector('h4').textContent = ` PAKET ${currentUser.paket.toUpperCase()}`;
            updatePackageCounter();
        } else {
            trialInfo.style.display = 'none';
        }
    }

    // ✅ PERBAIKAN: TAMPILKAN KAMERA CONTAINER TAPI JANGAN NYALAKAN KAMERA
    if (currentUser.paket === "Trial" && currentUser.waktuSisa > 0) {
        // ✅ INIT TIMER TAPI JANGAN JALANKAN
        paketActive = true;
        paketDuration = currentUser.paketDuration || 600; // 10 menit untuk trial
        waktuSisa = currentUser.waktuSisa;
        elapsedTime = currentUser.elapsedTime || 0;
        
        // ✅ TAMPILKAN TIMER TAPI PAUSED
        const displayTimer = document.getElementById("paketTimerDisplay");
        displayTimer.style.display = "block";
        displayTimer.innerText = "⏸ Timer paused: " + formatTime(waktuSisa);
        
        timerPaused = true;
        kameraAktif = false;
        
        document.getElementById("photobooth-section").style.display = "block";
        
        // ✅ TAMBAHKAN INI: TAMPILKAN KAMERA CONTAINER
        showCameraContainer();
        console.log("✅ Masuk photobooth - Kamera container tampil, Timer siap (paused)");

    } else if (currentUser.pembayaranVerified && currentUser.waktuSisa > 0) {
        // ✅ SAMA UNTUK PAKET BAYAR
        paketActive = true;
        paketDuration = currentUser.paketDuration;
        waktuSisa = currentUser.waktuSisa;
        elapsedTime = currentUser.elapsedTime || 0;
        
        const displayTimer = document.getElementById("paketTimerDisplay");
        displayTimer.style.display = "block";
        displayTimer.innerText = "⏸ Timer paused: " + formatTime(waktuSisa);
        
        timerPaused = true;
        kameraAktif = false;
        
        document.getElementById("photobooth-section").style.display = "block";
        
        // ✅ TAMBAHKAN INI: TAMPILKAN KAMERA CONTAINER
        showCameraContainer();
        console.log("✅ Masuk photobooth - Kamera container tampil, Timer siap (paused)");

    } else {
        // BELUM BAYAR ATAU WAKTU HABIS
        if (currentUser.paket === "Trial" && currentUser.waktuSisa <= 0) {
            alert("😊 Waktu trial Anda sudah habis! Silakan pilih paket berbayar.");
        } else if (currentUser.paket && currentUser.paket !== "Trial") {
            alert("△ Silakan lakukan pembayaran terlebih dahulu!");
        } else {
            alert("△ Silakan pilih paket terlebih dahulu di Menu Paket!");
        }
        document.getElementById("dashboard").style.display = "block";
        return;
    }
}
    else if (section === "pembayaran") {
        // ✅ CEK: HARUS SUDAH LOGIN
        if (!currentUser) {
            showLoginMenu();
            document.getElementById("dashboard").style.display = "block";
            return;
        }
        
        // ✅ CEK: SUDAH PILIH PAKET BAYAR (TRIAL TIDAK DIANGGAP)
        if (!currentUser.paket || currentUser.paket === "Trial") {
            alert("📦 Silakan pilih paket berbayar terlebih dahulu di Menu Paket!");
            document.getElementById("dashboard").style.display = "block";
            return;
        }
        
        // ✅ CEK: SUDAH BAYAR
        if (currentUser.pembayaranVerified) {
            alert("✅ Anda sudah memiliki paket aktif! Tidak perlu bayar lagi.");
            document.getElementById("dashboard").style.display = "block";
            return;
        }
        
        document.getElementById("pembayaran-section").style.display = "block";
        console.log("✅ Tampilkan: pembayaran-section");
        
        // ✅ OTOMATIS ISI JENIS PAKET & HARGA BERDASARKAN PILIHAN USER
        updateJenisPaketField();
    } 
    else if (section === "paket") {
        document.getElementById("paket-section").style.display = "block";
        console.log("✅ Tampilkan: paket-section");
    }
    else {
        // Untuk section sidebar (filesContent, guideContent, aboutContent)
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.style.display = "block";
            console.log("✅ Tampilkan sidebar section:", section);
            console.log("📍 Posisi:", targetSection.getBoundingClientRect());
            console.log("🎨 Style display:", window.getComputedStyle(targetSection).display);
            
            // Force redraw dan beri border debug
            targetSection.style.border = "3px solid #00ff00";
            targetSection.style.background = "rgba(0,255,0,0.1)";
        } else {
            console.error("❌ Section tidak ditemukan:", section);
        }
    }
    
    // ✅ UPDATE STATUS DASHBOARD
    updateDashboardStatus();
    
    // ✅ UPDATE SIDEBAR STATE SETELAH GANTI SECTION
    setTimeout(() => {
        updateSidebarState();
    }, 100);
}

// ✅ FUNGSI BARU: UPDATE FIELD JENIS PAKET & HARGA OTOMATIS
function updateJenisPaketField() {
    const jenisPaketField = document.getElementById('jenisPaket');
    const hargaPaketField = document.getElementById('hargaPaket');
    
    if (jenisPaketField && hargaPaketField && currentUser && currentUser.paket) {
        // Isi jenis paket
        jenisPaketField.value = currentUser.paket;
        
        // Isi harga paket berdasarkan jenis paket
        const harga = getTotalByPaket();
        hargaPaketField.value = harga;
        
        console.log("✅ Jenis & harga paket diisi otomatis:", currentUser.paket, harga);
    } else {
        console.log("❌ Tidak bisa mengisi jenis & harga paket:", {
            jenisField: !!jenisPaketField,
            hargaField: !!hargaPaketField,
            user: !!currentUser,
            paket: currentUser?.paket
        });
    }
}

// ✅ FUNGSI BARU: DAPATKAN HARGA BERDASARKAN JENIS PAKET
function getTotalByPaket() {
    if (!currentUser || !currentUser.paket) return 'Rp 0';
    
    const harga = {
        'Trial': 'GRATIS',
        'Basic': 'Rp 10.000',
        'Premium': 'Rp 15.000', 
        'VIP': 'Rp 20.000'
    };
    
    return harga[currentUser.paket] || 'Rp 0';
}

function kirimPembayaran() {
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const nohp = document.getElementById('nohp').value;
    const metode = document.getElementById('metode').value;

    // ✅ VALIDASI (tetap sama)
    if (!nama.trim() || !email.trim() || !nohp.trim() || !metode) {
        alert("⚠ Mohon lengkapi semua data sebelum mengirim pembayaran!");
        return;
    }

    // ✅ PROSES PEMBAYARAN (tetap sama)
    paketActive = true;
    pembayaranVerified = true;
    waktuSisa = paketDuration;

    currentUser.paket = getPaketName(paketDuration);
    currentUser.paketDuration = paketDuration;
    currentUser.waktuSisa = waktuSisa;
    currentUser.pembayaranVerified = true;
    localStorage.setItem('user_' + currentUser.email, JSON.stringify(currentUser));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // ✅ TAMPILKAN POPUP BUKTI PEMBAYARAN (BARU!)
    tampilkanBuktiPembayaran(nama, email, nohp, metode);
    
    // ❌ SEMBUNYIKAN/HAPUS TAMPILAN TEXT LAMA (jika ada)
    const hasilDiv = document.getElementById('hasilPembayaran');
    if (hasilDiv) {
        hasilDiv.style.display = 'none';
    }
    
    // Reset form
    document.getElementById('formPembayaran').reset();
}

// ✅ FUNGSI BARU: TAMPILKAN POPUP BUKTI PEMBAYARAN
function tampilkanBuktiPembayaran(nama, email, nohp, metode) {
    const popup = document.getElementById('buktiPembayaranPopup');
    const now = new Date();
    
    // Format tanggal seperti BCA: DD/MM/YYYY HH:MM:SS
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    // Generate nomor referensi acak
    const referensi = generateReferensi();
    
    // Tentukan total berdasarkan paket
    const total = getTotalByPaket();
    
    // Isi data ke popup
    document.getElementById('buktiTanggal').textContent = formattedDate;
    document.getElementById('buktiReferensi').textContent = referensi;
    document.getElementById('buktiMetode').textContent = getMetodeDisplay(metode);
    document.getElementById('buktiJenisPaket').textContent = currentUser.paket; // ✅ JENIS PAKET
    document.getElementById('buktiNama').textContent = nama;
    document.getElementById('buktiEmail').textContent = email;
    document.getElementById('buktiNoHP').textContent = nohp;
    document.getElementById('buktiTotal').textContent = total;
    
    // Simpan data untuk download
    currentBuktiData = { 
        nama, 
        email, 
        nohp, 
        metode, 
        jenisPaket: currentUser.paket, // ✅ SIMPAN JENIS PAKET
        tanggal: formattedDate, 
        referensi, 
        total 
    };
    
    // Tampilkan popup
    popup.style.display = 'flex';
}
// ✅ FUNGSI BARU: GENERATE NOMOR REFERENSI
function generateReferensi() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 20; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// ✅ FUNGSI BARU: TENTUKAN TOTAL BERDASARKAN PAKET
function getTotalByPaket() {
    if (!currentUser || !currentUser.paket) return 'Rp 0';
    
    const harga = {
        'Basic': 'Rp 10.000',
        'Premium': 'Rp 15.000', 
        'VIP': 'Rp 20.000'
    };
    
    return harga[currentUser.paket] || 'Rp 0';
}

// ✅ FUNGSI BARU: KONVERSI METODE KE DISPLAY
function getMetodeDisplay(metode) {
    const metodeMap = {
        'transfer': 'Transfer Bank',
        'qris': 'QRIS',
        'ewallet': 'GOPAY'
    };
    return metodeMap[metode] || metode;
}

// ✅ FUNGSI BARU: TUTUP POPUP
function tutupBuktiPembayaran() {
    const popup = document.getElementById('buktiPembayaranPopup');
    popup.style.display = 'none';
    
    // Redirect ke dashboard
    setTimeout(() => {
        showSection("dashboard");
        updateDashboardStatus();
    }, 300);
}

// ✅ FUNGSI BARU: DOWNLOAD STRUK (DENGAN JENIS PAKET)
function downloadBuktiPembayaran() {
    if (!currentBuktiData) return;
    
    // Buat canvas untuk generate gambar struk
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 550; // ✅ TINGGI DITAMBAH UNTUK JENIS PAKET
    
    // Background putih
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Header biru
    ctx.fillStyle = '#004b8d';
    ctx.fillRect(0, 0, canvas.width, 80);
    
    // Text header
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('m-Transfer', canvas.width/2, 35);
    ctx.font = '14px Arial';
    ctx.fillText('Photo Booth App', canvas.width/2, 55);
    
    // Status berhasil
    ctx.fillStyle = '#00a650';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('BERHASIL', canvas.width/2, 100);
    
    // Detail transaksi
    ctx.fillStyle = '#333333';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    let y = 140;
    
    const details = [
        `Tanggal: ${currentBuktiData.tanggal}`,
        `Referensi: ${currentBuktiData.referensi}`,
        `Metode: ${getMetodeDisplay(currentBuktiData.metode)}`,
        `Jenis Paket: ${currentBuktiData.jenisPaket}`, // ✅ JENIS PAKET
        `Nama: ${currentBuktiData.nama}`,
        `Email: ${currentBuktiData.email}`,
        `No. HP: ${currentBuktiData.nohp}`,
        `Total: ${currentBuktiData.total}`
    ];
    
    details.forEach(detail => {
        ctx.fillText(detail, 20, y);
        y += 25;
    });
    
    // Footer
    ctx.font = '12px Arial';
    ctx.fillStyle = '#666666';
    ctx.textAlign = 'center';
    ctx.fillText('Biaya Termasuk PPN (Bila ada)', canvas.width/2, y + 30);
    ctx.fillText('PT. PHOTO BOOTH KELOMPOK 3', canvas.width/2, y + 45);
    ctx.fillText('NPWP : 0013084496091000', canvas.width/2, y + 60);
    
    // Convert ke image dan download
    const link = document.createElement('a');
    link.download = `bukti-pembayaran-${currentBuktiData.referensi}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    // Feedback
    alert('✅ Struk pembayaran berhasil didownload!');
}

function pilihPaket(namaPaket) {
    console.log("📦 Memilih paket:", namaPaket);
    
    // ✅ CEK APAKAH SUDAH LOGIN
    if (!currentUser) {
        showLoginMenu();
        return;
    }
    
    // ✅ CEK APAKAH SUDAH ADA PAKET AKTIF (KECUALI TRIAL)
    if (currentUser.pembayaranVerified && currentUser.waktuSisa > 0 && namaPaket !== 'Trial') {
        Swal.fire({
            title: '⚠ Paket Aktif Ditemukan',
            html: `Anda sedang memiliki <strong>${currentUser.paket}</strong> yang aktif.<br><br>
                   Dengan membeli paket baru, paket aktif Anda akan <strong>hilang</strong> dan diganti dengan paket baru.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Lanjutkan',
            cancelButtonText: 'Batal',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c',
            cancelButtonColor: '#6c757d',
            width: '450px'
        }).then((result) => {
            if (result.isConfirmed) {
                prosesPembelianPaket(namaPaket);
            }
        });
        return;
    }
    
    // ✅ LANGSUNG PROSES UNTUK TRIAL ATAU TIDAK ADA PAKET AKTIF
    prosesPembelianPaket(namaPaket);
}

// ✅ FUNGSI BARU: PROSES PEMBELIAN PAKET (TERPISAH)
function prosesPembelianPaket(namaPaket) {
    console.log("🔄 Memproses pembelian paket:", namaPaket);
    
    // ✅ CEK APAKAH SUDAH PERNAH PAKAI TRIAL
    if (namaPaket === "Trial" && currentUser.trialUsed) {
        Swal.fire({
            title: '❌ Trial Sudah Dipakai',
            html: `
                <div style="text-align: left; margin: 15px 0;">
                    <p><strong>Anda sudah menggunakan paket Trial sebelumnya!</strong></p>
                    <p>Paket Trial hanya bisa digunakan <strong>sekali saja</strong> per akun.</p>
                    <br>
                    <p>💡 Silakan pilih paket berbayar untuk terus menggunakan Photo Booth.</p>
                </div>
            `,
            icon: 'warning',
            confirmButtonText: 'Pilih Paket Berbayar',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c',
            width: '500px'
        }).then((result) => {
            showSection("paket");
        });
        return;
    }
    
    // Set durasi dan limit berdasarkan paket
    if (namaPaket === "Trial") {
        paketDuration = 10 * 60;
        paketFotoLimit = 5;
        paketVideoLimit = 1;
    } else if (namaPaket === "Basic") {
        paketDuration = 60 * 60; 
        paketFotoLimit = 10;
        paketVideoLimit = 2;
    } else if (namaPaket === "Premium") {
        paketDuration = 2 * 60 * 60;
        paketFotoLimit = 20;
        paketVideoLimit = 5;
    } else if (namaPaket === "VIP") {
        paketDuration = 3 * 60 * 60;
        paketFotoLimit = 30;  // ✅ VIP JUGA ADA LIMIT
        paketVideoLimit = 10;
    } else {
        console.error("❌ Nama paket tidak valid:", namaPaket);
        return;
    }
    
    // ✅ SIMPAN DATA PAKET KE USER
    currentUser.paket = namaPaket;
    currentUser.paketDuration = paketDuration;
    currentUser.paketFotoLimit = paketFotoLimit;
    currentUser.paketVideoLimit = paketVideoLimit;
    currentUser.fotoTerambil = 0;
    currentUser.videoTerambil = 0;
    currentUser.elapsedTime = 0;
    
    // ✅ TANDAI JIKA INI TRIAL SUDAH DIPAKAI
    if (namaPaket === "Trial") {
        currentUser.trialUsed = true;
    }
    
    // ✅ STATUS BERBEDA UNTUK TRIAL vs BAYAR
    if (namaPaket === "Trial") {
        paketActive = true;
        pembayaranVerified = false;
        currentUser.pembayaranVerified = false;
        currentUser.waktuSisa = paketDuration;
        
        Swal.fire({
            title: '🎯 Paket Trial Dipilih!',
            html: `
                <div style="text-align: left; margin: 15px 0;">
                    <p><strong>Paket Trial sekarang AKTIF!</strong></p>
                    <p>✅ Durasi: 10 menit</p>
                    <p>✅ 3 Foto + 1 Video</p>
                    <p>✅ Langsung bisa digunakan di Photo Booth</p>
                    <br>
                    <p>⚠ <strong>Note:</strong> Trial hanya bisa digunakan <strong>sekali saja</strong></p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: 'Kembali ke Menu Utama',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#4CAF50',
            width: '500px'
        }).then((result) => {
            showSection("dashboard");
        });
        
    } else {
        paketActive = false;
        pembayaranVerified = false;
        currentUser.pembayaranVerified = false;
        currentUser.waktuSisa = 0;
        
        alert(`Anda memilih Paket ${namaPaket}\nSilahkan lanjutkan ke Menu Pembayaran`);
        showSection("dashboard");
    }
    
    // Simpan ke localStorage
    localStorage.setItem('user_' + currentUser.email, JSON.stringify(currentUser));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    loadUserGallery();
    
    updateDashboardStatus();
}

function mulaiTimerPaket() {
    const displayTimer = document.getElementById("paketTimerDisplay");
    
    // ✅ HENTIKAN TIMER SEBELUMNYA JIKA ADA
    clearInterval(paketTimer);
    
    // ✅ HITUNG WAKTU YANG SUDAH BERJALAN
    if (startTime === null) {
        startTime = Date.now() - elapsedTime;
    } else {
        startTime = Date.now() - elapsedTime;
    }
    
    displayTimer.style.display = "block";

    paketTimer = setInterval(() => {
        const now = Date.now();
        elapsedTime = now - startTime;
        waktuSisa = Math.max(0, paketDuration - Math.floor(elapsedTime / 1000));
        
        displayTimer.innerText = "Sisa waktu: " + formatTime(waktuSisa);

        // ✅ AUTO-SAVE SISA WAKTU SETIAP 10 DETIK
        if (currentUser && elapsedTime % 10000 < 1000) {
            currentUser.waktuSisa = waktuSisa;
            currentUser.elapsedTime = elapsedTime; // ✅ SIMPAN JUGA elapsedTime
            enhancedSaveUserData().then(success => {
                if (success) {
                    console.log("💾 Waktu paket disimpan:", formatTime(waktuSisa));
                }
            });
        }

        // ✅ CEK JIKA WAKTU HABIS
        if (waktuSisa <= 0) {
            clearInterval(paketTimer);
            paketActive = false;
            displayTimer.innerText = "⏰ Waktu paket habis";
            
            // ✅ UPDATE USER PROFILE
            if (currentUser) {
                currentUser.waktuSisa = 0;
                currentUser.pembayaranVerified = false;
                currentUser.elapsedTime = 0;
                enhancedSaveUserData();
            }
            
            // ✅ TAMPILKAN ALERT DAN MATIKAN KAMERA
            Swal.fire({
                title: '⏰ Waktu Habis',
                text: 'Waktu paket Anda sudah habis. Silakan beli paket baru.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            
            stopCamera();
            document.getElementById("captureBtn").disabled = true;
        }
    }, 1000);
    
    console.log("▶ Timer paket berjalan - Kamera aktif");
}

function pauseTimerPaket() {
    // ✅ HENTIKAN TIMER TAPI SIMPAN STATUS
    clearInterval(paketTimer);
    
    // ✅ SIMPAN elapsedTime UNTUK DILANJUTKAN NANTI
    if (startTime !== null) {
        elapsedTime = Date.now() - startTime;
    }
    
    console.log("⏸ Timer paket di-pause - Kamera non-aktif");
    
    // ✅ UPDATE DISPLAY TIMER
    const displayTimer = document.getElementById("paketTimerDisplay");
    if (displayTimer && waktuSisa > 0) {
        displayTimer.innerText = "⏸ Timer paused: " + formatTime(waktuSisa);
    }
}

function formatTime(sec) {
  let m = Math.floor(sec / 60);
  let s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function handlePembayaranClick() {
    if (!currentUser) {
        // ✅ BELUM LOGIN: LANGSUNG TAMPILKAN POPUP LOGIN
        showLoginMenu();
        return;
    }
    
    // ✅ CEK APAKAH SUDAH PILIH PAKET BAYAR (TRIAL TIDAK DIANGGAP)
    if (!currentUser.paket || currentUser.paket === "Trial") {
        alert("📦 Silakan pilih paket berbayar terlebih dahulu di Menu Paket!");
        showSection('paket');
        return;
    }
    
    // ✅ CEK APAKAH SUDAH BAYAR
    if (currentUser.pembayaranVerified) {
        alert("✅ Anda sudah memiliki paket aktif! Tidak perlu bayar lagi.");
        showSection('dashboard');
        return;
    }
    
    showSection('pembayaran');
}

function handlePhotoboothClick() {
    if (!currentUser) {
        // ✅ BELUM LOGIN: LANGSUNG TAMPILKAN POPUP LOGIN
        showLoginMenu();
        return;
    }
    
    // ✅ SUDAH LOGIN: CEK APAKAH PAKET TRIAL ATAU SUDAH BAYAR
    if (currentUser.paket === "Trial" && currentUser.waktuSisa > 0) {
        // ✅ TRIAL AKTIF: LANGSUNG BISA
        showSection('photobooth');
    } 
    else if (currentUser.pembayaranVerified && currentUser.waktuSisa > 0) {
        // ✅ SUDAH BAYAR: LANGSUNG BISA
        showSection('photobooth');
    }
    else {
        // ❌ BELUM ADA PAKET AKTIF
        if (!currentUser.paket) {
            alert("📦 Silakan pilih paket terlebih dahulu di Menu Paket!");
        } else if (currentUser.paket === "Trial" && currentUser.waktuSisa <= 0) {
            alert("⏰ Waktu trial Anda sudah habis! Silakan pilih paket berbayar.");
        } else {
            alert("⚠ Silakan lakukan pembayaran terlebih dahulu!");
        }
    }
}

function updateDashboardStatus() {
    const statusDiv = document.getElementById('statusPembayaran');
    if (!statusDiv) return;

    if (pembayaranVerified) {
        // ✅ SUDAH BAYAR - BISA MASUK PHOTOBOOTH
        statusDiv.innerHTML = `
            <div style="background:rgba(0,255,0,0.1); border:2px solid #00ff00; padding:15px; border-radius:10px;">
                <h3>✅ PAKET AKTIF</h3>
                <p>Pembayaran telah diverifikasi. Anda dapat menggunakan Photo Booth.</p>
                <p><strong>Sisa waktu: <span id="statusTimer">${formatTime(waktuSisa)}</span></strong></p>
            </div>
        `;
        statusDiv.style.display = 'block';
    } 
    else if (paketDuration) {
        // ✅ SUDAH PILIH PAKET TAPI BELUM BAYAR
        statusDiv.innerHTML = `
            <div style="background:rgba(255,255,0,0.1); border:2px solid #ffff00; padding:15px; border-radius:10px;">
                <h3>⚠ MENUNGGU PEMBAYARAN</h3>
                <p>Anda sudah memilih paket. Silakan lakukan pembayaran untuk mengaktifkan Photo Booth.</p>
            </div>
        `;
        statusDiv.style.display = 'block';
    }
    else {
        // ❌ BELUM PILIH PAKET
        statusDiv.style.display = 'none';
    }
}

if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadHasil);
}
if (printBtn) {
    printBtn.addEventListener('click', cetakFoto);
}

// FUNGSI DOWNLOAD HASIL (Foto & Video) - MODIFIED
function downloadHasil() {
    if (galleryImages.length === 0) {
        alert("△ Belum ada foto atau video yang bisa didownload!");
        return;
    }

    // Tentukan item yang akan didownload
    let itemToDownload = null;
    
    if (showingPhoto && galleryImages[currentIndex]) {
        itemToDownload = galleryImages[currentIndex];
    } else {
        // Jika tidak ada preview, download yang terakhir
        itemToDownload = galleryImages[galleryImages.length - 1];
    }

    if (!itemToDownload) {
        alert("△ Tidak ada item yang bisa didownload!");
        return;
    }

    // Simpan item untuk share
    lastDownloadedItem = itemToDownload;
    shareItemData = itemToDownload.data;

    // Download seperti biasa
    if (itemToDownload.type === 'photo') {
        downloadFoto(itemToDownload.data);
    } else if (itemToDownload.type === 'video') {
        downloadVideo(itemToDownload.data);
    }

    // Tampilkan modal share setelah download
    setTimeout(() => {
        showShareModal(itemToDownload);
    }, 1000);
}



// ✅ FUNGSI CETAK FOTO (Hanya Foto, bukan Video)
function cetakFoto() {
    if (galleryImages.length === 0) {
        alert("⚠ Belum ada foto yang bisa dicetak!");
        return;
    }

    // Cari foto terakhir atau yang sedang dipreview
    let fotoToPrint = null;
    
    if (showingPhoto && galleryImages[currentIndex] && galleryImages[currentIndex].type === 'photo') {
        fotoToPrint = galleryImages[currentIndex].data;
    } else {
        // Cari foto terakhir dari gallery
        for (let i = galleryImages.length - 1; i >= 0; i--) {
            if (galleryImages[i].type === 'photo') {
                fotoToPrint = galleryImages[i].data;
                break;
            }
        }
    }

    if (!fotoToPrint) {
        alert("⚠ Tidak ada foto yang bisa dicetak. Silakan ambil foto terlebih dahulu.");
        return;
    }

    printFoto(fotoToPrint);
}

function printFoto(dataURL) {
    // Simpan data foto ke localStorage
    localStorage.setItem('photoPrint', dataURL);
    
    // Buka window baru dengan print.html
    const printWindow = window.open('print.html', '_blank', 'width=800,height=600');
    
    if (!printWindow) {
        alert("⚠ Pop-up diblokir! Silakan izinkan pop-up untuk mencetak.");
        
        // Fallback: download manual
        const link = document.createElement('a');
        link.download = `photo-booth-${Date.now()}.png`;
        link.href = dataURL;
        link.click();
        
        showFeedback("📥 Foto didownload - silakan print manual");
        return;
    }
    
    showFeedback("🖨️ Membuka halaman print...");
}

// ✅ FUNGSI FEEDBACK UNTUK USER
function showFeedback(message) {
    // Hapus feedback sebelumnya jika ada
    const existingFeedback = document.getElementById('feedbackMessage');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    // Buat elemen feedback baru
    const feedback = document.createElement('div');
    feedback.id = 'feedbackMessage';
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 255, 0, 0.9);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: fadeInOut 3s ease-in-out;
    `;

    document.body.appendChild(feedback);

    // Hapus otomatis setelah 3 detik
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 3000);
}

// ✅ TAMBAH CSS ANIMASI UNTUK FEEDBACK
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-20px); }
        10% { opacity: 1; transform: translateY(0); }
        90% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

    if (menuHome) {
        menuHome.addEventListener('click', function(event) {
            handleHomeClick(event);
            if (getCurrentSection() !== 'dashboard') {
                closeSidebar();
            }
        });
    }
function handleHomeClick(event) {
    // Single click - langsung kembali ke dashboard
    showSection('dashboard');
    
    // Double click detection
    if (homeClickTimer) {
        // Double click detected
        clearTimeout(homeClickTimer);
        homeClickTimer = null;
        handleDoubleClick();
    } else {
        // Single click - tunggu sebentar untuk cek double click
        homeClickTimer = setTimeout(() => {
            homeClickTimer = null;
            // Single click action sudah dilakukan di atas (showSection)
        }, 300);
    }
}
function handleDoubleClick() {
    console.log("🔄 Double click detected - refreshing...");
    
    // Feedback visual
    menuHome.classList.add('home-double-click');
    setTimeout(() => {
        menuHome.classList.remove('home-double-click');
    }, 600);
    
    // Tampilkan konfirmasi
        resetAppState();
        
        // Feedback sebelum refresh
        showFeedback("🔄 Merefresh halaman...");
        
        // Refresh halaman setelah delay kecil
        setTimeout(() => {
            location.reload();
        }, 1000);
    }

function resetAppState() {
    // Reset semua variable state
    paketActive = false;
    pembayaranVerified = false;
    paketDuration = 0;
    waktuSisa = 0;
    
    // ✅ RESET VARIABLE TIMER BARU
    kameraAktif = false;
    timerPaused = true;
    startTime = null;
    elapsedTime = 0;

    // Hentikan semua timer
    if (paketTimer) clearInterval(paketTimer);
    if (videoTimerInterval) clearInterval(videoTimerInterval);

    // Matikan kamera jika aktif
    if (stream) {
        stopCamera();
    }

    // Reset gallery
    galleryImages = [];
    gallery.innerHTML = "";
    currentIndex = 0;

    console.log("🔄 State aplikasi direset termasuk timer");
}

function hubungiKami() {
    console.log("🔍 Fungsi hubungiKami dipanggil!"); // ✅ DEBUG
    
    const nomorWhatsApp = '6282163235170'; // ✅ GANTI DENGAN NOMOR ANDA
    const pesanOtomatis = 'Halo web photo booth online ya? Saya ingin bertanya tentang layanan photo booth Anda.';
    const pesanEncoded = encodeURIComponent(pesanOtomatis);
    const urlWhatsApp = `https://wa.me/${nomorWhatsApp}?text=${pesanEncoded}`;
    
    console.log("📱 URL WhatsApp:", urlWhatsApp); // ✅ DEBUG
    
    // Tampilkan konfirmasi sebelum redirect
    Swal.fire({
        title: '📞 Hubungi Kami',
        html: `
            <div style="text-align: left; margin: 15px 0;">
                <p><strong>Anda akan diarahkan ke WhatsApp</strong></p>
                <p>📱 Nomor: +${nomorWhatsApp}</p>
            </div>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Buka WhatsApp',
        cancelButtonText: 'Batal',
        background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
        color: '#ffffff',
        confirmButtonColor: '#25D366',
        cancelButtonColor: '#6c757d',
        width: '400px',
        padding: '1.2rem',
        customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            htmlContainer: 'custom-swal-text'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("✅ User mengkonfirmasi, membuka WhatsApp...");
            window.open(urlWhatsApp, '_blank');
            showFeedback("📱 Membuka WhatsApp...");
        } else {
            console.log("❌ User membatalkan");
        }
    });
}

// ===== EVENT LISTENERS TERPUSAT =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Aplikasi Photo Booth dimuat");
     handleDownloadRedirect();
    // Inisialisasi sidebar
    initSidebar();
    
    // ✅ EVENT LISTENER UNTUK MENU LOGIN
    if (menuLogin) {
        menuLogin.addEventListener('click', function() {
            if (currentUser) {
                showUserMenu();
            } else {
                showLoginMenu();
            }
        });
        console.log("✅ Event listener Login berhasil dipasang");
    }

    // Camera controls
    startBtn.onclick = startCamera;
    stopBtn.onclick = stopCamera;
    captureBtn.onclick = () => {
        if (!stream) {
            showCameraAlert();
            return;
        }
        if (showingPhoto) {
            showingPhoto = false;
            isPreviewActive = false;
            startCamera();
            return;
        }
        handleCapture();
    };
    
    videoBtn.onclick = async () => {  
        if (!stream) {  
            showCameraAlert("🎥 Nyalakan kamera terlebih dahulu!");  
            return;  
        }  
        await startCamera();  
        canvas.style.display = 'none';
        video.controls = false;
        showingPhoto = false;
        if(currentFrame !== "") {
            frameOverlay.style.display = 'block';
        } else {
            frameOverlay.style.display = 'none';
        }
        videoControlsContainer.style.display = 'flex';  
        startRecBtn.style.display = 'inline-block';  
        stopRecBtn.style.display = 'none';  
        pauseRecBtn.style.display = 'none';  
        stopVideoTimer();  
    };
    
    deleteBtn.onclick = () => {
    if (galleryImages.length === 0) {
        alert("Belum ada foto/video yang bisa dihapus!");
        return;
    }

    const deletedItem = galleryImages.splice(currentIndex, 1)[0];

    // ✅ HAPUS JUGA DARI USER GALLERY (PERMANEN) DENGAN SYSTEM BARU
    if (currentUser && currentUser.gallery) {
        const itemIndex = currentUser.gallery.findIndex(item => item.id === deletedItem.id);
        if (itemIndex !== -1) {
            currentUser.gallery.splice(itemIndex, 1);
            
            // ✅ SIMPAN PERUBAHAN KE STORAGE
            enhancedSaveUserData().then(success => {
                if (success) {
                    console.log("✅ Item dihapus permanen dari storage");
                }
            });
        }
    }

    if (gallery.children[currentIndex]) gallery.removeChild(gallery.children[currentIndex]);

    if (currentIndex >= galleryImages.length) currentIndex = galleryImages.length - 1;

    if (currentIndex >= 0) {
        const nextItem = galleryImages[currentIndex];
        if (nextItem.type === 'photo') {
            showOnCamera(currentIndex);
        } else if (nextItem.type === 'video') {
            showVideoOnCamera(nextItem.data, true);
        }
    } else {
        startCamera();
    }

    setTimeout(() => {
        limitVisibleThumbnails();
        updateScrollButtons();
    }, 100);
};
    
    // ✅ VIDEO RECORDING CONTROLS DENGAN FUNGSI BARU
    startRecBtn.onclick = startRecording;
    pauseRecBtn.onclick = pauseRecording;
    resumeRecBtn.onclick = resumeRecording;
    stopRecBtn.onclick = stopRecording;
    
    // Filter & Frame
    filterSelect.addEventListener("change", () => {
        video.style.filter = filterSelect.value;
    });
    
    frameSelect.addEventListener('change', () => {
        const selectedFrame = frameSelect.value;
        if (!selectedFrame) {
            frameOverlay.style.display = 'none';
            currentFrame = "";
        } else {
            currentFrame = selectedFrame;
            frameOverlay.src = selectedFrame;
            frameOverlay.style.display = 'block';
        }
    });
    
    // Menu Sidebar
    if (menuHome) {
        menuHome.addEventListener('click', function(event) {
            handleHomeClick(event);
            if (getCurrentSection() !== 'dashboard') {
                closeSidebar();
            }
        });
    }
    
    if (menuGuide) {
    menuGuide.addEventListener('click', function() {
        showPetunjukPenggunaan();
        closeSidebar();
        });
    }
    
    const menuHubungi = document.getElementById('menuHubungi');
    if (menuHubungi) {
        menuHubungi.addEventListener('click', function() {
            hubungiKami();
            closeSidebar();
        });
        console.log("✅ Event listener Hubungi Kami berhasil dipasang");
    }
    
    if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadAllAsZip);
    console.log("✅ Download All listener terpasang");
    }
    if (printBtn) {
        printBtn.addEventListener('click', cetakFoto);
    }
    // Update posisi download button ketika gallery berubah
    if (downloadBtn && printBtn) {
    // Panggil sekali saat load
    setTimeout(updateDownloadButtonPosition, 100);
    
    // Update posisi ketika gallery berubah
    const galleryObserver = new MutationObserver(updateDownloadButtonPosition);
    const gallery = document.getElementById('gallery');
    if (gallery) {
        galleryObserver.observe(gallery, { childList: true, subtree: true });
    }
}

    // 🎠 PERBAIKAN EVENT LISTENER UNTUK SCROLL GALLERY - VERSI DIPERBAIKI
    console.log("🎠 Memasang event listener untuk scroll gallery...");
    
    const scrollLeftBtn = document.getElementById('scrollLeftBtn');
    const scrollRightBtn = document.getElementById('scrollRightBtn');
    const gallery = document.getElementById('gallery');

    if (scrollLeftBtn) {
        scrollLeftBtn.addEventListener('click', scrollGalleryLeft);
        console.log("🎠 Event listener scroll kiri terpasang");
    } else {
        console.error("🎠 Tombol scroll kiri tidak ditemukan!");
    }

    if (scrollRightBtn) {
        scrollRightBtn.addEventListener('click', scrollGalleryRight);
        console.log("🎠 Event listener scroll kanan terpasang");
    } else {
        console.error("🎠 Tombol scroll kanan tidak ditemukan!");
    }

    if (gallery) {
        gallery.addEventListener('scroll', updateScrollButtons);
        console.log("🎠 Event listener scroll gallery terpasang");
        
        // 🎠 OBSERVER UNTUK DETEKSI PERUBAHAN GALLERY
        const galleryObserver = new MutationObserver(() => {
            setTimeout(updateScrollButtons, 100);
        });
        
        galleryObserver.observe(gallery, { 
            childList: true, 
            subtree: true 
        });
        console.log("🎠 Observer gallery terpasang");
    }
    
    // 🎠 INIT TOMBOL SCROLL PERTAMA KALI
    setTimeout(() => {
        updateScrollButtons();
        console.log("🎠 Inisialisasi tombol scroll selesai");
    }, 1000);
    
    console.log("✅ Gallery scroll system initialized");
    
    // ✅ PASTIKAN STATE AWAL SIDEBAR BENAR
    setTimeout(() => {
        updateSidebarState();
    }, 500);

    // ✅ AUTO LOGIN JIKA ADA SESSION
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIAfterLogin();
        updateDashboardStatus();
    }

    const editBtn = document.getElementById('editBtn');
    if (editBtn) {
        editBtn.addEventListener('click', openEditor);
        console.log("✅ Tombol Edit listener terpasang");
    }

    console.log("🎯 Semua event listener berhasil diinisialisasi");
    setTimeout(() => {
        updateEditButtonVisibility();
        console.log("✅ Tombol Edit diinisialisasi");
    }, 1000);
    
    const shareBtn = document.getElementById('shareBtn');
console.log("🔍 Tombol Share element:", shareBtn);

if (shareBtn) {
    shareBtn.addEventListener('click', function() {
        console.log("🎯 Tombol Share diklik!");
        
        // Gunakan fungsi dari share.js jika ada, atau tampilkan modal langsung
        if (typeof openShareModal === 'function') {
            openShareModal();
        } else {
            // Fallback: tampilkan modal langsung
            const modal = document.getElementById('multiShareModal');
            if (modal) {
                modal.style.display = 'flex';
            }
        }
    });
    console.log("✅ Tombol Share listener terpasang");
} else {
    console.error("❌ Tombol Share tidak ditemukan!");
}
});

// 🔥 UPDATE fungsi initializeShareModal di app.js
function initializeShareModal() {
    console.log("🔄 Menginisialisasi modal share...");
    
    // Pastikan galleryImages ada
    if (typeof galleryImages === 'undefined' || galleryImages.length === 0) {
        console.log("⚠ Gallery kosong");
        Swal.fire({
            title: '📭 Gallery Kosong',
            text: 'Belum ada foto atau video yang bisa dibagikan!',
            icon: 'warning',
            confirmButtonText: 'Mengerti'
        });
        return;
    }
    
    // Update counters
    document.getElementById('totalCount').textContent = galleryImages.length;
    document.getElementById('selectedCount').textContent = '0';
    
    // Reset form dengan nilai default
    document.getElementById('visitorName').value = '';
    document.getElementById('multiWhatsappNumber').value = '';
    document.getElementById('multiWhatsappMessage').value = `Hai! Ini hasil foto/video saya dari Photo Booth 🎉

Nama: #NAMA#
Total: #COUNT# file (#PHOTOS# foto + #VIDEOS# video)

Klik link di bawah untuk download:
#LINK#

Link berlaku 24 jam. Terima kasih! 📸`;
    
    // 🔥 PANGGIL FUNGSI UNTUK ISI FILE GRID
    if (typeof populateShareFileGrid === 'function') {
        populateShareFileGrid();
    } else {
        console.error("❌ Fungsi populateShareFileGrid tidak ditemukan!");
    }
}



// ===== ✅ SISTEM LOGIN DENGAN POPUP YANG SUDAH ADA =====

function showLoginMenu() {
    // ✅ PAKAI POPUP YANG SUDAH ADA - sama seperti alert/confirm
    Swal.fire({
        title: '🔐 Akses Photo Booth',
        text: 'Apakah Anda sudah punya akun?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '✅ Sudah Punya Akun',
        cancelButtonText: '📝 Belum Punya Akun',
        background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
        color: '#ffffff',
        confirmButtonColor: '#ff416c',
        cancelButtonColor: '#6c757d',
        width: '400px',
        padding: '1.2rem',
        customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            htmlContainer: 'custom-swal-text'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            showLoginForm();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            showRegisterForm();
        }
    });
}

function showLoginForm() {
    // ✅ PAKAI POPUP YANG SUDAH ADA untuk input login
    Swal.fire({
        title: '🔓 Login',
        html: `
            <div style="margin: 10px 0;">
                <input type="email" id="loginEmail" placeholder="Email" style="
                    width:100%; 
                    padding:12px; 
                    margin:8px 0; 
                    border-radius:8px; 
                    border:1px solid rgba(255,255,255,0.4); 
                    background:rgba(255,255,255,0.2); 
                    color:white;
                    font-size: 1rem;
                    box-sizing: border-box;
                ">
            </div>
            <div style="margin: 10px 0;">
                <input type="password" id="loginPassword" placeholder="Password" style="
                    width:100%; 
                    padding:12px; 
                    margin:8px 0; 
                    border-radius:8px; 
                    border:1px solid rgba(255,255,255,0.4); 
                    background:rgba(255,255,255,0.2); 
                    color:white;
                    font-size: 1rem;
                    box-sizing: border-box;
                ">
            </div>
        `,
        background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
        color: '#ffffff',
        confirmButtonText: 'Login',
        confirmButtonColor: '#ff416c',
        cancelButtonText: 'Kembali',
        showCancelButton: true,
        width: '400px',
        padding: '1.2rem',
        // ✅ TAMBAHKAN INI UNTUK HILANGKAN SCROLL
        heightAuto: false, // ✅ PENTING: Nonaktifkan auto height
        scrollbarPadding: false, // ✅ HILANGKAN PADDING SCROLLBAR
        customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            htmlContainer: 'custom-swal-text'
        },
        preConfirm: () => {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!email || !password) {
                Swal.showValidationMessage('Harap isi email dan password');
                return false;
            }
            
            return { email, password };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            processLogin(result.value.email, result.value.password);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            showLoginMenu();
        }
    });
}

function showRegisterForm() {
    // ✅ PAKAI POPUP YANG SUDAH ADA untuk input register
    Swal.fire({
        title: '📝 Daftar Akun Baru',
        html: `
            <div style="margin: 8px 0;">
                <input type="email" id="registerEmail" placeholder="Email" style="
                    width:100%; 
                    padding:12px; 
                    margin:6px 0; 
                    border-radius:8px; 
                    border:1px solid rgba(255,255,255,0.4); 
                    background:rgba(255,255,255,0.2); 
                    color:white;
                    font-size: 1rem;
                    box-sizing: border-box;
                ">
            </div>
            <div style="margin: 8px 0;">
                <input type="password" id="registerPassword" placeholder="Buat Password" style="
                    width:100%; 
                    padding:12px; 
                    margin:6px 0; 
                    border-radius:8px; 
                    border:1px solid rgba(255,255,255,0.4); 
                    background:rgba(255,255,255,0.2); 
                    color:white;
                    font-size: 1rem;
                    box-sizing: border-box;
                ">
            </div>
            <div style="margin: 8px 0;">
                <input type="password" id="confirmPassword" placeholder="Konfirmasi Password" style="
                    width:100%; 
                    padding:12px; 
                    margin:6px 0; 
                    border-radius:8px; 
                    border:1px solid rgba(255,255,255,0.4); 
                    background:rgba(255,255,255,0.2); 
                    color:white;
                    font-size: 1rem;
                    box-sizing: border-box;
                ">
            </div>
        `,
        background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
        color: '#ffffff',
        confirmButtonText: 'Daftar',
        confirmButtonColor: '#ff416c',
        cancelButtonText: 'Kembali',
        showCancelButton: true,
        width: '400px',
        padding: '1.2rem',
        // ✅ TAMBAHKAN INI UNTUK HILANGKAN SCROLL
        heightAuto: false, // ✅ PENTING: Nonaktifkan auto height
        scrollbarPadding: false, // ✅ HILANGKAN PADDING SCROLLBAR
        customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            htmlContainer: 'custom-swal-text'
        },
        preConfirm: () => {
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirm = document.getElementById('confirmPassword').value;
            
            if (!email || !password || !confirm) {
                Swal.showValidationMessage('Harap isi semua field');
                return false;
            }
            
            if (password !== confirm) {
                Swal.showValidationMessage('Password tidak cocok');
                return false;
            }
            
            return { email, password };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            processRegister(result.value.email, result.value.password);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            showLoginMenu();
        }
    });
}

function processLogin(email, password) {
    const userData = JSON.parse(localStorage.getItem('user_' + email));
    
    if (userData && userData.password === password) {
        currentUser = userData;
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // ✅ UPDATE DATA USER DENGAN STATUS TERBARU
        if (paketDuration > 0) {
            currentUser.paket = getPaketName(paketDuration);
            currentUser.waktuSisa = waktuSisa;
            localStorage.setItem('user_' + email, JSON.stringify(currentUser));
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        
        Swal.fire({
            title: '✅ Login Berhasil',
            text: 'Selamat datang!',
            icon: 'success',
            confirmButtonText: 'OK',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c',
            width: '400px',
            padding: '1.2rem',
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
                htmlContainer: 'custom-swal-text'
            }
        });
        
        updateUIAfterLogin();
    } else {
        Swal.fire({
            title: '❌ Login Gagal',
            text: 'Email atau password salah!',
            icon: 'error',
            confirmButtonText: 'Coba Lagi',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c',
            width: '400px',
            padding: '1.2rem',
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
                htmlContainer: 'custom-swal-text'
            }
        }).then(() => {
            showLoginForm();
        });
    }
}

// ✅ FUNGSI BANTU: DAPATKAN NAMA PAKET DARI DURASI
function getPaketName(duration) {
    if (duration === 3600) return 'Basic';
    if (duration === 7200) return 'Premium'; 
    if (duration === 10800) return 'VIP';
    return null;
}

function processRegister(email, password) {
    if (localStorage.getItem('user_' + email)) {
        // ✅ PAKAI POPUP YANG SUDAH ADA untuk error
        Swal.fire({
            title: '❌ Pendaftaran Gagal',
            text: 'Email sudah terdaftar!',
            icon: 'error',
            confirmButtonText: 'Coba Lagi',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c',
            width: '400px',
            padding: '1.2rem',
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
                htmlContainer: 'custom-swal-text'
            }
        }).then(() => {
            showRegisterForm();
        });
        return;
    }
    
    const userData = {
        email: email,
        password: password,
        paket: null,
        waktuSisa: 0,
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('user_' + email, JSON.stringify(userData));
    
    // ✅ PAKAI POPUP YANG SUDAH ADA untuk sukses
    Swal.fire({
        title: '✅ Pendaftaran Berhasil',
        text: 'Silakan login dengan akun baru Anda!',
        icon: 'success',
        confirmButtonText: 'Login Sekarang',
        background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
        color: '#ffffff',
        confirmButtonColor: '#ff416c',
        width: '400px',
        padding: '1.2rem',
        customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            htmlContainer: 'custom-swal-text'
        }
    }).then(() => {
        showLoginForm();
    });
}

// ✅ EVENT LISTENER UNTUK MENU LOGIN
document.addEventListener('DOMContentLoaded', function() {
    const menuLogin = document.getElementById('menuLogin');
    if (menuLogin) {
        menuLogin.addEventListener('click', showLoginMenu);
    }
});

function updateUIAfterLogin() {
    if (currentUser) {
        // ✅ UBAH TAMPILAN MENU LOGIN JADI NAMA USER + ICON
        document.getElementById('menuLogin').innerHTML = `👤 ${currentUser.email}`;
        updateDashboardStatus();
        
        // ✅ UBAH EVENT LISTENER UNTUK MENU USER
        const menuLogin = document.getElementById('menuLogin');
        menuLogin.removeEventListener('click', showLoginMenu); // Hapus listener lama
        menuLogin.addEventListener('click', showUserMenu); // Tambah listener baru
    }
}

// ✅ FUNGSI BARU: MENU USER SETELAH LOGIN
function showUserMenu() {
    let statusText = 'Belum ada paket aktif';
    if (currentUser.paket && currentUser.waktuSisa > 0) {
        statusText = `Paket ${currentUser.paket} - Sisa waktu: ${formatTime(currentUser.waktuSisa)}`;
    } else if (currentUser.paket) {
        statusText = `Paket ${currentUser.paket} - Menunggu pembayaran`;
    }
    
    Swal.fire({
        title: `👤 ${currentUser.email}`,
        text: statusText,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: '🚪 Logout',
        cancelButtonText: '✖ Batal',
        background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
        color: '#ffffff',
        confirmButtonColor: '#ff416c',
        cancelButtonColor: '#6c757d',
        width: '400px',
        padding: '1.2rem',
        customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            htmlContainer: 'custom-swal-text'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            processLogout();
        }
    });
}

// ✅ FUNGSI BARU: PROSES LOGOUT
function processLogout() {
    // Hapus data user dari localStorage
    localStorage.removeItem('currentUser');
    currentUser = null;
    
    // ✅ KEMBALIKAN TAMPILAN MENU LOGIN
    document.getElementById('menuLogin').innerHTML = '🔐 Login/Register';
    
    // ✅ KEMBALIKAN EVENT LISTENER UNTUK LOGIN
    const menuLogin = document.getElementById('menuLogin');
    menuLogin.removeEventListener('click', showUserMenu); // Hapus listener user
    menuLogin.addEventListener('click', showLoginMenu); // Tambah listener login
    
    // ✅ TAMPILKAN POPUP LOGOUT BERHASIL
    Swal.fire({
        title: '✅ Logout Berhasil',
        text: 'Anda telah keluar dari akun.',
        icon: 'success',
        confirmButtonText: 'OK',
        background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
        color: '#ffffff',
        confirmButtonColor: '#ff416c',
        width: '400px',
        padding: '1.2rem',
        customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            htmlContainer: 'custom-swal-text'
        }
    }).then(() => {
        // ✅ OTOMATIS KE HALAMAN UTAMA
        showSection('dashboard');
        
        // ✅ RESET STATUS PEMBAYARAN & PAKET
        paketActive = false;
        pembayaranVerified = false;
        paketDuration = 0;
        waktuSisa = 0;
        
        // ✅ UPDATE DASHBOARD
        updateDashboardStatus();
        
        // ✅ MATIKAN KAMERA JIKA SEDANG AKTIF
        if (stream) {
            stopCamera();
        }
        
        currentIndex = 0;
    });
}

// ✅ MODIFIKASI AUTO LOGIN SAAT PAGE LOAD
window.addEventListener('load', function() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        
        // ✅ LOAD DATA PAKET DARI USER PROFILE JIKA ADA
        if (currentUser.paket && currentUser.waktuSisa > 0) {
            paketActive = true;
            pembayaranVerified = true;
            paketDuration = currentUser.paketDuration || 0;
            waktuSisa = currentUser.waktuSisa || 0;
            
            console.log('✅ Load paket dari user:', currentUser.paket, 'Sisa waktu:', waktuSisa);
        }
        
        // ✅ PASTIKAN EVENT LISTENER SESUAI STATUS LOGIN
        const menuLogin = document.getElementById('menuLogin');
        if (currentUser) {
            menuLogin.removeEventListener('click', showLoginMenu);
            menuLogin.addEventListener('click', showUserMenu);
        } else {
            menuLogin.removeEventListener('click', showUserMenu);
            menuLogin.addEventListener('click', showLoginMenu);
        }
        
        updateUIAfterLogin();
        updateDashboardStatus(); // ✅ UPDATE DASHBOARD DENGAN DATA PAKET
    }
});

// ===== ✅ FUNGSI BARU: UPDATE STATUS DI DASHBOARD =====
function updateDashboardStatus() {
    const statusDiv = document.getElementById('statusPembayaran');
    if (!statusDiv) return;

    // ✅ CEK DATA PAKET DARI USER PROFILE
    if (currentUser && currentUser.paket === "Trial" && currentUser.waktuSisa > 0) {
        // ✅ PAKET TRIAL AKTIF (TANPA STATUS PEMBAYARAN)
        statusDiv.innerHTML = `
            <div style="background:rgba(76, 175, 80, 0.2); border:2px solid #4CAF50; padding:15px; border-radius:10px;">
                <h3>🎯 PAKET TRIAL AKTIF</h3>
                <p>Anda sedang menggunakan paket Trial. Silakan masuk ke Photo Booth.</p>
                <p><strong>Sisa waktu: <span id="statusTimer">${formatTime(currentUser.waktuSisa)}</span></strong></p>
                <p><strong>Foto: ${currentUser.fotoTerambil || 0}/${currentUser.paketFotoLimit} | Video: ${currentUser.videoTerambil || 0}/${currentUser.paketVideoLimit}</strong></p>
            </div>
        `;
        statusDiv.style.display = 'block';
        
    } else if (currentUser && currentUser.pembayaranVerified && currentUser.waktuSisa > 0) {
        // ✅ SUDAH BAYAR & PAKET AKTIF (BAYAR)
        statusDiv.innerHTML = `
            <div style="background:rgba(0,255,0,0.1); border:2px solid #00ff00; padding:15px; border-radius:10px;">
                <h3>✅ PAKET AKTIF - ${currentUser.paket}</h3>
                <p>Pembayaran telah diverifikasi. Anda dapat menggunakan Photo Booth.</p>
                <p><strong>Sisa waktu: <span id="statusTimer">${formatTime(currentUser.waktuSisa)}</span></strong></p>
            </div>
        `;
        statusDiv.style.display = 'block';
        
    } else if (currentUser && currentUser.paket && !currentUser.pembayaranVerified && currentUser.paket !== "Trial") {
        // ✅ SUDAH PILIH PAKET BAYAR TAPI BELUM BAYAR
        statusDiv.innerHTML = `
            <div style="background:rgba(255,255,0,0.1); border:2px solid #ffff00; padding:15px; border-radius:10px;">
                <h3>⚠ MENUNGGU PEMBAYARAN - ${currentUser.paket}</h3>
                <p>Anda sudah memilih paket ${currentUser.paket}. Silakan lakukan pembayaran untuk mengaktifkan Photo Booth.</p>
            </div>
        `;
        statusDiv.style.display = 'block';
        
    } else {
        // ❌ BELUM PILIH PAKET ATAU SUDAH SELESAI
        statusDiv.style.display = 'none';
    }
}

function updateTrialCounter() {
    if (currentUser && currentUser.paket === "Trial") {
        const fotoCounter = document.getElementById('fotoCounter');
        const videoCounter = document.getElementById('videoCounter');
        
        if (fotoCounter) {
            fotoCounter.textContent = `${currentUser.fotoTerambil || 0}/${currentUser.paketFotoLimit}`;
        }
        if (videoCounter) {
            videoCounter.textContent = `${currentUser.videoTerambil || 0}/${currentUser.paketVideoLimit}`;
        }
    }
}

// ✅ FUNGSI BARU: UPDATE COUNTER UNTUK SEMUA PAKET
function updatePackageCounter() {
    if (currentUser && currentUser.paket) {
        const fotoCounter = document.getElementById('fotoCounter');
        const videoCounter = document.getElementById('videoCounter');
        
        if (fotoCounter) {
            fotoCounter.textContent = `${currentUser.fotoTerambil || 0}/${currentUser.paketFotoLimit}`;
        }
        if (videoCounter) {
            videoCounter.textContent = `${currentUser.videoTerambil || 0}/${currentUser.paketVideoLimit}`;
        }
        
        // ✅ UPDATE JUGA DI DASHBOARD JIKA ADA
        updateDashboardStatus();
    }
}

function loadUserGallery() {
    if (currentUser && currentUser.gallery && currentUser.gallery.length > 0) {
        galleryImages = [];
        gallery.innerHTML = "";
        console.log("🔄 Loading gallery dari storage:", currentUser.gallery.length + " items");

        currentUser.gallery.forEach((item, index) => {
            // VALIDASI DATA SEBELUM LOAD
            if (!item || !item.data || !item.id) {
                console.warn("⚠ Item gallery corrupt, skip:", item);
                return;
            }

            galleryImages.push(item);

            if (item.type === 'photo') {
                const thumb = document.createElement('img');
                thumb.className = "thumb";
                thumb.src = item.data;
                thumb.setAttribute('data-id', item.id);
                thumb.onclick = () => {
                    currentIndex = index;
                    showingPhoto = true;
                    showOnCamera(index);
                };

                // 🎯 STYLE YANG SAMA
                thumb.style.width = "140px";
                thumb.style.height = "105px";
                thumb.style.objectFit = "cover";
                thumb.style.borderRadius = "12px";
                thumb.style.flexShrink = "0";
                thumb.style.display = "block";

                gallery.appendChild(thumb);
            } else if (item.type === 'video') {
                // VIDEO: PASTIKAN DATA MASIH VALID
                if (item.data && (item.data.startsWith('data:') || item.data.startsWith('blob:'))) {
                    const videoContainer = document.createElement('div');
                    videoContainer.style.position = 'relative';
                    videoContainer.style.display = 'inline-block';
                    videoContainer.setAttribute('data-id', item.id);

                    videoContainer.style.width = "100px";
                    videoContainer.style.height = "75px";
                    videoContainer.style.borderRadius = "18px";
                    videoContainer.style.overflow = "hidden"; // ✅ PENTING!
                    videoContainer.style.flexShrink = "0"; // ✅ AGAR TIDAK TERSEBAR

                    const vid = document.createElement('video');
                    vid.src = item.data;
                    vid.className = "thumb";
                    vid.muted = true;
                    vid.loop = true;
                    vid.autoplay = true;
                    vid.style.transform = "scaleX(1)";
                    vid.controls = false;

                    vid.style.width = "100%";
                    vid.style.height = "100%";
                    vid.style.objectFit = "cover"; // ✅ INI YANG MEMPERBAIKI!
                    vid.style.borderRadius = "18px";

                    const controlsOverlay = document.createElement('div');
                    controlsOverlay.style.position = 'absolute';
                    controlsOverlay.style.bottom = '5px';
                    controlsOverlay.style.left = '5px';
                    controlsOverlay.style.right = '5px';
                    controlsOverlay.style.background = 'rgba(0,0,0,0.7)';
                    controlsOverlay.style.borderRadius = '10px';
                    controlsOverlay.style.padding = '5px';
                    controlsOverlay.style.display = 'flex';
                    controlsOverlay.style.alignItems = 'center';
                    controlsOverlay.style.gap = '8px';
                    controlsOverlay.style.fontSize = '10px';
                    controlsOverlay.style.color = 'white';

                    const playBtn = document.createElement('button');
                    playBtn.innerHTML = '▶';
                    playBtn.style.background = 'none';
                    playBtn.style.border = 'none';
                    playBtn.style.color = 'white';
                    playBtn.style.cursor = 'pointer';
                    playBtn.style.fontSize = '12px';

                    const timeDisplay = document.createElement('span');
                    timeDisplay.textContent = '0:00';

                    controlsOverlay.appendChild(playBtn);
                    controlsOverlay.appendChild(timeDisplay);

                    videoContainer.appendChild(vid);
                    videoContainer.appendChild(controlsOverlay);

                    playBtn.onclick = (e) => {
                        e.stopPropagation();
                        if (vid.paused) {
                            vid.play();
                            playBtn.innerHTML = '❚❚';
                        } else {
                            vid.pause();
                            playBtn.innerHTML = '▶';
                        }
                    };

                    vid.ontimeupdate = () => {
                        const minutes = Math.floor(vid.currentTime / 60);
                        const seconds = Math.floor(vid.currentTime % 60);
                        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                    };

                    videoContainer.onclick = () => {
                        currentIndex = index;
                        showVideoOnCamera(item.data, true);
                    };

                    gallery.appendChild(videoContainer);
                } else {
                    console.warn("⏰ Video data invalid, skip:", item.id);
                }
            }
        });

         // 🎯 SCROLL KE FOTO TERBARU DENGAN PRESISI
        setTimeout(() => {
            const gallery = document.getElementById('gallery');
            if (gallery && gallery.children.length > 0) {
                const maxScroll = gallery.scrollWidth - gallery.clientWidth;
                gallery.scrollTo({
                    left: maxScroll,
                    behavior: 'auto'
                });
                
                updateScrollButtons();
                console.log('🎠 Load gallery - scroll ke terbaru:', maxScroll);
            }
            updateEditButtonVisibility();
        }, 500);
    }
}
// ✅ FUNGSI KONVERSI BLOB KE BASE64
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// ✅ FUNGSI BARU: CLEANUP LOCALSTORAGE JIKA QUOTA PENUH
function cleanupLocalStorage() {
    try {
        // ✅ HAPUS GALLERY DATA YANG LAMA UNTUK FREE UP SPACE
        if (currentUser && currentUser.gallery) {
            // SIMPAN HANYA 10 ITEM TERBARU (bukan 5)
            if (currentUser.gallery.length > 10) {
                currentUser.gallery = currentUser.gallery.slice(-10);
                
                // ✅ UPDATE JUGA galleryImages
                galleryImages = [...currentUser.gallery];
                
                localStorage.setItem('user_' + currentUser.email, JSON.stringify(currentUser));
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                console.log(" 🔧 Cleanup gallery: hanya simpan 10 item terbaru");
                
                // ✅ RELOAD GALLERY SETELAH CLEANUP
                loadUserGallery();
            }
        }
    } catch (e) {
        console.error(" ❌ Gagal cleanup localStorage:", e);
    }
}

// ✅ FUNGSI UNTUK PETUNJUK PENGGUNAAN
function showPetunjukPenggunaan() {
    const modal = document.getElementById('petunjukModal');
    modal.style.display = 'flex';
    
    // Reset ke tab pertama
    switchTab('panduan-cepat');
}

function tutupPetunjuk() {
    const modal = document.getElementById('petunjukModal');
    modal.style.display = 'none';
    closeSidebar();
}

function switchTab(tabName) {
    // Remove active class dari semua tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Remove active class dari semua tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Add active class ke tab yang diklik
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// ✅ EVENT LISTENER UNTUK TUTUP MODAL
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('petunjukModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', tutupPetunjuk);
    }
    
    // Tutup modal kalau klik di luar content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            tutupPetunjuk();
        }
    });
    
    // Event listener untuk tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
});

//  FUNGSI BARU: UPDATE POSISI DOWNLOAD BUTTON UNTUK RESPONSIVE
function updateDownloadButtonPosition() {
    const downloadSection = document.getElementById('download-section');
    const gallery = document.getElementById('gallery');
    
    if (downloadSection && gallery) {
        const galleryRect = gallery.getBoundingClientRect();
        
        // Jika gallery ada konten, posisikan di samping gallery
        if (gallery.children.length > 0) {
            downloadSection.style.bottom = '30px';
            downloadSection.style.right = '20px';
        } else {
            downloadSection.style.bottom = '30px';
            downloadSection.style.right = '20px';
        }
    }
}

// 🎠 FUNGSI SCROLL GALLERY YANG PRESISI
function scrollGalleryLeft() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    
    // 🎯 HITUNG POSISI YANG PRESISI
    const thumbWidth = 140; // width thumbnail
    const gap = 15; // gap antara thumbnail
    const thumbWithGap = thumbWidth + gap;
    
    // 🎯 SCROLL KE THUMBNAIL SEBELUMNYA YANG UTUH
    const currentScroll = gallery.scrollLeft;
    const targetScroll = Math.floor(currentScroll / thumbWithGap) * thumbWithGap - thumbWithGap;
    
    gallery.scrollTo({
        left: Math.max(0, targetScroll), // 🎯 PASTIKAN TIDAK KURANG DARI 0
        behavior: 'smooth'
    });
    
    console.log('← Scroll kiri presisi:', { 
        from: currentScroll, 
        to: Math.max(0, targetScroll),
        thumbWidth: thumbWithGap
    });
    
    // UPDATE TOMBOL SETELAH SCROLL
    setTimeout(updateScrollButtons, 400);
}

// 🎠 FUNGSI SCROLL GALLERY YANG SIMPLE
function scrollGalleryLeft() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    
    // 🎯 SCROLL 1 THUMBNAIL + GAP KE KIRI
    const scrollAmount = 140 + 15; // width + gap
    
    gallery.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
    
    console.log('← Scroll kiri:', scrollAmount + 'px');
    
    // 🎯 UPDATE TOMBOL SETELAH SCROLL SELESAI
    setTimeout(updateScrollButtons, 500);
}

function scrollGalleryRight() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    
    // 🎯 SCROLL 1 THUMBNAIL + GAP KE KANAN
    const scrollAmount = 140 + 15; // width + gap
    
    gallery.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
    
    console.log('→ Scroll kanan:', scrollAmount + 'px');
    
    // 🎯 UPDATE TOMBOL SETELAH SCROLL SELESAI
    setTimeout(updateScrollButtons, 500);
}

// 🎠 FUNGSI UPDATE TOMBOL SCROLL YANG SUPER SIMPLE
function updateScrollButtons() {
    const gallery = document.getElementById('gallery');
    const scrollLeftBtn = document.getElementById('scrollLeftBtn');
    const scrollRightBtn = document.getElementById('scrollRightBtn');

    if (!gallery || !scrollLeftBtn || !scrollRightBtn) {
        return;
    }

    const totalItems = gallery.children.length;
    
    // 🎯 LOGIKA SANGAT SIMPLE:
    // - Tombol kiri: tampil jika BUKAN di posisi paling kiri
    // - Tombol kanan: tampil jika BUKAN di posisi paling kanan
    
    const isAtStart = gallery.scrollLeft <= 5;
    const isAtEnd = gallery.scrollLeft >= (gallery.scrollWidth - gallery.clientWidth - 5);
    
    console.log('🎠 Posisi Scroll:', {
        scrollLeft: gallery.scrollLeft,
        scrollWidth: gallery.scrollWidth,
        clientWidth: gallery.clientWidth,
        isAtStart: isAtStart,
        isAtEnd: isAtEnd,
        totalItems: totalItems
    });

    // 🎯 TAMPILKAN TOMBOL HANYA JIKA ADA LEBIH DARI 3 ITEM
    if (totalItems > 3) {
        scrollLeftBtn.style.display = isAtStart ? 'none' : 'flex';
        scrollRightBtn.style.display = isAtEnd ? 'none' : 'flex';
        
        console.log('🎠 Status Tombol:', {
            kiri: isAtStart ? 'HIDDEN' : 'SHOW',
            kanan: isAtEnd ? 'HIDDEN' : 'SHOW'
        });
    } else {
        // 🎯 JIKA KURANG DARI 4 ITEM, SEMBUNYIKAN SEMUA TOMBOL
        scrollLeftBtn.style.display = 'none';
        scrollRightBtn.style.display = 'none';
        console.log('🎠 Tombol disembunyikan - kurang dari 4 item');
    }
}

// 🎠 FUNGSI UNTUK MEMASTIKAN THUMBNAIL TERTATA DENGAN BAIK
function limitVisibleThumbnails() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    
    const thumbs = gallery.children;
    const maxVisible = 8; // Maksimal thumbnail yang disimpan
    
    if (thumbs.length > maxVisible) {
        // Hapus thumbnail terlama (yang paling kiri)
        for (let i = 0; i < thumbs.length - maxVisible; i++) {
            if (thumbs[0]) {
                thumbs[0].remove();
            }
        }
        console.log(`🎠 Dibersihkan ${thumbs.length - maxVisible} thumbnail terlama`);
    }
    
    updateScrollButtons();
}

// 🎯 EVENT LISTENER UNTUK SCROLL REAL-TIME
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    if (gallery) {
        // 🎯 UPDATE TOMBOL SAAT USER SCROLL MANUAL
        gallery.addEventListener('scroll', function() {
            // 🎯 GUNAKAN DEBOUNCE UNTUK PERFORMANCE
            clearTimeout(gallery.scrollTimeout);
            gallery.scrollTimeout = setTimeout(updateScrollButtons, 50);
        });
    }
});

// FUNGSI UPDATE VISIBILITY & STATE TOMBOL EDIT
function updateEditButtonVisibility() {
    const editBtn = document.getElementById('editBtn');
    if (!editBtn) return;
    
    // SELALU TAMPIL, tapi disable jika tidak ada item yang aktif
    const hasActiveItem = galleryImages.length > 0 && currentIndex >= 0 && currentIndex < galleryImages.length;
    
    if (hasActiveItem) {
        editBtn.style.opacity = "1";
        editBtn.title = "Edit foto/video yang sedang ditampilkan";
    } else {
        editBtn.style.opacity = "0.7";
        editBtn.title = "Pilih foto/video terlebih dahulu untuk diedit";
    }
}

// FUNGSI BUKA EDITOR (MODIFIED DENGAN VALIDASI)
function openEditor() {
    // Validasi: harus ada item yang aktif (sedang ditampilkan di kamera)
    if (galleryImages.length === 0) {
        Swal.fire({
            title: '⚠ Belum Ada Foto/Video',
            text: 'Anda belum mengambil foto atau video. Silakan ambil foto/video terlebih dahulu!',
            icon: 'warning',
            confirmButtonText: 'Mengerti',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c'
        });
        return;
    }
    
    // Validasi: harus ada item yang sedang dipilih/ditampilkan
    if (currentIndex < 0 || currentIndex >= galleryImages.length) {
        Swal.fire({
            title: '📷 Pilih Foto/Video',
            text: 'Silakan pilih foto/video dari gallery untuk diedit',
            icon: 'info',
            confirmButtonText: 'Mengerti',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c'
        });
        return;
    }
    
    editingIndex = currentIndex;
    editingItem = galleryImages[currentIndex];
    originalData = editingItem.data;
    
    const editorModal = document.getElementById('editorModal');
    const editingImage = document.getElementById('editingImage');
    const editingVideo = document.getElementById('editingVideo');
    
    // Reset controls ke nilai original
    document.getElementById('editorFilterSelect').value = editingItem.filter || 'none';
    document.getElementById('editorFrameSelect').value = editingItem.frame || '';
    
    // Tampilkan item yang sesuai (foto/video)
    if (editingItem.type === 'photo') {
        editingImage.src = originalData;
        editingImage.style.display = 'block';
        editingVideo.style.display = 'none';
        updateEditorPreview();
        document.getElementById('editorFilterSelect').disabled = false;
    } else if (editingItem.type === 'video') {
        editingVideo.src = originalData;
        editingVideo.style.display = 'block';
        editingImage.style.display = 'none';
        // Untuk video, kita hanya bisa apply frame (filter tidak bisa)
        document.getElementById('editorFilterSelect').disabled = true;
    }
    
    editorModal.style.display = 'flex';
}

// FUNGSI TUTUP EDITOR
function closeEditor() {
    document.getElementById('editorModal').style.display = 'none';
    editingItem = null;
    editingIndex = -1;
    originalData = null;
    document.getElementById('editorFilterSelect').disabled = false;
}

// UPDATE PREVIEW REAL-TIME
function updateEditorPreview() {
    const filter = document.getElementById('editorFilterSelect').value;
    const frame = document.getElementById('editorFrameSelect').value;
    const editingImage = document.getElementById('editingImage');
    
    // Apply filter ke preview
    editingImage.style.filter = filter;
    
    // Untuk frame, kita akan apply saat save (karena lebih complex)
}

// APPLY CHANGES KE ITEM ASLI
async function applyEditorChanges() {
    if (!editingItem) return;
    
    const filter = document.getElementById('editorFilterSelect').value;
    const frame = document.getElementById('editorFrameSelect').value;
    
    if (editingItem.type === 'photo') {
        // Process photo dengan filter dan frame
        const processedData = await processImageWithFilterAndFrame(originalData, filter, frame);
        
        // Update item di gallery
        editingItem.data = processedData;
        editingItem.frame = frame;
        editingItem.filter = filter;
        
        // Update thumbnail
        const thumb = document.querySelector(`[data-id="${editingItem.id}"]`);
        if (thumb) {
            thumb.src = processedData;
        }
        
    } else if (editingItem.type === 'video') {
        // Untuk video, hanya bisa apply frame (metadata)
        editingItem.frame = frame;
    }
    
    // Update di user data
    if (currentUser) {
        const itemIndex = currentUser.gallery.findIndex(item => item.id === editingItem.id);
        if (itemIndex !== -1) {
            currentUser.gallery[itemIndex] = editingItem;
            enhancedSaveUserData();
        }
    }
    
    showFeedback("✅ Perubahan berhasil diapply!");
    closeEditor();
}

// SAVE AS NEW COPY
async function saveAsNewCopy() {
    if (!editingItem) return;
    
    const filter = document.getElementById('editorFilterSelect').value;
    const frame = document.getElementById('editorFrameSelect').value;
    
    if (editingItem.type === 'photo') {
        const processedData = await processImageWithFilterAndFrame(originalData, filter, frame);
        
        // Buat item baru
        const newItem = {
            id: 'photo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            data: processedData,
            type: 'photo',
            frame: frame,
            filter: filter,
            timestamp: new Date().toISOString(),
            storageType: 'base64',
            compressed: true
        };
        
        // Tambah ke gallery
        galleryImages.push(newItem);
        addToGallery(newItem.data); // Gunakan fungsi existing
        
    } else if (editingItem.type === 'video') {
        // Untuk video, buat copy metadata
        const newItem = {
            ...editingItem,
            id: 'video_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            frame: frame,
            timestamp: new Date().toISOString()
        };
        
        galleryImages.push(newItem);
        addVideoToGallery(newItem.data);
    }
    
    showFeedback("✅ Disimpan sebagai copy baru!");
    closeEditor();
}

// PROCESS IMAGE DENGAN FILTER DAN FRAME
function processImageWithFilterAndFrame(imageData, filter, frame) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = imageData;
        
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Apply filter
            ctx.filter = filter;
            ctx.drawImage(img, 0, 0);
            
            // Apply frame jika ada
            if (frame) {
                const frameImg = new Image();
                frameImg.src = frame;
                frameImg.onload = function() {
                    ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/png'));
                };
                frameImg.onerror = function() {
                    // Jika frame gagal load, tetap simpan dengan filter
                    resolve(canvas.toDataURL('image/png'));
                };
            } else {
                resolve(canvas.toDataURL('image/png'));
            }
        };
        
        img.onerror = function() {
            // Fallback ke data original
            resolve(imageData);
        };
    });
}

// FUNGSI DOWNLOAD SEMUA FOTO/VIDEO SEBAGAI ZIP (MODIFIED)
async function downloadAllAsZip() {
    if (galleryImages.length === 0) {
        Swal.fire({
            title: '📭 Gallery Kosong',
            text: 'Belum ada foto atau video yang bisa didownload!',
            icon: 'warning',
            confirmButtonText: 'Mengerti',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c'
        });
        return;
    }

    // Tampilkan loading
    Swal.fire({
        title: '📦 Membuat ZIP File...',
        text: `Mengumpulkan ${galleryImages.length} item...`,
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
        color: '#ffffff'
    });

    try {
        const zip = new JSZip();
        const photosFolder = zip.folder("photo-booth-results");
        
        let processedItems = 0;

        // Process semua item di gallery
        for (let i = 0; i < galleryImages.length; i++) {
            const item = galleryImages[i];
            const timestamp = new Date(item.timestamp).toISOString().replace(/[:.]/g, '-');
            
            if (item.type === 'photo') {
                // Convert base64 to blob
                const base64Data = item.data.split(',')[1];
                const blob = base64ToBlob(base64Data, 'image/png');
                photosFolder.file(`foto-${timestamp}.png`, blob);
                
            } else if (item.type === 'video' && item.data.startsWith('blob:')) {
                // Convert blob URL to actual blob
                const blob = await fetch(item.data).then(r => r.blob());
                photosFolder.file(`video-${timestamp}.webm`, blob);
            }
            
            processedItems++;
            
            // Update progress
            if (processedItems % 3 === 0) {
                Swal.update({
                    text: `Memproses ${processedItems}/${galleryImages.length} item...`
                });
            }
        }

        // Generate ZIP file
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        
        // Download ZIP
        const filename = `photo-booth-results-${new Date().getTime()}.zip`;
        saveAs(zipBlob, filename);
        
        // Tutup loading
        Swal.close();
        
        // TUNGGU sampai file benar-benar tersimpan, BARU tampilkan modal share
        setTimeout(() => {
            showShareModalAfterSave(galleryImages.length, filename);
        }, 2000); // Beri waktu 2 detik untuk proses save
        
        showFeedback(`✅ ${galleryImages.length} item berhasil didownload!`);

    } catch (error) {
        console.error('Error creating ZIP:', error);
        Swal.fire({
            title: '❌ Gagal Download',
            text: 'Terjadi error saat membuat file ZIP!',
            icon: 'error',
            confirmButtonText: 'Mengerti',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c'
        });
    }
}

// FUNGSI CONVERT BASE64 TO BLOB
function base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    
    return new Blob(byteArrays, { type: mimeType });
}


