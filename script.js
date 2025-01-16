function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const button = document.querySelector('.music-toggle');
    
    // Check if audio is loaded
    if (audio.readyState >= 2) {  // HAVE_CURRENT_DATA
        if (audio.paused) {
            let playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    button.classList.add('playing');
                }).catch(error => {
                    console.log("Playback failed:", error);
                });
            }
        } else {
            audio.pause();
            button.classList.remove('playing');
        }
    } else {
        console.log("Audio not loaded yet");
    }
}

// Try to play music after first click anywhere on the page
document.addEventListener('click', function initAudio() {
    const audio = document.getElementById('bgMusic');
    const button = document.querySelector('.music-toggle');
    
    let playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            button.classList.add('playing');
        }).catch(error => {
            console.log("Initial playback failed:", error);
        });
    }
    
    // Remove this listener after first click
    document.removeEventListener('click', initAudio);
}, { once: true });

// Add loading event listener
document.getElementById('bgMusic').addEventListener('loadeddata', function() {
    console.log("Audio loaded and ready to play");
});

// Add error event listener
document.getElementById('bgMusic').addEventListener('error', function(e) {
    console.log("Audio error:", e);
});

// Fix for mobile viewport height
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initial height
setVH();

// Update height on resize and orientation change
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH); 

document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    // Open lightbox
    function openLightbox(imgSrc) {
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Add click events to all photos
    const photos = document.querySelectorAll('.gallery-photo img, .cake-photo img');
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            openLightbox(photo.src);
        });
    });

    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });

    // Close with close button
    closeBtn.addEventListener('click', closeLightbox);

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}); 

document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.getElementById('videoContainer');
    const video = document.getElementById('birthdayVideo');
    const overlay = document.querySelector('.video-overlay');
    const bgMusic = document.getElementById('bgMusic');
    const musicButton = document.querySelector('.music-toggle');

    videoContainer.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            overlay.classList.add('hidden');
            // Pause background music when video plays
            bgMusic.pause();
            musicButton.classList.remove('playing');
        } else {
            video.pause();
            overlay.classList.remove('hidden');
        }
    });

    video.addEventListener('ended', function() {
        overlay.classList.remove('hidden');
        // Resume background music when video ends
        bgMusic.play();
        musicButton.classList.add('playing');
    });

    video.addEventListener('pause', function() {
        overlay.classList.remove('hidden');
        // Resume background music when video is paused
        bgMusic.play();
        musicButton.classList.add('playing');
    });

    video.addEventListener('play', function() {
        overlay.classList.add('hidden');
        // Pause background music when video plays
        bgMusic.pause();
        musicButton.classList.remove('playing');
    });
}); 