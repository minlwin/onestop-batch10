package com.jdc.accounting.api.output;

import java.time.LocalDateTime;
import java.util.UUID;

import com.jdc.accounting.domain.consts.AccessStatus;
import com.jdc.accounting.domain.entity.MemberAccessHistory;
import com.jdc.accounting.domain.entity.MemberAccessHistory_;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record MemberAccessInfo(
		UUID Id,
		LocalDateTime accessAt,
		LocalDateTime endAt,
		String activity,
		AccessStatus status,
		String message) {

	public static void select(CriteriaQuery<MemberAccessInfo> cq, Root<MemberAccessHistory> root) {

		cq.multiselect(
			root.get(MemberAccessHistory_.id),
			root.get(MemberAccessHistory_.accessAt),
			root.get(MemberAccessHistory_.endAt),
			root.get(MemberAccessHistory_.activity),
			root.get(MemberAccessHistory_.status),
			root.get(MemberAccessHistory_.message)
		);
	}

}
