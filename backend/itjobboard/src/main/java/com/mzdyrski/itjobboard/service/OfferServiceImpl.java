package com.mzdyrski.itjobboard.service;

import com.mzdyrski.itjobboard.dataTemplates.*;
import com.mzdyrski.itjobboard.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.*;

import static com.mzdyrski.itjobboard.constants.EmailConstant.*;
import static com.mzdyrski.itjobboard.enums.Role.ROLE_EMPLOYEE;
import static com.mzdyrski.itjobboard.enums.Role.ROLE_EMPLOYER;

@RequiredArgsConstructor
@Service
public class OfferServiceImpl {

    final private OfferRepository offerRepository;
    final private ApplicationRepository applicationRepository;
    final private UserRepository userRepository;
    final private TagRepository tagRepository;
    final private EmployeesCvRepository cvRepository;
    final private EmailService emailService;

    public OfferDetailedData getOfferDetails(String offerId) {
        var offer = offerRepository.findById(offerId).get();
        var employer = (Employer) userRepository.findById(offer.getEmployerId()).get();
        var canApply = false;
        return new OfferDetailedData(
                offer.getTitle(),
                employer.getCompanyName(),
                employer.getCompanySize(),
                employer.getCompanySiteUrl(),
                employer.getCompanyLogoUrl(),
                offer.getAddress().city(),
                offer.getRemote(),
                offer.getExperienceLevel(),
                offer.getDate(),
                offer.getTechStack(),
                offer.getContracts(),
                offer.getDescription(),
                canApply
        );
    }

    public List<ListElOfferData> getOffersByFilters() {
        // TODO applying possible filters and connect with employer img src
        var offers = offerRepository.findAllByOrderByDateDesc();
        var result = new ArrayList<ListElOfferData>();
        for (Offer offer : offers) {
            result.add(getListElForGivenOffer(offer));
        }
        return result;
    }

    public List<ListElOfferData> getOffersByUser(User user) {
        var result = new ArrayList<ListElOfferData>();
        if (Objects.equals(user.getRole(), ROLE_EMPLOYER.name())) {
            var offers = offerRepository.findAllByEmployerIdOrderByDateDesc(user.getId());
            for (Offer offer : offers) {
                result.add(getListElForGivenOffer(offer));
            }
        } else if (Objects.equals(user.getRole(), ROLE_EMPLOYEE.name())) {
            var applications = applicationRepository.findApplicationsByUserId(user.getId());
            for (Application application : applications) {
                var offer = offerRepository.findById(application.getOfferId()).get();
                result.add(getListElForGivenOffer(offer));
            }
        }
        return result;
    }

    public void addOffer(User employer, OfferData offerData) throws MessagingException, IOException {
        if (!Objects.equals(employer.getRole(), ROLE_EMPLOYER.name())) {
            return;
        }
        var newOffer = new Offer();
        newOffer.setEmployerId(employer.getId());
        newOffer.setTitle(offerData.title());
        newOffer.setAddress(offerData.address());
        newOffer.setRemote(offerData.remote());
        newOffer.setContracts(offerData.contracts());
        newOffer.setSalaryShort(getShortSalary(offerData.contracts()));
        newOffer.setExperienceLevel(offerData.experienceLevel());
        var reverseSortedTechStack = Arrays.stream(offerData.techStack()).sorted(Comparator.comparing(SkillData::level).reversed()).toArray(SkillData[]::new);
        newOffer.setTechStack(reverseSortedTechStack);
        newOffer.setTags(getTags(reverseSortedTechStack));
        newOffer.setDate(new Date());
        newOffer.setDescription(offerData.description());
        newOffer.setApproved(false);
        offerRepository.save(newOffer);
        emailService.sendEmail(employer.getEmail(), EMAIL_TYPE_OFFER_ADDED, "TEST", null);
    }

    public int checkIfCanApply(User user, String offerId) {
        // TODO better enum?
        if (Objects.equals(user.getRole(), ROLE_EMPLOYEE.name())) {
            var app = applicationRepository.findApplicationByOfferIdAndUserId(offerId, user.getId());
            if (app == null) {
                return 1; // can apply
            } else {
                return 2; // already applied
            }
        }
        return 0; // wrong role
    }

    public void applyForOffer(User employee, String offerId) throws MessagingException, IOException {
        if (!Objects.equals(employee.getRole(), ROLE_EMPLOYEE.name())) {
            return;
        }
        if (checkIfCanApply(employee, offerId) != 1) {
            return;
        }
        System.out.println("applied");
        var application = new Application();
        application.setOfferId(offerId);
        application.setUserId(employee.getId());
        applicationRepository.save(application);
        sendEmailsAfterApplying(employee, offerId);
    }

    public String[] getAllTags() {
        return tagRepository.findAll().stream().map(Tag::getName).toArray(String[]::new);
    }

    public void addTag(TagData tagData) {
        var newTag = new Tag();
        newTag.setName(tagData.name());
        tagRepository.save(newTag);
    }

    private ListElOfferData getListElForGivenOffer(Offer offer) {
        var employerInfo = (Employer) userRepository.findById(offer.getEmployerId()).get();
        return new ListElOfferData(
                offer.getId(),
                offer.getTitle(),
                employerInfo.getCompanyName(),
                employerInfo.getCompanyLogoUrl(),
                offer.getAddress().city(),
                offer.getRemote(),
                offer.getTags(),
                offer.getSalaryShort(),
                offer.getDate()
        );
    }

    private String getShortSalary(ContractData[] contracts) {
        var minMoney = 0;
        var maxMoney = 0;
        for (ContractData contract : contracts) {
            if (!contract.undisclosed()) {
                if (contract.maxMoney() > maxMoney) {
                    minMoney = contract.minMoney();
                    maxMoney = contract.maxMoney();
                }
            }
        }
        if (maxMoney != 0) {
            return String.format("%s - %s PLN", minMoney, maxMoney);
        }
        return "Undisclosed";
    }

    private String[] getTags(SkillData[] reverseSortedTechStack) {
        var result = new ArrayList<String>();
        for (int i = 0; i < reverseSortedTechStack.length; i++) {
            if (i == 3) {
                break;
            }
            result.add(reverseSortedTechStack[i].skillName());
        }
        return result.toArray(String[]::new);
    }

    private void sendEmailsAfterApplying(User employee, String offerId) throws MessagingException, IOException {
        var offer = offerRepository.findById(offerId).get();
        var employer = (Employer) userRepository.findById(offer.getEmployerId()).get();
        var cv = cvRepository.findByEmployeeId(employee.getId());
        emailService.sendEmail(employee.getEmail(), EMAIL_TYPE_APPLIED_EMPLOYEE, getEmailTextForEmployeeApplication(offer.getTitle(), employer.getCompanyName()), null);
        emailService.sendEmail(employer.getEmail(), EMAIL_TYPE_APPLIED_EMPLOYER, getEmailTextForEmployerApplication(offer.getTitle()), cv);
    }

    private String getEmailTextForEmployeeApplication(String offer, String employer) {
        return String.format("""
                Hello,
                you applied for %s on ITJobBoard to %s. Your CV was sent to employer.

                We wish you the luck!
                ITJobBoard Team""", offer, employer);
    }

    private String getEmailTextForEmployerApplication(String offer) {
        return String.format("""
                Hello,
                someone applied for your offer %s on ITJobBoard. CV is in the attachments.\s

                We wish you the luck in your recruitments!
                ITJobBoard Team""", offer);
    }
}
