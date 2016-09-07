angular
  .module('CFootprintsApp')
  .controller('SearchController', SearchController)

SearchController.$inject = ['$resource', 'NgMap']

function SearchController($resource, NgMap) {
  var vm = this;

  vm.cat = "Patches"

  vm.newAddresses = {
    origin: "1520 2nd St, Santa Monica, CA",
    destination: "11808 Kiowa Ave, Los Angeles, CA"
  }
  vm.origin = ""
  vm.destination = ""

  vm.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLZCoHtlBHXnz1j6iNOmh7H4b2t1Njryc"

  NgMap.getMap()
    .then(function(map) {
      vm.map = map;
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
  });

  vm.submitAddresses = submitAddresses

  function submitAddresses() {

    vm.newAddresses.origin = vm.origin
    vm.newAddresses.destination = vm.destination
    console.log(vm.newAddresses)
  }
}

// ==========================
//
// ==========================
