package com.jdc.accounting.domain.entity;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class LedgerEntryItemPk {

	@Column(name = "member_id")
	private UUID memberId;
	@Column(name = "issue_at")
	private LocalDate issueAt;
	@Column(name = "seq_number")
	private int seqNumber;
	private int itemNumber;
}
