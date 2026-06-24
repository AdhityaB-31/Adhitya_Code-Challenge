package com.hexaware.cricket.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.cricket.dto.PlayerDTO;
import com.hexaware.cricket.entity.Player;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {
	
	public List<Player> findByTeamName(String teamName);
	
	public List<Player> findByRole(String role);

}
