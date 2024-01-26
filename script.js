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
        questionElement.innerHTML = `
            <p>${question.question}</p>
            <ul>
                ${question.choices.map(choice => `<li><input type="radio" name="question${i}" value="${choice}">${choice}</li>`).join('')}
            </ul>
        `;
        document.getElementById('questions').appendChild(questionElement);

        // Load saved progress from session storage if available
        const savedProgress = sessionStorage.getItem('progress');
        if (savedProgress) {
            const choices = JSON.parse(savedProgress);
            const radioInputs = document.querySelectorAll(`input[name="question${i}"]`);
            radioInputs.forEach(input => {
                if (choices[i] === input.value) {
                    input.checked = true;
                }
            });
        }

        // Add event listener to save progress on radio button selection
        questionElement.addEventListener('change', function () {
            const selectedOptions = Array.from(document.querySelectorAll(`input[name="question${i}"]:checked`)).map(input => input.value);
            sessionStorage.setItem('progress', JSON.stringify(selectedOptions));
        });
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
