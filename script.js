angular.module('ToDoList', ['mongo'])
  .controller('ToDoListController', ['mongoList','$scope', function(mongoList, $scope) {
    $scope.tasks = [];
    mongoList.getTasks.then(function (response) {
        $scope.tasks = response.data;
    });

    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.tasks, function(task) {
        if (!task.done) count++;
      });
      return count;
    };    

    $scope.completeTask = function($event, task){
      task.done=!task.done;
      mongoList.updateTask(task);
    };

    $scope.saveTask = function () {
      if (this.new_task!=undefined)
      {
        $scope.tasks.push({text:this.new_task,done:false});
        mongoList.addTask({text:this.new_task,done:false});
        this.new_task=undefined;
      }
    };

  }]);