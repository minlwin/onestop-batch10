package com.jdc.accounting.domain.embeddable;

import java.io.Serializable;
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
public class LedgerPk implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "member_id")
	private UUID memberId;
	
	@Column(name = "seq_number")
	private int seqNumber;
	
	public String getCode() {
		return "%04d".formatted(seqNumber);
	}

	public static LedgerPk from(UUID id, String seq) {
		return new LedgerPk(id, Integer.parseInt(seq));
	}
}
