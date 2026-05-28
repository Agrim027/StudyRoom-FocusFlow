package com.studyroom.controller;

import com.studyroom.model.Room;
import com.studyroom.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for managing Focus Zones (Rooms).
 * Handles the creation, retrieval, joining, and leaving of study rooms.
 */
@Slf4j
@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    /**
     * Retrieves all Focus Zones the authenticated user is currently a participant in.
     */
    @GetMapping("/my-rooms")
    public ResponseEntity<List<Room>> getUserRooms(Authentication authentication) {
        return ResponseEntity.ok(roomService.getUserRooms(authentication.getName()));
    }

    /**
     * Retrieves the details of a specific Focus Zone by its ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getRoom(@PathVariable String id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }

    /**
     * Creates a new Focus Zone with the specified name and description.
     */
    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room, Authentication authentication) {
        return ResponseEntity.ok(roomService.createRoom(room, authentication.getName()));
    }

    /**
     * Joins an existing Focus Zone using a unique 6-character room code.
     */
    @PostMapping("/join/{roomCode}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomCode, Authentication authentication) {
        return ResponseEntity.ok(roomService.joinRoom(roomCode, authentication.getName()));
    }

    /**
     * Removes the authenticated user from a Focus Zone.
     */
    @PostMapping("/{id}/leave")
    public ResponseEntity<?> leaveRoom(@PathVariable String id, Authentication authentication) {
        roomService.leaveRoom(id, authentication.getName());
        return ResponseEntity.ok("Left room successfully");
    }
}

