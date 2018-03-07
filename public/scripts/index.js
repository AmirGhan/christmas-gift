$( document ).ready(function() {

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


});
