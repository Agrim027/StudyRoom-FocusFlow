package com.studyroom;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class EnvChecker implements CommandLineRunner {

    @Value("${spring.data.mongodb.uri:${MONGODB_URI:not_found}}")
    private String mongoUri;

    @Override
    public void run(String... args) throws Exception {
        log.info("===============================");
        log.info("RESOLVED MONGODB_URI: {}", mongoUri);
        log.info("===============================");
    }
}
