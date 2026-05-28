package com.studyroom.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    private String content;
    private String sender;
    private MessageType type;
    private String roomId;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE,
        SESSION_START,
        SESSION_END
    }
}
