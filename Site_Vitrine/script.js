// Fonction qui bascule la visibilité d'une section entre 'block' et 'none'
function toggleSectionVisibility(section) {
    if (section.style.display === 'block') {
        section.style.display = 'none';
    } else {
        section.style.display = 'block';
    }
}

// Sélection des boutons et sections par leurs identifiants
let boutonPres = document.getElementById('pres');
let boutonProj = document.getElementById('proj');
let boutonLiens = document.getElementById('liens');

let presentation = document.getElementById('moi');
let projet = document.getElementById('projet');
let liensUtile = document.getElementById('liensDocument');

let presGeneralElement = document.getElementById('presGeneral');
let presGeElement = document.getElementById('presGe');

// Initialisation des sections à 'none' pour les cacher au départ
presentation.style.display = 'none';
projet.style.display = 'none';
liensUtile.style.display = 'none';
presGeElement.style.display = 'none';

// Ajout d'écouteurs d'événements pour basculer la visibilité des sections
boutonPres.addEventListener('click', () => {
    toggleSectionVisibility(presentation);
});

boutonProj.addEventListener('click', () => {
    toggleSectionVisibility(projet);
});

boutonLiens.addEventListener('click', () => {
    toggleSectionVisibility(liensUtile);
});

// Gestion des pop-ups
document.addEventListener('DOMContentLoaded', function () {
    // Sélection des éléments de pop-up par leurs identifiants
    let pop1Element = document.getElementById('pop1');
    let pop2Element = document.getElementById('pop2');
    let pop3Element = document.getElementById('pop3');

    let infoBubble1Element = document.getElementById('infoBubble1');
    let infoBubble2Element = document.getElementById('infoBubble2');
    let infoBubble3Element = document.getElementById('infoBubble3');

    // Ajout d'écouteurs d'événements pour basculer la visibilité des pop-ups
    pop1Element.addEventListener('click', function () {
        togglePopup(infoBubble1Element);
    });

    pop2Element.addEventListener('click', function () {
        togglePopup(infoBubble2Element);
    });

    pop3Element.addEventListener('click', function () {
        togglePopup(infoBubble3Element);
    });

    // Cacher la pop-up lorsqu'on clique en dehors d'elle
    document.addEventListener('click', function (event) {
        if (event.target !== pop1Element && event.target !== pop2Element && event.target !== pop3Element &&
            event.target !== infoBubble1Element && event.target !== infoBubble2Element && event.target !== infoBubble3Element) {
            infoBubble1Element.style.display = 'none';
            infoBubble2Element.style.display = 'none';
            infoBubble3Element.style.display = 'none';
        }
    });
});

// Gestion de l'affichage de la section presGe lors du clic sur presGeneralElement
presGeneralElement.addEventListener('click', function () {
    presGeElement.style.display = (presGeElement.style.display === 'none' || presGeElement.style.display === '') ? 'block' : 'none';
});

// Fonction pour basculer la visibilité des pop-ups et les positionner au centre de la fenêtre
function togglePopup(popupElement) {
    popupElement.style.display = (popupElement.style.display === 'none' || popupElement.style.display === '') ? 'block' : 'none';

    if (popupElement.style.display === 'block') {
        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
        let bubbleHeight = popupElement.offsetHeight;
        let bubbleWidth = popupElement.offsetWidth;

        popupElement.style.top = (windowHeight / 2 - bubbleHeight / 2) + 'px';
        popupElement.style.left = (windowWidth / 2 - bubbleWidth / 2) + 'px';
    }
}
