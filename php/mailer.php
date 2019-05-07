<?php
/**
 * mialer.php
 *
 * Using SendGrid this file handles secure mail transport with Google reCAPTCHA integration.
 *
 * @author Brandon Huffman <bt_huffman@msn.com>
 */
// require all of the composer dependencies
require_once(dirname(__DIR__, 1) . "/vendor/autoload.php");
//require the mail-config.php
require_once("mail-config.php");
use \SendGrid\Mail;
$sendgrid = new \SendGrid($smtpSecret);
//verify the user's reCaptcha input
$recaptcha = new \ReCaptcha\ReCaptcha($secret);
$resp = $recaptcha->verify($_POST["g-recaptcha-response"], $_SERVER["REMOTE_ADDR"]);
try {
	//when there's a reCaptcha error, throw an exception
	if (!$resp->isSuccess()) {
		throw(new Exception("reCaptcha error!"));
	}
	/**
	 * Sanitize the inputs from the form: name, email, subject, and message.
	 * This assumes jQuery will be AJAX submitting the form, thus using the $_POST superglobal.
	 **/
	$name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
	$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
	$message = filter_input(INPUT_POST, "message", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
	// create SendGrid object
	$emailObject = new \SendGrid\Mail\Mail();
	/**
	 * Attach the sender to the message taking the form of an associative array where $email is the key for the real name.
	 **/
	$emailObject->setFrom($email, $name);
	/**
	 * Attach the recipients to the message.
	 * $MAIL_RECIPIENTS is set in mail-config.php
	 **/
	$recipients = $MAIL_RECIPIENTS;
	$emailObject->addTo($recipients[0], $recipients[1]);
	// attach the subject line to the message
	$emailObject->setSubject("Email from Personal Website Project");
	/**
	 * Attach the actual content for the email.
	 **/
	$emailObject->addContent("text/plain", $message);
	/**
	 * using the sendgrid object from above call the send method and use the emailObject as an argument.
	 */
	$response = $sendgrid->send($emailObject);
	// report a successful send!
	echo "<div class=\"alert alert-success\" role=\"alert\">Email successfully sent.</div>";
} catch(\Exception $exception) {
	echo "<div class=\"alert alert-danger\" role=\"alert\"><strong>Ops!</strong> Unable to send email: " . $exception->getMessage() . "</div>";
}