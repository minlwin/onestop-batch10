package com.jdc.accounting.api.input;

import java.time.LocalDate;

import org.springframework.web.bind.annotation.PathVariable;

public record MemberAccessSearch(
		@PathVariable String id, 
		LocalDate dateFrom,
		LocalDate dateTo) {

}
