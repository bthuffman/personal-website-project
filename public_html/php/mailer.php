<?php
/**
 * mialer.php
 * TODO see documentation on Mailer with reCAPTCHA
 *
 * Using SendGrid this file handles secure mail transport with Google reCAPTCHA integration.
 *
 * @author Brandon Huffman <bt_huffman@msn.com>
 */
// require all of the composer dependencies
require_once(dirname(__DIR__, 2) . "/vendor/autoload.php");
//require the mail-config.php
require_once("mail-config.php");

use \SendGrid\Mail;
$sendgrid = new \SendGrid($sendGridSecret);
//verify user's reCAPTCHA input
$recaptcha = new


$name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

//targeting subject  input can make it so a particular subject heading is sent to you.