package com.jdc.accounting.aspects;

import org.aopalliance.intercept.Joinpoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.Configuration;

import com.jdc.accounting.service.MemberAccessService;

import lombok.RequiredArgsConstructor;

@Aspect
@Configuration
@RequiredArgsConstructor
public class AccessHistoryAspect {

	private final MemberAccessService accessService;
	
	@Pointcut(value = "within(com.jdc.accounting.api.*)")
	public void apiMethod() {}
	
	@Around(value = "apiMethod() and @annotation(com.jdc.accounting.aspects.AccessInfo)")
	public Object intercept(Joinpoint joinPoint, AccessInfo info) throws Throwable {
		
		var id = accessService.initiate(info);
		
		try {
			var result = joinPoint.proceed();
			
			accessService.success(id);
			
			return result;
		} catch (Throwable e) {
			accessService.fails(id, e.getMessage());
			throw e;
		}
	}
}
