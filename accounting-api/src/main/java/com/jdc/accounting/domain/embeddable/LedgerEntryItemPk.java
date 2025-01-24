package com.jdc.accounting.domain.embeddable;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class LedgerEntryItemPk implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Column(name = "member_id")
	private UUID memberId;

	@Column(name = "use_date")
	private LocalDate useDate;
	
	@Column(name = "entry_number")
	private int entryNumber;
	
	@Column(name = "item_number")
	private int itemNumber;
	
	public static LedgerEntryItemPk from(LedgerEntryPk entryId, int itemNumber) {
		var pk = new LedgerEntryItemPk();
		pk.setMemberId(entryId.getMemberId());
		pk.setUseDate(entryId.getUseDate());
		pk.setEntryNumber(entryId.getEntryNumber());
		pk.setItemNumber(itemNumber);
		return pk;
	}
}
