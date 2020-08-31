$(function() {

  $("#contactFormChi input").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("input#message").val();
      var firstName = name; // For successchi/Failure Message
      // Check for white space in name for successchi/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "././mail/contact_me.php",
        type: "POST",
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message
        },
        cache: false,
        success: function() {
          // success message
          $('#successchi').html("<div class='alert alert-success'>");
          $('#successchi > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#successchi > .alert-success')
            .append("<strong>谢谢您！我们的顾问会与您联系。</strong>");
          $('#successchi > .alert-success')
            .append('</div>');
          //clear all fields
          $('#contactFormChi').trigger("reset");
        },
        error: function() {
          // Fail message
          $('#successchi').html("<div class='alert alert-danger'>");
          $('#successchi > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#successchi > .alert-danger').append($("<strong>").text("不好意思 " + firstName + ", 我们的网页服务没有回应。请稍后重试！"));
          $('#successchi > .alert-danger').append('</div>');
          //clear all fields
          $('#contactFormChi').trigger("reset");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#successchi').html('');
});
