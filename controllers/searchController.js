angular
  .module('CFootprintsApp')
  .controller('SearchController', SearchController)

SearchController.$inject = ['$resource', 'NgMap', '$state', '$http']

function SearchController($resource, NgMap, $state, $http) {
  var vm = this;

  vm.cat = "Patches"

  vm.newAddresses = {
    origin: "a",
    destination: "b"
  }
  vm.origin = ""
  vm.destination = ""

  vm.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLZCoHtlBHXnz1j6iNOmh7H4b2t1Njryc"

  NgMap.getMap('driving')
    .then(function(map) {
      vm.map = map;
      console.log("Driving Map")
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
  });

  NgMap.getMap('transit')
    .then(function(map) {
      vm.map = map;
      console.log("Transit Map")
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
  });


  vm.submitAddresses = submitAddresses

  function submitAddresses() {
    vm.newAddresses.origin = vm.origin
    vm.newAddresses.destination = vm.destination
    // $state.go('drivePage')
    console.log(vm.newAddresses)
    getDistance()
  }

  vm.getDistance = getDistance;
  vm.drivingMiles = "";
  vm.transitMiles = "";
  vm.drivingCO2 = "";
  vm.transitCO2 = "";

  function getDistance() {
    var origin = vm.origin.split(".").join("").split(",").join("").split(" ").join("+")
    var destination = vm.destination.split(".").join("").split(",").join("").split(" ").join("+")

    console.log("origin:", origin)
    console.log("destination:", destination)

    var driveRouteObject = "https://crossorigin.me/https://maps.googleapis.com/maps/api/directions/json?origin=" + origin +  "&destination=" + destination+ "&key=AIzaSyBLZCoHtlBHXnz1j6iNOmh7H4b2t1Njryc"

    var transitRouteObject = "https://crossorigin.me/https://maps.googleapis.com/maps/api/directions/json?origin=" + origin +  "&destination=" + destination+ "&mode=transit&key=AIzaSyBLZCoHtlBHXnz1j6iNOmh7H4b2t1Njryc"

    console.log("driveRouteObject", driveRouteObject)
    console.log("transitRouteObject", transitRouteObject)

    // driveDistance = driveRouteObject
    // driveDistance = driveRouteObject.routes[0].legs[0].distance.text

    $http
      // .get(driveRouteObject, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
      .get(driveRouteObject)
      .then(function(res) {
        console.log("distance:", res.data.routes[0].legs[0].distance.text)
        vm.drivingMiles = res.data.routes[0].legs[0].distance.text

        var numMilesDriving = vm.drivingMiles.split(" ").shift()
        console.log("numMilesDriving", numMilesDriving)

        vm.drivingCO2 = (numMilesDriving * 0.355).toFixed(3)
        console.log("drivingCO2", vm.drivingCO2)
      })

    $http
      // .get(transitRouteObject, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
      .get(transitRouteObject)
      .then(function(res) {
        console.log("distance:", res.data.routes[0].legs[0].distance.text)
        vm.transitMiles = res.data.routes[0].legs[0].distance.text

        var numMilesTransit = vm.transitMiles.split(" ").shift()
        console.log("numMilesTransit", numMilesTransit)

        vm.transitCO2 = (numMilesTransit * 0.055).toFixed(3)
        console.log("transitCO2", vm.transitCO2)
      })

  }


}
