let data = await fetch("./src/data/json/mcq.json");
data = await data.json();

let MCQ = {};

MCQ.getAll = function () {
  return data;
};

MCQ.getRandomQuestion = async function (difficulty) {
  // Later we will make a server request to get a random question based on the difficulty
  
  // Placeholder Question
  let response = await fetch("https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple")
  let newQuestion = await response.json()
  
  // Format question
  let correctAnswer = newQuestion.results[0].correct_answer
  let wrongAnswers = newQuestion.results[0].incorrect_answers
  let question = newQuestion.results[0].question

  // List propositions
  let propositions = []
  propositions.push(correctAnswer)
  propositions.push(...wrongAnswers)

  return {question, propositions};
};

export { MCQ };
