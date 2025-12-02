// share.js - VERSI SEDERHANA
console.log("✅ share.js loaded");

let selectedFiles = [];

// 🔥 FUNGSI UNTUK BUKA MODAL
function openShareModal() {
    console.log("🎯 Membuka modal share...");
    
    // Cek jika ada foto/video
    if (typeof galleryImages === 'undefined' || galleryImages.length === 0) {
        Swal.fire({
            title: '📭 Gallery Kosong',
            text: 'Belum ada foto atau video yang bisa dibagikan!',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return;
    }
    
    // Reset selection
    selectedFiles = [];
    
    // Update counter
    document.getElementById('totalCount').textContent = galleryImages.length;
    document.getElementById('selectedCount').textContent = '0';
    
    // Isi file grid
    fillFileGrid();
    
    // Reset form
    document.getElementById('visitorName').value = '';
    document.getElementById('multiWhatsappNumber').value = '';
    
    // Tampilkan modal
    document.getElementById('multiShareModal').style.display = 'flex';
    
    console.log(`✅ Modal ditampilkan dengan ${galleryImages.length} file`);
}

// 🔥 FUNGSI ISI GRID FILE
function fillFileGrid() {
    const grid = document.getElementById('shareFileGrid');
    grid.innerHTML = '';
    
    galleryImages.forEach((item, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.style.cssText = `
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.3s;
        `;
        
        let previewHtml = '';
        if (item.type === 'photo') {
            previewHtml = `<img src="${item.data}" style="width: 100%; height: 80px; object-fit: cover;" alt="Foto">`;
        } else {
            previewHtml = `<video src="${item.data}" style="width: 100%; height: 80px; object-fit: cover;" muted></video>`;
        }
        
        fileItem.innerHTML = `
            ${previewHtml}
            <div style="position: absolute; top: 5px; right: 5px; background: rgba(0,0,0,0.7); color: white; padding: 2px 5px; border-radius: 3px; font-size: 12px;">
                ${item.type === 'photo' ? '📸' : '🎥'}
            </div>
            <div class="checkmark" style="position: absolute; top: 5px; left: 5px; background: #25D366; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; opacity: 0; transform: scale(0.5); transition: all 0.3s;">
                ✓
            </div>
        `;
        
        // Click event
        fileItem.addEventListener('click', function() {
            toggleSelection(index, this);
        });
        
        grid.appendChild(fileItem);
    });
}

// 🔥 FUNGSI TOGGLE SELECTION
function toggleSelection(index, element) {
    const checkmark = element.querySelector('.checkmark');
    const isSelected = selectedFiles.includes(index);
    
    if (isSelected) {
        // Hapus dari selection
        selectedFiles = selectedFiles.filter(i => i !== index);
        element.style.borderColor = 'transparent';
        checkmark.style.opacity = '0';
        checkmark.style.transform = 'scale(0.5)';
    } else {
        // Tambah ke selection
        selectedFiles.push(index);
        element.style.borderColor = '#25D366';
        element.style.boxShadow = '0 0 10px rgba(37, 211, 102, 0.5)';
        checkmark.style.opacity = '1';
        checkmark.style.transform = 'scale(1)';
    }
    
    // Update counter
    document.getElementById('selectedCount').textContent = selectedFiles.length;
}

// 🔥 FUNGSI SELECT ALL
function selectAll() {
    console.log("✅ Memilih semua file...");
    
    const allItems = document.querySelectorAll('.file-item');
    selectedFiles = [];
    
    allItems.forEach((item, index) => {
        selectedFiles.push(index);
        item.style.borderColor = '#25D366';
        item.style.boxShadow = '0 0 10px rgba(37, 211, 102, 0.5)';
        
        const checkmark = item.querySelector('.checkmark');
        checkmark.style.opacity = '1';
        checkmark.style.transform = 'scale(1)';
    });
    
    document.getElementById('selectedCount').textContent = selectedFiles.length;
}

async function sendToWhatsApp() {
    console.log("📤 Mengirim ke WhatsApp...");
    
    // Ambil data form
    const visitorName = document.getElementById('visitorName').value.trim();
    const phoneNumber = document.getElementById('multiWhatsappNumber').value.trim();
    const message = document.getElementById('multiWhatsappMessage').value.trim();
    
    // 🔥 VALIDASI 1: NAMA
    if (!visitorName) {
        Swal.fire({
            title: '👤 Nama Belum Diisi!',
            html: 'Silakan masukkan <strong>nama Anda</strong> di kolom "Nama Pengunjung"',
            icon: 'warning',
            confirmButtonText: 'OK',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c',
            customClass: {
                popup: 'swal-front',
                container: 'swal-container-front'
            }
        });
        document.getElementById('visitorName').focus();
        return;
    }
    
    // 🔥 VALIDASI 2: NOMOR WHATSAPP
    if (!phoneNumber) {
        Swal.fire({
            title: '📱 Nomor WhatsApp Kosong!',
            html: 'Silakan masukkan <strong>nomor WhatsApp</strong> Anda<br><small>Contoh: 6281234567890</small>',
            icon: 'warning',
            confirmButtonText: 'OK',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c',
            customClass: {
                popup: 'swal-front',
                container: 'swal-container-front'

            }
        });
        document.getElementById('multiWhatsappNumber').focus();
        return;
    }
    
    // 🔥 VALIDASI 3: FILE TERPILIH
    if (selectedFiles.length === 0) {
        Swal.fire({
            title: '📭 Belum Memilih File!',
            html: 'Silakan pilih <strong>minimal 1 foto atau video</strong> yang ingin dikirim',
            icon: 'warning',
            confirmButtonText: 'Pilih File',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c',
            customClass: {
                popup: 'swal-front',
                container: 'swal-container-front'
            }
        });
        return;
    }
    
    // Format nomor
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    
    // 🔥 VALIDASI 4: FORMAT NOMOR
    if (formattedNumber.length < 10 || !formattedNumber.startsWith('62')) {
        Swal.fire({
            title: '❌ Format Nomor Salah!',
            html: 'Format nomor WhatsApp tidak valid!<br><br>'
                + '<strong>Contoh format yang benar:</strong><br>'
                + '• 6281234567890<br>'
                + '• 628987654321<br><br>'
                + '<small>Harus dimulai dengan 62 (kode Indonesia)</small>',
            icon: 'error',
            confirmButtonText: 'Perbaiki',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c',
            customClass: {
                popup: 'swal-front',
                container: 'swal-container-front'

            }
        });
        document.getElementById('multiWhatsappNumber').focus();
        document.getElementById('multiWhatsappNumber').select();
        return;
    }
    
    // Hitung foto dan video
    const photoCount = selectedFiles.filter(idx => galleryImages[idx].type === 'photo').length;
    const videoCount = selectedFiles.filter(idx => galleryImages[idx].type === 'video').length;
    
    // Buat download link
    const downloadLink = await createDownloadLink(visitorName);
    
    // Format pesan
    const formattedMessage = message
        .replace(/#NAMA#/g, visitorName)
        .replace(/#COUNT#/g, selectedFiles.length)
        .replace(/#PHOTOS#/g, photoCount)
        .replace(/#VIDEOS#/g, videoCount)
        .replace(/#LINK#/g, downloadLink);
    
    // Kirim ke WhatsApp
    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    
    // Tampilkan loading
    Swal.fire({
        title: 'Mengirim...',
        html: `Mengirim ${selectedFiles.length} file ke ${visitorName}`,
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false
    });
    
    // Buka WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Tunggu 2 detik
    setTimeout(() => {
        Swal.close();
        // Tampilkan notifikasi
        Swal.fire({
            title: '✅ Berhasil!',
            text: `Pesan terkirim ke ${visitorName}`,
            icon: 'success',
            confirmButtonText: 'OK'
        });
        
        console.log("✅ Pengiriman selesai");
    }, 2000);
}

// 🔥 FUNGSI BUAT DOWNLOAD LINK - VERSI BARU (sessionStorage + redirect)
// VERSI SEDERHANA YANG PASTI BERFUNGSI
async function createDownloadLink(visitorName) {
    const downloadId = 'dl_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    const downloadData = {
        id: downloadId,
        name: visitorName,
        files: [],
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
    
    for (const fileIndex of selectedFiles) {
        const item = galleryImages[fileIndex];
        downloadData.files.push({
            type: item.type,
            data: item.data,
            timestamp: item.timestamp
        });
    }
    
    localStorage.setItem(`download_${downloadId}`, JSON.stringify(downloadData));
    
    // 🔥 BUAT URL ABSOLUT
    const domain = window.location.origin; // https://username.github.io
    const path = window.location.pathname; // /reponame/index.html
    const repoPath = path.split('/').slice(0, 2).join('/'); // /reponame
    
    const downloadUrl = `${domain}${repoPath}/visitor-download.html?download=${downloadId}&name=${encodeURIComponent(visitorName)}`;
    
    console.log("Generated URL:", downloadUrl);
    return downloadUrl;
}

// 🔥 FUNGSI TUTUP MODAL
function closeModal() {
    document.getElementById('multiShareModal').style.display = 'none';
    selectedFiles = [];
}

// 🔥 SETUP EVENT LISTENER SAAT PAGE LOAD
document.addEventListener('DOMContentLoaded', function() {
    console.log("🔌 Menyiapkan tombol...");
    
    // Tombol Kirim
    const sendBtn = document.getElementById('sendWhatsAppBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendToWhatsApp);
        console.log("✅ Tombol Kirim siap");
    }
    
    // Tombol Pilih Semua
    const selectAllBtn = document.getElementById('selectAllBtn');
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', selectAll);
        console.log("✅ Tombol Pilih Semua siap");
    }
    
    // Tombol Batal
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
        console.log("✅ Tombol Batal siap");
    }
    // Buat fungsi global untuk dipanggil dari app.js
    window.openShareModal = openShareModal;
    window.closeShareModal = closeModal;
    
    console.log("✅ Semua tombol siap digunakan");
});

// 🔥 HANDLE DOWNLOAD DARI LINK
function handleDownloadFromLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const downloadId = urlParams.get('download');
    
    if (downloadId) {
        const downloadData = JSON.parse(localStorage.getItem(`download_${downloadId}`) || '{}');
        
        if (downloadData.id) {
            Swal.fire({
                title: `📥 Download untuk ${downloadData.name}`,
                html: `
                    <div style="text-align: left;">
                        <p><strong>Total: ${downloadData.files.length} file</strong></p>
                        <p>Link berlaku hingga: ${new Date(downloadData.expiresAt).toLocaleString()}</p>
                    </div>
                `,
                icon: 'info',
                showCancelButton: false,
                confirmButtonText: 'Download ZIP',
                confirmButtonColor: '#25D366'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Fungsi download ZIP (sama seperti sebelumnya)
                    downloadFiles(downloadData);
                }
            });
        }
    }
}











