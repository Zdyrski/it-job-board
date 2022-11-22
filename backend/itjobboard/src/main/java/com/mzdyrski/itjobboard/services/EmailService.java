package com.mzdyrski.itjobboard.services;

import com.mzdyrski.itjobboard.domain.EmployeesCv;
import com.mzdyrski.itjobboard.enums.EmailType;
import com.sun.mail.smtp.SMTPTransport;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.activation.DataHandler;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;
import java.security.InvalidParameterException;
import java.util.Date;

import static com.mzdyrski.itjobboard.constants.EmailConstant.*;

@Service
public class EmailService {

    @Async
    public void sendEmail(String email, EmailType emailType, String... placeholders) throws MessagingException {
        var message = createEmail(email, emailType, placeholders);
        var smtpTransport = (SMTPTransport) getEmailSession().getTransport(SMTPS);
        smtpTransport.connect(GMAIL_SMTP_SERVER, USERNAME, PASSWORD);
        smtpTransport.sendMessage(message, message.getAllRecipients());
        smtpTransport.close();
    }

    @Async
    public void sendEmailWithCV(String email, EmailType emailType, EmployeesCv cv, String... placeholders) throws MessagingException {
        var message = createEmailWithCV(email, emailType, placeholders, cv);
        var smtpTransport = (SMTPTransport) getEmailSession().getTransport(SMTPS);
        smtpTransport.connect(GMAIL_SMTP_SERVER, USERNAME, PASSWORD);
        smtpTransport.sendMessage(message, message.getAllRecipients());
        smtpTransport.close();
    }

    private Session getEmailSession() {
        var properties = System.getProperties();
        properties.put(SMTP_HOST, GMAIL_SMTP_SERVER);
        properties.put(SMTP_AUTH, true);
        properties.put(SMTP_PORT, DEFAULT_PORT);
        properties.put(SMTP_STARTTLS_ENABLE, true);
        properties.put(SMTP_STARTTLS_REQUIRED, true);
        return Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(USERNAME, PASSWORD);
            }
        });
    }

    private MimeMessage getInitialMessage(String email, EmailType emailType) throws MessagingException {
        var message = new MimeMessage(getEmailSession());
        message.setFrom(new InternetAddress(FROM_EMAIL));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email, false));
        message.setRecipients(Message.RecipientType.CC, InternetAddress.parse(CC_EMAIL, false));
        message.setSubject(emailType.title);
        message.setSentDate(new Date());
        return message;
    }

    private Message createEmail(String email, EmailType emailType, String[] placeholders) throws MessagingException {
        var message = getInitialMessage(email, emailType);
        message.setText(getMessageText(emailType, placeholders));
        message.saveChanges();
        return message;
    }

    private Message createEmailWithCV(String email, EmailType emailType, String[] placeholders, EmployeesCv cv) throws MessagingException {
        var message = getInitialMessage(email, emailType);
        if (cv != null) {
            var messageBodyPart = new MimeBodyPart();
            messageBodyPart.setText(getMessageText(emailType, placeholders));
            var attachmentPart = new MimeBodyPart();
            var bds = new ByteArrayDataSource(cv.getFile().getData(), cv.getFileType());
            attachmentPart.setDataHandler(new DataHandler(bds));
            attachmentPart.setFileName(cv.getFilename());
            var multiPart = new MimeMultipart();
            multiPart.addBodyPart(messageBodyPart);
            multiPart.addBodyPart(attachmentPart);
            message.setContent(multiPart);
        }
        message.saveChanges();
        return message;
    }

    private String getMessageText(EmailType emailType, String... placeholders) {
        switch (emailType) {
            case ACCOUNT_CREATED -> {
                return String.format("""
                        Hello,
                                                
                        thank you for signing up on ITJobBoard.
                        Below is your account activation link.
                        %s/confirm?token=%s
                                                
                        We wish you the luck in your recruitments!
                        ITJobBoard Team""", placeholders[0], placeholders[1]);
            }
            case APPLIED_EMPLOYEE -> {
                return String.format("""
                        Hello,
                                                
                        you applied for %s on ITJobBoard to %s. Your CV was sent to employer.

                        We wish you the luck!
                        ITJobBoard Team""", placeholders[0], placeholders[1]);
            }
            case APPLIED_EMPLOYER -> {
                return String.format("""
                        Hello,
                                                
                        someone applied for your offer %s on ITJobBoard. CV is in the attachments.

                        We wish you the luck in your recruitments!
                        ITJobBoard Team""", placeholders[0]);
            }
            case OFFER_ADDED -> {
                return String.format("""
                        Hello,
                                                
                        your offer %s on ITJobBoard has been added. Please wait for its approval or contact our Team.

                        We wish you the luck in your recruitments!
                        ITJobBoard Team""", placeholders[0]);
            }
            case OFFER_APPROVED -> {
                return String.format("""
                        Hello,
                        your offer %s on ITJobBoard has been approved.

                        We wish you the luck in your recruitments!
                        ITJobBoard Team""", placeholders[0]);
            }
        }
        //TODO custom exception maybe
        throw new InvalidParameterException();
    }
}
