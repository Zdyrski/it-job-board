package com.mzdyrski.itjobboard.service;

import com.sun.mail.smtp.SMTPTransport;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;

import static com.mzdyrski.itjobboard.constants.EmailConstant.*;

@Service
public class EmailService {

    public void sendEmail(String email, String emailType, String emailText) throws MessagingException {
        var message = createEmail(email, emailType, emailText);
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
        return Session.getInstance(properties, null);
    }

    private Message createEmail(String email, String emailType, String emailText) throws MessagingException {
        var message = new MimeMessage(getEmailSession());
        message.setFrom(new InternetAddress(FROM_EMAIL));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email, false));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(CC_EMAIL, false));
        setMessageSubject(message, emailType);
        message.setText(emailText);
        message.setSentDate(new Date());
        message.saveChanges();
        return message;
    }

    private void setMessageSubject(MimeMessage message, String emailType) throws MessagingException {
        switch (emailType) {
            case EMAIL_TYPE_ACCOUNT_CREATED -> message.setSubject(EMAIL_SUBJECT_ACCOUNT_CREATED);
            case EMAIL_TYPE_APPLIED -> message.setSubject(EMAIL_SUBJECT_APPLIED);
            case EMAIL_TYPE_OFFER_ADDED -> message.setSubject(EMAIL_SUBJECT_OFFER_ADDED);
            case EMAIL_TYPE_OFFER_APPROVED -> message.setSubject(EMAIL_SUBJECT_OFFER_APPROVED);
        }
    }

//    private void setMessageText(MimeMessage message, String emailType) throws MessagingException {
//        switch (emailType) {
//            case EMAIL_TYPE_ACCOUNT_CREATED ->
//                    message.setText(String.format("Hello, \n\n Thank you for creating a new account at our service. \n\n The ITJobBoard Team"));
//            case EMAIL_TYPE_APPLIED ->
//                    message.setText(String.format("Hello, \n\n You applied for offer. \n\n The ITJobBoard Team"));
//            case EMAIL_TYPE_OFFER_ADDED ->
//                    message.setText(String.format("Hello, \n\n Your offer was added. Now please wait for our staff approval. \n\n The ITJobBoard Team"));
//            case EMAIL_TYPE_OFFER_APPROVED ->
//                    message.setText(String.format("Hello, \n\n Thank you for your time, your offer was approved. Await new notifications.\n\n The ITJobBoard Team"));
//        }
//    }
}
