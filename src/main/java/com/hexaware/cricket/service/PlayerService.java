package com.hexaware.cricket.service;

import java.util.List;

import com.hexaware.cricket.dto.PlayerDTO;

public interface PlayerService {
	
	public PlayerDTO createPlayer(PlayerDTO player);
	
	public PlayerDTO updatePlayer(int playerId,PlayerDTO player);
	
	public String deletePlayer(int playerId);
	
	public List<PlayerDTO> getAll();
	
	public PlayerDTO getPlayerById(int playerId);
	
	public List<PlayerDTO> getByTeam(String teamName);
	
	public List<PlayerDTO> getByRole(String role);

}
