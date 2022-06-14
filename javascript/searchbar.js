var input = document.getElementById("mySearch");
var lessonOne = document.getElementById("lesson-one");
var lessonOneArr = lessonOne.textContent
  .toLowerCase()
  .replace(/[^a-zA-Z0-9 ]/g, "")
  .split(" ");
var lessonTwo = document.getElementById("lesson-two");
var lessonTwoArr = lessonTwo.textContent
  .toLowerCase()
  .replace(/[^a-zA-Z0-9 ]/g, "")
  .split(" ");
var noMatchesBanner = document.getElementById("noMatchesBanner");

function search(e) {
  var text = e.target.value.toLowerCase();
  let isLessonOneAMatch = false;
  let isLessonTwoAMatch = false;
  let userInputNoSpecialCharacters = text.replace(/[^a-zA-Z0-9 ]/g, "");
  let userInput = userInputNoSpecialCharacters.split(" ");
  for (let i = 0; i < userInput.length; i++) {
    for (let j = 0; j < lessonOneArr.length; j++) {
      if (lessonOneArr[j].includes(userInput[i])) {
        isLessonOneAMatch = true;
      }
    }
    for (let k = 0; k < lessonTwoArr.length; k++) {
      if (lessonTwoArr[k].includes(userInput[i])) {
        isLessonTwoAMatch = true;
      }
    }
    if (isLessonOneAMatch === true && isLessonTwoAMatch === true) {
      lessonOne.style.display = "block";
      lessonTwo.style.display = "block";
      noMatchesBanner.style.display = "none";
    } else if (isLessonTwoAMatch === true) {
      lessonOne.style.display = "none";
      lessonTwo.style.display = "block";
      noMatchesBanner.style.display = "none";
    } else if (isLessonOneAMatch === true) {
      lessonOne.style.display = "block";
      lessonTwo.style.display = "none";
      noMatchesBanner.style.display = "none";
    } else {
      lessonOne.style.display = "none";
      lessonTwo.style.display = "none";
      noMatchesBanner.style.display = "block";
    }
  }
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    search(e);
  }
});
