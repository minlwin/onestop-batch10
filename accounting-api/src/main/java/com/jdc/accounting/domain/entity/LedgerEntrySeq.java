package com.jdc.accounting.domain.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class LedgerEntrySeq {

	@EmbeddedId
	private LedgerEntrySeqPk id;
	private int seqNumber;
	
	public LedgerEntryPk next() {
		seqNumber ++;
		return new LedgerEntryPk(id.getMemberId(), id.getIssueAt(), seqNumber);
	}

}
