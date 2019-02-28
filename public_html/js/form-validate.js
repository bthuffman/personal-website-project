$(document).ready(function(){
	/**
	 * jQuery Validate function
	 *
	 * This function provides the front-end validation for the websites contact form.
	 * If all tests set up here pass, the form data is AJAX submitted to the mailer.php file.
	 *
	 * @author Brandon Huffman <bt_huffman@msn.com>
	 * */

	$("#contact-form").validate({
		//state variables and then the values...
		debug: true,
		errorClass: "alert alert-danger",
		errorLabelContainer: "#output-area",
		errorElement: "div",

		//the following rules will define good and bad input
		//these rules start with the form input element's NAME (html attribute)
		rules: {
			//name attribute
			name: {
				required: true
			},
			//email attribute
			email: {
				email: true,
				required: true
			},
			//message attribute
			message: {
				required: true,
				maxlength: 2000,
				minlength: 10
			}
		},
		//errors to display to the end user when the rules above don't pass
		messages: {
			name: {
				required: "Please enter your name."
			}
			,
			email: {
				email: "Please enter a valid email address.",
				required: "Please enter a valid email address."
			},
			message: {
				required: "Please enter a message.",
				maxlength: "2000 characters max.",
				minlength: "10 characters min."
			}
		},
		// AJAX will submit the form to the backend if the rules pass
		submitHandler: function(form) {
			$("#contact-form").ajaxSubmit({
				type: "POST",
				url: $("#contact-form").attr("action"),

				//determine what happens if the form is successful
				success: function(ajaxOutput) {

					// clear the output area's formatting
					$("#output-area").css("display", "");

					//write the server's reply to the output area
					$("#output-area").html(ajaxOutput);

					//reset the form if it's successful
					if($(".alert-success").length >= 1) {
						$("#contact-form")[0].reset();
					}
				}
			})
		}
	}); /*end of the validation function*/
}); /*end of document.ready()*/