from server.settings import MAIL_SERVER
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
import smtplib


def send_email(from_, to, subject, content, attachment=None, content_type=None):
    print "sending mail"
    try:
        if isinstance(to, str) or isinstance(to, unicode):
            to = (to,)

        msg = MIMEMultipart()
        msg["Subject"] = subject
        msg["From"] = from_
        msg["To"] = ", ".join(to)
        msg["Content-Type"] = "multipart/alternative"
        msg.attach(MIMEText(content + "\n\n"))

        if attachment:
            att = MIMEText(attachment + "\n\n")
            att["Content-Type"] = content_type or "text/calendar; charset=\"us-ascii\"; method=REQUEST"
            att["Filename"] = "subject.ics"
            msg.attach(att)

        print msg.as_string()

        connection = smtplib.SMTP(MAIL_SERVER)
        connection.sendmail(
            from_,
            to,
            msg.as_string()
        )
        connection.quit()
    except:
        import sys
        print sys.exc_info()[0]


def send_email_plain(from_, to, content):
    if isinstance(to, str) or isinstance(to, unicode):
        to = (to,)
    print content
    try:
        connection = smtplib.SMTP(MAIL_SERVER)
        connection.sendmail(
            from_,
            to,
            content
        )
        connection.quit()
    except:
        import sys
        print sys.exc_info()[0]
