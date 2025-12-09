(function () {
  let apiCallInFlight = false;
  let timeout = null;

  const stateInputId = 109435844;
  const fullNameInputId = 109435868;
  const cityId = 109435843;
  const phoneId = 109435294;
  const addressOneId = 119786524;
  const zipId = 119786525;
  const npiId = 119712189;

  const fieldsToWatch = [stateInputId, cityId, phoneId]; 


  window.addEventListener("load", function () {
    prepareLoadingSpinner();

    const domAbstractionLayer = loader.getDOMAbstractionLayer();

    const stateControlInstance = loader.getEngine()
      .getDocument()
      .getElementById(stateInputId);

    stateControlInstance.on("value-change", function() {
      checkToSeeIfCallShouldBeMade();
    });

    const fullNameControlInstance = loader
      .getEngine()
      .getDocument()
      .getElementById(fullNameInputId);
    const firstNameInput = fullNameControlInstance.firstNameNode;
    const lastNameInput = fullNameControlInstance.lastNameNode;

    firstNameInput.addEventListener("keyup", function(event) {
      checkToSeeIfCallShouldBeMade();
    });

    lastNameInput.addEventListener("keyup", function(event) {
      checkToSeeIfCallShouldBeMade();
    });

    function checkToSeeIfCallShouldBeMade() {
      if (apiCallInFlight) return;

      const state = domAbstractionLayer.getControlValueById(stateInputId);
      if (!state || state.length <= 0) return;

      const firstName = firstNameInput.value;
      if (!firstName || firstName.length <= 0) return;

      const lastName = lastNameInput.value;
      if (!lastName || lastName.length <= 0) return;

      clearTimeout(timeout);

      timeout = setTimeout(function() {
        apiCallInFlight = true;
        checkNpiValues(state, firstName, lastName);
      }, 1000);
    }

    async function checkNpiValues(state, firstName, lastName) {
      showSpinner();
      removeAllOptions();
      const proxyUrl = `https://pgdy4cgem3.execute-api.us-east-1.amazonaws.com/npi-query/search?last_name=${lastName}&first_name=${firstName}&state=${state}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      hideSpinner();

      if (data.results.length === 0) {
        const newDiv = createSuggestionBox("No results found - Please manually enter physician");
        const parentElement = document.querySelector(`[data-id="${fullNameInputId}"]`);
        parentElement.appendChild(newDiv);
      }

      data.results.forEach(suggestion => {
        const firstName = suggestion.basic.first_name;
        const lastName = suggestion.basic.last_name;
        
        const locationAddress = suggestion.addresses.filter(a => a.address_purpose === "LOCATION");
        const address = locationAddress[0];
        const address_1 = address.address_1;
        const city = address.city;
        const state = address.state;
        const zip = address.postal_code.length === 9 ? splitZip(address.postal_code) : address.postal_code;

        const newDiv = createSuggestionBox(`${firstName} ${lastName} - ${address_1}, ${city}, ${state}  ${zip}`);
        newDiv.addEventListener("click", () => {
          apiCallInFlight = true;
          const firstLastParent = document.querySelector(`[data-id="${fullNameInputId}"]`);
          const firstLastInputs = firstLastParent.querySelectorAll("input");
          firstLastInputs[0].value = firstName;
          firstLastInputs[1].value = lastName;
          
          loader.getEngine().getDocument().getElementById(addressOneId).setValue({ value: address_1});
          loader.getEngine().getDocument().getElementById(cityId).setValue({ value: city});
          loader.getEngine().getDocument().getElementById(phoneId).setValue({ value: address.telephone_number});
          loader.getEngine().getDocument().getElementById(zipId).setValue({ value: zip });
          loader.getEngine().getDocument().getElementById(npiId).setValue({ value: suggestion.number });

          addClearingOfNpiListeners();
          removeAllOptions();

          apiCallInFlight = false;
        });
        const parentElement = document.querySelector(`[data-id="${fullNameInputId}"]`);
        parentElement.appendChild(newDiv);
      });

      apiCallInFlight = false;
    }

  });

  function createSuggestionBox(text) {
    const div = document.createElement("div");
    div.textContent = text;
    div.classList.add("physician-option");
    div.style.border = "1px solid #a0aec0";
    div.style.cursor = "pointer";
    return div;
  }

  function splitZip(zip) {
    return `${zip.substring(0, 5)}-${zip.substring(5)}`;
  }

  function addClearingOfNpiListeners() {
    const fullNameControlInstance = loader
      .getEngine()
      .getDocument()
      .getElementById(fullNameInputId);
    const firstNameInput = fullNameControlInstance.firstNameNode;
    const lastNameInput = fullNameControlInstance.lastNameNode;

    firstNameInput.addEventListener("keyup", clearHiddenFields);
    lastNameInput.addEventListener("keyup", clearHiddenFields);

    fieldsToWatch.forEach(fieldId => {
      const field = loader.getEngine().getDocument().getElementById(fieldId);
      field.on("value-change", clearHiddenFields);
    })
  }

  function clearHiddenFields() {
    loader.getEngine().getDocument().getElementById(addressOneId).setValue({ value: "" });
    loader.getEngine().getDocument().getElementById(zipId).setValue({ value: "" });
    loader.getEngine().getDocument().getElementById(npiId).setValue({ value: "" });

    removeNpiClearingListeners();
  }

  function removeNpiClearingListeners() {
    const fullNameControlInstance = loader
      .getEngine()
      .getDocument()
      .getElementById(fullNameInputId);
    const firstNameInput = fullNameControlInstance.firstNameNode;
    const lastNameInput = fullNameControlInstance.lastNameNode;

    firstNameInput.removeEventListener("keyup", clearHiddenFields);
    lastNameInput.removeEventListener("keyup", clearHiddenFields);
  }

  function prepareLoadingSpinner() {
    const spinnerContainer = document.createElement("div");
    spinnerContainer.id = "spinner-container";
    spinnerContainer.classList.add("loader-container");
    spinnerContainer.style.width = "100%";
    spinnerContainer.style.height = "100%";
    spinnerContainer.style.display = "none";
    spinnerContainer.style.justifyContent = "center";
    spinnerContainer.style.alignItems = "center";
    spinnerContainer.style.position = "fixed";
    spinnerContainer.style.zIndex = "1";
    spinnerContainer.style.backgroundColor = "rgba(0,0,0,0.3)";
    document.body.prepend(spinnerContainer);

    const spinner = document.createElement("div");
    spinner.classList.add("spinner");
    spinner.style.width = "64px";
    spinner.style.height = "64px";
    spinner.style.border = "8px solid";
    spinner.style.borderColor = "#FAA61A transparent #FAA61A transparent";
    spinner.style.borderRadius = "50%";

    const spinnerSpinning = [
      { transform: "rotate(0deg) scale(1)" },
      { transform: "rotate(360deg) scale(1)" }
    ];
    const spinnerTiming = {
      duration: 1200,
      iterations: Infinity
    }
    spinner.animate(spinnerSpinning, spinnerTiming);

    document.getElementById("spinner-container").appendChild(spinner);
  };

  function showSpinner() {
   const spinner = document.getElementById("spinner-container");
   spinner.style.display = "flex";
  }

  function hideSpinner() {
   const spinner = document.getElementById("spinner-container");
   spinner.style.display = "none";
  }

  function removeAllOptions() {
    document.querySelectorAll(".physician-option").forEach(element => element.remove());
  }

})();
