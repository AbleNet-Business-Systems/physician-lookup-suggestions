(function () {
  window.addEventListener("load", function () {
    loadAfterTimeout();
    console.log("JAVASCRIPT ATTACHED 004");

    // const updateButton = loader
    //   .getEngine()
    //   .getDocument();
    //   .querySelector('[data-role="update"]');

    const updateButton = document.querySelector('[data-role="update"]');
    console.log("update button: ", updateButton);

  });

  function loadAfterTimeout() {
    setTimeout(function() {
        console.log("timeout complete");
        const updateButton = document.querySelector('[data-role="update"]');
        console.log("update button: ", updateButton);
    }, 10000);
  }

})();
