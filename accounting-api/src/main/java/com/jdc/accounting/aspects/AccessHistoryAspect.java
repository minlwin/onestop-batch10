package com.jdc.accounting.aspects;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import com.jdc.accounting.service.MemberAccessService;
import com.jdc.accounting.utils.AccessInfo;

import lombok.RequiredArgsConstructor;

@Aspect
@Component
@RequiredArgsConstructor
public class AccessHistoryAspect {

	private final MemberAccessService accessService;
	
	@Around("@annotation(info)")
	public Object intercept(ProceedingJoinPoint joinPoint, AccessInfo info) throws Throwable {
		
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
