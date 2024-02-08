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

      // Utiliser un espace non-sécable si aucune commodité n'est sélectionnée
      if (selectedAmenities.length === 0) {
        selectedAmenities = "&#160;"; // Espace non-sécable HTML
      }

      $('.amenities h4').html(selectedAmenities);
  });
  
  $.get('http://localhost:5001/api/v1/status/', function(data) {
    // Vérifier si le statut est "OK"
    if (data.status === 'OK') {
      // Ajouter la classe "available" à l'élément div#api_status
      $('div#api_status').addClass('available');
    } else {
      // Retirer la classe "available" de l'élément div#api_status
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function(places) {
      places.forEach(function(place) {
        const article = `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`;
        $('.places').append(article);
      });
    }
  });
});
