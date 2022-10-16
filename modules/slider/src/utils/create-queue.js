export function createQueue() {
  var queue = [];

  return {
    enqueue: function (item) {
      queue.push(item);
    },
    dequeue: function () {
      return queue.shift();
    },
    isEmpty: function () {
      return !queue.length;
    },
    clear() {
      queue = [];
    },
  };
}
