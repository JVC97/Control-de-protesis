const { generateToken } = require("../helpers/jwt.helper");
const nodemailer = require("nodemailer");
let _userService = null;




function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

class AuthService {
    constructor({ UserService }) {
        _userService = UserService;
    }


    async signUp(user) {
        const { email } = user;
        const userExist = await _userService.getUserByEmail(email);
        if (userExist) {
            const error = new Error();
            error.status = 400;
            error.message = "User already exist";
            throw error;
        }

        return await _userService.create(user);
    }

    async signIn(user) {
        const { email, password } = user;
        const userExist = await _userService.getUserByEmail(email);
        if (!userExist) {
            const error = new Error();
            error.status = 404;
            error.message = "User does not exist";
            throw error;
        }

        const validPassword = userExist.comparePasswords(password);
        if (!validPassword) {
            const error = new Error();
            error.status = 400;
            error.message = "Invalid Password";
            throw error;
        }

        const userToEncode = {
            email: userExist.email,
            id: userExist._id
        };

        const token = generateToken(userToEncode);

        return { token, user: userExist };
    }

    async recoverPassword(user) {
        const { email, password } = user;
        const userExist = await _userService.getUserByEmail(email);
        if (!userExist) {
            const error = new Error();
            error.status = 404;
            error.message = "User does not exist";
            throw error;
        }

        return await _userService.update(userExist._id, { password });
    }

    async recuperaPassword(user) {
        const { email } = user;
        const password = makeid(5);
        const userExist = await _userService.getUserByEmail(email);
        if (!userExist) {
            const error = new Error();
            error.status = 404;
            error.message = "User does not exist";
            throw error;
        }


        var testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            host: "mail.thejvc.xyz",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "test@thejvc.xyz", // generated ethereal user
                pass: "test.prueba", // generated ethereal password
            }
        });

        const mailHTML = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title></title>
            <!--[if (mso 16)]>
            <style type="text/css">
            a {text-decoration: none;}
            </style>
            <![endif]-->
            <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
            <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        </head>
        
        <body>
            <div class="es-wrapper-color">
                <!--[if gte mso 9]>
              <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                <v:fill type="tile" color="#fafafa"></v:fill>
              </v:background>
            <![endif]-->
                <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td class="esd-email-paddings" valign="top">
                                <table cellpadding="0" cellspacing="0" class="es-header esd-header-popover" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="es-adaptive esd-stripe" align="center" esd-custom-block-id="88593">
                                                <table class="es-header-body" style="background-color: #3d5ca3;" width="600" cellspacing="0" cellpadding="0" bgcolor="#3d5ca3" align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" style="background-color: #ffffff;" bgcolor="#ffffff" align="left">
                                                                <table cellspacing="0" cellpadding="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-container-frame" width="560" align="left">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="https://demo.stripocdn.email/content/guids/796978f7-f9b1-49c4-87fa-3ed3105dae9c/images/2791599943696693.png" alt style="display: block;" width="270"></a></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" style="background-color: #fafafa;" bgcolor="#fafafa" align="center">
                                                <table class="es-content-body" style="background-color: #ffffff;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p40t es-p20r es-p20l" style="background-color: transparent;" bgcolor="transparent" align="left">
                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                                <table style="border-width: 1px; border-style: solid; border-color: transparent;" width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td class="esd-block-text es-p15t es-p15b" align="center">
                                                                                                <h1 style="color: #333333; font-size: 20px;"><b>Restablecer Contraseña</b></h1>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td class="esd-block-text es-p40r es-p40l" align="center">
                                                                                                <p>Hola,&nbsp;${email}&nbsp;<br>Tu código para recuperar contraseña es:&nbsp;<br></p>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td class="esd-block-text es-p25t es-p40r es-p40l" align="center" style="font-size=100px;">
                                                                                                <h1 style="line-height: 100%;">${password[0]}    ${password[1]}    ${password[2]}    ${password[3]}    ${password[4]}<br><br></h1>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text">
                                                                                                <p style="line-height: 120%;">Si tienes algún problema para iniciar sesión en tu cuenta, o aún no tienes una comunícate con:&nbsp;</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="esd-structure es-p5t es-p20b es-p20r es-p20l" style="background-position: left top;" align="left">
                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td class="esd-block-text" esd-links-color="#666666" align="center">
                                                                                                <p style="font-size: 14px;">Andrés Olivares |&nbsp; email: ortopediagenesis@gmail.com</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="es-footer" cellspacing="0" cellpadding="0" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" style="background-color: #fafafa;" bgcolor="#fafafa" align="center">
                                                <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p10t es-p30b es-p20r es-p20l" style="background-color: #ffffff;" bgcolor="#ffffff" align="left">
                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="es-footer esd-footer-popover" cellspacing="0" cellpadding="0" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" style="background-color: #fafafa;" bgcolor="#fafafa" align="center" esd-custom-block-id="88330">
                                                <table class="es-footer-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" bgcolor="transparent" align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p15t es-p5b es-p20r es-p20l" align="left">
                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td esd-links-underline="underline" align="center" class="esd-block-text">
                                                                                                <p style="font-size: 12px; color: #666666;">Por favor no contestar este correo.&nbsp;</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </body>
        
        </html>`

        // send mail with defined transport object
        var info = await transporter.sendMail({
            from: 'test@thejvc.xyz', // sender address
            to: email, // list of receivers
            subject: "Cambio de contraseña", // Subject line 
            html: mailHTML, // html body
        });
        return await _userService.update(userExist._id, { password });

    }
}

module.exports = AuthService;