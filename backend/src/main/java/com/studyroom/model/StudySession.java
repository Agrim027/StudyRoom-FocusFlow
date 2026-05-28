package com.studyroom.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "study_sessions")
public class StudySession {
    @Id
    private String id;
    private String roomId;
    private String username;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long durationSeconds;
}
