package com.mzdyrski.itjobboard.offer;

import com.mzdyrski.itjobboard.application.Application;
import com.mzdyrski.itjobboard.application.ApplicationRepository;
import com.mzdyrski.itjobboard.exception.OfferNotAvailableException;
import com.mzdyrski.itjobboard.email.EmailService;
import com.mzdyrski.itjobboard.offer.dto.*;
import com.mzdyrski.itjobboard.user.Employee;
import com.mzdyrski.itjobboard.user.Employer;
import com.mzdyrski.itjobboard.user.User;
import com.mzdyrski.itjobboard.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.*;

import static com.mzdyrski.itjobboard.offer.ApprovalState.APPROVED;
import static com.mzdyrski.itjobboard.offer.ApprovalState.NOT_APPROVED;
import static com.mzdyrski.itjobboard.email.EmailType.OFFER_ADDED;
import static com.mzdyrski.itjobboard.email.EmailType.OFFER_APPROVED;
import static com.mzdyrski.itjobboard.user.Role.*;

@RequiredArgsConstructor
@Service
public class OfferService {

    final private OfferRepository offerRepository;
    final private ApplicationRepository applicationRepository;
    final private UserRepository userRepository;
    final private EmailService emailService;
    final private MongoTemplate mongoTemplate;

    public OfferDetailedData getOfferDetails(String offerId, User user) throws OfferNotAvailableException {
        var offer = offerRepository.findById(offerId).orElseThrow();
        var employer = getEmployerById(offer.getEmployerId());
        if ((Objects.equals(offer.getApprovalStatus(), APPROVED.value) && !offer.isArchived()) ||
                (user != null && (Objects.equals(user.getId(), employer.getId()) || Objects.equals(user.getRole(), ROLE_ADMIN.name())))) {
            return new OfferDetailedData(
                    offer.getTitle(),
                    employer.getCompanyName(),
                    employer.getCompanySize(),
                    employer.getCompanySiteUrl(),
                    employer.getCompanyLogoUrl(),
                    offer.getAddress(),
                    RemoteState.valueOf(offer.getRemoteStatus()).orElse(null),
                    ExperienceLevel.valueOf(offer.getExperienceLevel()).orElse(null),
                    offer.getDate(),
                    offer.getTechStack(),
                    offer.getContracts(),
                    offer.getDescription()
            );
        } else {
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

    public List<ListElWithStatusOfferData> getOffersByAdminFilters(Aggregation aggregation) {
        //TODO applying possible filters and connect with employer img src
        var offers = mongoTemplate.aggregate(aggregation, "offers", Offer.class);
        var result = new ArrayList<ListElWithStatusOfferData>();
        for (Offer offer : offers) {
            result.add(getListElWithStatusForGivenOffer(offer));
        }

        return result;
    }

    public List<ListElWithStatusOfferData> getOffersByEmployer(User user) {
        var result = new ArrayList<ListElWithStatusOfferData>();
        var offers = offerRepository.findAllByEmployerIdOrderByDateDesc(user.getId());
        for (Offer offer : offers) {
            result.add(getListElWithStatusForGivenOffer(offer));
        }
        return result;
    }

    public List<ListElOfferData> getOffersByEmployee(User user) {
        var result = new ArrayList<ListElOfferData>();
        var applications = applicationRepository.findApplicationsByUserId(user.getId());
        for (Application application : applications) {
            var offer = offerRepository.findById(application.getOfferId()).orElseThrow();
            result.add(getListElForGivenOffer(offer));
        }
        return result;
    }

    public void addOffer(User employer, OfferData offerData) throws MessagingException {
        if (!Objects.equals(employer.getRole(), ROLE_EMPLOYER.name())) {
            return;
        }
        var newOffer = new Offer();
        newOffer.setEmployerId(employer.getId());
        newOffer.setTitle(offerData.title());
        newOffer.setAddress(offerData.address());
        newOffer.setRemoteStatus(offerData.remoteStatus().value);
        newOffer.setContracts(offerData.contracts());
        newOffer.setSalaryShort(getShortSalary(offerData.contracts()));
        newOffer.setExperienceLevel(offerData.experienceLevel().value);
        var reverseSortedTechStack = Arrays.stream(offerData.techStack()).sorted(Comparator.comparing(SkillData::level).reversed()).toArray(SkillData[]::new);
        newOffer.setTechStack(reverseSortedTechStack);
        newOffer.setTags(getTags(reverseSortedTechStack));
        newOffer.setDate(new Date());
        newOffer.setDescription(offerData.description());
        newOffer.setApprovalStatus(NOT_APPROVED.value);
        offerRepository.save(newOffer);
        emailService.sendEmail(employer.getEmail(), OFFER_ADDED, "url");
    }

    public void setOfferStatus(User admin, String offerId, OfferStatusData data) throws MessagingException {
        if (!Objects.equals(admin.getRole(), ROLE_ADMIN.name())) {
            return;
        }
        var offer = offerRepository.findById(offerId).orElseThrow();
        var employer = getEmployerById(offer.getEmployerId());
        offer.setApprovalStatus(data.approvalStatus());
        offer.setArchived(data.archived());
        emailService.sendEmail(employer.getEmail(), OFFER_APPROVED);
        offerRepository.save(offer);
    }

    private ListElOfferData getListElForGivenOffer(Offer offer) {
        var employer = getEmployerById(offer.getEmployerId());
        return new ListElOfferData(
                offer.getId(),
                offer.getTitle(),
                employer.getCompanyName(),
                employer.getCompanyLogoUrl(),
                offer.getAddress(),
                RemoteState.valueOf(offer.getRemoteStatus()).orElse(null),
                offer.getTags(),
                offer.getSalaryShort(),
                offer.getDate()
        );
    }

    private ListElWithStatusOfferData getListElWithStatusForGivenOffer(Offer offer) {
        var employer = getEmployerById(offer.getEmployerId());
        return new ListElWithStatusOfferData(
                offer.getId(),
                offer.getTitle(),
                employer.getCompanyName(),
                employer.getCompanyLogoUrl(),
                offer.getAddress(),
                RemoteState.valueOf(offer.getRemoteStatus()).orElse(null),
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

    private Employee getEmployeeById(String id){
        return mongoTemplate.findById(id, Employee.class, "users");
    }

    private Employer getEmployerById(String id){
        return mongoTemplate.findById(id, Employer.class, "users");
    }
}
