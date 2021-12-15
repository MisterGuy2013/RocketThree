function getInstantReward(){
  
  reward = -0.01;
  if(chassisBody.hitBall == true){
    chassisBody.hitBall = false;
    reward = 0.5;
  }
  else if(chassisBody.hitWall == true){
    chassisBody.hitWall = false;
    reward -= 0.5;
  }
  if(chassisBody.scored == true){
    chassisBody.scored = false;
    reward = 2.5;
  }
  return
}




var QLearning = (function () {
  // s(playerPose + fruitPose + size + trail) = state of the current position
  // act(s) = best action so far
  // rew = instant reward of taking this step
  // s'(s, act) = new state

  // Q(s, act) += LR * (rew + DF*max(Q(s',*)) - Q(s,act))

  var qTable = {};
  var learningRate = 0.85; // Learning Rate
  var discountFactor = 0.9; // Discount Factor of Future Rewards
  var randomize = 0.05; // Randomization Rate on Action

  var availableActions = ['forward', 'forward-left', 'forward-right', 'backward', "nothing"];

  var score = 0;
  var missed = 0;

  var intervalID;
  var defaultLoopsPerInterval = 1200;

  var fullSetOfStates = false;


  var whichStateNow = function () {
    let tileCount = 10;
    let player = chassisBody;

    let ball = sphereBody;
    let fruitRelativePose = { x:0, y:0 };

    //let trail = Snake.data.trail();
    //let trailRelativePose = [];

    fruitRelativePose.x = sphereBody.position.x - chassisBody.position.x;
    while(fruitRelativePose.x < 0) fruitRelativePose.x += tileCount;
    while(fruitRelativePose.x > tileCount) fruitRelativePose.x -= tileCount;

    fruitRelativePose.y = sphereBody.position.y - chassisBody.position.y;
    while(fruitRelativePose.y < 0) fruitRelativePose.y += tileCount;
    while(fruitRelativePose.y > tileCount) fruitRelativePose.y -= tileCount;

    var stateName = fruitRelativePose.x + ',' + fruitRelativePose.y;
      // + ',' + trail.length;

    const maxLength = (fullSetOfStates ? trail.length : 1);
    for(let index = 0; index < maxLength; index++) {
      if (trailRelativePose[index] == undefined) trailRelativePose.push({ x:0, y:0 });

      trailRelativePose[index].x = trail[index].x - player.x;
      while(trailRelativePose[index].x < 0) trailRelativePose[index].x += tileCount;
      while(trailRelativePose[index].x > tileCount) trailRelativePose[index].x -= tileCount;

      trailRelativePose[index].y = trail[index].y - player.y;
      while (trailRelativePose[index].y < 0) trailRelativePose[index].y += tileCount;
      while (trailRelativePose[index].y > tileCount) trailRelativePose[index].y -= tileCount;

      stateName += ',' + trailRelativePose[index].x + ',' + trailRelativePose[index].y;
    }
    return stateName;
  };

  var whichTable = function (s) {
    if(qTable[s] == undefined ) {
      qTable[s] = { 'forward':0, 'forward-left':0, 'forward-right':0 , 'backwards':0, "nothing" : 0};
    }
    return qTable[s];
  }

  var bestAction = function (s) {
    let q = whichTable(s);

    if(Math.random() < randomize){
      let random = Math.floor(Math.random() * availableActions.length);
      return availableActions[random];
    }

    let maxValue = q[availableActions[0]];
    let choseAction = availableActions[0];
    let actionsZero = [];
    for(let i = 0; i < availableActions.length; i++) {
      if(q[availableActions[i]] == 0) actionsZero.push(availableActions[i]);
      if(q[availableActions[i]] > maxValue){
        maxValue = q[availableActions[i]];
        choseAction = availableActions[i];
      }
    }

    if(maxValue == 0){
      let random = Math.floor(Math.random() * actionsZero.length);
      choseAction = actionsZero[random];
    }

    return choseAction;
  }

  var updateQTable = function (state0, state1, reward, act) {
    var q0 = whichTable(state0);
    var q1 = whichTable(state1);

    var newValue = reward + discountFactor * Math.max(q1.up, q1.down, q1.left, q1.right) - q0[act];
    qTable[state0][act] = q0[act] + learningRate * newValue;
  }

  function Algorithm () {
    requestAnimationFrame( animate );
    var currentState = whichStateNow();
    var action = bestAction(currentState);
    carAction(action);
    var instantReward = getInstantReward;
    var nextState = whichStateNow();

    updateQTable(currentState, nextState, instantReward, action);

    if(instantReward > 0) score += Math.trunc(instantReward);
    if(instantReward < 0) missed += Math.trunc(instantReward);

  }

  return {
    run: function () {
      clearInterval(intervalID);
      intervalID = setInterval(Algorithm, 1000/15);
    },

    stop: function () {
      clearInterval(intervalID);
    },

    startTrain: function (loopsPerInterval) {
      clearInterval(intervalID);
      const loops = loopsPerInterval ? loopsPerInterval : defaultLoopsPerInterval;
      intervalID = setInterval(() => {
        for (let index = 0; index < loops; index++) {
          Algorithm();
        }
      }, 1000/15);
    },

    stopTrain: function () {
      clearInterval(intervalID);
    },

    reset: function () {
      qTable = {};
      score = 0;
      missed = 0;
    },

    changeConst: {
      LearningRate: function (lr) {
        learningRate = lr;
      },
      DiscountFactor: function (df) {
        discountFactor = df;
      },
      Randomization: function (rand) {
        randomize = rand;
      },
      FullSetOfStates: function (fullSet) {
        fullSetOfStates = fullSet;
      }
    },

    changeFPS: function (fps) {
      clearInterval(intervalID);
      intervalID = setInterval(Algorithm, 1000/fps);
    },

    changeSpeed: function (ms) {
      clearInterval(intervalID);
      intervalID = setInterval(Algorithm, ms);
    },

    info: {
      score: function () {
        return score;
      },
      missed: function () {
        return missed;
      }
    },

    qTable: {
      show: function () {
        console.table(qTable);
      },
      download: function(){
        var dictstring = JSON.stringify(qTable);
        function download(filename, text) {
          var element = document.createElement('a');
          element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
          element.setAttribute('download', filename);

          element.style.display = 'none';
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);
      }

      // Start file download.
      download("model.txt",dictstring);
      },
      export: function () {
        return qTable;
      },
      import: function (newQ) {
        qTable = newQ;
      }
    }
  }

})();