package com.jdc.accounting.domain.embeddable;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class LedgerEntryPk {

	@Column(name = "member_id")
	private UUID memberId;
	@Column(name = "use_date")
	private LocalDate useDate;
	@Column(name = "seq_number")
	private int seqNumber;
}
