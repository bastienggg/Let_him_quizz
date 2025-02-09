let Place = {};

Place.getAll = function () {
  return data;
};

Place.getRandomPlace = async function (difficulty) {
  // Fetch a random place based on the difficulty
  // let response = await fetch("https://mmi.unilim.fr/~savary23/Let_Him_Quizz/api/place?difficulty=" + difficulty);
  // let newPlace = await response.json();

  // Backup place if no response from the API
  let places = [
    {
      placeImage: "paris",
      reponse1: "Paris",
      reponse2: "London",
      reponse3: "New York",
      reponse4: "Tokyo",
    },
    {
      placeImage: "london",
      reponse1: "London",
      reponse2: "Paris",
      reponse3: "Berlin",
      reponse4: "Madrid",
    },
    {
      placeImage: "new_york",
      reponse1: "New York",
      reponse2: "Los Angeles",
      reponse3: "Chicago",
      reponse4: "Miami",
    },
    {
      placeImage: "tokyo",
      reponse1: "Tokyo",
      reponse2: "Osaka",
      reponse3: "Kyoto",
      reponse4: "Nagoya",
    },
  ];

  let newPlace = places[Math.floor(Math.random() * places.length)];

  // Format place
  let placeImage = newPlace.placeImage;
  let propositions = [
    newPlace.reponse1,
    newPlace.reponse2,
    newPlace.reponse3,
    newPlace.reponse4,
  ];

  return { placeImage, propositions };
};

export { Place };
