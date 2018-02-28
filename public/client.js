

$(function() {
  $( "#send-message" ).click(function( event ) {
    event.preventDefault();
    var sendData = {
      number: $( "#number-input" ).val(),
      message: $( "#message-input" ).val()
    }
    
    var success = function(data) {
      console.log(data);
      $( "#number-input" ).val("");
      $( "#message-input" ).val("");
    }
    
    var options = {
      url:"/send",
      method: "POST",
      data: JSON.stringify(sendData),
    	contentType: "application/json; charset=utf-8",
	    dataType: "json",
      success: success
    }
    
    $.ajax(options);
  });
  
  
  (function poll() {
    setTimeout(function() {
      console.log("Asking");
      $.ajax({
        url: "/replies",
        success: function(data) {
          var newHTML = "";
          for (var p in data) {
            var personMessages = data[p]
            newHTML += "<h3>" + p + "</h3><ol>"; 
            for (var m in personMessages) {
              var oneMessage = personMessages[m];
              newHTML += "<li>" + oneMessage.type + ": " + oneMessage.message + "</li>";
            }
            newHTML += "</ol>";
          }
          $( "#messages" ).html(newHTML);
        }, dataType: "json", complete: poll
      });
    }, 1000);
  })();
});
