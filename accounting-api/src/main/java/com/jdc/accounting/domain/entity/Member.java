package com.jdc.accounting.domain.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Member {

	@Id
	private UUID id;
	
	@MapsId
	@OneToOne(optional = false)
	private Account account;
	
	private String phone;
	
	private boolean activated;
	
	private LocalDateTime registeredAt;
	private LocalDateTime activatedAt;
	
	@OneToOne(mappedBy = "member")
	private MemberBalance balance;
	
}
