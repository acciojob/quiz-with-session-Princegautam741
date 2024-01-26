// your existing JS code here

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
    // ... (questions array remains unchanged)
];

// Display the quiz questions and choices
function renderQuestions() {
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionElement = document.createElement('div');
        const questionText = document.createTextNode(question.question);
        questionElement.appendChild(questionText);

        for (let j = 0; j < question.choices.length; j++) {
            const choice = question.choices[j];

            const choiceElement = document.createElement('input');
            choiceElement.setAttribute('type', 'radio');
            choiceElement.setAttribute('name', `question-${i}`);
            choiceElement.setAttribute('value', choice);

            // Uncomment the following lines if you want to check the saved progress
            // const savedProgress = sessionStorage.getItem('progress');
            // if (savedProgress && JSON.parse(savedProgress)[i] === choice) {
            //     choiceElement.checked = true;
            // }

            const choiceText = document.createTextNode(choice);
            questionElement.appendChild(choiceElement);
            questionElement.appendChild(choiceText);
        }

        document.getElementById('questions').appendChild(questionElement);
    }

    // Display the submit button and calculate the score on click
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', function () {
        const selectedOptions = Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(input => input.value);
        const score = calculateScore(selectedOptions);
        document.getElementById('score').textContent = `Your score is ${score} out of 5.`;

        // Store the score in local storage
        localStorage.setItem('score', score.toString());
    });
}

// Calculate the quiz score
function calculateScore(selectedOptions) {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (selectedOptions[i] === questions[i].answer) {
            score++;
        }
    }
    return score;
}

// Load saved score from local storage if available
const savedScore = localStorage.getItem('score');
if (savedScore) {
    document.getElementById('score').textContent = `Your score is ${savedScore} out of 5.`;
}

// Call the function to render questions
renderQuestions();
