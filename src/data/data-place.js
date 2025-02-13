let Place = {};

Place.getAll = function () {
  return data;
};

Place.getRandomPlace = async function () {
  // Fetch a random place
  let response = await fetch("https://mmi.unilim.fr/~savary23/Let_Him_Quizz/api/place?param=random");
  let newPlace = await response.json();

  // Format place
  let placeImage = newPlace.img;
  let propositions = [
    newPlace.reponse1,
    newPlace.reponse2,
    newPlace.reponse3,
    newPlace.reponse4,
  ];
  return { placeImage, propositions };
};

export { Place };