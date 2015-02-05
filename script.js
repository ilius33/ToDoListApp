angular.module('ToDoList', [])
  .controller('ToDoListController', ['$scope', function($scope) {
    $scope.tasks = [
      {text:"very long text first task already done very long text first task already done", done:true},
      {text:"second task", done:false}
    ];

    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.tasks, function(task) {
        if (!task.done) count++;
      });
      return count;
    };    

    $scope.completeTask = function($event, task){
      task.done=!task.done;
    };

    $scope.saveTask = function () {
      if (this.new_task!=undefined)
      {
        console.log(this.new_task);
        $scope.tasks.push({text:this.new_task,done:false});
        this.new_task=undefined;
      }
    };

  }]);