describe('Routes test', function() {
  // Mock our module in our tests
  beforeEach(module('GalleryApp'));
  // We want to store a copy of the three services we'll use in our tests so we can reference them later
  var $location, $route, $rootScope;
  // Add underscores in our dependencies to avoid conflicting with variable names
  // Angular will strip out the _ and inject the dependencies
  beforeEach(inject(function(_$controller_, _$location_, _$route_, _$rootScope_){
    $controller = _$controller_;
    $location = _$location_;
    $route = _$route_;
    $rootScope = _$rootScope_;
    PhotoController = $controller('PhotoController', { $scope: $rootScope, $routeParams: {id: '1'}});
  }));
  // Set up a mock backend to handle fetching the templates from templateUrl
  beforeEach(inject(function($httpBackend){
    $httpBackend.whenGET('views/home.html').respond(200, 'main HTML');
    $httpBackend.whenGET('views/photo.html').respond(200, 'photo HTML');
    $httpBackend.whenGET('https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/photos.json').respond([
              {
                "title": "Canada",
                "author": "Tim Gage",
                "url": "http://dl.dropboxusercontent.com/u/110238630/ltp4-photos-api/canada.jpg",
                "pubdate": 1412208000000,
                "upvotes": 60,
                "views": 1195
              }])
  }));
  it('Did you use .when() to map the URL /photos/:id?', function(){
    expect($location.path()).toBe('');
    $location.path('/photos/1');
    $rootScope.digest();
    expect($location.path()).toBe('photos/1');
    expect($route.current.controller).toBe('PhotoController');
  });
});
