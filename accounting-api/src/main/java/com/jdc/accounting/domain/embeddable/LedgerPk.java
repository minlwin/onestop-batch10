package com.jdc.accounting.domain.embeddable;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class LedgerPk {

	@Column(name = "member_id")
	private UUID memberId;
	
	@Column(name = "seq_number")
	private int seqNumber;
}
