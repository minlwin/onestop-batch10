package com.jdc.accounting.domain.entity;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class LedgerEntrySeqPk {
	@Column(name = "member_id")
	private UUID memberId;
	@Column(name = "issue_at")
	private LocalDate issueAt;
}
