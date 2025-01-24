package com.jdc.accounting.domain.embeddable;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
public class LedgerEntryPk implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Column(name = "member_id")
	private UUID memberId;
	
	@Column(name = "use_date")
	private LocalDate useDate;
	
	@Column(name = "entry_number")
	private int entryNumber;
	
	private static final DateTimeFormatter DF = DateTimeFormatter.ofPattern("yyyyMMdd"); 
	
	public String getCode() {
		return "%s%04d".formatted(useDate.format(DF), entryNumber);
	}
	
	public static LedgerEntryPk from(UUID id, String code) {
		return new LedgerEntryPk(id, LocalDate.parse(code.substring(0, 8), DF), Integer.parseInt(code.substring(8)));
	}

	public static boolean canUpdate(String code) {
		var useDate = LocalDate.parse(code.substring(0, 8), DF);
		return LocalDate.now().equals(useDate);
	}
}
