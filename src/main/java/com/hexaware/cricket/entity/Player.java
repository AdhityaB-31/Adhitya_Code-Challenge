package com.hexaware.cricket.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="player_info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Player {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int playerId;
	
	private String playerName;
	
	private int jerseyNo;
	
	private String role;
	
	private int totalMatch;
	
	private String teamName;
	
	private String countryName;
	
	private String description;

}
