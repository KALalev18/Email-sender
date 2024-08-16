const node_mailer = require('nodemailer')
const Mailgen = require('mailgen')
const { EMAIL, PASSWORD } = require('../env.js')
const Mail = require('nodemailer/lib/mailer/index.js')

// testing an email

const sign_up = async (req, res) =>{

    let test_account = await node_mailer.createTestAccount()
    
    const transporter = node_mailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: test_account.user,
          pass: test_account.pass,
        },
      });

      let message = {
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
        to: "bar@example.com, baz@example.com",
        subject: "Hello ✔",
        text: "Success",
        html: "<b>Success</b>",
      }

      transporter.sendMail(message).then((info) =>{
        return res.status(201).json({
            msg: "received email",
            info : info.messageId,
            preview: node_mailer.getTestMessageUrl(info)
        })
      }).catch(err =>{
        return res.status(500).json({err})
      })
    
    //res.status(201).json("Sign up is a success!")
}

// send mail from gmail accoint

const get_bill = (req,res)=>{

    const {user_email} = req.body

    let config = {
        service: 'gmail',
        auth:{
            user: EMAIL,
            pass: PASSWORD,
        }
    }

    const transporter = node_mailer.createTransport(config)

    let MailGenerator = new Mailgen({
        theme: "default",
        product:{
            name: "Bill",
            link: 'https://mailgen.js/',
        }
    })

    let response = {
        body: {
            name: "Bills",
            intro: "Your bill is here!",
            table:{
                data:[
                    {
                        item: "Something",
                        description: "Back-end",
                        price: "$5",
                    },
                ],
            },
            outro: "Keep in touch",
        },
    };

    let mail = MailGenerator.generate(response)

    let message = {
        from: EMAIL,
        to: user_email,
        subject: "Order",
        html: mail,
    }
    transporter.sendMail(message).then(()=>{
        return res.status(201).json({
            message: "Bill sent successfully",
        })
    }).catch((err) =>{
        return res.status(500).json({err})
    });
    
    //res.status(201).json("Getting bill successfully!")
};

module.exports = {
    sign_up,
    get_bill
}