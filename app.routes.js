angular
  .module('CFootprintsApp')
  .config(AppRoutes)

// AppRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

function AppRoutes($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('homePage', {
      url: '/',
      templateUrl: './templates/home.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })

    .state('searchPage', {
      url: '/search',
      templateUrl: './templates/search.html',
      controller: 'SearchController',
      controllerAs: 'searchCtrl'
    })

    .state('drivePage', {
      url: '/drive',
      templateUrl: './templates/drive.html',
      controller: 'SearchController',
      controllerAs: 'searchCtrl'
    })

    .state('transitPage', {
      url: '/transit',
      templateUrl: './templates/transit.html',
      controller: 'SearchController',
      controllerAs: 'searchCtrl'
    })

    $urlRouterProvider.otherwise('/')
}
