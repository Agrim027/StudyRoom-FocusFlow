package com.studyroom.service;

import com.studyroom.exception.ResourceNotFoundException;
import com.studyroom.exception.UnauthorizedException;
import com.studyroom.exception.BadRequestException;
import com.studyroom.model.StudySession;
import com.studyroom.repository.StudySessionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Slf4j
@Service
public class StudySessionService {

    @Autowired
    private StudySessionRepository sessionRepository;

    public StudySession startSession(String roomId, String username) {
        StudySession session = new StudySession();
        session.setRoomId(roomId);
        session.setUsername(username);
        session.setStartTime(LocalDateTime.now());
        
        StudySession savedSession = sessionRepository.save(session);
        log.info("Productivity session started for user: {} in zone: {}", username, roomId);
        return savedSession;
    }

    public StudySession endSession(String sessionId, String username) {
        StudySession session = sessionRepository.findById(sessionId)
            .orElseThrow(() -> new ResourceNotFoundException("Productivity session not found"));

        if (!session.getUsername().equals(username)) {
            log.warn("Unauthorized attempt to end session {} by user {}", sessionId, username);
            throw new UnauthorizedException("Unauthorized to end this session");
        }

        if (session.getEndTime() != null) {
            throw new BadRequestException("Session already ended");
        }

        session.setEndTime(LocalDateTime.now());
        long seconds = ChronoUnit.SECONDS.between(session.getStartTime(), session.getEndTime());
        session.setDurationSeconds(seconds);
        
        StudySession savedSession = sessionRepository.save(session);
        log.info("Productivity session ended for user: {}. Duration: {} seconds", username, seconds);
        return savedSession;
    }

    public StudySession getActiveSession(String roomId, String username) {
        return sessionRepository.findByRoomIdAndUsernameAndEndTimeIsNull(roomId, username);
    }

    public List<StudySession> getUserHistory(String username) {
        return sessionRepository.findByUsernameAndEndTimeIsNotNullOrderByStartTimeDesc(username);
    }

    public List<StudySession> getUserSessionsForRoom(String roomId, String username) {
        return sessionRepository.findByRoomIdAndUsername(roomId, username);
    }

    public List<StudySession> getActiveSessionsForRoom(String roomId) {
        return sessionRepository.findByRoomIdAndEndTimeIsNull(roomId);
    }
}
