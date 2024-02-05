$(document).ready(function() {
  let amenitiesChecked = {};

  $('.amenities input[type="checkbox"]').change(function() {
      if (this.checked) {
          amenitiesChecked[$(this).data('id')] = $(this).data('name');
      } else {
          delete amenitiesChecked[$(this).data('id')];
      }

      // Convertir les valeurs sélectionnées en chaîne et limiter le nombre de caractères
      let selectedAmenities = Object.values(amenitiesChecked).join(', ');
      const maxLength = 37; // Définir la limite de caractères ici

      // Vérifier si la longueur dépasse la limite
      if (selectedAmenities.length > maxLength) {
          selectedAmenities = selectedAmenities.substring(0, maxLength) + '...';
      }

      $('.amenities h4').text(selectedAmenities);
  });
});
