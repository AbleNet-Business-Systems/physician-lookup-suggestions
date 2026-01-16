(function () {
  window.addEventListener("load", function () {
    loadAfterTimeout();
    console.log("JAVASCRIPT ATTACHED 016");
  });

  function loadAfterTimeout() {
    setTimeout(function() {
        console.log("LOADED");
        const updateButton = document.querySelector('[data-role="update"]');
        if (updateButton) {
          updateButton.addEventListener("click", handleUpdate);
        }
    }, 8000);
  }

  function handleUpdate() {
    // const fn = loader.getEngine().getDocument().getElementById(fnInputId).input.value;

    const fnInputIds = ["#120160623"];
    const selectorString = fnInputIds.join(", ");
    console.log("selector string: ", selectorString);
    const fn = document.querySelector(selectorString);
    console.log("fn:", fn);

    // fetch("https://pgdy4cgem3.execute-api.us-east-1.amazonaws.com/npi-query/notify", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     fn: fn
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   }
    // });
  }

})();
