// visitor-download.js - VERSI BERSIH
// visitor-download.js - VERSI DEBUG DETAIL
document.addEventListener('DOMContentLoaded', function() {
    console.log("=== DOWNLOAD PAGE DEBUG ===");
    
    // 1. Tampilkan semua localStorage keys
    console.log("🔑 Semua localStorage keys:", Object.keys(localStorage));
    
    // 2. Ambil parameter URL
    const urlParams = new URLSearchParams(window.location.search);
    const downloadId = urlParams.get('download');
    const userName = urlParams.get('name') || 'Pengunjung';
    
    console.log("📋 URL Parameters:", { 
        downloadId: downloadId,
        userName: userName,
        fullURL: window.location.href 
    });
    
    if (!downloadId) {
        console.error("❌ ERROR: Tidak ada downloadId di URL");
        showError("Link tidak valid! Tidak ada ID download.");
        return;
    }
    
    // 3. CARI DATA DENGAN BERBAGAI CARA
    let downloadData = null;
    let foundKey = null;
    
    // Cara 1: Coba dengan key "download_"
    const key1 = `download_${downloadId}`;
    console.log(`Mencari dengan key: "${key1}"`);
    const data1 = localStorage.getItem(key1);
    
    if (data1) {
        console.log(`✅ Ditemukan dengan key: "${key1}"`);
        foundKey = key1;
        try {
            downloadData = JSON.parse(data1);
        } catch (e) {
            console.error(`Error parsing "${key1}":`, e);
        }
    }
    
    // Cara 2: Coba key tanpa prefix (kalau ID sudah lengkap)
    if (!downloadData && downloadId.startsWith('dl_')) {
        const key2 = downloadId;
        console.log(`Mencari dengan key: "${key2}"`);
        const data2 = localStorage.getItem(key2);
        
        if (data2) {
            console.log(`✅ Ditemukan dengan key: "${key2}"`);
            foundKey = key2;
            try {
                downloadData = JSON.parse(data2);
            } catch (e) {
                console.error(`Error parsing "${key2}":`, e);
            }
        }
    }
    
    // Cara 3: Cari semua key yang mengandung downloadId
    if (!downloadData) {
        console.log("🔍 Mencari semua key yang mengandung:", downloadId);
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes(downloadId)) {
                console.log(`Found matching key: "${key}"`);
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data && typeof data === 'object') {
                        downloadData = data;
                        foundKey = key;
                        console.log(`✅ Menggunakan key: "${key}"`);
                        break;
                    }
                } catch (e) {
                    // Skip invalid JSON
                }
            }
        }
    }
    
    // 4. DEBUG DATA YANG DITEMUKAN
    if (downloadData) {
        console.log("📊 Data yang ditemukan:", {
            key: foundKey,
            hasId: !!downloadData.id,
            id: downloadData.id,
            hasFiles: !!downloadData.files,
            fileCount: downloadData.files ? downloadData.files.length : 0,
            name: downloadData.name,
            sampleFile: downloadData.files ? downloadData.files[0] : null
        });
        
        // Validasi data
        if (!downloadData.id || !downloadData.files || downloadData.files.length === 0) {
            console.error("❌ Data tidak lengkap!");
            showError("Data tidak lengkap. File mungkin sudah dihapus.");
            return;
        }
        
        // 5. TAMPILKAN HALAMAN
        showDownloadPage(downloadData, userName);
        
    } else {
        console.error("❌ TIDAK ADA DATA YANG DITEMUKAN!");
        
        // Tampilkan semua data untuk debugging
        console.log("📋 Semua data di localStorage:");
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes('download') || key.includes('dl_')) {
                console.log(`Key: "${key}"`);
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    console.log(`  ID: ${data.id}, Files: ${data.files ? data.files.length : 0}`);
                } catch (e) {
                    console.log(`  (bukan JSON valid)`);
                }
            }
        }
        
        showError(`
            ❌ DATA TIDAK DITEMUKAN<br><br>
            <strong>Download ID:</strong> ${downloadId}<br>
            <strong>Dicari dengan key:</strong> download_${downloadId}<br><br>
            <strong>Kemungkinan penyebab:</strong><br>
            1. Data sudah expired (24 jam)<br>
            2. Browser cache dibersihkan<br>
            3. Dibuka di browser/device berbeda<br><br>
            <strong>Solusi:</strong><br>
            • Minta link baru dari photo booth<br>
            • Buka di browser yang sama
        `);
    }
});

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

