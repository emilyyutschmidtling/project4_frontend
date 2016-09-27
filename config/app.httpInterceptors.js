(function() {
  "use strict";

  angular
    .module("CFootprintsApp")
    .config(configure);

  configure.$inject = ["$httpProvider"];

  function configure($httpProvider) {
    $httpProvider.interceptors.push("jsonHeadersService");
    $httpProvider.interceptors.push("tokenSigningService");
    $httpProvider.interceptors.push("authErrorRedirect");
    console.log("http", $httpProvider.interceptors)
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }

})();
