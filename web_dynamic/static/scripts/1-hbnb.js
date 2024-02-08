$(document).ready(function() {
    let amenitiesChecked = {};

    $('.amenities input[type="checkbox"]').change(function() {
        if (this.checked) {
            amenitiesChecked[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenitiesChecked[$(this).data('id')];
        }

        let selectedAmenities = Object.values(amenitiesChecked).join(', ');
        const maxLength = 37; // Définir la limite de caractères ici

        // Vérifier si la longueur dépasse la limite
        if (selectedAmenities.length > maxLength) {
            selectedAmenities = selectedAmenities.substring(0, maxLength) + '...';
        }

        // Utiliser un espace non-sécable si aucune commodité n'est sélectionnée
        if (selectedAmenities.length === 0) {
            selectedAmenities = "&#160;"; // Espace non-sécable HTML
        }

        $('.amenities h4').html(selectedAmenities); // Utiliser .html() au lieu de .text() pour permettre l'entité HTML
    });
});
