var app = angular.module("myApp", ["ui.bootstrap"]);
app.controller("myCtrl", function($scope, $http) {
  $scope.itemsPerPage = 10;

  /**
   * Start Of Star Wars Characters
   */
  $scope.starWarsCharactersPage = 1;
  $scope.starWarsCharactersPageIndex = 0;
  $scope.starWarsCharacters = [];
  $scope.totalStarWarsCharacters = 0;
  $scope.searchText = "";
  $scope.getStarWarsCharacters = function(param, event) {
    var url = "";
    if (event == "pageChange") {
      $scope.starWarsCharactersPage = param;
      url = "?page=" + $scope.starWarsCharactersPage;
      if ($scope.searchText) {
        url = url + "&search=" + $scope.searchText;
      }
    }
    if (event == "search") {
      $scope.starWarsCharactersPage = 1;
      url = "?search=" + param;
    }
    $http({
      method: "GET",
      url: "https://swapi.co/api/people/" + url
    }).then(
      function successCallback(response) {
        $scope.totalStarWarsCharacters = response.data.count;
        $scope.starWarsCharacters = response.data.results;
        console.log("$scope.starWarsCharacters", $scope.starWarsCharacters);
        $scope.starWarsCharactersPageIndex =
          ($scope.starWarsCharactersPage - 1) * $scope.itemsPerPage;
      },
      function errorCallback(response) {}
    );
  };
  //   Default Call to getStarWarsCharacters with default page as 1
  $scope.getStarWarsCharacters(1, "pageChange");

  /**
   * End Of Star Wars Characters
   */
});
