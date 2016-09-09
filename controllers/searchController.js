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

  function getDistance() {
    var origin = vm.origin.split(".").join("").split(",").join("").split(" ").join("+")
    var destination = vm.destination.split(".").join("").split(",").join("").split(" ").join("+")

    console.log("origin:", origin)
    console.log("destination:", destination)

    var driveRouteObject = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin +  "&destination=" + destination+ "&key=AIzaSyBLZCoHtlBHXnz1j6iNOmh7H4b2t1Njryc"

    var transitRouteObject = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin +  "&destination=" + destination+ "&mode=transit&key=AIzaSyBLZCoHtlBHXnz1j6iNOmh7H4b2t1Njryc"

    console.log("driveRouteObject", driveRouteObject)
    console.log("transitRouteObject", transitRouteObject)

    // driveDistance = driveRouteObject
    // driveDistance = driveRouteObject.routes[0].legs[0].distance.text

    $http
      .get(driveRouteObject)
      .then(function(res) {
        console.log("distance:", res.data.routes[0].legs[0].distance.text)
        vm.drivingMiles = res.data.routes[0].legs[0].distance.text
      })

    $http
      .get(transitRouteObject)
      .then(function(res) {
        console.log("distance:", res.data.routes[0].legs[0].distance.text)
        vm.transitMiles = res.data.routes[0].legs[0].distance.text
      })

  }

}
