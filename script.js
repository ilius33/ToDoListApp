angular.module('ToDoList', ['mongo'])
  .directive('todoList', function() {
    return {
      restrict: 'E',
      scope: {
        disabled:'@'
      },
      controller: ['$scope','mongoList', function($scope, mongoList){
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
      }],
      template: ' \
        <div class="todo-list"> \
          <div class="todo-list-row "> \
            <div class="todo-list-check-col"></div> \
            <div class="todo-list-text-col todo-list-text-col_heading">I want to...</div> \
          </div> \
          <div class="todo-list-row" ng-repeat="task in tasks"> \
            <div class="todo-list-check-col"><input type="checkbox" ng-disabled="disabled" ng-click="completeTask($event, task)" ng-checked="task.done"></div> \
            <div class="todo-list-text-col" ng-class="{\'todo-list-text-col_done\': task.done }">{{task.text}}</div> \
          </div> \
          <div class="todo-list-row"> \
            <div class="todo-list-check-col"></div> \
            <div class="todo-list-text-col"><form ng-submit="saveTask()"><input class="todo-list-input" type="text" ng-disabled="disabled" ng-model="new_task" ng-minlength="1" required></form></div> \
          </div> \
          <div class="todo-list-row"> \
            <div class="todo-list-check-col"></div> \
            <div class="todo-list-text-col todo-list-text-col_footer">{{remaining()}} task(s) remaining</div> \
          </div> \
        </div>'
    };
  });