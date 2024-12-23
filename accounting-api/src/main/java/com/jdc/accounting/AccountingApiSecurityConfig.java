package com.jdc.accounting;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.ExceptionTranslationFilter;

import com.jdc.accounting.security.SecurityTokenFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@PropertySource(value = "classpath:/token.properties")
public class AccountingApiSecurityConfig {
	
	private final SecurityTokenFilter securityTokenFilter;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		http.csrf(csrf -> csrf.disable());
		http.cors(cors -> {});
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		http.authorizeHttpRequests(request -> {
			request.requestMatchers("/security/**").permitAll();
			request.requestMatchers("/members/**").hasAuthority("Admin");
			request.anyRequest().authenticated();
		});
		
		http.addFilterAfter(securityTokenFilter, ExceptionTranslationFilter.class);
		
		return http.build();
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
}
