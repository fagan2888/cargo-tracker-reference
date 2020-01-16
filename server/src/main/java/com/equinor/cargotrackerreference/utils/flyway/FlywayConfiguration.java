package com.equinor.cargotrackerreference.utils.flyway;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("flyway")
public class FlywayConfiguration {
	@Value("${spring.datasource.url}")
	private String url;
	@Value("${spring.datasource.username}")
	private String user;
	@Value("${spring.datasource.password}")
	private String password;
	@Value("${spring.flyway.out_of_order}")
	private Boolean outOfOrder;

	@Bean(initMethod = "migrate")	
	public Flyway flyway() {
		Flyway flyway = null;
		flyway = Flyway.configure().dataSource(url, user, password).outOfOrder(outOfOrder).load();		
		return flyway;
	}
}
