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
      controllerAs: 'loginCtrl'
    })

    .state('searchPage', {
      url: '/search',
      templateUrl: './templates/search.html',
      controller: 'SearchController',
      controllerAs: 'searchCtrl'
    })

    .state('resultsPage', {
      url: '/results',
      templateUrl: './templates/results.html',
      controller: 'ResultsController',
      controllerAs: 'resultsCtrl'
    })

    $urlRouterProvider.otherwise('/')
}
