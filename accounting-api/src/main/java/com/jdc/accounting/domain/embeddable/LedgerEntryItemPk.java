package com.jdc.accounting.domain.embeddable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class LedgerEntryItemPk {

	@Embedded
	private LedgerEntryPk entryId;
	@Column(name = "item_number")
	private int itemNumber;
}
