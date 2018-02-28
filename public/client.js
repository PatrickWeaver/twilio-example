$(function() {
  
  $( "#send-message" ).click(function( event ) {
    event.preventDefault();
    var sendData = {
      number: $( "#number-input" ).val(),
      message: $( "#message-input" ).val()
    }
    
    var sendSuccess = function(data) {
      console.log(data);
      $( "#number-input" ).val("+1");
      $( "#message-input" ).val("");
    }
    
    var sendOptions = {
      url:"/send",
      method: "POST",
      data: JSON.stringify(sendData),
    	contentType: "application/json; charset=utf-8",
	    dataType: "json",
      success: sendSuccess
    }
    
    $.ajax(sendOptions);
  });
  
  
  (function poll() {
    
    var pollSuccess = function(data) {
      var newHTML = "";
      for (var p in data) {
        var personMessages = data[p]
        newHTML += "<h3>" + p + "</h3>";
        newHTML += "<ol>"; 
        for (var m in personMessages) {
          var oneMessage = personMessages[m];
          newHTML += "<li>" + oneMessage.type + ": " + oneMessage.message + "</li>";
        }
        newHTML += "</ol>";
      }
      $( "#messages" ).html(newHTML);
    }
    
    var pollOptions = {
      url: "/messages",
      success: pollSuccess,
      dataType: "json",
      complete: poll
    }    
    
    setTimeout(function() {
      $.ajax(pollOptions);
    }, 1000);
         
  })();
  
});
