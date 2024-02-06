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
  
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    // Vérifier si le statut est "OK"
    if (data.status === 'OK') {
      // Ajouter la classe "available" à l'élément div#api_status
      $('div#api_status').addClass('available');
    } else {
      // Retirer la classe "available" de l'élément div#api_status
      $('div#api_status').removeClass('available');
    }
  });
});
