import { Users } from "../../data/data-user.js";

let Leaderboard = {};
const scene = document.querySelector('#mainScene');

const templateFile = await fetch(
  "src/components/leaderboard/template.html.inc",
);
const template = await templateFile.text();

Leaderboard.renderZone = async function() {
  let usersTop = await Users.getTopUsers();

  console.log(usersTop);
  // Creating the empty leaderboard
  const tempDiv = document.createElement("div");
  tempDiv.id = "leaderboardZone";

  let templateEdited = template;


  // Add user scores to the scoreboard
  usersTop.forEach((user, index) => {
    console.log(`{{user${index+1}}}`);
    templateEdited = templateEdited.replace(`{{user${index+1}}}`, user.username).replace(`{{score${index+1}}}`, user.score);
  });

  
  tempDiv.innerHTML = templateEdited;

  const entities = tempDiv.querySelectorAll("#scoreboard");

  entities.forEach((entity) => {
    scene.appendChild(entity);
  });

  console.log(tempDiv);
  console.log("rendering zone");
}

Leaderboard.update = function() {

} 


export { Leaderboard };
