package com.jdc.accounting.aspects;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.BindingResult;

import com.jdc.accounting.exceptions.ApiValidationException;

@Aspect
@Configuration
public class ApiValidationExceptionAspect {

	@Pointcut(value = "within(com.jdc.accounting.api.*) && @within(org.springframework.web.bind.annotation.RestController)")
	public void apiMethod() {}
	
	@Before(argNames = "result", value = "apiMethod() and args(.., result)")
	public void handle(BindingResult result) {
		if(result.hasErrors()) {
			throw new ApiValidationException(
					result.getFieldErrors().stream()
						.map(e -> e.getDefaultMessage())
						.toArray(size -> new String[size]));
		}
	}
}
