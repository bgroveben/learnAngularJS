describe('directives', function(){

  beforeEach(module('AppMarketApp'));
  beforeEach(module('js/directives/appInfo.html'));

  beforeEach(inject(function($rootScope, $compile, $injector) {
    elm = angular.element("<app-info info='info'></app-info>");

    scope = $rootScope;
    scope.info = {icon: "https://www.google.com/images/srpr/logo11w.png", title: "hello", developer: "kelvin", price: 19};

    $compile(elm)(scope);
    scope.$digest();
  }));

  it('Did you display an app\'s info in js/directives/appInfo.html?', inject(function($controller) {
    var title = elm.find('h2');

    expect(title.text()).toBe('hello');
  }));

});
