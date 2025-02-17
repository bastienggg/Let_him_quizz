const audio = {
    correctAnswerSound: './src/assets/audio/correct-choice.mp3',
    wrongAnswerSound: './src/assets/audio/wrong-choice.mp3',
    tictacSound: './src/assets/audio/tic-tac.mp3',
};

let Sound = {};

Sound.renderCorrectAnswer = function() {
    const audioElement = document.getElementById('correctAnswerSound');
    audioElement.src= audio.correctAnswerSound;
    if (audioElement) {
        audioElement.play();    
    } else {
        console.error('Element with id "correctAnswerSound" not found.');
    }
};

Sound.renderWrongAnswer = function() {
    const audioElement = document.getElementById('wrongAnswerSound');
    audioElement.src = audio.wrongAnswerSound;
    if (audioElement) {
        audioElement.play();
    } else {
        console.error('Element with id "wrongAnswerSound" not found.');
    }
};

Sound.renderTictac = function(){
    const audioElement = document.getElementById('tictacSound');
    audioElement.src = audio.tictacSound;
    if(audioElement){
        audioElement.play();
    }
    else{
        console.error('Element with id "tictacSound" not found.');
    }
}

Sound.stopTictac = function(){
    const audioElement = document.getElementById('tictacSound');
    if(audioElement){
        audioElement.pause();
    }
    else{
        console.error('Element with id "tictacSound" not found.');
    }
};

export { Sound };