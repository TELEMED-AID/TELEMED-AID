package com.example.ChatService.Service;

import com.example.ChatService.dto.*;
import com.example.ChatService.entity.Message;
import com.example.ChatService.entity.Room;
import com.example.ChatService.entity.RoomUser;
import com.example.ChatService.exceptions.RoomCreationException;
import com.example.ChatService.repository.MessageRepository;
import com.example.ChatService.repository.RoomRepository;
import com.example.ChatService.repository.RoomUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    RoomUserRepository roomUserRepository;

    public Long createNewRoom(RoomCreationDto roomCreationDto) {
        try {
            Room room = new Room();
            room.setRoomName(roomCreationDto.getRoomName());
            room.setOwnerId(roomCreationDto.getOwnerId());

            List<RoomUser> roomUsers = roomCreationDto.getUsers().stream()
                    .map(user -> RoomUser.builder()
                            .room(room)
                            .userId(user.getId())
                            .userName(user.getName())
                            .build())
                    .toList();

            room.setRoomUsers(roomUsers);
            roomRepository.save(room);

            return room.getId();
        } catch (Exception e) {
            throw new RoomCreationException("Failed to create room", e);
        }
    }

    public Boolean joinRoom(JoinRoomDto joinRoomDto) {
        try {
            Room room = roomRepository.findById(joinRoomDto.getRoomId())
                    .orElseThrow(() -> new RuntimeException("Room not found"));

            List<RoomUser> roomUsers = room.getRoomUsers();
            for (UserDTO user : joinRoomDto.getUsers()) {
                if (roomUsers.stream().anyMatch(ru -> ru.getUserId().equals(user.getId()))) {
                    continue;
                }
                RoomUser roomUser = RoomUser.builder()
                        .room(room)
                        .userId(user.getId())
                        .userName(user.getName())
                        .build();
                roomUsers.add(roomUser);
            }
            room.setRoomUsers(roomUsers);
            roomRepository.save(room);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred", e);
        }
    }

    public List<SimpleRoomsDto> getAllRoomForUser(Long userId) {
        try {
            List<Room> rooms = roomRepository.findRoomsWithUsersByUserId(userId);
            return rooms.stream()
                    .map(room -> SimpleRoomsDto.builder()
                            .roomId(room.getId())
                            .roomName(room.getRoomName())
                            .ownerId(room.getOwnerId())
                            .lastMessage(room.getMessages().isEmpty() ? "" : room.getMessages().getLast().getContent())
                            .participants(room.getRoomUsers().stream()
                                    .map(RoomUser::getUserName)
                                    .toList())
                            .build())
                    .toList();
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred");
        }
    }

    @Transactional
    public Boolean isUserInRoom(Long userId, Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        return room.getRoomUsers()
                .stream()
                .anyMatch(ru -> ru.getUserId().equals(userId));
    }


    public List<SimpleMessageDto> getAllRoomMessages(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        return room.getMessages().stream()
                .map(message -> SimpleMessageDto.builder()
                        .id(message.getId())
                        .senderId(message.getSenderId())
                        .content(message.getContent())
                        .createdAt(message.getCreatedAt())
                        .build())
                .toList();
    }

    @Transactional
    public Boolean sendMessage(ChatMessageDto message) {

        try {
            if (!isUserInRoom(message.getSenderId(), message.getRoomId())) {
                throw new RuntimeException("User is not in the room");
            }

            Room room = roomRepository.findById(message.getRoomId())
                    .orElseThrow(() -> new RuntimeException("Room not found"));

            Message newMessage = Message.builder()
                    .content(message.getContent())
                    .senderId(message.getSenderId())
                    .room(room)
                    .build();

            messageRepository.save(newMessage);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred");
        }
    }

}
