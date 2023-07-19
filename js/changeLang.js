const selectEl = document.querySelector("select");
const allLangs = ["en", "ua", "ru"];

getLanguages();
async function getLanguages() {
  const response = await fetch("./js/langs.json");
  const languageObj = await response.json();
  changeLanguage(languageObj);
}

selectEl.addEventListener("change", changeURLLanguage);

//перенаправить на URL с указание языка
function changeURLLanguage() {
  let lang = selectEl.value;
  location.href = window.location.pathname + "#" + lang;
  location.reload();
}

// меняем язык согласно выбраному селекту
function changeLanguage(langs) {
  //получаем вибранный язык с юрл
  let hash = window.location.hash;
  hash = hash.substring(1);

  // делаем проверку что мы ввели верный URL иначе, выводим язык по умолчашнию
  if (!allLangs.includes(hash)) {
    location.href = window.location.pathname + "#ua";
    location.reload();
  }
  //устапавливаем выбраный язык
  selectEl.value = hash;

  document.querySelector("title").textContent = langs["title"][hash];

  for (let key in langs) {
    if (key === "title") {
      continue;
    }

    const content = langs[key][hash];
    // console.dir( document.querySelector(".lng-" + key).textContent)
    document.querySelector(".lng-" + key).textContent = content;
  }
}
