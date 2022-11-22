package com.mzdyrski.itjobboard.services;

import com.mzdyrski.itjobboard.dataTemplates.*;
import com.mzdyrski.itjobboard.domain.*;
import com.mzdyrski.itjobboard.exceptions.OfferNotAvailableException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.*;

import static com.mzdyrski.itjobboard.enums.EmailType.*;
import static com.mzdyrski.itjobboard.enums.Role.*;

@RequiredArgsConstructor
@Service
public class OfferServiceImpl {

    final private OfferRepository offerRepository;
    final private ApplicationRepository applicationRepository;
    final private UserRepository userRepository;

    final private EmployeesCvRepository cvRepository;
    final private EmailService emailService;
    final private MongoTemplate mongoTemplate;

    public OfferDetailedData getOfferDetails(String offerId, User user) throws OfferNotAvailableException {
        var offer = offerRepository.findById(offerId).orElseThrow();
        var employer = (Employer) userRepository.findById(offer.getEmployerId()).orElseThrow();
        if ((offer.getApprovalStatus() == 1 && !offer.isArchived()) ||
                (user != null && (Objects.equals(user.getId(), employer.getId()) || Objects.equals(user.getRole(), ROLE_ADMIN.name())))) {
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
                    offer.getDescription()
            );
        }else {
            throw new OfferNotAvailableException("Offer not available");
        }
    }

    public List<ListElOfferData> getOffersByFilters(Aggregation aggregation) {
        //TODO applying possible filters and connect with employer img src
        var offers = mongoTemplate.aggregate(aggregation, "offers", Offer.class);
        var result = new ArrayList<ListElOfferData>();
        for (Offer offer : offers) {
            result.add(getListElForGivenOffer(offer));
        }
        return result;
    }

    public List<ListAdminElOfferData> getOffersByAdminFilters(Aggregation aggregation) {
        //TODO applying possible filters and connect with employer img src
        var offers = mongoTemplate.aggregate(aggregation, "offers", Offer.class);
        var result = new ArrayList<ListAdminElOfferData>();
        for (Offer offer : offers) {
            result.add(getListAdminElForGivenOffer(offer));
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
                var offer = offerRepository.findById(application.getOfferId()).orElseThrow();
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
        newOffer.setApprovalStatus(0);
        offerRepository.save(newOffer);
        emailService.sendEmail(employer.getEmail(), OFFER_ADDED, "url");
    }

    public void setOfferStatus(User admin, String offerId, OfferStatusData data) {
        if (!Objects.equals(admin.getRole(), ROLE_ADMIN.name())) {
            return;
        }
        var offer = offerRepository.findById(offerId).orElseThrow();
        offer.setApprovalStatus(data.approvalState());
        offer.setArchived(data.archived());
        offerRepository.save(offer);
    }

    private ListElOfferData getListElForGivenOffer(Offer offer) {
        var employerInfo = (Employer) userRepository.findById(offer.getEmployerId()).orElseThrow();
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

    private ListAdminElOfferData getListAdminElForGivenOffer(Offer offer) {
        var employerInfo = (Employer) userRepository.findById(offer.getEmployerId()).orElseThrow();
        return new ListAdminElOfferData(
                offer.getId(),
                offer.getTitle(),
                employerInfo.getCompanyName(),
                employerInfo.getCompanyLogoUrl(),
                offer.getAddress().city(),
                offer.getRemote(),
                offer.getTags(),
                offer.getSalaryShort(),
                offer.getDate(),
                offer.getApprovalStatus(),
                offer.isArchived()
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
}
