const nodemailer=require('nodemailer')
const transporter=nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: "ritik7777@yahoo.com",
      pass: "uzwuwhlvdloknwzt"
    }
  });
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });


async function sendMail(recv,subject,text,html){
    console.log("sending messages")
    let info = await transporter.sendMail({   
        from: '"E-Library " <ritik7777@yahoo.com>', // sender address
        to: recv, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html:html
        
    });
}

module.exports=sendMail