tt.app.controller("dashboardController", dashboardController);
tt.app.controller("appNamesController", appNamesController);
tt.app.controller("hostNamesController", hostNamesController);
tt.app.controller("jumbotronController", jumbotronController);
tt.app.controller("tableController", tableController);
tt.app.controller("webTableController", webTableController);
tt.app.controller("svcTableController", svcTableController);
tt.app.controller("appsController", appsController);
tt.app.controller("appController", appController);
tt.app.controller("appHistoryController", appHistoryController);
tt.app.controller("pathsController", pathsController);
tt.app.controller("pathController", pathController);
tt.app.controller("envsController", envsController);
tt.app.controller("envController", envController);
tt.app.controller("envCodesController", envCodesController);
tt.app.controller("navController", navController);
tt.app.controller("botController", botController);

function botController($scope, WebSocket) {
    $scope.alive = false;
    $scope.botConsoleHeight = $(window).height() - 240;
    $scope.messages = [];
    var mouseButtonDown = false;
    $(document).mousedown(function(e){ mouseButtonDown = true; });
    $(document).mouseup(function(e){ mouseButtonDown = false; });
    $scope.isAlive = function() {
        return WebSocket != undefined
            && WebSocket.currentState() == 'OPEN';
    };
    WebSocket.onopen(function() {
        console.log('WebSocket opened');
        $scope.alive = true;
        WebSocket.send('{ "source": "client", "message": "Web Socket server at: ' + tt.webSocketUri + ', listening and responding.", "severity": "Information" }');
    });
    WebSocket.onmessage(function(event) {
        console.log('WebSocket message: ', event.data);
        if ($scope.messages.push(JSON.parse(event.data)) > tt.webSocketBufferSize) {
            $scope.messages.shift()
        }
        if(!mouseButtonDown) {
            $('#botConsole').scrollTop($('#botConsole')[0].scrollHeight);
        }
    });
    WebSocket.onclose(function(event) {
        console.log('WebSocket closed');
        $scope.alive = false;
    });
}
function navController($scope, $route) {
    $scope.isActive = function(route) {
        return route && $route && $route.current && route === $route.current.activeRoute;
    };
}
function dashboardController($scope) {
}

function appNamesController($scope, $http) {
    $scope.loadAppNames = function () {
        $http({ method: 'GET', url: tt.apiUrl + '/app-names.json' }).success(function (data) {
            $scope.appNames = JSON.parse(window.atob(data.content));
        });
    };
    $scope.loadAppNames();
}

function hostNamesController($scope, $http) {
    $scope.loadHostNames = function () {
        $http({ method: 'GET', url: tt.apiUrl + '/host-names.json' }).success(function (data) {
            $scope.hostNames = JSON.parse(window.atob(data.content));
        });
    };
    $scope.loadHostNames();
}

function appsController($scope, $http) {
    appNamesController($scope, $http);
    hostNamesController($scope, $http);
}

function appController($scope, $routeParams, $http) {
    $scope.loadApps = function () {
        $http({ method: 'GET', url: tt.apiUrl + '/app/' + $routeParams.app_name + '.json' }).success(function (data) {
            $scope.apps = JSON.parse(window.atob(data.content));
            $scope.app_name = $routeParams.app_name
        });
    };
    $scope.gitDataRepoUrl = tt.gitDataRepoUrl;
    $scope.loadApps();
}
function appHistoryController($scope, $routeParams, $http) {
    $scope.loadAppHistory = function () {
        $http({ method: 'GET', url: tt.apiUrl + '/history/' + $routeParams.app_name + '.json' }).success(function (data) {
            $scope.appHistory = JSON.parse(window.atob(data.content));
        });
    };
    $scope.loadAppHistory();
}

function pathsController($scope, $http) {
    $scope.loadPaths = function () {
        $http({ method: 'GET', url: tt.apiUrl + '/paths.json' }).success(function (data) {
            $scope.paths = JSON.parse(window.atob(data.content));
        });
    };
    $scope.loadPaths();
}

function pathController($scope, $filter, $location, $routeParams, $http) {
    $scope.loadPath = function () {
        $http({ method: 'GET', url: tt.apiUrl + '/env-codes.json' }).success(function (envData) {
            $scope.envs = JSON.parse(window.atob(envData.content));
            $http({ method: 'GET', url: tt.apiUrl + '/path/' + $filter('tofilename')($routeParams.share) + '.json' }).success(function (pathData) {
                $scope.path = JSON.parse(window.atob(pathData.content));
                $scope.share = $routeParams.share
            });
        });
    };
    $scope.update = function(path) {
        $http.put('/api/path', path).success(function () {
            $location.path( "/paths" );
        });
    };
    $scope.loadPath();
}

function envsController($scope, $http) {
    $scope.loadHistory = function () {
        $http({ method: 'GET', url: tt.apiUrl + '/history.json' }).success(function (data) {
            $scope.appHistory = JSON.parse(window.atob(data.content));
        });
    };
    $scope.gitDataRepoUrl = tt.gitDataRepoUrl;
    $scope.loadHistory();
}

function envController($scope, $routeParams, $http) {
    $scope.loadEnv = function () {
        $http({ method: 'GET', url: tt.apiUrl + '/env-codes.json' }).success(function (envData) {
            $scope.envs = JSON.parse(window.atob(envData.content));
            $http({ method: 'GET', url: tt.apiUrl + '/history/' + $routeParams.env + '.json' }).success(function (data) {
                $scope.appHistory = JSON.parse(window.atob(data.content));
            });
        });
    };
    $scope.gitDataRepoUrl = tt.gitDataRepoUrl;
    $scope.loadEnv();
}

function envCodesController($scope, $routeParams, $http) {
    $scope.loadEnvCodes = function () {
        $http({ method: 'GET', url: tt.apiUrl + '/env-codes.json' }).success(function (data) {
            $scope.envCodes = JSON.parse(window.atob(data.content));
        });
    };
    $scope.loadEnvCodes();
}

function jumbotronController($scope) {
    $scope.jt = false;
    $scope.toggle = function () {
        $scope.jt = !$scope.jt;
    };
    $scope.showJumboTron = function () {
        return $scope.jt;
    };
}

function webTableController($scope, $http, $filter, ngTableParams) {
    tableController($scope, $http, $filter, ngTableParams, 'web')
}

function svcTableController($scope, $http, $filter, ngTableParams) {
    tableController($scope, $http, $filter, ngTableParams, 'svc')
}

function tableController($scope, $http, $filter, ngTableParams, role) {
    $scope.ea = true;
    $scope.toggle = function () {
        $scope.ea = !$scope.ea;
        $scope.$groups.forEach(function (g) {
            g.$hideRows = !$scope.ea;
        });
    };
    $scope.expandAll = function () {
        return $scope.ea;
    };

    $scope.loadApps = function () {
        $http({ method: 'GET', url: tt.apiUrl + '/app/' + role + '.json' }).success(function (response) {
            var data = JSON.parse(window.atob(response.content));
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 100 // count per page
            },
            {
                groupBy: 'Name',
                total: data.length,
                getData: function($defer, params) {
                    var orderedData = params.sorting()
                        ? $filter('orderBy')(data, $scope.tableParams.orderBy())
                        : data;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        });
    };
    $scope.loadApps();
}