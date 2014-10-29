(function() {
  var Entry = Parse.Object.extend("Entry");
  var leaders = document.getElementById("leaders");
  var bowlingForm = document.getElementById("bowl");

  bowl.addEventListener("submit", newEntry);

  populateLeaderboard();

  function newEntry(e) {
    e.preventDefault();

    var entry,
      tweet = document.getElementById("tweet"),
      nickname = document.getElementById("nickname");

    if (!tweet.value || !nickname.value) {
      alert("Please fill out the entire form to enter.");
      return;
    }

    if (tweet.value.length > 140) {
      alert("Yo 140 character limit cmon now");
      return;
    }

    entry = new Entry();
    entry.set("text", tweet.value);
    entry.set("nickname", nickname.value);
    entry.save();

    tweet.value = "";
    nickname.value = "";
    alert("Thanks for playing.")
  }


  function populateLeaderboard() {
    var query = new Parse.Query(Entry);
    query.descending("score");
    query.limit(20);
    query.greaterThan("score", 0);
    query.find({
      success: function(results) {
        if (!results.length) {
          leaders.innerHTML = "Awaiting our champions...";
        }
        var fragment = document.createDocumentFragment(),
          li;
        for (var i = 0; i < results.length; i++) {
          li = document.createElement("li");
          li.innerHTML = "Entrant: " + results[i].get("nickname") + " Score: " + results[i].get("score");
          fragment.appendChild(li);
        }

        leaders.appendChild(fragment);
      },
      error: function(err) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }


})();