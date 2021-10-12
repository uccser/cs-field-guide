initialise();
removeItem(validDestinationPort)
removeItem(validSourcePort);

function initialise() {
  portList = [23, 80, 443, 20, 21, 42, 111];
  invalidIPs = [];
  validDestinationIP = randomIP();
  validSourceIP = randomIP();
  validDestinationPort = get_random(portList);
  validSourcePort = get_random(portList);
  score = 0;
  mistakes = 0;
  tickDownSpeed = 1;
  levelModifier = 5;
}

window.onload = function() {
  document.getElementById("healthBar").style.width = "100%";
  document.getElementById("yourIPText").innerHTML = "Your IP: " + validDestinationIP;
  for (var i = 0; i < 32; i++) {
    invalidIPs.push(randomIP());
  } 
  chooseIP(0, 0.5);
  choosePort(0, 0.5);
  tickDown();
  document.getElementById("portrait").className = "packageEntrance";
};

$('#accept').click(function() {
  check('allow');
});

$('#deny').click(function() {
  check('deny');
});

function gameOver() {
  document.getElementById("accept").disabled = true; 
  document.getElementById("deny").disabled = true; 
  document.getElementById("warningTextDisplay").innerHTML = "GAME OVER";
}

function print_points(points) {
  console.log(points, score, mistakes, uniqueID);
}

function randomIP() {
  return (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));
}

function removeItem(element) {
  const index = portList.indexOf(element);
  if (index > -1) {
    portList.splice(index, 1);
  }
}

function get_random (list) {
  return list[Math.floor((Math.random()*list.length))];
}

function chooseIP(score, P) {
  if (Math.random() > P) {
    document.getElementById("destinationIP").innerHTML = validDestinationIP;
  }
  else {
    document.getElementById("destinationIP").innerHTML = get_random(invalidIPs)
  }
  if (Math.random() > P) {
    document.getElementById("sourceIP").innerHTML = validSourceIP;
  }
  else {
    document.getElementById("sourceIP").innerHTML = get_random(invalidIPs);
  }
  if (score == levelModifier) {
    document.getElementById("allowFrom").style.opacity = 0;
    document.getElementById("rule2").innerHTML = "Only allow packets from ";
    document.getElementById("allowFrom").innerHTML = validSourceIP;
    document.getElementById("rule2").className = "rulesFade";
    setTimeout(function() {
      document.getElementById("allowFrom").className = "rulesFade";
    }, 450);
  }
}

function choosePort(score, P) {
  if (Math.random() > P) {
    document.getElementById("sourcePort").innerHTML = validSourcePort;
  }
  else {
    document.getElementById("sourcePort").innerHTML = get_random(portList)
  }
  if (Math.random() > P) {
    document.getElementById("destinationPort").innerHTML = validDestinationPort;
  }
  else {
    document.getElementById("destinationPort").innerHTML = get_random(portList);
  }
  if (score == levelModifier * 2) {
    document.getElementById("allowFromPort").style.opacity = 0;
    document.getElementById("rule3").innerHTML = "Only allow packets from the port ";
    document.getElementById("allowFromPort").innerHTML = validSourcePort;
    document.getElementById("rule3").className = "rulesFade";
    setTimeout(function() {
      document.getElementById("allowFromPort").className = "rulesFade";
    }, 450);
  }
  if (score == levelModifier * 3) {
    document.getElementById("allowToPort").style.opacity = 0;
    document.getElementById("rule4").innerHTML = "Only allow packets going to port ";
    document.getElementById("allowToPort").innerHTML = validDestinationPort;
    document.getElementById("rule4").className = "rulesFade";
    setTimeout(function() {
      document.getElementById("allowToPort").className = "rulesFade";
    }, 450);
  }
}

function animation(status) {
  var picList = ["BoxA", "BoxB", "BoxC", "BoxD"];
  var imgSource = get_random(picList);
  var className = "package" + status;
  setTimeout(function(){
    document.getElementById("portrait").className = className;
    setTimeout(function(){
      var num_rules = 1 + Math.floor(score/4);
      var P = 1 - Math.pow(0.5, 1/num_rules);
      chooseIP(score, P);
      choosePort(score, P);
      document.getElementById("box").src = boxImgPath + imgSource + ".png";
      document.getElementById("portrait").className = "packageEntrance";
    }, 350)
  }, 350)
}

function stage1check(button) {
  var destination = document.getElementById("destinationIP").innerHTML;
  if (destination == validDestinationIP && button == "allow") {
    animation("Accept")
    return true;
  }
  else if (destination != validDestinationIP && button == "deny") {
    animation("Deny")
    return true
  }
  else if (button == 'allow'){
    document.getElementById("warningTextDisplay").innerHTML = "That packet wasn't valid!";
    animation("Accept");
    return false;
  }
  else {
    document.getElementById("warningTextDisplay").innerHTML = "That packet was valid!";
    animation('Deny');
    return false;
  }
}

