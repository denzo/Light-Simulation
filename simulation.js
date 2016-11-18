var currentLightIndex;
var lights;
var minutes;
var seconds;
var timer;
var outputText = "";

var runSimulation = function() {
    stopTimer();
    runTimer();
};

var setupSimulation = function() {
    lights = [{position: "N", colour: "green", minutes: 0, seconds: 0}, {position: "E", colour: "red", minutes: 0, seconds: 0}, {position: "S", colour: "red", minutes: 0, seconds: 0}, {position: "W", colour: "red", minutes: 0, seconds: 0}];
    currentLightIndex = 0;
    minutes = 0;
    seconds = 0;
    document.getElementsByTagName('h2')[0].textContent = "00:00";
};

var runTimer = function() {
    timer = setTimeout(function() {
        seconds++;
        if(seconds === 60) {
            seconds = 0;
            minutes++;
        }

        lights[currentLightIndex].seconds++;
        if(lights[currentLightIndex].seconds === 60) {
            lights[currentLightIndex].seconds = 0;
            lights[currentLightIndex].minutes++;
        }

        if(lights[currentLightIndex].minutes === 5 && lights[currentLightIndex].colour === "green") {
            lights[currentLightIndex].colour = "orange";
            console.log("Light at position " + lights[currentLightIndex].position + " has changed to " + lights[currentLightIndex].colour + " at time " + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));
            outputText += "Light at position " + lights[currentLightIndex].position + " has changed to " + lights[currentLightIndex].colour + " at time " + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) + "\r\n";
        } else if(lights[currentLightIndex].minutes === 5 && lights[currentLightIndex].seconds === 30) {
            lights[currentLightIndex].colour = "red";
            lights[currentLightIndex].minutes = 0;
            lights[currentLightIndex].seconds = 0;
            console.log("Light at position " + lights[currentLightIndex].position + " has changed to " + lights[currentLightIndex].colour + " at time " + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));
            outputText += "Light at position " + lights[currentLightIndex].position + " has changed to " + lights[currentLightIndex].colour + " at time " + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) + "\r\n";
            if(currentLightIndex !== 3) {
                currentLightIndex++;
            } else {
                currentLightIndex = 0;
            }
            lights[currentLightIndex].colour = "green";
            console.log("Light at position " + lights[currentLightIndex].position + " has changed to " + lights[currentLightIndex].colour + " at time " + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));
            outputText += "Light at position " + lights[currentLightIndex].position + " has changed to " + lights[currentLightIndex].colour + " at time " + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) + "\r\n";
        }
        document.getElementsByTagName('h2')[0].textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        if(minutes < 30) {
            runTimer();
        } else {
            console.log("light sequence complete");
            outputText += "light sequence complete\r\n";
            var textFileAsBlob = new Blob([outputText], {type:'text/plain'});
            var fileNameToSaveAs = "output.txt";
            var downloadLink = document.createElement("a");
            downloadLink.setAttribute("download", fileNameToSaveAs);
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.innerHTML = "Download Output File";
            downloadLink.onclick = function(){document.body.removeChild(event.target)};
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    }, 1000);
};

var stopTimer = function() {
    clearTimeout(timer);
    setupSimulation();
};