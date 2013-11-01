'use strict';

angular.module('dashSupervisorFrontApp')
  .controller('ServerdetailCtrl', function ($scope, $http, $routeParams) {
      $scope._id = $routeParams.id;
      $http({method: "GET",url:"/server/"+$scope._id+"/process"})
          .success(function (data, status){
                console.log(data);
                $scope._by_groupname = $scope._divide_by_groupname(data);
                $scope.process = data;
          })
          .error(function (data, status){
          });

      $scope._divide_by_groupname = function(process_list){
        console.log(process_list);
        var _by_groupname = {};
        process_list.forEach(function (p){
            if (!_by_groupname[p.group]){
                _by_groupname[p.group] = Array();
            }
            _by_groupname[p.group].push(p);
        });
        return _by_groupname;
      };

      $scope._action_on_process = function(action, procname){
            console.log(action+" Process: "+procname);
            $http({method: "POST",url:"/server/"+$scope._id+"/"+action, data: {process:procname}})
                .success(function (data, status){
                    console.log(data);
                })
                .error(function (data, status){
                    console.log("erro");
                    console.log(data);
                    console.log(status);
                });
      };

      $scope._stop = function(procname){
          $scope._action_on_process("stop", procname);
      };

      $scope._start = function(procname){
          $scope._action_on_process("start", procname);
      };

  });