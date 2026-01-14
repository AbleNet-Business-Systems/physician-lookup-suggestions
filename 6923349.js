(function () {

  window.addEventListener("load", function () {
    console.log("JAVASCRIPT ATTACHED 002");
  });

  const updateButton = loader
      .getEngine()
      .getDocument()
      .querySelector('[data-role="update"]');

    console.log("update button: ", updateButton);

})();
