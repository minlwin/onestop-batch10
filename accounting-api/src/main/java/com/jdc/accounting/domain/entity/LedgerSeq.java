package com.jdc.accounting.domain.entity;

import java.util.UUID;

import com.jdc.accounting.domain.embeddable.LedgerPk;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class LedgerSeq {

	@Id
	private UUID memberId;
	private int seqNumber;
	
	public LedgerPk next() {
		return new LedgerPk(memberId, seqNumber + 1);
	}
}
