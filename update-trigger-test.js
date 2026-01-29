(function () {
  window.addEventListener("load", function () {
    console.log("JS LOADED 003");
    setTimeout(function () {
      const updateButton = document.querySelector('[data-role="update"]');
      if (updateButton) {
        updateButton.addEventListener("click", handleUpdate);
      }
    }, 8000);
  });

  function handleUpdate() {
    const fnInputIds = [
      120160623, 118780304, 118823933, 118824262, 118451600, 118616072,
      118626705, 118445458, 118631436, 119335174, 118716311, 118699257,
      118679395, 119020131, 118715807, 118813830, 118806546, 118836274,
      118653861, 118643415, 118666370, 118753396, 119483997, 118603080,
      118629078, 118595808, 118705065, 118616950, 118693049, 118658459,
      118804348, 118497202, 118258144, 117601937, 107316407
    ];

    const formNameFieldIds = [120160957, 118258147];

    const currentFnInputId = fnInputIds.find((inputId) => {
      return loader.getEngine().getDocument().getElementById(inputId);
    });

    const currentFormNameFieldId = formNameFieldIds.find((fieldId) => {
      return loader.getEngine().getDocument().getElementById(fieldId);
    });

    const fnId = loader.getEngine().getDocument().getElementById(currentFnInputId).input.value;
    const formName = loader.getEngine().getDocument().getElementById(currentFormNameFieldId).input.value;

    const urlParams = new URLSearchParams(window.location.search);
    const formNumber = urlParams.get("s");

    console.log("json to send: ", {
        fn: fnId ? fnId : "",
        formNumber: formNumber ? formNumber : "",
        formName: formName ? formName : ""
    });

    // fetch("https://pgdy4cgem3.execute-api.us-east-1.amazonaws.com/npi-query/notify", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     fn: fnId ? fnId : "",
    //     formNumber: formNumber ? formNumber : "",
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   }
    // });
  }

})();
