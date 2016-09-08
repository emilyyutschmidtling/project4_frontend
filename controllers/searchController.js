angular
  .module('CFootprintsApp')
  .controller('SearchController', SearchController)

SearchController.$inject = ['$resource', 'NgMap', '$state', '$http']

function SearchController($resource, NgMap, $state, $http) {
  var vm = this;

  vm.cat = "Patches"

  vm.newAddresses = {
    origin: "1520 2nd St, Santa Monica, CA",
    destination: "11808 Kiowa Ave, Los Angeles, CA"
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

  function getDistance() {
    var origin = vm.origin.split(".").join("").split(",").join("").split(" ").join("+")
    var destination = vm.destination.split(".").join("").split(",").join("").split(" ").join("+")

    console.log("origin:", origin)
    console.log("destination:", destination)

    var driveRouteObject = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin +  "&destination=" + destination+ "4&key=AIzaSyBLZCoHtlBHXnz1j6iNOmh7H4b2t1Njryc"

    console.log("driveRouteObject", driveRouteObject)

    driveDistance = driveRouteObject
    // driveDistance = driveRouteObject.routes[0].legs[0].distance.text
    console.log(driveDistance)

    $http
      .get(driveDistance)
      .then(function(res) {
        console.log("distance:", res.data.routes[0].legs[0].distance.text)
        vm.drivingMiles = res.data.routes[0].legs[0].distance.text
      })

  }

}
