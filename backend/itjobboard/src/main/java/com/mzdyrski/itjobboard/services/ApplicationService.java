package com.mzdyrski.itjobboard.services;

import com.mzdyrski.itjobboard.domain.*;
import com.mzdyrski.itjobboard.enums.ApplyState;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.Objects;

import static com.mzdyrski.itjobboard.enums.ApplyState.*;
import static com.mzdyrski.itjobboard.enums.EmailType.APPLIED_EMPLOYEE;
import static com.mzdyrski.itjobboard.enums.EmailType.APPLIED_EMPLOYER;
import static com.mzdyrski.itjobboard.enums.Role.ROLE_EMPLOYEE;

@RequiredArgsConstructor
@Service
public class ApplicationService {

    final private OfferRepository offerRepository;
    final private ApplicationRepository applicationRepository;
    final private UserRepository userRepository;
    final private EmployeesCvRepository cvRepository;
    final private EmailService emailService;

    public ApplyState checkIfCanApply(User user, String offerId) {
        if (Objects.equals(user.getRole(), ROLE_EMPLOYEE.name())) {
            var app = applicationRepository.findApplicationByOfferIdAndUserId(offerId, user.getId());
            var cv = cvRepository.findByEmployeeId(user.getId());
            if (cv == null) {
                return NO_CV;
            }else if (app == null) {
                return CAN_APPLY;
            } else {
                return APPLIED;
            }
        }
        return CANT_APPLY;
    }

    public void applyForOffer(User employee, String offerId) throws MessagingException {
        if (!Objects.equals(employee.getRole(), ROLE_EMPLOYEE.name())) {
            return;
        }
        if (checkIfCanApply(employee, offerId).value != 1) {
            return;
        }
        var application = new Application();
        application.setOfferId(offerId);
        application.setUserId(employee.getId());
        applicationRepository.save(application);
        sendEmailsAfterApplying(employee, offerId);
    }

    private void sendEmailsAfterApplying(User employee, String offerId) throws MessagingException {
        var offer = offerRepository.findById(offerId).orElseThrow();
        var employer = (Employer) userRepository.findById(offer.getEmployerId()).orElseThrow();
        var cv = cvRepository.findByEmployeeId(employee.getId());
        emailService.sendEmail(employee.getEmail(), APPLIED_EMPLOYEE, offer.getTitle(), employer.getCompanyName());
        emailService.sendEmailWithCV(employer.getEmail(), APPLIED_EMPLOYER, cv, offer.getTitle());
    }
}
