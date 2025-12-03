// visitor-download.js - VERSI BERSIH
document.addEventListener('DOMContentLoaded', function() {
    console.log("📥 Download page loaded");
    
    const urlParams = new URLSearchParams(window.location.search);
    
    // 🔥 KASUS 1: ADA PARAMETER 'data' (untuk browser lain)
    const encodedData = urlParams.get('data');
    
    if (encodedData) {
        console.log("✅ Menggunakan data dari URL parameter");
        try {
            const urlData = JSON.parse(decodeURIComponent(encodedData));
            handleUrlData(urlData);
            return;
        } catch (error) {
            console.error("Error parsing URL data:", error);
        }
    }
    
    // 🔥 KASUS 2: PARAMETER BIASA (untuk browser sama)
    const downloadId = urlParams.get('download');
    const userName = urlParams.get('name') || 'Pengunjung';
    
    if (!downloadId) {
        showError("Link tidak valid!");
        return;
    }
    
    console.log("Mencari data di localStorage...");
    
    // Cari di localStorage
    const downloadData = JSON.parse(localStorage.getItem(`download_${downloadId}`) || '{}');
    
    if (!downloadData.id) {
        showError(`
            ❌ Data tidak ditemukan!<br><br>
            <strong>Kemungkinan:</strong><br>
            • Buka di browser berbeda<br>
            • Cache dibersihkan<br><br>
            <strong>Solusi:</strong><br>
            • Minta link baru dari photo booth<br>
            • Photo booth harus kirim file langsung (bukan link)
        `);
        return;
    }
    
    // Tampilkan halaman
    showDownloadPage(downloadData, userName);
});

// 🔥 FUNGSI BARU: Handle data dari URL
function handleUrlData(urlData) {
    console.log("Data dari URL:", urlData);
    
    // Buat object data sederhana
    const downloadData = {
        id: urlData.id,
        name: urlData.name,
        files: Array(urlData.fileCount).fill().map((_, i) => ({
            type: 'photo',
            data: '', // Data kosong karena tidak bisa dibawa di URL
            timestamp: Date.now()
        })),
        expiresAt: urlData.expiresAt
    };
    
    // Tampilkan info khusus
    const loading = document.getElementById('loading');
    if (loading) {
        loading.innerHTML = `
            <div style="text-align: center; padding: 30px;">
                <div style="font-size: 50px; color: #25D366;">📱</div>
                <h3>Link dari WhatsApp</h3>
                <p><strong>Untuk: ${urlData.name}</strong></p>
                <p>${urlData.fileCount} file tersedia</p>
                
                <div style="background: #ff9800; color: white; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    ⚠ <strong>File tidak bisa didownload via link</strong><br>
                    Data foto/video terlalu besar untuk dikirim via link WhatsApp.
                </div>
                
                <p style="color: #666; font-size: 14px;">
                    <strong>Silakan minta:</strong><br>
                    1. Photo booth kirim file langsung via WhatsApp<br>
                    2. Atau datang ke photo booth untuk ambil file
                </p>
                
                <button onclick="window.history.back()" style="background: #25D366; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">
                    ← Kembali
                </button>
            </div>
        `;
    }
}

function showDownloadPage(data, userName) {
    console.log("🎨 Menampilkan halaman untuk:", userName);
    
    // Update UI
    const nameEl = document.getElementById('userName');
    const countEl = document.getElementById('totalFiles');
    
    if (nameEl) nameEl.textContent = userName;
    if (countEl) countEl.textContent = data.files.length;
    
    // Setup download button
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        const newBtn = downloadBtn.cloneNode(true);
        downloadBtn.parentNode.replaceChild(newBtn, downloadBtn);
        
        newBtn.addEventListener('click', function() {
            console.log("Download button clicked");
            downloadFiles(data, userName);
        });
        
        newBtn.textContent = `📥 DOWNLOAD ${data.files.length} FILE`;
    }
    
    // Stop loading
    const loading = document.getElementById('loading');
    const content = document.getElementById('content');
    
    if (loading) loading.style.display = 'none';
    if (content) content.style.display = 'block';
    
    console.log("✅ Halaman siap!");
}
// FUNGSI DOWNLOAD
async function downloadFiles(data, userName) {
    console.log("Starting download...");
    
    try {
        // Tampilkan loading
        const originalText = document.getElementById('downloadBtn').textContent;
        document.getElementById('downloadBtn').textContent = "📦 Membuat ZIP...";
        document.getElementById('downloadBtn').disabled = true;
        
        // Buat ZIP
        const zip = new JSZip();
        const folderName = `PhotoBooth_${userName}`.replace(/[^a-z0-9]/gi, '_');
        
        for (let i = 0; i < data.files.length; i++) {
            const file = data.files[i];
            if (file.type === 'photo' && file.data) {
                const base64Data = file.data.split(',')[1];
                if (base64Data) {
                    const blob = base64ToBlob(base64Data, 'image/png');
                    zip.file(`Foto_${i + 1}.png`, blob);
                }
            }
        }
        
        // Generate dan download
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const fileName = `${folderName}_${new Date().getTime()}.zip`;
        
        saveAs(zipBlob, fileName);
        
        // Reset button
        document.getElementById('downloadBtn').textContent = originalText;
        document.getElementById('downloadBtn').disabled = false;
        
        alert(`✅ ${data.files.length} file berhasil didownload!\n\nFile: ${fileName}`);
        
    } catch (error) {
        console.error("Download error:", error);
        alert("❌ Gagal mendownload file.");
        
        // Reset button
        document.getElementById('downloadBtn').textContent = "📥 DOWNLOAD FILE";
        document.getElementById('downloadBtn').disabled = false;
    }
}

// HELPER FUNCTIONS
function base64ToBlob(base64, mimeType) {
    try {
        const byteCharacters = atob(base64);
        const byteArrays = [];
        
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            
            byteArrays.push(new Uint8Array(byteNumbers));
        }
        
        return new Blob(byteArrays, { type: mimeType });
    } catch (error) {
        console.error("Error converting base64:", error);
        return new Blob();
    }
}

function showError(message) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.innerHTML = `
            <div style="color: #dc3545; text-align: center; padding: 40px;">
                <div style="font-size: 50px; margin-bottom: 20px;">❌</div>
                <h3>Terjadi Kesalahan</h3>
                <p>${message}</p>
                <p style="margin-top: 20px;">
                    <a href="index.html" style="color: #25D366; text-decoration: underline;">
                        ← Kembali ke Photo Booth
                    </a>
                </p>
            </div>
        `;
    }
}


