package com.jdc.accounting.domain.entity;

import com.jdc.accounting.domain.embeddable.LedgerEntryPk;
import com.jdc.accounting.domain.embeddable.LedgerEntrySeqPk;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class LedgerEntrySeq {

	@EmbeddedId
	private LedgerEntrySeqPk id;
	
	@Column(name = "seq_number")
	private int seqNumber;

	public LedgerEntryPk next() {
		return new LedgerEntryPk(id.getMemberId(), id.getUseDate(), ++ seqNumber);
	}

}
