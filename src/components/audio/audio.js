const audio = {
    correctAnswerSound: 'assets/audio/correct-choice.mp3',
    wrongAnswerSound: 'assets/audio/wrong-choice.mp3',
    tictacSound: 'assets/audio/tic-tac.mp3',
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
    const audioElement = document.getElementById('correctAnswerSound');
    if (audioElement) {
        audioElement.play();
    } else {
        console.error('Element with id "correctAnswerSound" not found.');
    }
};

Sound.renderWrongAnswer = function() {
    const audioElement = document.getElementById('wrongAnswerSound');
    if (audioElement) {
        audioElement.play();
    } else {
        console.error('Element with id "wrongAnswerSound" not found.');
    }
};

Sound.renderTictac = function(){
    const audioElement = document.getElementById('tictacSound');
    if(audioElement){
        audioElement.play();
    }
    else{
        console.error('Element with id "tictacSound" not found.');
    }
}

export { Sound };