package com.mzdyrski.itjobboard.service;

import com.mzdyrski.itjobboard.dataTemplates.ContractData;
import com.mzdyrski.itjobboard.dataTemplates.ListElOfferData;
import com.mzdyrski.itjobboard.dataTemplates.SkillData;
import com.mzdyrski.itjobboard.domain.*;
import com.mzdyrski.itjobboard.dataTemplates.OfferData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.mzdyrski.itjobboard.enums.Role.ROLE_EMPLOYEE;
import static com.mzdyrski.itjobboard.enums.Role.ROLE_EMPLOYER;

@RequiredArgsConstructor
@Service
public class OfferServiceImpl {
    //TODO
    final private OfferRepository offerRepository;
    final private ApplicationRepository applicationRepository;
    final private UserRepository userRepository;
    final private TagRepository tagRepository;

    public Optional<Offer> getOfferDetails(String offerId){
        var offer = offerRepository.findById(offerId);
        // TODO connect offer with employer img src and his overall info
        return offer;
    }

    public List<ListElOfferData> getOffersByFilters(){
        // TODO applying possible filters and connect with employer img src
        var offers = offerRepository.findAll();
        var result = new ArrayList<ListElOfferData>();
        for (Offer offer : offers){
            var employerInfo = (Employer) userRepository.findById(offer.getEmployerId()).get();
            var offerToAdd = new ListElOfferData(
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
            result.add(offerToAdd);
        }
        return result;
    }

    public List<Offer> getOffersByUser(User user){
        if(Objects.equals(user.getRole(), ROLE_EMPLOYER.name())){
            return offerRepository.findAllByEmployerId(user.getId());
        } else if (Objects.equals(user.getRole(), ROLE_EMPLOYEE.name())) {
            // TODO filter applied offers
        }
        return null;
    }

    public void addOffer(User employer, OfferData offerData){
        if(!Objects.equals(employer.getRole(), ROLE_EMPLOYER.name())){
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
    }

    public void applyForOffer(User employee, String offerId){
        if(!Objects.equals(employee.getRole(), ROLE_EMPLOYEE.name())){
            return;
        }
        var application = new Application();
        application.setOfferId(offerId);
        application.setUserId(employee.getId());
        applicationRepository.save(application);
    }

    private String getShortSalary(ContractData[] contracts){
        var minMoney = 0;
        var maxMoney = 0;
        for (ContractData contract : contracts){
            if(!contract.undisclosed()){
                if(contract.maxMoney() > maxMoney) {
                    minMoney = contract.minMoney();
                    maxMoney = contract.maxMoney();
                }
            }
        }
        if(maxMoney != 0){
            return String.format("%s - %s PLN", minMoney, maxMoney);
        }
        return "Undisclosed";
    }

    private String[] getTags(SkillData[] reverseSortedTechStack){
        var result = new ArrayList<String>();
        for(int i = 0;  i < reverseSortedTechStack.length; i++){
            if (i ==3){
                break;
            }
            result.add(reverseSortedTechStack[i].skillName());
        }
        return result.toArray(String[]::new);
    }
}
