let selectedFiles = [];

// FUNGSI BUKA MULTI SHARE MODAL
function openMultiShareModal() {
    if (galleryImages.length === 0) {
        Swal.fire({
            title: '📭 Gallery Kosong',
            text: 'Belum ada foto atau video yang bisa dibagikan!',
            icon: 'warning',
            confirmButtonText: 'Mengerti'
        });
        return;
    }

    // Reset selection
    selectedFiles = [];
    
    // Update counters
    document.getElementById('totalCount').textContent = galleryImages.length;
    document.getElementById('selectedCount').textContent = '0';
    
    // Isi file grid
    populateShareFileGrid();
    
    // Reset form
    document.getElementById('multiWhatsappNumber').value = '';
    document.getElementById('multiWhatsappMessage').value = 'Hai! Terimkasih sudah menggunakan PhotoBooth \nIni hasil foto/video Anda dari Photo Booth 🎉';
    
    // Tampilkan modal
    document.getElementById('multiShareModal').style.display = 'flex';
}

// FUNGSI ISI FILE GRID
function populateShareFileGrid() {
    const grid = document.getElementById('shareFileGrid');
    grid.innerHTML = '';
    
    galleryImages.forEach((item, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'share-file-item';
        fileItem.setAttribute('data-index', index);
        
        let previewHtml = '';
        if (item.type === 'photo') {
            previewHtml = `
                <img src="${item.data}" class="share-file-preview" alt="Foto ${index + 1}">
                <div class="share-file-type">📸</div>
            `;
        } else if (item.type === 'video') {
            previewHtml = `
                <video src="${item.data}" class="share-file-preview" muted></video>
                <div class="share-file-type">🎥</div>
            `;
        }
        
        fileItem.innerHTML = `
            ${previewHtml}
            <div class="share-file-checkbox">✓</div>
        `;
        
        // Click event untuk selection
        fileItem.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFileSelection(index, fileItem);
        });
        
        grid.appendChild(fileItem);
    });
}

// FUNGSI TOGGLE FILE SELECTION
function toggleFileSelection(index, element) {
    const itemIndex = selectedFiles.indexOf(index);
    
    if (itemIndex === -1) {
        // Select file
        selectedFiles.push(index);
        element.classList.add('selected');
    } else {
        // Deselect file
        selectedFiles.splice(itemIndex, 1);
        element.classList.remove('selected');
    }
    
    // Update counter
    document.getElementById('selectedCount').textContent = selectedFiles.length;
}

// FUNGSI SELECT ALL FILES
function selectAllFiles() {
    selectedFiles = [];
    const allItems = document.querySelectorAll('.share-file-item');
    
    allItems.forEach((item, index) => {
        selectedFiles.push(index);
        item.classList.add('selected');
    });
    
    document.getElementById('selectedCount').textContent = selectedFiles.length;
}

