package com.jdc.accounting.api.input;

import java.time.LocalDate;

public record BalanceSearch(
		LocalDate dateFrom,
		LocalDate dateTo) {

}
