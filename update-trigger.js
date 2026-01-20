(function () {
  window.addEventListener("load", function () {
    setTimeout(function () {
      console.log("LOADED");
      const updateButton = document.querySelector('[data-role="update"]');
      if (updateButton) {
        updateButton.addEventListener("click", handleUpdate);
      }
    }, 15000);
    console.log("JAVASCRIPT ATTACHED 023");
  });

  function handleUpdate() {
    const fnInputIds = [
      120160623, 118780304, 118823933, 118824262, 118451600, 118616072,
      118626705, 118445458, 118631436, 119335174, 118716311, 118699257,
      118679395, 119020131, 118715807, 118813830, 118806546, 118836274,
      118653861, 118643415, 118666370, 118753396, 119483997, 118603080,
      118629078, 118595808, 118705065, 118616950, 118693049, 118658459,
      118804348, 118497202, 118258144, 117601937, 107316407,
    ];

    const currentInputId = fnInputIds.find((inputId) =>
      loader.getEngine().getDocument().getElementById(inputId)
    );

    const fnId = loader.getEngine().getDocument().getElementById(currentInputId).input.value;

    fetch("https://pgdy4cgem3.execute-api.us-east-1.amazonaws.com/npi-query/notify", {
      method: "POST",
      body: JSON.stringify({
        fn: fnId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  }

})();
