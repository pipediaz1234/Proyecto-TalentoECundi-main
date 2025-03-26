using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Threading.Tasks;

public class EmailSender : IEmailSender
{
    private readonly EmailSettings _emailSettings;

    public EmailSender(IOptions<EmailSettings> emailSettings)
    {
        _emailSettings = emailSettings.Value;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        try
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.SenderEmail));
            email.To.Add(new MailboxAddress("COMIDAS DON YOHAN", toEmail));
            email.Subject = subject;

            // Añadir una dirección de correo electrónico para recibir copias de los reenvíos
            email.ReplyTo.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.SenderEmail));

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = @"
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        color: #333;
                        line-height: 1.6;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 90%;
                        max-width: 600px;
                        margin: auto;
                        overflow: hidden;
                        padding: 20px;
                        background-color: #f9f9f9;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                    }
                    .header {
                        background-color: #fff;
                        text-align: center;
                        padding: 20px;
                        border-radius: 8px 8px 0 0;
                        border-bottom: 2px solid #ddd;
                    }
                    .header img {
                        max-width: 150px;
                        height: auto;
                    }
                    .header h1 {
                        margin: 10px 0;
                        font-size: 24px;
                        color: #0044cc;
                    }
                    .content {
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 0 0 8px 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .footer {
                        margin-top: 20px;
                        padding: 10px;
                        background-color: #0044cc;
                        color: #fff;
                        text-align: center;
                        border-radius: 0 0 8px 8px;
                    }
                    .button {
                        display: inline-block;
                        font-size: 16px;
                        color: #fff;
                        background-color: #28a745;
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 5px;
                        margin-top: 10px;
                    }
                    .button:hover {
                        background-color: #218838;
                    }
                    .button:focus {
                        outline: none;
                    }
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <img src='https://thumbs.dreamstime.com/z/las-zanahorias-baten-una-hamburguesa-vegetarianismo-contra-los-alimentos-de-preparaci%C3%B3n-r%C3%A1pida-113075470.jpg?w=992' alt='COMIDAS DON YOHAN Logo'>
                        <h1>COMIDAS DON YOHAN 🍔🍟</h1>
                    </div>
                    <div class='content'>
                        <h2>Realiza tu pago</h2>
                        <p>¡Gracias por tu compra! Estamos procesando tu pedido y nos aseguraremos de que todo llegue a tiempo.</p>
                        <p>Para completar el proceso, por favor, <a href='mailto:pipediazcampos@gmail.com' class='button'>SUBE TU COMPROBANTE DE PAGO AQUI YA SEA (NEQUIóDAVIPLATA)</a>.</p>
                        <p>Si tienes alguna pregunta o necesitas asistencia, puedes llamarnos al <strong>8900877</strong>.</p>
                        <p>COMIDAS DON YOHAN😏🍕🤪 agradece tu preferencia.</p>
                    </div>
                    <div class='footer'>
                        <p>&copy; 2024 COMIDAS DON YOHAN. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>";

            bodyBuilder.TextBody = message; // For plain text email

            email.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync(_emailSettings.SmtpServer, _emailSettings.SmtpPort, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_emailSettings.SmtpUsername, _emailSettings.SmtpPassword);
            await client.SendAsync(email);
            await client.DisconnectAsync(true);

            Console.WriteLine("Correo electrónico enviado exitosamente.");
        }
        catch (Exception ex)
        {
            // Manejar la excepción aquí según sea necesario
            Console.WriteLine($"Error al enviar el correo electrónico: {ex.Message}");
            throw;
        }
    }
}
