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

// Lógica para el Simulador Interactivo
let totalCarrito = 0;
let itemsCarrito = [];

function agregarAlCarrito(precio, nombre) {
    totalCarrito += precio;
    itemsCarrito.push(nombre);
    
    const totalEl = document.getElementById('simulador-total');
    
    // Formatear a moneda ARS
    totalEl.textContent = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    }).format(totalCarrito);

    // Animación visual del total
    totalEl.classList.add('scale-110', 'text-green-500');
    setTimeout(() => {
        totalEl.classList.remove('scale-110', 'text-green-500');
    }, 200);
}

function enviarWhatsApp() {
    if (totalCarrito === 0) {
        alert("El carrito está vacío. Agregá algún producto primero.");
        return;
    }

    let mensaje = "¡Hola! Quisiera hacer el siguiente pedido:\n\n";
    itemsCarrito.forEach(item => {
        mensaje += `- ${item}\n`;
    });
    
    const totalFormateado = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    }).format(totalCarrito);

    mensaje += `\n*Total a pagar: ${totalFormateado}*`;

    // Codificar mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    const numeroPrueba = "1234567890"; // Reemplazar por número real

    const urlWhatsApp = `https://wa.me/${numeroPrueba}?text=${mensajeCodificado}`;
    
    // Abrir en nueva pestaña
    window.open(urlWhatsApp, '_blank');
}

// Botón "Abrir Simulador" que hace scroll al simulador
document.getElementById('btn-simulador').addEventListener('click', () => {
    // Si estás en mobile y querés scrollear, o simplemente resaltar la demo.
    const simuladorBox = document.querySelector('.max-w-sm');
    simuladorBox.classList.add('ring-4', 'ring-white', 'scale-105');
    setTimeout(() => {
        simuladorBox.classList.remove('ring-4', 'ring-white', 'scale-105');
    }, 1000);
});
