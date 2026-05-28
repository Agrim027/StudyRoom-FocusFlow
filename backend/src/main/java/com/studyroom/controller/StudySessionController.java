package com.studyroom.controller;

import com.studyroom.model.StudySession;
import com.studyroom.service.StudySessionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for managing user productivity (study) sessions.
 * Handles starting, stopping, and retrieving active sessions or history.
 */
@Slf4j
@RestController
@RequestMapping("/api/sessions")
public class StudySessionController {

    @Autowired
    private StudySessionService sessionService;

    /**
     * Starts a new focus session for the authenticated user in a given room.
     */
    @PostMapping("/start/{roomId}")
    public ResponseEntity<StudySession> startSession(@PathVariable String roomId, Authentication authentication) {
        return ResponseEntity.ok(sessionService.startSession(roomId, authentication.getName()));
    }

    /**
     * Ends an active focus session and calculates the total duration.
     */
    @PostMapping("/end/{sessionId}")
    public ResponseEntity<StudySession> endSession(@PathVariable String sessionId, Authentication authentication) {
        return ResponseEntity.ok(sessionService.endSession(sessionId, authentication.getName()));
    }

    /**
     * Retrieves all sessions (past and present) for the current user in a specific room.
     */
    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<StudySession>> getUserSessions(@PathVariable String roomId, Authentication authentication) {
        return ResponseEntity.ok(sessionService.getUserSessionsForRoom(roomId, authentication.getName()));
    }

    /**
     * Retrieves a list of all currently active focus sessions in a specific room.
     */
    @GetMapping("/room/{roomId}/active")
    public ResponseEntity<List<StudySession>> getActiveSessions(@PathVariable String roomId) {
        return ResponseEntity.ok(sessionService.getActiveSessionsForRoom(roomId));
    }

    /**
     * Retrieves the entire focus session history for the authenticated user across all rooms.
     */
    @GetMapping("/history")
    public ResponseEntity<List<StudySession>> getUserHistory(Authentication authentication) {
        return ResponseEntity.ok(sessionService.getUserHistory(authentication.getName()));
    }
}
