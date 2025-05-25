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

function next(choice) {
  taal = choice;
  document.getElementById("step1").classList.remove("active");
  document.getElementById("step2").classList.add("active");
}

function nextSim(value) {
  sim = value;
  document.getElementById("step2").classList.remove("active");

  if (sim === 0) {
    showAdvies("Geen 'twijfel' of 'onvoldoende'. Overweeg heroverweging na 6 maanden.");
  } else {
    if (taal === "successief") {
      document.getElementById("step5").classList.add("active");
    } else {
      document.getElementById("step3").classList.add("active");
    }
  }
}

function nextAge(val) {
  leeftijd = val;
  document.getElementById("step3").classList.remove("active");
  document.getElementById("step4").classList.add("active");
}

function checkELS() {
  const selected = document.querySelector('input[name="els"]:checked');
  if (!selected) {
    alert("Selecteer een ELS-score.");
    return;
  }
  elsScore = selected.value;
  document.getElementById("step4").classList.remove("active");

  if (taal === "1talig") {
    showAdviesViaELS();
  } else if (taal === "simultaan") {
    document.getElementById("step5").classList.add("active");
  }
}

function checkALDeQ() {
  const selected = document.querySelector('input[name="aldeq"]:checked');
  if (!selected) {
    alert("Selecteer een ALDeQ-score.");
    return;
  }
  const score = selected.value;

  if (sim === 1) {
    if (score === "gt71") {
      showAdvies("Onderwijstraject overwegen bij weinig vooruitgang na een half jaar. Siméa en ELS opnieuw invullen.");
    } else if (score === "btw64_71") {
      showAdvies("Onderwijstraject overwegen. Logopedische screening GGD of eerstelijns praktijk overwegen.");
    } else {
      showAdvies("Onderwijstraject + zorgtraject overwegen (mogelijke TOS).");
    }
  } else if (sim === 2) {
    if (score === "gt71") {
      showAdvies("Onderwijstraject overwegen. Logopedische screening GGD of eerstelijns praktijk overwegen.");
    } else {
      showAdvies("Onderwijstraject + zorgtraject overwegen.");
    }
  }
}

function showAdviesViaELS() {
  if ((leeftijd === "3-4" && elsScore === "ge24") || (leeftijd === "4-6" && elsScore === "ge25")) {
    if (sim === 1) {
      showAdvies("Onderwijstraject overwegen bij weinig vooruitgang na een half jaar. Siméa en ELS opnieuw invullen.");
    } else {
      showAdvies("Onderwijstraject + zorgtraject overwegen.");
    }
  } else {
    if (sim === 1) {
      showAdvies("Onderwijstraject overwegen. Logopedische screening GGD of eerstelijns praktijk overwegen.");
    } else {
      showAdvies("Onderwijstraject + zorgtraject overwegen.");
    }
  }
}

function showAdvies(text) {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  const adv = document.getElementById("advies");
  adv.classList.add("active");
  adv.innerHTML = `
    <strong>Advies:</strong><br>${text}<br><br>
    <button onclick="goBack('advies')">Terug naar start</button>
  `;
}

function goBack(fromStep) {
  document.getElementById(fromStep).classList.remove("active");
  switch (fromStep) {
    case 'step2':
      document.getElementById("step1").classList.add("active");
      break;
    case 'step3':
      document.getElementById("step2").classList.add("active");
      break;
    case 'step4':
      document.getElementById("step3").classList.add("active");
      break;
    case 'step5':
      if (taal === "successief") {
        document.getElementById("step2").classList.add("active");
      } else if (taal === "simultaan") {
        document.getElementById("step4").classList.add("active");
      }
      break;
    case 'advies':
      document.getElementById("step1").classList.add("active");
      break;
    default:
      alert("Kan niet terug.");
  }
}
