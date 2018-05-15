var config = {
    apiKey: "AIzaSyCY_tB8hV3hAjeuIEqcKyyC5AyCQ8xOVYs",
    authDomain: "train-schedluer.firebaseapp.com",
    databaseURL: "https://train-schedluer.firebaseio.com",
    projectId: "train-schedluer",
    storageBucket: "train-schedluer.appspot.com",
    messagingSenderId: "557293935723"
  };
  firebase.initializeApp(config);

      var database = firebase.database();

    $("#addTrain").on("submit", function (event) {
      event.preventDefault();

      console.log("line 16");

       var tName = $("#train-name-input").val().trim();
       var destination = $("#destination-input").val().trim();
       var tFirstTime = moment($("#first-time-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
       var tFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: tName,
        destination: destination,
        first: tFirstTime,
        frequency: tFrequency,

      }

      database.ref().push(newTrain);

      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.tFirstTime);
      
      alert("Train successfully added");

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-time-input").val("");
      $("#frequency-input").val("");

      

     });

    database.ref().on("child_added", function (childsnapshot, prevChildKey) {

    console.log(childsnapshot.val());

    var trainName = childsnapshot.val().name;
    var tDestination = childsnapshot.val().destination;
    var trainFirstTime = childsnapshot.val().first;
    var frequency = childsnapshot.val().frequency;

    var diffTime = moment().diff(moment.unix(trainFirstTime), "minutes");
    var tRemainder = moment().diff(moment.unix(trainFirstTime), "minutes") % frequency;
    var minutes = frequency - tRemainder;

    var tArrival = moment().add(minutes, "m").format("hh:mm A");
    console.log(minutes);
    console.log(tArrival);
    
    console.log(moment().format("hh:mm A"));
    console.log(tArrival);
    console.log(moment().format("X"));


    $("#train-schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + tDestination + "</td><td>" + frequency + "</td><td>" + tArrival + "</td><td>" + minutes + "</td></tr>");
});

