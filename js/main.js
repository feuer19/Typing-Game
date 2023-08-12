//변수
const GAME_TIME = 11;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

Init();

// 초기 화면 랜더링
function Init() {
  buttonChange("loading..");
  getWords();
  wordInput.addEventListener("input", checkMatch);
}

//게임 실행
function run() {
  if (isPlaying) return;
  isPlaying = true;
  time = GAME_TIME;
  wordInput.focus();
  scoreDisplay.innerHTML = 0;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkSatus, 50);
  buttonChange("Ongoing");
}

//게임 상태 확인
function checkSatus() {
  if (!isPlaying && time === 0) {
    buttonChange("Game Start");
    clearInterval(checkInterval);
  }
}

//단어 불러오기
function getWords() {
  // 지정된 ID를 가진 유저에 대한 요청
  axios
    .get("https://random-word-api.herokuapp.com/word?number=100")
    .then(function (response) {
      // 성공 핸들링
      response.data.forEach((word) => {
        if (word.length < 10) {
          words.push(word);
        }
      });
      buttonChange("Game Start");
    })
    .catch(function (error) {
      // 에러 핸들링
      console.log(error);
    });
}

//단어일치 체크
function checkMatch() {
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = "";
    if (!isPlaying) {
      return;
    }
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random() * words.length);
    wordDisplay.innerText = words[randomIndex];
  }
}

//시간 체크
function countDown() {
  time > 0 ? time-- : (isPlaying = false);
  if (!isPlaying) {
    clearInterval(timeInterval);
  }
  timeDisplay.innerText = time;
}

//버튼상태 변경
function buttonChange(text) {
  button.innerText = text;
  text === "Game Start"
    ? button.classList.remove("loading")
    : button.classList.add("loading");
}
