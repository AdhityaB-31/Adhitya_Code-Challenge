package com.hexaware.cricket.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlayerDTO {

	private int playerId;
		
	@NotBlank(message = "Player name is required")
	private String playerName;
		
	@NotNull(message = "Jersey Number name is required")
	private int jerseyNo;
		
	@NotBlank(message = "Role is required")
	@Pattern(regexp = "^(Batsman|Bowler|Keeper|All Rounder)$", message = "Role must be Batsman, Bowler, Keeper or All Rounder")
	private String role;
		
	@NotNull(message = "Number of Match should be entered: ")
	private int totalMatch;
		
	@NotBlank(message = "Team name is required")
	private String teamName;
	
	@NotBlank(message = "Country name is required")
	private String countryName;
		
	@NotBlank(message = "Player's description is required")
	private String description;


}
