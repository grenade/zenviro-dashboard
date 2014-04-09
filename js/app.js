var tt = window.tt || {};
tt.app = angular.module('zenviro', ['ngRoute', 'ngTable', 'angular-websocket']);
tt.apiUrl = 'http://git.bfl.local/api/v3/repos/DevOps/zenviro-data/contents/api'
tt.gitDataRepoUrl = 'http://git.bfl.local/DevOps/zenviro-data'
tt.webSocketUri = 'ws://uk01351.bfl.local:8989';
tt.webSocketBufferSize = 500;