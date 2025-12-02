// download.js - Khusus untuk halaman download pengunjung
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const downloadId = urlParams.get('download');
    const userName = urlParams.get('name') || 'Pengunjung';
    
    console.log("🔍 Mencari data untuk:", downloadId);
    
    if (!downloadId) {
        showError("Link tidak valid!");
        return;
    }
    
    // 🔥 CARI DATA DENGAN BERBAGAI KEMUNGKINAN KEY
    let downloadData = null;
    
    // Coba beberapa format key
    const possibleKeys = [
        `download_${downloadId}`,      // Format baru
        downloadId,                    // Tanpa prefix
        `dl_${downloadId}`,           // Dengan dl_
        `${downloadId}_files`,        // Dengan suffix
        `photo_${downloadId}`         // Mungkin dengan photo_
    ];
    
    for (const key of possibleKeys) {
        const data = localStorage.getItem(key);
        if (data) {
            console.log(`✅ Data ditemukan dengan key: ${key}`);
            try {
                downloadData = JSON.parse(data);
                break;
            } catch (e) {
                console.error(`Error parsing key ${key}:`, e);
            }
        }
    }
    
    // 🔥 JIKA TIDAK DITEMUKAN, CARI SEMUA KEY YANG MUNGKIN
    if (!downloadData) {
        console.log("🔎 Mencari di semua localStorage keys...");
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes(downloadId) || key.includes('download') || key.includes('dl_')) {
                console.log(`Checking key: ${key}`);
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data && data.files && Array.isArray(data.files)) {
                        console.log(`✅ Found with key: ${key}`);
                        downloadData = data;
                        break;
                    }
                } catch (e) {}
            }
        }
    }
    
    // 🔥 JIKA MASIH TIDAK DITEMUKAN
    if (!downloadData || !downloadData.files) {
        showError(`
            Data tidak ditemukan!<br><br>
            <strong>Penyebab umum:</strong><br>
            1. Dibuka di browser/device berbeda<br>
            2. Cache browser dibersihkan<br>
            3. Sesi sudah berakhir<br><br>
            <strong>Solusi:</strong><br>
            • Gunakan browser yang sama dengan photo booth<br>
            • Minta link baru dari photo booth
        `);
        return;
    }
    
    console.log("📊 Data ditemukan:", downloadData);
    
    // Tampilkan data
    displayDownloadData(downloadData, userName);
});

// 🔥 FUNGSI INI HARUS ADA
function displayDownloadData(data, userName) {
    console.log("🖼 Menampilkan data untuk:", userName);
    
    // 1. Update informasi dasar
    document.getElementById('userName').textContent = userName;
    document.getElementById('totalFiles').textContent = data.files.length;
    
    // 2. Hitung jumlah foto dan video
    const photoCount = data.files.filter(f => f.type === 'photo').length;
    const videoCount = data.files.filter(f => f.type === 'video').length;
    
    // 3. Tampilkan count jika ada elemennya
    const photoCountElement = document.getElementById('photoCount');
    const videoCountElement = document.getElementById('videoCount');
    
    if (photoCountElement) {
        photoCountElement.textContent = photoCount;
    }
    
    if (videoCountElement) {
        videoCountElement.textContent = videoCount;
    }
    
    // 4. Tampilkan expiry time
    const expiryDate = new Date(data.expiresAt);
    document.getElementById('expiryTime').textContent = expiryDate.toLocaleString('id-ID');
    
    // 5. Cek expired
    if (new Date() > expiryDate) {
        if (document.getElementById('expiredMessage')) {
            document.getElementById('expiredMessage').style.display = 'block';
        }
        if (document.getElementById('content')) {
            document.getElementById('content').style.display = 'none';
        }
        if (document.getElementById('loading')) {
            document.getElementById('loading').style.display = 'none';
        }
        return;
    }
    
    // 6. 🔥 TAMPILKAN PREVIEW FILE (jika ada elemen untuk preview)
    const fileListContainer = document.getElementById('fileList');
    if (fileListContainer) {
        fileListContainer.innerHTML = '';
        
        data.files.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.style.cssText = `
                margin: 10px 0;
                padding: 10px;
                background: #f5f5f5;
                border-radius: 8px;
                display: flex;
                align-items: center;
            `;
            
            if (file.type === 'photo') {
                fileItem.innerHTML = `
                    <div style="width: 50px; height: 50px; margin-right: 15px;">
                        <img src="${file.data}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 5px;">
                    </div>
                    <div style="flex-grow: 1;">
                        <strong>Foto ${index + 1}</strong><br>
                        <small>${new Date(file.timestamp).toLocaleTimeString()}</small>
                    </div>
                    <button onclick="previewFile(${index})" style="background: #2196F3; color: white; border: none; padding: 8px 12px; border-radius: 5px; margin-right: 5px;">
                        👁 Lihat
                    </button>
                `;
            } else {
                fileItem.innerHTML = `
                    <div style="width: 50px; height: 50px; margin-right: 15px; background: #333; border-radius: 5px; display: flex; align-items: center; justify-content: center;">
                        <span style="color: white; font-size: 24px;">🎥</span>
                    </div>
                    <div style="flex-grow: 1;">
                        <strong>Video ${index + 1}</strong><br>
                        <small>${new Date(file.timestamp).toLocaleTimeString()}</small>
                    </div>
                    <button onclick="previewFile(${index})" style="background: #2196F3; color: white; border: none; padding: 8px 12px; border-radius: 5px; margin-right: 5px;">
                        ▶ Putar
                    </button>
                `;
            }
            
            fileListContainer.appendChild(fileItem);
        });
    }
    
    // 7. 🔥 SETUP DOWNLOAD BUTTON
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        // Hapus event listener lama
        const newDownloadBtn = downloadBtn.cloneNode(true);
        downloadBtn.parentNode.replaceChild(newDownloadBtn, downloadBtn);
        
        // Tambah event listener baru
        newDownloadBtn.addEventListener('click', function() {
            console.log("Download button clicked");
            downloadAllFiles(data, userName);
        });
        
        // Update teks button
        newDownloadBtn.innerHTML = `<i class="fas fa-download"></i> DOWNLOAD ${data.files.length} FILE (ZIP)`;
    }
    
    // 8. Tampilkan konten
    const loadingElement = document.getElementById('loading');
    const contentElement = document.getElementById('content');
    
    if (loadingElement) loadingElement.style.display = 'none';
    if (contentElement) contentElement.style.display = 'block';
    
    console.log("✅ Display selesai");
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