// FUNGSI KIRIM FILE TERPILIH DENGAN VALIDASI DI DEPAN
async function sendSelectedFiles() {
    const phoneNumber = document.getElementById('multiWhatsappNumber').value.trim();
    const message = document.getElementById('multiWhatsappMessage').value.trim();
    
    // ✅ VALIDASI NOMOR WHATSAPP DENGAN z-index TINGGI
    if (!phoneNumber) {
        Swal.fire({
            title: '⚠ Nomor WhatsApp Kosong',
            text: 'Silakan masukkan nomor WhatsApp terlebih dahulu!',
            icon: 'warning',
            confirmButtonText: 'Mengerti',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c',
            customClass: {
                container: 'swal-front',
                popup: 'swal-front-popup'
            }
        });
        return;
    }
    
    // ✅ VALIDASI FILE TERPILIH DENGAN z-index TINGGI
    if (selectedFiles.length === 0) {
        Swal.fire({
            title: '📭 Belum Memilih File',
            text: 'Silakan pilih minimal 1 file untuk dikirim!',
            icon: 'warning',
            confirmButtonText: 'Mengerti',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c',
            customClass: {
                container: 'swal-front',
                popup: 'swal-front-popup'
            }
        });
        return;
    }
    
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    
    // ✅ VALIDASI FORMAT NOMOR DENGAN z-index TINGGI
    if (formattedNumber.length < 10) {
        Swal.fire({
            title: '❌ Nomor Tidak Valid',
            text: 'Format nomor WhatsApp tidak valid! Contoh: 6281234567890',
            icon: 'error',
            confirmButtonText: 'Mengerti',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c',
            customClass: {
                container: 'swal-front',
                popup: 'swal-front-popup'
            }
        });
        return;
    }

    // Tampilkan loading DENGAN z-index TINGGI
    Swal.fire({
        title: '📤 Mengirim ke WhatsApp...',
        html: `Menyiapkan ${selectedFiles.length} file...`,
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
        color: '#ffffff',
        customClass: {
            container: 'swal-front',
            popup: 'swal-front-popup'
        }
    });
    
    try {
        // Kirim pesan utama dulu
        await sendMainMessage(formattedNumber, message, selectedFiles.length);
        
        // Kirim file satu per satu
        for (let i = 0; i < selectedFiles.length; i++) {
            const fileIndex = selectedFiles[i];
            const item = galleryImages[fileIndex];
            
            // Update progress
            Swal.update({
                html: `Mengirim file ${i + 1}/${selectedFiles.length}...<br>
                      <small>${item.type === 'photo' ? '📸 Foto' : '🎥 Video'} ${i + 1}</small>`
            });
            
            // Kirim file
            if (item.type === 'photo') {
                await sendPhotoToWhatsApp(formattedNumber, item.data, `Foto-${i + 1}`);
            } else if (item.type === 'video') {
                await sendVideoToWhatsApp(formattedNumber, item.data, `Video-${i + 1}`);
            }
            
            // Delay antara pengiriman
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        // Selesai
        Swal.close();
        showFeedback(`✅ ${selectedFiles.length} file berhasil dikirim!`);
        closeMultiShareModal();
        
    } catch (error) {
        console.error('Error sending files:', error);
        Swal.fire({
            title: '❌ Gagal Mengirim',
            text: 'Terjadi error saat mengirim file!',
            icon: 'error',
            confirmButtonText: 'Mengerti',
            background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
            color: '#ffffff',
            confirmButtonColor: '#ff416c',
            customClass: {
                container: 'swal-front',
                popup: 'swal-front-popup'
            }
        });
    }
}

// FUNGSI KIRIM PESAN UTAMA DENGAN LINK DOWNLOAD NYATA
async function sendMainMessage(phoneNumber, message, fileCount) {
    const photoCount = selectedFiles.filter(idx => galleryImages[idx].type === 'photo').length;
    const videoCount = selectedFiles.filter(idx => galleryImages[idx].type === 'video').length;
    
    // Buat download link yang nyata
    const downloadLink = await createDownloadLink();
    
    const finalMessage = `${message}\n\n Total: ${fileCount} file\n Foto: ${photoCount}\n🎥 Video: ${videoCount}\n\n⬇ Download semua file di link berikut:\n${downloadLink}\n\nLink berlaku 24 jam ⏰`;
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    return new Promise(resolve => setTimeout(resolve, 3000));
}

// FUNGSI BUAT DOWNLOAD LINK YANG NYATA
async function createDownloadLink() {
    // Generate unique ID untuk download session
    const downloadId = 'dl_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Simpan data files ke localStorage (simulasi database)
    const downloadData = {
        id: downloadId,
        files: [],
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 jam
    };
    
    // Simpan file data untuk download
    for (const fileIndex of selectedFiles) {
        const item = galleryImages[fileIndex];
        downloadData.files.push({
            type: item.type,
            data: item.data,
            timestamp: item.timestamp,
            filename: `${item.type}-${new Date(item.timestamp).getTime()}.${item.type === 'photo' ? 'png' : 'webm'}`
        });
    }
    
    // Simpan ke localStorage
    localStorage.setItem(`download_${downloadId}`, JSON.stringify(downloadData));
    
    // Buat download URL
    const downloadUrl =`${window.location.origin}${window.location.pathname}?download=${downloadId}`;
    
    return downloadUrl;
}

// FUNGSI DETEKSI DEVICE & OPTIMASI LINK
function getOptimizedMessage(message, downloadLink, fileCount, photoCount, videoCount) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let optimizedMessage;
    
    if (isMobile) {
        // Format untuk mobile (lebih compact)
        optimizedMessage = `${message}\n\n📁 ${fileCount} files (${photoCount}📸 ${videoCount}🎥)\n\n👇 TAP LINK INI:\n${downloadLink}\n\n⏰ 24 jam`;
    } else {
        // Format untuk desktop
        optimizedMessage = `${message}\n\n Total Files: ${fileCount}\n📸 Photos: ${photoCount}\n🎥 Videos: ${videoCount}\n\n⬇ CLICK THIS LINK:\n${downloadLink}\n\nLink expires in 24 hours ⏰`;
    }
    
    return optimizedMessage;
}

