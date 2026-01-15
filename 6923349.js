(function () {
  window.addEventListener("load", function () {
    loadAfterTimeout();
    console.log("JAVASCRIPT ATTACHED 005");

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
    const url = window.location.href;
    console.log("the url: ", url);
  }

})();
