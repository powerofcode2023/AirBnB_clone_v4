$(document).ready(function() {
    let amenitiesChecked = {};

    function loadPlaces(amenitiesIds = {}) {
        $.ajax({
            url: 'http://localhost:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(amenitiesIds.length > 0 ? {"amenities": amenitiesIds} : {}),
            success: function(places) {
                $('.places').empty(); // Vider la section des places avant de rajouter les nouvelles
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
    }

    // Charger toutes les places au chargement de la page
    loadPlaces();

    $('.amenities input[type="checkbox"]').change(function() {
        if (this.checked) {
            amenitiesChecked[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenitiesChecked[$(this).data('id')];
        }

        let selectedAmenities = Object.values(amenitiesChecked).join(', ');
        const maxLength = 37; // Définir la limite de caractères ici

        if (selectedAmenities.length > maxLength) {
            selectedAmenities = selectedAmenities.substring(0, maxLength) + '...';
        }

        if (selectedAmenities.length === 0) {
            selectedAmenities = "&#160;"; // Espace non-sécable HTML
        }

        $('.amenities h4').html(selectedAmenities);
    });

    $.get('http://localhost:5001/api/v1/status/', function(data) {
        if (data.status === 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });

    $('button').click(function() {
        const amenitiesIds = Object.keys(amenitiesChecked);
        loadPlaces(amenitiesIds);
    });
});
