// Variables pour stocker les questions, l'index de la question actuelle, le score, les résultats et le nombre total de questions
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let results = []; // Pour stocker les résultats de chaque question
let totalQuestions = 0; // Nouvelle variable pour stocker le nombre total de questions

// Récupération des questions depuis un fichier JSON à l'aide de fetch
fetch("anime.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    questions = data;
    totalQuestions = questions.length; // Définir le nombre total de questions ici
    loadNextQuestion();
  })
  .catch((error) => console.error("Erreur lors du chargement du QCM:", error));

// Fonction pour charger la prochaine question
function loadNextQuestion() {
  // Vérification si toutes les questions ont été posées
  if (questions.length === 0) {
    document.getElementById("question").textContent = "QCM terminé!";
    document.getElementById("options").innerHTML = "";
    displayResults();
    return;
  }

  // Sélection aléatoire d'une question
  currentQuestionIndex = Math.floor(Math.random() * questions.length);
  const currentQuestion = questions[currentQuestionIndex];

  // Affichage de la question et des options dans le HTML
  document.getElementById("question").textContent = currentQuestion.question;
  const optionsList = document.getElementById("options");
  optionsList.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    // Création d'un élément li pour chaque option
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = option;
    // Ajout d'un écouteur d'événements pour vérifier la réponse lorsque l'option est cliquée
    li.addEventListener("click", () => checkAnswer(option, currentQuestion));
    optionsList.appendChild(li);

    // Ajout pour afficher une image liée à la question
    const questionImage = document.getElementById("questionImage"); // Assurez-vous qu'il y a un élément avec cet id dans votre HTML
    if (currentQuestion.imgQuizz) {
      questionImage.src = currentQuestion.imgQuizz;
      questionImage.style.display = "block"; // Affiche l'image si elle existe
    } else {
      questionImage.style.display = "none"; // Cache l'image si elle n'existe pas pour la question actuelle
    }
  });
}

// Fonction pour obtenir un message en fonction du score
function getScoreMessage(score) {
  // Retourne un message en fonction de la plage de scores
  if (score >= 0 && score <= 3) {
    return "Échec";
  } else if (score > 3 && score <= 4) {
    return "Pas terrible";
  } else if (score > 4 && score <= 6) {
    return "Tu peux mieux faire";
  } else if (score > 6 && score <= 7) {
    return "Bien joué";
  } else if (score === 8) {
    return "Tu es incollable";
  }
  return ""; // Retourne une chaîne vide si le score n'entre dans aucune catégorie
}

// Fonction pour vérifier la réponse et mettre à jour le score et les résultats
function checkAnswer(selectedOption, question) {
  const correct = selectedOption === question.answer;
  if (correct) {
    score++;
  }
  // Enregistrement des résultats de la question
  results.push({
    question: question.question,
    selectedOption,
    correctAnswer: question.answer,
    correct,
  });
  // Suppression de la question actuelle de la liste des questions
  questions.splice(currentQuestionIndex, 1);
  // Chargement de la prochaine question
  loadNextQuestion();
}

// Fonction pour afficher les résultats à la fin du QCM
function displayResults() {
  // Récupération de l'élément HTML où afficher les résultats
  const resultsElement = document.getElementById("score");
  // Utilisation de la fonction getScoreMessage pour obtenir le message en fonction du score
  const scoreMessage = getScoreMessage(score);

  // Contenu HTML pour le score
  let scoreHTML = `<strong>Votre score : ${score}/${totalQuestions}</strong> - ${scoreMessage}`;

  // Contenu HTML pour la liste des résultats
  scoreHTML += '<ul class="result-list">';

  // Parcours des résultats et construction du contenu HTML
  results.forEach((result) => {
    // Utilisation de classes différentes pour éviter les conflits avec le CSS
    const listItemClass = result.correct
      ? "correct-answer"
      : "incorrect-answer";

    // Construction du contenu HTML pour chaque résultat
    scoreHTML += `
      <li class="${listItemClass}">
        ${result.question} - <strong>${result.correct ? "Correct" : "Faux"}</strong><br>
        Votre réponse: ${result.selectedOption}<br>
        Réponse correcte: ${result.correctAnswer}
      </li>`;
  });

  scoreHTML += "</ul>";

  // Assignation du contenu HTML au conteneur des résultats
  resultsElement.innerHTML = scoreHTML;
}
