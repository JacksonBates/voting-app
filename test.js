var email = require( 'emailjs' );

var yourEmail = 'tokendelivery.pollz@gmail.com';
var yourPwd = 'ca44866e6f2ff5a4d95958472228fc92b63ca8645f57687570aa73806cde8a38';
var yourSmtp = 'smtp.gmail.com';
var smtpServer  = email.server.connect({
  user:    yourEmail, 
  password: yourPwd, 
  host:    yourSmtp, 
  ssl:     false
});

smtpServer.send({
  text:    'Hello, World!', 
  from:    yourEmail, 
  to:      'jacksonbates@hotmail.com',
  subject: 'Testing emailjs'
  }, function(err, message) { 
    if(err) {
        console.log(err, message);
    }
  });