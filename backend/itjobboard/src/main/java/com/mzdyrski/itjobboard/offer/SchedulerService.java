package com.mzdyrski.itjobboard.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Date;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;

@RequiredArgsConstructor
@Service
public class SchedulerService {

    private final Clock clock;
    private final MongoTemplate mongoTemplate;
    @Value("${scheduler.offset.months}")
    private Long monthsOffset;

    @Scheduled(cron = "0 0 * * *")
    protected void archiveOldOffers() {
        var offers = mongoTemplate.aggregate(getAggregation(), "offers", Offer.class);
        offers.forEach(offer -> {
            offer.setArchived(true);
            mongoTemplate.save(offer, "offers");
        });
    }

    private Aggregation getAggregation() {
        var date = new Date(clock.instant().toEpochMilli() - Duration.ofDays(60).toMillis());
        var notArchivedCriteria = match(new Criteria("archived").is(false));
        var dateCriteria = match(new Criteria("date").lt(date));
        return newAggregation(notArchivedCriteria, dateCriteria);
    }
}
