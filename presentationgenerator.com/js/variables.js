//ALL PAGES
let url2Text2Cof = new Map();

const WIKIURL = "https://en.wikipedia.org/"
const SERVICEURL = "https://en.wikipedia.org/w/api.php?";
//USELESS PARAGRAPHS
const toRemove = ["External links", "Notes", "References", "See also", "Further reading", "Footnotes", "Works cited", "Bibliography", "Sources", "Citations"];
const progressBar = $(".progress-bar");
const card = $(".pres-preview");


const COLWIDTH = 315;
let IMAGEHEIGHT;
const TRANSLATEX = 380;
const TRANSLATEY = 90;

let translation = new Map();
translation.set("createPres", "Creating the presentation...");
translation.set("gatherImages", "Gathering images...");
translation.set("insertImages", "Inserting images...");
translation.set("presReady", "Your presentation is ready!");
translation.set("done", "Done!");
translation.set("signin", "Sign in via Google Slides");
translation.set("presisgen", "Your presentation is generating...");
translation.set("siteurl", "presentationgenerator.com");
translation.set("nointernet", "No internet connection");