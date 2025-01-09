package com.jdc.accounting.domain.entity;

import com.jdc.accounting.domain.AbstractEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(indexes = {
	@Index(columnList = "type,name", unique = true)
})
@EqualsAndHashCode(callSuper = false)
public class Ledger extends AbstractEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false)
	private Type type;
	
	@Column(nullable = false)
	private String name;
	
	@ManyToOne(optional = false)
	private Member member;
	
	public enum Type {
		Debit, Credit
	}
}