function stage2check(button) {
  var destination = document.getElementById("destinationIP").innerHTML;
  var source = document.getElementById("sourceIP").innerHTML;
  if (destination == validDestinationIP && source == validSourceIP && button == 'allow') {
    animation("Accept")
    return true;
  }
  else if ((destination != validDestinationIP || source != validSourceIP) && button == 'deny') {
    animation("Deny")
    return true;
  }
  else if (button == 'allow'){
    document.getElementById("warningTextDisplay").innerHTML = "That packet wasn't valid!";
    animation("Accept");
    return false;
  }
  else {
    document.getElementById("warningTextDisplay").innerHTML = "That packet was valid!";
    animation('Deny');
    return false;
  }
}

function stage3check(button) {
  var destinationIP = document.getElementById("destinationIP").innerHTML;
  var sourceIP = document.getElementById("sourceIP").innerHTML;
  var sourcePort = document.getElementById("sourcePort").innerHTML;
  if (destinationIP == validDestinationIP && sourceIP == validSourceIP && sourcePort == validSourcePort && button == 'allow') {
    animation("Accept")
    return true;
  }
  else if ((destinationIP != validDestinationIP || sourceIP != validSourceIP || sourcePort != validSourcePort) && button == 'deny') {
    animation("Deny")
    return true;
  }
  else if (button == 'allow'){
    document.getElementById("warningTextDisplay").innerHTML = "That packet wasn't valid!";
    animation("Accept");
    return false;
  }
  else {
    document.getElementById("warningTextDisplay").innerHTML = "That packet was valid!";
    animation('Deny');
    return false;
  }
}

function stage4check(button) {
  var destinationIP = document.getElementById("destinationIP").innerHTML;
  var sourceIP = document.getElementById("sourceIP").innerHTML;
  var sourcePort = document.getElementById("sourcePort").innerHTML;
  var destinationPort = document.getElementById("destinationPort").innerHTML;
  if (destinationIP == validDestinationIP && sourceIP == validSourceIP && sourcePort == validSourcePort && destinationPort == validDestinationPort && button == 'allow') {
    animation("Accept")
    return true;
  }
  else if ((destinationIP != validDestinationIP || sourceIP != validSourceIP || sourcePort != validSourcePort || destinationPort != validDestinationPort) && button == 'deny') {
    animation("Deny")
    return true;
  }
  else if (button == 'allow'){
    document.getElementById("warningTextDisplay").innerHTML = "That packet wasn't valid!";
    animation("Accept");
    return false;
  }
  else {
    document.getElementById("warningTextDisplay").innerHTML = "That packet was valid!";
    animation('Deny');
    return false;
  }
}

function tickDown() {
  var start = parseInt(document.getElementById("healthBar").style.width.slice(0, -1));
  var end_width = start - tickDownSpeed;
  document.getElementById("healthBar").style.width = end_width + "%";
  if (end_width <= 15) {
    document.getElementById("healthBar").style.backgroundColor = "red";
  }
  else if (end_width <= 45) {
    document.getElementById("healthBar").style.backgroundColor = "yellow";
  }
  else {
    document.getElementById("healthBar").style.backgroundColor = "lime";
  }
  setTimeout(function(){
    if (end_width > 0) {
      tickDown();
    }
    else {
      gameOver();
    }
  }, 300)
}


function healthChange(result) {
  var start = parseInt(document.getElementById("healthBar").style.width.slice(0, -1));
  if (result) {
    if (start < 100) {
      var end_width = start + 10;
      if (end_width > 100) {
        end_width = 100;
      }
    }
    else {
      var end_width = start;
    }
  }
  else {
    var end_width = start - 10;
  }
  document.documentElement.style.setProperty('--my-start-width', start + "%");
  document.documentElement.style.setProperty('--my-end-width', end_width + "%");
  document.getElementById("healthBar").className = "healthAlter";
  setTimeout(function(){
    document.getElementById("healthBar").style.width = end_width + "%";
    if (end_width > 0) {
      document.getElementById("healthBar").className = "";
    }
    else {
      gameOver();
    }
  }, 350)
}

function check(button) {
  if (score >= levelModifier * 3) {
    tickDownSpeed = 2;
    result = stage4check(button);
  }
  else if (score >= levelModifier * 2) {
    result = stage3check(button);
  }
  else if (score >= levelModifier) {
    result = stage2check(button);
  }
  else {
    result = stage1check(button);
  }
  if (result) {
    document.getElementById("warningTextDisplay").innerHTML = " ";
    score ++;
    healthChange(result);
  }
  else {
    mistakes ++;
    healthChange(result);
  }
}
