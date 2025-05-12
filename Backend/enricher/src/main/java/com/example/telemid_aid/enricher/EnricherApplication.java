package com.example.telemid_aid.enricher;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.integration.config.EnableIntegration;

@SpringBootApplication
@EnableIntegration
@EnableFeignClients
public class EnricherApplication {

	public static void main(String[] args) {
		SpringApplication.run(EnricherApplication.class, args);
	}

}
