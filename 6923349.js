(function () {
  const fnInputId = 120160623;

  window.addEventListener("load", function () {
    loadAfterTimeout();
    console.log("JAVASCRIPT ATTACHED 007");

    // const updateButton = loader
    //   .getEngine()
    //   .getDocument();
    //   .querySelector('[data-role="update"]');

    // const updateButton = document.querySelector('[data-role="update"]');

  });

  function loadAfterTimeout() {
    setTimeout(function() {
        console.log("timeout complete");
        const updateButton = document.querySelector('[data-role="update"]');
        updateButton.addEventListener("click", handleUpdate);
    }, 10000);
  }

  function handleUpdate() {
    // const url = window.location.href;
    // console.log("the url: ", url);

    const fn = loader.getEngine().getDocument().getElementById(fnInputId).input.value;
    console.log("fn: ", fn);

    fetch("https://hooks.zapier.com/hooks/catch/24234008/ugkuyvf/", {
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
