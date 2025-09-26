// Funcionalidad del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Animaciones suaves para los inputs al hacer focus
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Validación del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        const terminos = document.getElementById('terminos').checked;
        
        // Validaciones
        if (!validarFormulario(nombre, email, telefono, mensaje, terminos)) {
            return;
        }
        
        // Simular envío del formulario
        enviarFormulario(nombre, email, telefono, mensaje);
    });
    
    // Validación en tiempo real del email
    document.getElementById('email').addEventListener('blur', function() {
        if (this.value && !validarEmail(this.value)) {
            mostrarError(this, 'Por favor, ingresa un email válido');
        } else {
            limpiarError(this);
        }
    });
    
    // Validación en tiempo real del teléfono
    document.getElementById('telefono').addEventListener('input', function() {
        // Permitir solo números, espacios, guiones y paréntesis
        this.value = this.value.replace(/[^0-9\s\-\(\)\+]/g, '');
    });
    
    // Efectos visuales para los checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkmark = this.nextElementSibling;
            if (this.checked) {
                checkmark.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    checkmark.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
});

// Función para validar el formulario
function validarFormulario(nombre, email, telefono, mensaje, terminos) {
    let esValido = true;
    
    // Validar nombre
    if (nombre.length < 2) {
        mostrarError(document.getElementById('nombre'), 'El nombre debe tener al menos 2 caracteres');
        esValido = false;
    } else {
        limpiarError(document.getElementById('nombre'));
    }
    
    // Validar email
    if (!validarEmail(email)) {
        mostrarError(document.getElementById('email'), 'Por favor, ingresa un email válido');
        esValido = false;
    } else {
        limpiarError(document.getElementById('email'));
    }
    
    // Validar teléfono
    if (telefono.length < 7) {
        mostrarError(document.getElementById('telefono'), 'Por favor, ingresa un teléfono válido');
        esValido = false;
    } else {
        limpiarError(document.getElementById('telefono'));
    }
    
    // Validar mensaje
    if (mensaje.length < 10) {
        mostrarError(document.getElementById('mensaje'), 'El mensaje debe tener al menos 10 caracteres');
        esValido = false;
    } else {
        limpiarError(document.getElementById('mensaje'));
    }
    
    // Validar términos y condiciones
    if (!terminos) {
        mostrarNotificacion('Debes aceptar los términos y condiciones', 'error');
        esValido = false;
    }
    
    return esValido;
}

// Función para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para mostrar errores
function mostrarError(elemento, mensaje) {
    limpiarError(elemento);
    
    elemento.style.borderColor = '#e74c3c';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = mensaje;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.5rem';
    
    elemento.parentElement.appendChild(errorDiv);
}

// Función para limpiar errores
function limpiarError(elemento) {
    elemento.style.borderColor = '#E5E5E5';
    const errorMessage = elemento.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Función para simular el envío del formulario
function enviarFormulario(nombre, email, telefono, mensaje) {
    const submitBtn = document.querySelector('.submit-btn');
    const textoOriginal = submitBtn.textContent;
    
    // Cambiar el botón para mostrar que se está enviando
    submitBtn.textContent = 'Enviando...';
    submitBtn.style.background = '#95a5a6';
    submitBtn.disabled = true;
    
    // Simular tiempo de envío
    setTimeout(() => {
        // Mostrar mensaje de éxito
        mostrarNotificacion('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
        
        // Limpiar formulario
        document.getElementById('contactForm').reset();
        
        // Restaurar botón
        submitBtn.textContent = textoOriginal;
        submitBtn.style.background = '#B8956A';
        submitBtn.disabled = false;
        
        // Scroll suave hacia arriba
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
    }, 2000);
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    
    // Estilos de la notificación
    notificacion.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    if (tipo === 'success') {
        notificacion.style.background = '#27ae60';
    } else {
        notificacion.style.background = '#e74c3c';
    }
    
    // Agregar animación CSS
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Agregar al DOM
    document.body.appendChild(notificacion);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notificacion.parentElement) {
                notificacion.remove();
            }
        }, 300);
    }, 5000);
}

// Función para smooth scroll en la navegación
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto parallax suave para el hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});