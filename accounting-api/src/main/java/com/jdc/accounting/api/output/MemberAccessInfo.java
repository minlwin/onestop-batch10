package com.jdc.accounting.api.output;

import java.time.LocalDateTime;
import java.util.UUID;

import com.jdc.accounting.domain.consts.AccessStatus;

public record MemberAccessInfo(
		UUID Id,
		LocalDateTime accessAt,
		LocalDateTime endAt,
		String activity,
		AccessStatus status,
		String message) {

}
