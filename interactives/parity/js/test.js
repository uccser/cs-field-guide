function timer(interval, maxTime, callback) {
  var start = Date.now();
  var intervalID;
  function handler() {
    if (Date.now() - start > maxTime) {
      clearInterval(intervalID);
    }
    else if (callback !== undefined) {
      callback();
    }
  };
  intervalID = setInterval(handler, interval);
};


timer(1000, 5000, function() {
  console.log("Hello");
});
