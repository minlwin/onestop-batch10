package com.jdc.accounting.api.input;

import jakarta.validation.constraints.NotNull;

public record MemberStatusForm(
		@NotNull(message = "Please select activatation status.")
		Boolean status) {

}
