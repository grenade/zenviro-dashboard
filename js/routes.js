tt.app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'dashboardController',
            templateUrl: 'dashboard.html',
            activeRoute: 'dashboard'
        })
        .when('/apps', {
            controller: 'appsController',
            templateUrl: 'apps.html',
            activeRoute: 'apps'
        })
        .when('/app/:app_name', {
            controller: 'appController',
            templateUrl: 'app.html',
            activeRoute: 'apps'
        })
        .when('/paths', {
            controller: 'pathsController',
            templateUrl: 'paths.html',
            activeRoute: 'paths'
        })
        .when('/path/:share', {
            controller: 'pathController',
            templateUrl: 'path.html',
            activeRoute: 'paths'
        })
        .when('/environments', {
            controller: 'envsController',
            templateUrl: 'envs.html',
            activeRoute: 'envs'
        })
        .when('/environment/:env', {
            controller: 'envController',
            templateUrl: 'env.html',
            activeRoute: 'envs'
        })
        .when('/bot', {
            controller: 'botController',
            templateUrl: 'bot.html',
            activeRoute: 'bot'
        })
        .otherwise({ redirectTo: '/' });
});