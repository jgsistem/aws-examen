package martin.site.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import martin.site.spring.SecurityConfiguration;
import martin.site.spring.SwaggerConfig;

@SpringBootApplication
@EnableTransactionManagement
@EnableJpaRepositories
@Import({SwaggerConfig.class, SecurityConfiguration.class})
public class ApiEncuestaApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiEncuestaApplication.class, args);
	}

}
