package martin.site.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClient;
import com.fasterxml.jackson.databind.ObjectMapper;

import martin.site.spring.SecurityConfiguration;
import martin.site.spring.SwaggerConfig;


@SpringBootApplication
@EnableAutoConfiguration(exclude = DataSourceAutoConfiguration.class)
@Import({SwaggerConfig.class, SecurityConfiguration.class})
public class EncuestaSeguridadApplication {

	public static void main(String[] args) {
		SpringApplication.run(EncuestaSeguridadApplication.class, args);
	}
	
	@Bean
	public ObjectMapper objectMapper() {
		return new ObjectMapper();
	}
	
	@Bean
	public AWSCognitoIdentityProviderClient CognitoClient() {        
        AWSCognitoIdentityProviderClient cognitoClient = new AWSCognitoIdentityProviderClient(new DefaultAWSCredentialsProviderChain());
        cognitoClient.setRegion(Region.getRegion(Regions.US_EAST_1));
                
        return cognitoClient;
	}

}
