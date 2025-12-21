const fromSelect = document.querySelector("#from-lang");
const toSelect = document.querySelector("#to-lang");
const inputText = document.querySelector("#input-text");
const translateBtn = document.querySelector("#translate-btn");

document.addEventListener("DOMContentLoaded", async function () {
  const url = "https://google-translator9.p.rapidapi.com/v2/languages";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "2e8fcaf519mshbdab5530f4894b6p140f82jsn8772d6155db1",
      "x-rapidapi-host": "google-translator9.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    readOptions(result.data.languages);

    // console.log(result);
  } catch (error) {
    console.error(error);
  }
});
function readOptions(languages) {
  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";

  languages.forEach((item) => {
    const code = item.language;

    const optionFrom = document.createElement("option");
    optionFrom.value = code;
    optionFrom.textContent = code;
    fromSelect.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = code;
    optionTo.textContent = code;
    toSelect.appendChild(optionTo);
  });
}
async function translate() {
  const url = "https://google-translator9.p.rapidapi.com/v2";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "2e8fcaf519mshbdab5530f4894b6p140f82jsn8772d6155db1",
      "x-rapidapi-host": "google-translator9.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: inputText.value,
      source: fromSelect.value,
      target: toSelect.value,
      format: "text",
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const translatedText = result.data.translations[0].translatedText;

    const outputDiv = document.createElement("div");
    outputDiv.classList.add("output");
    outputDiv.id = "output-text";
    outputDiv.textContent = translatedText;
    const container = document.querySelector(".container");
    container.appendChild(outputDiv);
  } catch (error) {
    console.error(error);
  }
}
translateBtn.addEventListener("click", translate);
