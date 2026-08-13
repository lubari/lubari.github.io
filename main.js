// Lógica para Preguntas Frecuentes (FAQ)
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.icon');
            
            // Cerrar otras respuestas
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.icon');
                    otherAnswer.classList.remove('open');
                    otherIcon.textContent = '+';
                    otherIcon.classList.remove('rotate-45');
                }
            });

            // Toggle de la actual
            if (answer.classList.contains('open')) {
                answer.classList.remove('open');
                icon.textContent = '+';
                icon.classList.remove('rotate-45');
            } else {
                answer.classList.add('open');
                icon.textContent = '×';
                icon.classList.add('rotate-45'); // Si quisieras rotar en CSS en lugar de cambiar texto
            }
        });
    });
});

// Lógica para el Lightbox de la Galería
document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('.lightbox-trigger');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const btnClose = document.getElementById('lightbox-close');
    const btnPrev = document.getElementById('lightbox-prev');
    const btnNext = document.getElementById('lightbox-next');
    
    if (!lightbox) return; // Prevención si no existe
    
    let currentIndex = 0;
    let currentGallery = [];
    let currentCaption = "";

    function openLightbox(trigger) {
        const galleryData = trigger.getAttribute('data-gallery');
        if (galleryData) {
            try {
                currentGallery = JSON.parse(galleryData);
            } catch (e) {
                currentGallery = [trigger.src];
            }
        } else {
            currentGallery = [trigger.src];
        }
        
        currentCaption = trigger.getAttribute('data-caption') || '';
        currentIndex = 0;
        
        if (currentGallery.length <= 1) {
            btnPrev.classList.add('hidden');
            btnNext.classList.add('hidden');
        } else {
            btnPrev.classList.remove('hidden');
            btnNext.classList.remove('hidden');
        }

        updateLightboxContent();
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        
        setTimeout(() => {
            lightbox.classList.remove('opacity-0');
        }, 10);
    }

    function closeLightbox() {
        lightbox.classList.add('opacity-0');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
        }, 300); 
    }

    function updateLightboxContent() {
        lightboxImg.src = currentGallery[currentIndex];
        lightboxCaption.textContent = currentCaption;
    }

    function showNext() {
        if (currentGallery.length <= 1) return;
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateLightboxContent();
    }

    function showPrev() {
        if (currentGallery.length <= 1) return;
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightboxContent();
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            openLightbox(trigger);
        });
    });

    btnClose.addEventListener('click', closeLightbox);
    btnNext.addEventListener('click', showNext);
    btnPrev.addEventListener('click', showPrev);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });
});
