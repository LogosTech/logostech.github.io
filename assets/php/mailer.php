<?php
    $eventName = 'Revent';
    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $fName = strip_tags(trim($_POST["fName"]));
				$fName = str_replace(array("\r","\n"),array(" "," "),$fName);
        $lName = strip_tags(trim($_POST["lName"]));
				$lName = str_replace(array("\r","\n"),array(" "," "),$lName);
        if(($_POST["phone"])) {
            $phone = strip_tags(trim($_POST["phone"]));
				$phone = str_replace(array("\r","\n"),array(" "," "),$phone);
        } else {
            $phone = 'Not Mentioned';
        }
        $cSubject = strip_tags(trim($_POST["cSubject"]));
				$cSubject = str_replace(array("\r","\n"),array(" "," "),$cSubject);
        $email = filter_var(trim($_POST["em"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);

        // Check that data was sent to the mailer.
        if ( empty($fName) OR empty($lName) OR empty($message) OR empty($cSubject) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "youremail@here.com";

        // Set the email subject.
        $subject = "$eventName: $cSubject";

        // Build the email content.
        $email_content = "Name: $fName $lName\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Phone Number: $phone\n\n";
        $email_content .= "Subject: $cSubject\n\n";
        $email_content .= "Message:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $fName $lName <$email> <$phone>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo 'Query Recorded';
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Error!";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "Error!";
    }

?>