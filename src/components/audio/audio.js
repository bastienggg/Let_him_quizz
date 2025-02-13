const audio = {
    correctAnswerSound: 'assets/audio/correct-choice.mp3',
    wrongAnswerSound: 'assets/audio/wrong-choice.mp3',
};

let Sound = {};

Sound.CorrectAnswer = function() {
    const correctAnswerSoundElement = document.getElementById('correctAnswerSound');
    if (correctAnswerSoundElement) {
        correctAnswerSoundElement.setAttribute('sound', audio.correctAnswerSound);
    } else {
        console.error('Element with id "correctAnswerSound" not found.');
    }
};

Sound.WrongAnswer = function() {
    const wrongAnswerSoundElement = document.getElementById('wrongAnswerSound');
    if (wrongAnswerSoundElement) {
        wrongAnswerSoundElement.setAttribute('sound', audio.wrongAnswerSound);
    } else {
        console.error('Element with id "wrongAnswerSound" not found.');
    }
};

Sound.renderCorrectAnswer = function() {
    const tempDiv = document.createElement('div');
    tempDiv.id = 'correctAnswerSoundDiv';
};

export { Sound };