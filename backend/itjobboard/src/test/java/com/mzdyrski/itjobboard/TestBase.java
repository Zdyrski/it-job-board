package com.mzdyrski.itjobboard;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mzdyrski.itjobboard.offer.Offer;
import com.mzdyrski.itjobboard.offer.SchedulerService;
import com.mzdyrski.itjobboard.user.*;
import com.mzdyrski.itjobboard.offer.dto.AddressData;
import com.mzdyrski.itjobboard.offer.dto.ContractData;
import com.mzdyrski.itjobboard.offer.dto.SkillData;
import com.mzdyrski.itjobboard.security.JWTTokenProvider;
import com.mzdyrski.itjobboard.email.EmailService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.time.Clock;
import java.util.Date;

import static com.mzdyrski.itjobboard.offer.ApprovalState.APPROVED;
import static com.mzdyrski.itjobboard.offer.ExperienceLevel.MEDIUM;
import static com.mzdyrski.itjobboard.offer.RemoteState.FULL_TIME;
import static com.mzdyrski.itjobboard.user.Role.*;

@ActiveProfiles("test")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TestBase {

    @Autowired
    protected WebTestClient webTestClient;

    @Autowired
    protected SchedulerService schedulerService;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    protected JWTTokenProvider jwtTokenProvider;

    @Autowired
    protected BCryptPasswordEncoder passwordEncoder;

    //    protected MongodExecutable mongodExecutable;
    @Autowired
    protected MongoTemplate mongoTemplate;

    @MockBean
    protected EmailService emailService;

    @MockBean
    protected Clock clock;

    @BeforeEach
    public void mockEmailService() {

    }

//    @BeforeEach
//    void setupDb() throws IOException {
//        String ip = "localhost";
//        int port = 27017;
//
//        ImmutableMongodConfig mongodConfig = MongodConfig
//                .builder()
//                .version(Version.Main.PRODUCTION)
//                .net(new Net(ip, port, Network.localhostIsIPv6()))
//                .build();
//
//        MongodStarter starter = MongodStarter.getDefaultInstance();
//        mongodExecutable = starter.prepare(mongodConfig);
//        mongodExecutable.start();
//    }
//
//    @AfterEach
//    void cleanDb(){
//        mongodExecutable.stop();
//    }

    @AfterEach
    public void cleanDb() {
        mongoTemplate.dropCollection("users");
        mongoTemplate.dropCollection("offers");
        mongoTemplate.dropCollection("tags");
        mongoTemplate.dropCollection("applications");
        mongoTemplate.dropCollection("employees_cvs");
    }

    @BeforeEach
    public void saveUsersToDb() {
        saveEmployeeToDb();
        saveEmployerToDb();
        saveAdminToDb();
    }

    @BeforeEach
    protected void saveOfferToDb() {
        var offer = getOffer();
        mongoTemplate.save(offer, "offers");
    }

    protected void saveEmployeeToDb() {
        var employee = new Employee();
        employee.setId("employeeId");
        employee.setEmail("employee@aa.com");
        employee.setPassword(getEncryptedPassword());
        employee.setRole(ROLE_EMPLOYEE.name());
        employee.setAuthorities(ROLE_EMPLOYEE.getAuthorities());
        employee.setActive(true);
        employee.setLocked(false);
        mongoTemplate.save(employee, "users");
    }

    protected void saveEmployerToDb() {
        var employer = new Employer();
        employer.setId("employerId");
        employer.setEmail("employer@aa.com");
        employer.setPassword(getEncryptedPassword());
        employer.setRole(ROLE_EMPLOYER.name());
        employer.setAuthorities(ROLE_EMPLOYER.getAuthorities());
        employer.setActive(true);
        employer.setLocked(false);
        mongoTemplate.save(employer, "users");
    }

    protected void saveAdminToDb() {
        var admin = new User();
        admin.setEmail("admin@aa.com");
        admin.setPassword(getEncryptedPassword());
        admin.setRole(ROLE_ADMIN.name());
        admin.setAuthorities(ROLE_ADMIN.getAuthorities());
        admin.setActive(true);
        admin.setLocked(false);
        mongoTemplate.save(admin, "users");
    }

    protected String getEmployeeToken() {
        var employee = mongoTemplate.findOne(new Query(new Criteria("email").is("employee@aa.com")), Employee.class, "users");
        return jwtTokenProvider.generateJwtToken(new UserSecurity(employee));
    }

    protected String getEmployerToken() {
        var employer = mongoTemplate.findOne(new Query(new Criteria("email").is("employer@aa.com")), Employer.class, "users");
        return jwtTokenProvider.generateJwtToken(new UserSecurity(employer));
    }

    protected String getAdminToken() {
        var admin = mongoTemplate.findOne(new Query(new Criteria("email").is("admin@aa.com")), User.class, "users");
        return jwtTokenProvider.generateJwtToken(new UserSecurity(admin));
    }

    protected Offer getOffer() {
        var offer = new Offer();
        offer.setId("offerId");
        offer.setTitle("title");
        offer.setEmployerId("employerId");
        offer.setAddress(new AddressData("country", "city", "street"));
        offer.setRemoteStatus(FULL_TIME.value);
        offer.setContracts(new ContractData[]{new ContractData("employment", true, 0, 0)});
        offer.setSalaryShort("salaryShort");
        offer.setExperienceLevel(MEDIUM.value);
        offer.setTechStack(new SkillData[]{new SkillData("Java", 5), new SkillData("React", 5)});
        offer.setTags(new String[]{"Java"});
        offer.setDate(new Date(clock.millis()));
        offer.setDescription("description");
        offer.setApprovalStatus(APPROVED.value);
        offer.setArchived(false);
        return offer;
    }

    private String getEncryptedPassword() {
        return passwordEncoder.encode("password");
    }

}
