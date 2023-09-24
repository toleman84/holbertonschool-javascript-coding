#!/usr/bin/node
const request = require('request');
function countCompletedTasks (url) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const todos = JSON.parse(body);
      const completedTasks = todos.filter(todo => todo.completed);
      const userIds = completedTasks.map(todo => todo.userId);
      const taskCounts = userIds.reduce((counts, userId) => {
        counts[userId] = (counts[userId] || 0) + 1;
        return counts;
      }, {});
      console.log(taskCounts);
    }
  });
}
countCompletedTasks(process.argv[2]);
