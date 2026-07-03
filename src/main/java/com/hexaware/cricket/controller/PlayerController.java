package com.hexaware.cricket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hexaware.cricket.dto.PlayerDTO;
import com.hexaware.cricket.service.PlayerService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@Controller
@RequestMapping("/api/player")
public class PlayerController {

	@Autowired
	PlayerService service;

	@PostMapping("/create")
	public ResponseEntity<PlayerDTO> createPlayer(@Valid @RequestBody PlayerDTO dto) {
		return new ResponseEntity<>(service.createPlayer(dto), HttpStatus.CREATED);
	}

	@PutMapping("/update/{playerId}")
	public ResponseEntity<PlayerDTO> updatePlayer(@PathVariable int playerId, @Valid @RequestBody PlayerDTO dto) {
		return new ResponseEntity<>(service.updatePlayer(playerId, dto), HttpStatus.OK);
	}

	@DeleteMapping("/delete/{playerId}")
	public ResponseEntity<String> deletePlayer(@PathVariable int playerId) {
		return new ResponseEntity<>(service.deletePlayer(playerId), HttpStatus.ACCEPTED);
	}

	@GetMapping("/getall")
	public ResponseEntity<List<PlayerDTO>> getAll() {
		return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
	}

	@GetMapping("/getbyid/{playerId}")
	public ResponseEntity<PlayerDTO> getById(@PathVariable int playerId) {
		return new ResponseEntity<>(service.getPlayerById(playerId), HttpStatus.OK);
	}

	@GetMapping("/getbyteam/{teamName}")
	public ResponseEntity<List<PlayerDTO>> getByTeam(@PathVariable String teamName) {
		return new ResponseEntity<>(service.getByTeam(teamName), HttpStatus.OK);
	}

	@GetMapping("/getbyrole/{role}")
	public ResponseEntity<List<PlayerDTO>> getByRole(@PathVariable String role) {
		return new ResponseEntity<>(service.getByRole(role), HttpStatus.OK);
	}

}
