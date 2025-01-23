package com.jdc.accounting.domain.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.jdc.accounting.domain.consts.AccessStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class MemberAccessHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	
	@ManyToOne(optional = false)
	private Member member;
	
	private String activity;
	private LocalDateTime accessAt;
	private LocalDateTime endAt;
	private AccessStatus status;
	private String message;
}
