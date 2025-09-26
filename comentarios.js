document.addEventListener('DOMContentLoaded', function() {
    const ratingStars = document.querySelectorAll('.rating-star');
    let currentRating = 0;

    ratingStars.forEach((star, index) => {
        star.addEventListener('click', function() {
            currentRating = index + 1;
            updateStars();
        });

        star.addEventListener('mouseenter', function() {
            highlightStars(index + 1);
        });
    });

    document.getElementById('ratingStars').addEventListener('mouseleave', function() {
        updateStars();
    });

    function updateStars() {
        ratingStars.forEach((star, index) => {
            if (index < currentRating) {
                star.classList.add('active');
                star.textContent = '★';
            } else {
                star.classList.remove('active');
                star.textContent = '☆';
            }
        });
    }

    function highlightStars(rating) {
        ratingStars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#FFD700';
                star.textContent = '★';
            } else {
                star.style.color = '#ddd';
                star.textContent = '☆';
            }
        });
    }

    // Formulario
    document.getElementById('commentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el formulario
        alert('Comentario enviado. ¡Gracias por tu opinión!');
    });
});