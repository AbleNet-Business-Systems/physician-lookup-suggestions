(function () {
  const fnInputId = 120160623;

  window.addEventListener("load", function () {
    loadAfterTimeout();
    console.log("JAVASCRIPT ATTACHED 012");
  });

  function loadAfterTimeout() {
    setTimeout(function() {
        const updateButton = document.querySelector('[data-role="update"]');
        if (updateButton) {
          updateButton.addEventListener("click", handleUpdate);
        }
    }, 15000);
  }

  function handleUpdate() {
    console.log("LOADED");
    const fn = loader.getEngine().getDocument().getElementById(fnInputId).input.value;

    fetch("https://pgdy4cgem3.execute-api.us-east-1.amazonaws.com/npi-query/notify", {
      method: "POST",
      body: JSON.stringify({
        fn: fn
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  }

})();
