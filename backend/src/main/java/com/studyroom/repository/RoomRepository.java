package com.studyroom.repository;

import com.studyroom.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends MongoRepository<Room, String> {
    java.util.Optional<Room> findByRoomCode(String roomCode);
    java.util.List<Room> findByActiveUsersContaining(String username);
}
