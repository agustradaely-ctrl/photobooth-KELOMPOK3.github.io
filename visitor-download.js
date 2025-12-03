// visitor-download.js - VERSI BERSIH
document.addEventListener('DOMContentLoaded', function() {
    console.log("📥 Download page loaded");
    
    const urlParams = new URLSearchParams(window.location.search);
    const downloadId = urlParams.get('download');
    const userName = urlParams.get('name') || 'Pengunjung';
    
    console.log("Params:", { downloadId, userName });
    
    if (!downloadId) {
        showError("Link tidak valid!");
        return;
    }
    
    // Cari data
    const dataKey = `download_${downloadId}`;
    const downloadData = JSON.parse(localStorage.getItem(dataKey) || '{}');
    
    console.log("Data dari localStorage:", {
        key: dataKey,
        found: !!downloadData.id,
        files: downloadData.files ? downloadData.files.length : 0
    });
    
    if (!downloadData.id) {
        showError("Data tidak ditemukan!");
        return;
    }
    
    if (!downloadData.files || downloadData.files.length === 0) {
        showError("Tidak ada file!");
        return;
    }
    
    // Tampilkan data
    showDownloadPage(downloadData, userName);
});

// FUNGSI UNTUK TAMPILKAN HALAMAN
function showDownloadPage(data, userName) {
    console.log("Showing page for:", userName);
    
    // Update UI
    const nameEl = document.getElementById('userName');
    const countEl = document.getElementById('totalFiles');
    
    if (nameEl) nameEl.textContent = userName;
    if (countEl) countEl.textContent = data.files.length;
    
    // Setup download button
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        // Hapus event lama, tambah baru
        const newBtn = downloadBtn.cloneNode(true);
        downloadBtn.parentNode.replaceChild(newBtn, downloadBtn);
        
        newBtn.addEventListener('click', function() {
            console.log("Download clicked");
            downloadFiles(data, userName);
        });
        
        newBtn.textContent = `📥 DOWNLOAD ${data.files.length} FILE`;
        newBtn.disabled = false;
    }
    
    // Stop loading
    const loading = document.getElementById('loading');
    const content = document.getElementById('content');
    
    if (loading) loading.style.display = 'none';
    if (content) content.style.display = 'block';
    
    console.log("Page ready!");
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
