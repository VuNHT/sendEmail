const Express = require("express");
const BodyParser = require("body-parser");
var cors = require('cors');
const nodemailer = require('nodemailer');

var port = process.env.PORT || 3000;
var app = Express();
app.use(cors({ origin: '*', credentials: true}));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`ready ${port}`);
    app.post('/sendEmail',(req, res) => {
        if (req.body.token) {
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'vunht96@gmail.com',
                pass: 'qfdl gomk usje evdg'
            }
        });
        var mailOptions = {
            to: 'vunht96@gmail.com',
            from: 'vunht96@gmail.com',
            subject:`[VTIMER.ORG - ${req.body.email}] - ${req.body.subject}`,
            text: req.body.message
        }
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                res.status(500).send({
                    message: "Send Email failed !!"
                })
            }
            else {
                res.status(200).send({
                    message: "Send Email Successfully !!"
                })
            }
        });
    } else {
        res.status(500).send({
            message: "Send Email failed !!"
        })
    }
    });
})