// FUNGSI KIRIM FOTO KE WHATSAPP
function sendPhotoToWhatsApp(phoneNumber, photoData, filename) {
    // Untuk foto: buka WhatsApp dengan pesan
    const message = `📸 ${filename}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    return new Promise(resolve => setTimeout(resolve, 1500));
}

// FUNGSI KIRIM VIDEO KE WHATSAPP
function sendVideoToWhatsApp(phoneNumber, videoUrl, filename) {
    // Untuk video: buka WhatsApp dengan pesan  
    const message = `🎥 ${filename}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    return new Promise(resolve => setTimeout(resolve, 1500));
}

// FUNGSI TUTUP MULTI SHARE MODAL
function closeMultiShareModal() {
    document.getElementById('multiShareModal').style.display = 'none';
    selectedFiles = [];
}

// FUNGSI HANDLE DOWNLOAD DARI LINK
function handleDownloadFromLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const downloadId = urlParams.get('download');
    
    if (downloadId) {
        // Cek apakah ada download request
        const downloadData = JSON.parse(localStorage.getItem(`download_${downloadId}`) || '{}');
        
        if (downloadData.id && downloadData.files && downloadData.files.length > 0) {
            // Tampilkan modal download
            showDownloadModal(downloadData);
        }
    }
}

// FUNGSI TAMPILKAN MODAL DOWNLOAD
function showDownloadModal(downloadData) {
    Swal.fire({
        title: '📥 Download Photo Booth Results',
        html: `
            <div style="text-align: left; margin: 15px 0;">
                <p><strong>🎉 File Ready to Download!</strong></p>
                <p>Total: <strong>${downloadData.files.length} files</strong></p>
                <p>Dibuat: <strong>${new Date(downloadData.createdAt).toLocaleString()}</strong></p>
                <p>Kadaluarsa: <strong>${new Date(downloadData.expiresAt).toLocaleString()}</strong></p>
                
                <div style="background: rgba(0,255,0,0.1); padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p style="text-align: center; margin: 0; color: #00ff00;">⬇ Klik tombol di bawah untuk download semua file</p>
                </div>
            </div>
        `,
        icon: 'info',
        showCancelButton: false,
        confirmButtonText: '📥 Download Semua Files',
        background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
        color: '#ffffff',
        confirmButtonColor: '#25D366',
        width: '500px'
    }).then((result) => {
        if (result.isConfirmed) {
            downloadFilesFromLink(downloadData);
        }
    });
}

// FUNGSI DOWNLOAD FILES DARI LINK
async function downloadFilesFromLink(downloadData) {
    Swal.fire({
        title: '📦 Membuat ZIP File...',
        text: `Mempersiapkan ${downloadData.files.length} file untuk download...`,
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        background: 'linear-gradient(145deg, #2d6a4f, #40916c)',
        color: '#ffffff'
    });

    try {
        const zip = new JSZip();
        const folder = zip.folder("photo-booth-results");
        
        for (let i = 0; i < downloadData.files.length; i++) {
            const file = downloadData.files[i];
            
            if (file.type === 'photo') {
                // Convert base64 to blob untuk foto
                const base64Data = file.data.split(',')[1];
                const blob = base64ToBlob(base64Data, 'image/png');
                folder.file(file.filename, blob);
            } else if (file.type === 'video') {
                // Untuk video, kita perlu fetch dari blob URL
                try {
                    const response = await fetch(file.data);
                    const blob = await response.blob();
                    folder.file(file.filename, blob);
                } catch (error) {
                    console.warn(`Gagal memproses video ${i + 1}:`, error);
                }
            }
            
            // Update progress
            if (i % 2 === 0) {
                Swal.update({
                    text: `Memproses ${i + 1}/${downloadData.files.length} file...`
                });
            }
        }
        
        // Generate dan download ZIP
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const filename = `photo-booth-${new Date().getTime()}.zip`;
        saveAs(zipBlob, filename);
        
        Swal.close();
        showFeedback(`✅ ${downloadData.files.length} file berhasil didownload!`);
        
    } catch (error) {
        console.error('Error creating download ZIP:', error);
        Swal.fire({
            title: '❌ Gagal Download',
            text: 'Terjadi error saat membuat file download!',
            icon: 'error',
            confirmButtonText: 'Mengerti'
        });
    }

}
