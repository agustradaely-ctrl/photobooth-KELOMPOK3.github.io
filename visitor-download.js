// download.js - Khusus untuk halaman download pengunjung
document.addEventListener('DOMContentLoaded', function() {
    console.log("=== DOWNLOAD PAGE LOADED ===");
    
    const urlParams = new URLSearchParams(window.location.search);
    const downloadId = urlParams.get('download');
    const userName = urlParams.get('name') || 'Pengunjung';
    
    console.log("📋 URL Parameters:", { downloadId, userName });
    
    if (!downloadId) {
        console.error("❌ ERROR: Tidak ada download ID");
        showError("Link tidak valid!");
        return;
    }
    
    console.log("🔍 Mencari data di localStorage...");
    
    // CARI DATA - cara sederhana
    const downloadData = JSON.parse(localStorage.getItem(`download_${downloadId}`) || '{}');
    
    console.log("📦 Data yang ditemukan:", {
        hasId: !!downloadData.id,
        hasFiles: !!downloadData.files,
        fileCount: downloadData.files ? downloadData.files.length : 0,
        dataSample: downloadData.files ? downloadData.files[0] : 'none'
    });
    
    if (!downloadData.id) {
        console.error("❌ Data tidak ditemukan di localStorage");
        // Coba key lain
        console.log("Keys di localStorage:", Object.keys(localStorage));
        showError("Data tidak ditemukan!");
        return;
    }
    
    if (!downloadData.files || downloadData.files.length === 0) {
        console.error("❌ Tidak ada files dalam data");
        showError("Tidak ada file yang bisa didownload!");
        return;
    }
    
    console.log("✅ Data valid, menampilkan...");
    
    // 🔥 PANGGIL displayDownloadData
    try {
        displayDownloadData(downloadData, userName);
    } catch (error) {
        console.error("❌ Error di displayDownloadData:", error);
        showError("Error menampilkan data: " + error.message);
    }
});

// 🔥 FUNGSI INI HARUS ADA
function displayDownloadData(data, userName) {
    console.log("🎨 displayDownloadData dipanggil");
    
    // PASTIKAN HENTIKAN LOADING
    const loadingElement = document.getElementById('loading');
    const contentElement = document.getElementById('content');
    
    if (!loadingElement || !contentElement) {
        console.error("❌ Elemen loading/content tidak ditemukan!");
        return;
    }
    
    try {
        // 1. Update info dasar
        const userNameElement = document.getElementById('userName');
        const totalFilesElement = document.getElementById('totalFiles');
        
        if (userNameElement) userNameElement.textContent = userName;
        if (totalFilesElement) totalFilesElement.textContent = data.files.length;
        
        console.log("✅ Info dasar diupdate");
        
        // 2. Setup download button
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            console.log("✅ Download button ditemukan");
            
            // Hapus event listener lama
            downloadBtn.replaceWith(downloadBtn.cloneNode(true));
            const newBtn = document.getElementById('downloadBtn');
            
            newBtn.addEventListener('click', function() {
                console.log("📥 Download button diklik");
                downloadAllFiles(data, userName);
            });
            
            // Update teks
            newBtn.textContent = `📥 DOWNLOAD ${data.files.length} FILE`;
        } else {
            console.warn("⚠ Download button tidak ditemukan");
        }
        
        // 3. HENTIKAN LOADING & TAMPILKAN KONTEN
        loadingElement.style.display = 'none';
        contentElement.style.display = 'block';
        
        console.log("✅ Loading dihentikan, konten ditampilkan");
        
    } catch (error) {
        console.error("❌ Error dalam displayDownloadData:", error);
        
        // Fallback: tetap hentikan loading
        loadingElement.style.display = 'none';
        if (contentElement) contentElement.style.display = 'block';
        
        showError("Error menampilkan data");
    }
}

// 🔥 TAMBAH FUNGSI PREVIEW
function previewFile(index) {
    // Data harus tersedia di scope global atau di-pass
    console.log("Preview file index:", index);
    alert(`Preview file ${index + 1}\n\nFitur preview akan tampil di sini.)`;
}

async function downloadAllFiles(data, userName) {
    try {
        // Tampilkan loading
        const loadingAlert = `
            <div style="text-align: center; padding: 20px;">
                <div style="border: 4px solid #f3f3f3; border-top: 4px solid #25D366; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 15px;"></div>
                <style>@keyframes spin {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}</style>
                <p>Menyiapkan ${data.files.length} file...</p>
                <p style="font-size: 12px; color: #666; margin-top: 10px;">Harap tunggu...</p>
            </div>
        `;
        
        const downloadModal = document.createElement('div');
        downloadModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        downloadModal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 15px; max-width: 400px; width: 90%;">
                ${loadingAlert}
            </div>
        `;
        document.body.appendChild(downloadModal);
        
        // Buat ZIP
        const zip = new JSZip();
        const folderName = `PhotoBooth_${userName.replace(/[^a-z0-9]/gi, '_')}`;
        const folder = zip.folder(folderName);
        
        for (let i = 0; i < data.files.length; i++) {
            const file = data.files[i];
            
            if (file.type === 'photo') {
                // Base64 to blob
                const base64Data = file.data.split(',')[1];
                const blob = base64ToBlob(base64Data, 'image/png');
                folder.file(`Foto_${i + 1}.png`, blob);
            } else {
                // Video
                try {
                    const response = await fetch(file.data);
                    const blob = await response.blob();
                    folder.file(`Video_${i + 1}.webm`, blob);
                } catch (error) {
                    console.warn(`Skip video ${i + 1}:`, error);
                }
            }
        }
        
        // Generate dan download ZIP
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const filename = `${folderName}.zip`;
        
        // Hapus loading modal
        document.body.removeChild(downloadModal);
        
        // Download file
        saveAs(zipBlob, filename);
        
        // Tampilkan sukses
        setTimeout(() => {
            alert(`✅ Download selesai!\n\n${data.files.length} file berhasil didownload.\n\nFile: ${filename}`);
        }, 1000);
        
    } catch (error) {
        console.error('Download error:', error);
        alert('❌ Gagal mendownload file. Coba lagi.');
    }
}

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

function showError(message) {
    document.getElementById('loading').innerHTML = `
        <div style="color: #dc3545;">
            <div style="font-size: 50px; margin-bottom: 20px;">❌</div>
            <h3>Terjadi Kesalahan</h3>
            <p>${message}</p>
        </div>
    `;

}









