package com.jdc.accounting.domain.entity;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class MemberBalance {
	
	@Id
	private UUID memberId;
	
	@MapsId
	@OneToOne(optional = false)
	private Member member;
	
	private BigDecimal balance = BigDecimal.ZERO;
}
