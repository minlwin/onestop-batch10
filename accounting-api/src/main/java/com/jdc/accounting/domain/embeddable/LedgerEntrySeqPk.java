package com.jdc.accounting.domain.embeddable;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class LedgerEntrySeqPk {

	@Column(name = "member_id")
	private UUID memberId;
	@Column(name = "use_date")
	private LocalDate useDate;
	
	public static LedgerEntrySeqPk from(UUID id, LocalDate now) {
		return new LedgerEntrySeqPk(id, now);
	}

}
