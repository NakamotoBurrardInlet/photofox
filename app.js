document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const photoGrid = document.getElementById('photoGrid');
    const photoCount = document.getElementById('photoCount');
    const newsReel = document.getElementById('newsReel');

    // Remote Data Server API Link Endpoint
    const API_URL = 'http://localhost:5000/api';

    // Trigger File Input Click
    dropZone.addEventListener('click', () => fileInput.click());

    // Drag and Drop State Handlers
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#00e676';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) handleUpload(files[0]);
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) handleUpload(e.target.files[0]);
    });

    // Send Payload to Remote Storage Vector
    async function handleUpload(file) {
        const formData = new FormData();
        formData.append('photo', file);

        // Update ticker statement instantly to acknowledge transmission
        newsReel.innerText = `Transmitting anonymous payload: ${file.name.toUpperCase()} into Photo Fox mainframes...`;

        try {
            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                newsReel.innerText = "Transmission Complete. Beauty in Titlement Stream updated successfully.";
                fetchTimeline(); // Re-render instantly
            } else {
                newsReel.innerText = "Error encountered during raw data packaging pipeline.";
            }
        } catch (error) {
            console.error('Server connection error:', error);
            newsReel.innerText = "Remote storage server offline. Tracking system impossible.";
        }
    }

    // Pull Timeline sequence from storage
    async function fetchTimeline() {
        try {
            const response = await fetch(`${API_URL}/photos`);
            const data = await response.json();
            
            // Wipe canvas to reconstruct timeline cleanly
            photoGrid.innerHTML = '';
            photoCount.innerText = `${data.length} Photos Rendered`;

            // Loop and scale timeline from entry 1 to millions
            data.forEach(photo => {
                const wrapper = document.createElement('div');
                wrapper.className = 'photo-wrapper';

                const img = document.createElement('img');
                img.src = `http://localhost:5000${photo.url}`;
                img.loading = 'lazy'; // Protects system memory at large scales

                const stamp = document.createElement('div');
                stamp.className = 'photo-timestamp';
                stamp.innerText = new Date(photo.timestamp).toLocaleTimeString();

                wrapper.appendChild(img);
                wrapper.appendChild(stamp);
                photoGrid.appendChild(wrapper);
            });
        } catch (error) {
            console.error('Error compiling timeline array:', error);
        }
    }

    // Cycle fresh headlines into Beauty in Titlement ticker
    const headlines = [
        "Abstract structures dominating the modern computational aesthetics canvas.",
        "Anonymous nodes uploading clarity vectors directly to cortex membranes.",
        "Zero-knowledge photo routing eliminates identities; retains absolute beauty.",
        "Visual timeline expanding seamlessly towards target threshold capacity."
    ];
    
    setInterval(() => {
        const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];
        newsReel.innerText = `Beauty in Titlement: ${randomHeadline}`;
    }, 12000);

    // Bootstrap Initialization
    fetchTimeline();
});