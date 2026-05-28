package com.studyroom.service;

import com.studyroom.exception.ResourceNotFoundException;
import com.studyroom.model.Room;
import com.studyroom.repository.RoomRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public Room createRoom(Room room, String creatorUsername) {
        room.setRoomCode(generateRoomCode());
        room.setOwner(creatorUsername);
        if (room.getActiveUsers() == null) {
            room.setActiveUsers(new java.util.ArrayList<>());
        }
        if (!room.getActiveUsers().contains(creatorUsername)) {
            room.getActiveUsers().add(creatorUsername);
        }
        Room savedRoom = roomRepository.save(room);
        log.info("Focus Zone created: {} (Code: {}) by user: {}", savedRoom.getName(), savedRoom.getRoomCode(), creatorUsername);
        return savedRoom;
    }

    public Room joinRoom(String roomCode, String username) {
        Room room = roomRepository.findByRoomCode(roomCode).orElse(null);
        if (room == null) {
            log.warn("Failed join attempt: Room not found with code {}", roomCode);
            throw new ResourceNotFoundException("Focus Zone not found with code: " + roomCode);
        }
        
        if (!room.getActiveUsers().contains(username)) {
            room.getActiveUsers().add(username);
            roomRepository.save(room);
            log.info("User {} joined Focus Zone: {}", username, room.getName());
        }
        return room;
    }

    public void leaveRoom(String roomId, String username) {
        Optional<Room> optionalRoom = roomRepository.findById(roomId);
        if (optionalRoom.isPresent()) {
            Room room = optionalRoom.get();
            room.getActiveUsers().remove(username);
            roomRepository.save(room);
            log.info("User {} left Focus Zone: {}", username, room.getName());
        }
    }

    public Room getRoomById(String roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Focus Zone not found with ID: " + roomId));
    }

    public List<Room> getUserRooms(String username) {
        return roomRepository.findByActiveUsersContaining(username);
    }

    private String generateRoomCode() {
        return UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }
}
