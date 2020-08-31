$(function() {

  $("#contactFormBm input").jqBootstrapValidation({
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
      var firstName = name; // For successbm/Failure Message
      // Check for white space in name for successbm/Fail message
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
          $('#successbm').html("<div class='alert alert-success'>");
          $('#successbm > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#successbm > .alert-success')
            .append("<strong>Penasihat kami akan menghubungi anda dengan segera, terima kasih!</strong>");
          $('#successbm > .alert-success')
            .append('</div>');
          //clear all fields
          $('#contactFormBm').trigger("reset");
        },
        error: function() {
          // Fail message
          $('#successbm').html("<div class='alert alert-danger'>");
          $('#successbm > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#successbm > .alert-danger').append($("<strong>").text("Harap maaf, terdapat sedikit gangguan pada server kami. Sila cuba lagi nanti!"));
          $('#successbm > .alert-danger').append('</div>');
          //clear all fields
          $('#contactFormBm').trigger("reset");
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
  $('#successbm').html('');
});
