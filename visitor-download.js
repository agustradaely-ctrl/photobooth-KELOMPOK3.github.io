// download.js - Khusus untuk halaman download pengunjung
document.addEventListener('DOMContentLoaded', function() {
    console.log("📥 Halaman download dimuat");
    
    const urlParams = new URLSearchParams(window.location.search);
    const downloadId = urlParams.get('download');
    const userName = urlParams.get('name') || 'Pengunjung';
    
    console.log("Parameter URL:", { downloadId, userName });
    
    if (!downloadId) {
        showError("Link download tidak valid!");
        return;
    }
    
    // 🔥 CARI DATA DARI BERBAGAI SUMBER (prioritas)
    let downloadData = null;
    
    // 1. Coba dari sessionStorage dulu
    const sessionData = sessionStorage.getItem(`download_data_${downloadId}`);
    if (sessionData) {
        console.log("✅ Data ditemukan di sessionStorage");
        downloadData = JSON.parse(sessionData);
    }
    
    // 2. Jika tidak ada, coba dari localStorage
    if (!downloadData || !downloadData.id) {
        const localData = localStorage.getItem(`download_${downloadId}`);
        if (localData) {
            console.log("✅ Data ditemukan di localStorage");
            downloadData = JSON.parse(localData);
        }
    }
    
    // 3. Jika masih tidak ada, coba dari URL parameters (fallback)
    if (!downloadData || !downloadData.id) {
        console.warn("⚠ Data tidak ditemukan di storage, mungkin cache masalah");
        showError("Data tidak ditemukan. Coba buka link ini di browser yang sama dengan photo booth.");
        return;
    }
    
    // 🔥 VERIFIKASI DATA
    if (!downloadData.files || downloadData.files.length === 0) {
        showError("Tidak ada file yang bisa didownload!");
        return;
    }
    
    // Cek expired
    const expiryDate = new Date(downloadData.expiresAt);
    if (new Date() > expiryDate) {
        document.getElementById('expiredMessage').style.display = 'block';
        document.getElementById('content').style.display = 'none';
        document.getElementById('loading').style.display = 'none';
        return;
    }
    
    // 🔥 SIMPAN ULANG KE sessionStorage untuk future use
    sessionStorage.setItem(`download_data_${downloadId}`, JSON.stringify(downloadData));
    
    // Tampilkan data
    displayDownloadData(downloadData, userName);
});

function displayDownloadData(data, userName) {
    // Update UI
    document.getElementById('userName').textContent = userName;
    document.getElementById('totalFiles').textContent = data.files.length;
    
    const expiryDate = new Date(data.expiresAt);
    document.getElementById('expiryTime').textContent = expiryDate.toLocaleString('id-ID');
    
    // Setup download button
    document.getElementById('downloadBtn').addEventListener('click', function() {
        downloadAllFiles(data, userName);
    });
    
    // Show content
    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = 'block';
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



