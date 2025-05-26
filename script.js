document.addEventListener('DOMContentLoaded', function() {
  fetch('nav.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelector(`a[href="${currentPage}"]`)?.classList.add('active');
    });
});

 let taal = "";
    let sim = 0;
    let leeftijd = "";
    let elsScore = "";
function startVragenlijst() {
  document.getElementById("startScreen").classList.remove("active");
  document.getElementById("step1").classList.add("active");
}

    function next(choice) {
      taal = choice;
      showStep('step2');
    }

    function nextSim(value) {
      sim = value;
      if (sim === 0) {
        showAdvies("Geen 'twijfel' of 'onvoldoende'. Heroverweging na 6 maanden.");
      } else {
        if (taal === "successief") showStep('step5');
        else showStep('step4');
      }
    }

    function nextAge(val) {
      leeftijd = val;
      showStep('step4');
    }

    function checkELS() {
      const selected = document.querySelector('input[name="els"]:checked');
      if (!selected) return alert("Selecteer een ELS-score.");
      elsScore = selected.value;

      if (taal === "1talig") showAdviesViaELS();
      else showAdviesViaELS();
    }

    function checkALDeQ() {
      const selected = document.querySelector('input[name="aldeq"]:checked');
      if (!selected) return alert("Selecteer een ALDeQ-score.");
      const score = selected.value;

      if (sim === 1) {
        if (score === "gt71")
          showAdvies("Onderwijstraject overwegen. Nederlandse taal stimuleren.");
        else if (score === "btw64_71")
          showAdvies("Onderwijstraject overwegen. Nederlandse taal stimuleren. Logopedische screening bij GGD of eerstelijns praktijk aan ouders adviseren.");
        else
          showAdvies("Onderwijstraject + zorgtraject, inclusief uitgebreid diagnostisch onderzoek, overwegen.");
      } else if (sim === 2) {
        if (score === "gt71")
          showAdvies("Onderwijstraject + zorgtraject, inclusief uitgebreid diagnostisch onderzoek, adviseren");
        else
          showAdvies("Onderwijstraject + zorgtraject, inclusief uitgebreid diagnostisch onderzoek, adviseren");
      }
    }

    function showAdviesViaELS() {
      const isHoog = (elsScore === "ge24") || (elsScore === "ge25");
      if (isHoog) {
        if (sim === 1)
          showAdvies("Onderwijstraject overwegen bij weinig vooruitgang. Na een half jaar Siméa en ELS opnieuw invullen.");
        else
          showAdvies("Onderwijstraject overwegen. Logopedische screening bij GGD of eerstelijns praktijk aan ouders adviseren.");
      } else {
        if (sim === 1)
          showAdvies("Onderwijstraject overwegen. Logopedische screening GGD of eerstelijns praktijk overwegen.");
        else
          showAdvies("Onderwijstraject + zorgtraject overwegen.");
      }
    }

    function showAdvies(text) {
      hideAll();
      const adv = document.getElementById("advies");
      adv.classList.add("active");
      adv.innerHTML = `
        <strong>Advies:</strong><br>${text}<br><br>
        <button onclick="restart()">Opnieuw beginnen</button>
      `;
    }

    function showStep(stepId) {
      hideAll();
      document.getElementById(stepId).classList.add("active");
    }

    function hideAll() {
      document.querySelectorAll("#taalAdviesContainer .step").forEach(s => s.classList.remove("active"));
    }

    function restart() {
      taal = ""; sim = 0; leeftijd = ""; elsScore = "";
      showStep("step1");
    }

    function goBack(fromStep) {
      hideAll();
      switch (fromStep) {
        case 'step2': showStep('step1'); break;
        case 'step3': showStep('step2'); break;
        case 'step4': showStep('step2'); break;
        case 'step5':
          if (taal === "successief") showStep('step2');
          else showStep('step4');
          break;
        default: showStep('step1');
      }
    }

function berekenSpraakTaal() {
  let score = 0;
  for (let i = 1; i <= 7; i++) {
    const antwoord = document.querySelector(`input[name="q${i}"]:checked`);
    score += antwoord ? parseInt(antwoord.value) : 0;
  }

  const leeftijd = document.getElementById("leeftijd").value;
  if (!leeftijd) {
    alert("Selecteer de leeftijd van het kind.");
    return;
  }

  let uitspraak = "Onvoldoende";

  if (leeftijd === "4") {
    if (score === 4) uitspraak = "Twijfel";
    else if (score >= 5) uitspraak = "Voldoende";
  } else if (leeftijd === "5") {
    if (score === 5) uitspraak = "Twijfel";
    else if (score >= 6) uitspraak = "Voldoende";
  } else if (leeftijd === "6") {
    if (score === 6) uitspraak = "Twijfel";
    else if (score >= 7) uitspraak = "Voldoende";
  }

  const uitslagElement = document.getElementById("uitslagSpraakTaal");
  uitslagElement.innerHTML = `Totaalscore: ${score}<br>Beoordeling: <strong>${uitspraak}</strong>`;
}

function berekenSpraakTaal2() {
  let score = 0;
  for (let i = 1; i <= 8; i++) {
    const antwoord = document.querySelector(`input[name="q${i}"]:checked`);
    score += antwoord ? parseInt(antwoord.value) : 0;
  }

 

  let uitspraak = "Twijfel";

  if (score === 8) {
    uitspraak = "Geen twijfel"
  }
  

  const uitslagElement = document.getElementById("uitslagSpraakTaal2");
  uitslagElement.innerHTML = `Totaalscore: ${score}<br>Beoordeling: <strong>${uitspraak}</strong>`;
}
