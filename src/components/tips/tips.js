import { MCQ } from "../../data/data-mcq.js";
import { Money } from "../money-counter/money-counter.js";
import { Light } from "../light/light.js";
import { Rounds } from "../rounds/rounds.js";
import { Sound } from "../audio/audio.js";

const templateFile = await fetch(
  "src/components/ticking-away/template.html.inc",
);
const template = await templateFile.text();

let Tips = {};

const scene = document.querySelector("#mainScene");
const timer = document.querySelector("#timer");



export { Tips };