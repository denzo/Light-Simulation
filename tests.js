QUnit.log(function(details) {
    console.log(details.message + " result: " + details.result);
    outputText += details.message + " result: " + details.result + "\r\n";
});

var runTests = function() {
    stopTimer();
    setupTest();
    stopTimerTest();
    setTimeout(function() {
        runTimerTest();
    }, 6000);
    setTimeout(function() {
        checkLightChanges();
    }, 98000);
};

var setupTest = function() {
    console.log("running setup test");
    outputText += "running setup test\r\n";
    setupSimulation();
    QUnit.test("Setup completion test", function(assert) {
        assert.deepEqual(lights, [{position: "N", colour: "green", minutes: 0, seconds: 0}, {position: "E", colour: "red", minutes: 0, seconds: 0}, {position: "S", colour: "red", minutes: 0, seconds: 0}, {position: "W", colour: "red", minutes: 0, seconds: 0}], "lights setup test");
        assert.deepEqual(currentLightIndex, 0, "current light index setup test");
        assert.deepEqual(minutes, 0, "minutes setup test");
        assert.deepEqual(seconds, 0, "seconds setup test");
        assert.deepEqual(document.getElementsByTagName('h2')[0].textContent, "00:00", "timer setup test");
    });
};

var stopTimerTest = function() {
    console.log("running stop timer test");
    outputText += "running stop timer test\r\n";
    setupSimulation();
    runTimer();
    setTimeout(function() {
        QUnit.test("reset timer test", function(assert) {
            stopTimer();
            assert.deepEqual(minutes, 0, "timer reset minutes test");
            assert.deepEqual(seconds, 0, "timer reset seconds test");
        })
    }, 5000);
};

var runTimerTest = function() {
    console.log("running start timer test");
    outputText += "running start timer test\r\n";
    setupSimulation();
    runTimer();
    setTimeout(function() {
        QUnit.test("30 seconds timer test", function(assert) {
            assert.deepEqual(seconds, 30, "timer 30s check");
        });
    }, 31000);

    setTimeout(function() {
        QUnit.test("1 minute 30 seconds timer test", function(assert) {
            assert.deepEqual(minutes, 1, "timer 1m 30s (minutes) check");
            assert.deepEqual(seconds, 30, "timer 1m 30s (seconds) check");
            stopTimer();
        });
    }, 91000);
};

var checkLightChanges = function() {
    console.log("running check light changes test");
    outputText += "running check light changes test\r\n";
    setupSimulation();
    runTimer();
    setTimeout(function() {
        QUnit.test("change first light to orange test", function(assert) {
            assert.deepEqual(lights[0].colour, "orange", "first light change to orange test");
        });
    }, 301000);

    setTimeout(function() {
        QUnit.test("change to second light test", function(assert) {
            assert.deepEqual(lights[0].colour, "red", "first light change to red test");
            assert.deepEqual(lights[1].colour, "green", "second light change to green test");
        });
    }, 331000);
};