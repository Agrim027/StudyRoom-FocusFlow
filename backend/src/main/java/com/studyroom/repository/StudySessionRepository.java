package com.studyroom.repository;

import com.studyroom.model.StudySession;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudySessionRepository extends MongoRepository<StudySession, String> {
    List<StudySession> findByRoomIdAndUsername(String roomId, String username);
    List<StudySession> findByRoomIdAndEndTimeIsNull(String roomId);
    List<StudySession> findByUsernameAndEndTimeIsNotNullOrderByStartTimeDesc(String username);
    StudySession findByRoomIdAndUsernameAndEndTimeIsNull(String roomId, String username);
}
