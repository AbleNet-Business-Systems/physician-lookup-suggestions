(function () {
  const fnInputId = 120160623;

  window.addEventListener("load", function () {
    loadAfterTimeout();
    console.log("JAVASCRIPT ATTACHED 010");
  });

  function loadAfterTimeout() {
    setTimeout(function() {
        console.log("timeout complete");
        const updateButton = document.querySelector('[data-role="update"]');
        console.log("updateButton: ", updateButton);
        if (updateButton) {
          updateButton.addEventListener("click", handleUpdate);
        }
    }, 10000);
  }

  function handleUpdate() {
    const fn = loader.getEngine().getDocument().getElementById(fnInputId).input.value;
    console.log("fn: ", fn);

    fetch("https://pgdy4cgem3.execute-api.us-east-1.amazonaws.com/test/notify", {
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
