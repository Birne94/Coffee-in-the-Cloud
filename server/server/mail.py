from server.settings import MAIL_SERVER
import smtplib

def send_email(from_, to, subject, content):
    if isinstance(to, str) or isinstance(to, unicode):
        to = (to,)

    message = "From: %s\r\nTo: %s\r\nSubject: %s\r\n\r\n%s\r\n" % (from_, ", ".join(to), subject, content)

    connection = smtplib.SMTP(MAIL_SERVER)
    connection.sendmail(
        from_,
        to,
        message
    )
    connection.quit()
