$( document ).ready(function() {
  //==============================================================================
  // Registering the person with his/her spouse (if applicaple)
  //==============================================================================
  $("#register").submit(function (event) {
    event.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      url: '/register',
      method: 'POST',
      data: data,
      success: function (member) {
        renderMembers(member);
      }
    });

  });

  function renderMembers(data) {
    let $container = $("#members");
    let hr = $("<hr>");
    for (let i = data.length - 1; i < data.length; i--){
     let section = createMemberElement(data[i]);
        $container.prepend(hr, section);
    }
  };

  function createMemberElement (member) {
    let $memberContent;
    if (member.spouse != ''){
      $memberContent = $("<p>").text(" - Name: " + member.name + "   , Spouse Name: " + member.spouse);
    } else {
      $memberContent = $("<p>").text(" - Name: " + member.name)
    }
    return $memberContent;
    };

  //==============================================================================
  // DRAW
  //==============================================================================
  $("#draw").submit(function (event) {
    event.preventDefault();
    $.ajax({
    url: '/draw',
    method: 'POST',
    success: function (message) {
      console.log('message: ', message)
      printMessage(message);
    }
    });

  });

  function printMessage(message) {
    if(message != ''){
      let $container = $("#message");
      let section = $("<p>").text(message).css("color", "red");
      $container.prepend(section);
    } else {
      let $container = $("#message");
      let section = $("<p>").text("*** Draw has been done! ***").css("color", "green");
      $container.prepend(section);
    }
  }
  
  //==============================================================================
  // Find individual match
  //==============================================================================
  let givenName;
  $("#find").submit(function (event) {
    event.preventDefault();
    givenName = $(this).serialize();
    $.ajax({
      url: '/find',
      method: 'POST',
      data: givenName,
      success: function (result) {
        printMember(result);
      }
    });

  });

  function printMember(result) {
    if(result == "*** There is NO member with such a name in the results list ***"){
      let $container = $("#giftExchange");
      let section = $("<p>").text(result).css("color", "red");
      $container.prepend(section);
    } else {
      let askedName = givenName.slice('name='.length)
      let $container = $("#giftExchange");
      let section = $("<p>").text(`'${askedName}' gives a gift to '${result}'`).css("color", "green");
      $container.prepend(section);
    }
  }

  //==============================================================================
  // FINAL RESULTS
  //==============================================================================
    $("#finalResults").submit(function (event) {
      event.preventDefault();
      $.ajax({
        url: '/finalResults',
        method: 'POST',
        success: function (resultsObj) {
          renderResults(resultsObj)
        }
      });

    });

    function renderResults(data) {
      let $container = $("#results");
      let hr = $("<hr>");
      for (let i in data){
        let section = $("<p>").text(` - '${i}' matched with '${data[i]}'`);
        $container.prepend(hr, section);
      }
    };
});
