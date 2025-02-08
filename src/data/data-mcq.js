let data = await fetch("./src/data/json/mcq.json");
data = await data.json();

let MCQ = {};

MCQ.getAll = function () {
  return data;
};

MCQ.getRandomQuestion = async function (difficulty) {
  // Fetch a random question based on the difficulty
  let response = await fetch("https://mmi.unilim.fr/~savary23/Let_Him_Quizz/api/MCQ?difficulty=" + difficulty);
  let newQuestion = await response.json();

  // Format question
  let question = newQuestion.question;
  let propositions = [
    newQuestion.reponse1,
    newQuestion.reponse2,
    newQuestion.reponse3,
    newQuestion.reponse4
  ];

  return { question, propositions };
};

export { MCQ };
