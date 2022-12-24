package com.mzdyrski.itjobboard.offer;

import com.mzdyrski.itjobboard.TestBase;
import org.junit.jupiter.api.Test;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;

public class SchedulerServiceTest extends TestBase {

    @Test
    public void shouldArchiveOldOffer() {
        // given mock clock to + 2 months

        // when
        schedulerService.archiveOldOffers();

        // then
        assertThat(mongoTemplate.aggregate(getAggregation(false), "offers", Offer.class)).hasSize(0);
        assertThat(mongoTemplate.aggregate(getAggregation(true), "offers", Offer.class)).hasSize(1);
    }

    private Aggregation getAggregation(Boolean archived) {
        var monthsOffset = 2;
        var date = LocalDateTime.now(clock).minusMonths(monthsOffset);
        var notArchivedCriteria = match(new Criteria("archived").is(archived));
        var dateCriteria = match(new Criteria("date").gte(date));
        return newAggregation(notArchivedCriteria, dateCriteria);
    }
}
