angular.module('mongo', [])
  .factory('mongoList', [ '$http', function($http) {
    var apiKey = '?apiKey=4ry5AJm3ldhzJ0AhQO7vtHP29LtOrt_U';
    var collectionUrl = 'https://api.mongolab.com/api/1/databases/todolist/collections/list/';
    var getTasks = $http.get(collectionUrl+apiKey);
    var addTask = function(data) {
      return $http.post(collectionUrl+apiKey, data);
    }
    var updateTask = function(data) {
      console.log(collectionUrl+data._id.$oid+apiKey);
      return $http.put(collectionUrl+data._id.$oid+apiKey, data); 
    }
    return {
      getTasks: getTasks,
      addTask: addTask,
      updateTask: updateTask
    }

  }]);