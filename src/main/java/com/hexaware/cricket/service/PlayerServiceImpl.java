package com.hexaware.cricket.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hexaware.cricket.dto.PlayerDTO;
import com.hexaware.cricket.entity.Player;
import com.hexaware.cricket.exception.PlayerNotFoundException;
import com.hexaware.cricket.repo.PlayerRepository;

@Service
@Transactional
public class PlayerServiceImpl implements PlayerService {

	@Autowired
	PlayerRepository playerRepo;

	@Override
	public PlayerDTO createPlayer(PlayerDTO playerDTO) {

		Player player = mapToEntity(playerDTO);

		playerRepo.save(player);

		return mapToDTO(player);

	}

	@Override
	public PlayerDTO updatePlayer(int playerId, PlayerDTO dto) {

		Player player = playerRepo.findById(playerId)
				.orElseThrow(() -> new PlayerNotFoundException("Player not found with ID: " + playerId));

		player.setPlayerName(dto.getPlayerName());
		player.setRole(dto.getRole());

		return mapToDTO(player);
	}

	@Override
	public String deletePlayer(int playerId) {
		Player player = playerRepo.findById(playerId)
				.orElseThrow(() -> new PlayerNotFoundException("Player not found with ID: " + playerId));

		playerRepo.delete(player);

		return "Player Deleted Successful";
	}

	@Override
	public List<PlayerDTO> getAll() {
		List<Player> players = playerRepo.findAll();

		List<PlayerDTO> playerdtos = new ArrayList<>();

		for (Player player : players) {
			playerdtos.add(mapToDTO(player));
		}

		return playerdtos;

	}

	@Override
	public PlayerDTO getPlayerById(int playerId) {

		Player player = playerRepo.findById(playerId)
				.orElseThrow(() -> new PlayerNotFoundException("Player not found with ID: " + playerId));
		return mapToDTO(player);
	}

	private static Player mapToEntity(PlayerDTO dto) {
		Player player = new Player();
		player.setPlayerId(dto.getPlayerId());
		player.setPlayerName(dto.getPlayerName());
		player.setJerseyNo(dto.getJerseyNo());
		player.setRole(dto.getRole());
		player.setTeamName(dto.getTeamName());
		player.setTotalMatch(dto.getTotalMatch());
		player.setDescription(dto.getDescription());
		player.setCountryName(dto.getCountryName());

		return player;

	}

	private static PlayerDTO mapToDTO(Player player) {
		PlayerDTO dto = new PlayerDTO();
		dto.setPlayerId(player.getPlayerId());
		dto.setPlayerName(player.getPlayerName());
		dto.setJerseyNo(player.getJerseyNo());
		dto.setRole(player.getRole());
		dto.setTeamName(player.getTeamName());
		dto.setTotalMatch(player.getTotalMatch());
		dto.setDescription(player.getDescription());
		dto.setCountryName(player.getCountryName());

		return dto;

	}

	@Override
	public List<PlayerDTO> getByTeam(String teamName) {
		List<Player> players = playerRepo.findByTeamName(teamName);

		List<PlayerDTO> playerdtos = new ArrayList<>();

		for (Player player : players) {
			playerdtos.add(mapToDTO(player));
		}

		return playerdtos;
	}

	@Override
	public List<PlayerDTO> getByRole(String role) {
		List<Player> players = playerRepo.findByRole(role);

		List<PlayerDTO> playerdtos = new ArrayList<>();

		for (Player player : players) {
			playerdtos.add(mapToDTO(player));
		}

		return playerdtos;
	}

}
