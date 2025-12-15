import React, { useState, useCallback, FormEvent } from "react";
import { ChatBoxContainer, Form, TextArea, SendButton } from "./styles";

interface ChatBoxProps {
  onSubmitForm: (content: string) => void;
  placeholder?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  onSubmitForm,
  placeholder = "메시지를 입력하세요",
}) => {
  const [chat, setChat] = useState("");

  const onChangeChat = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChat(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (chat?.trim()) {
        onSubmitForm(chat.trim());
        setChat("");
      }
    },
    [chat, onSubmitForm]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
        e.preventDefault();
        e.stopPropagation();
        if (chat?.trim()) {
          onSubmitForm(chat.trim());
          setChat("");
        }
      }
    },
    [chat, onSubmitForm]
  );

  return (
    <ChatBoxContainer>
      <Form onSubmit={onSubmit}>
        <TextArea
          value={chat}
          onChange={onChangeChat}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          rows={3}
        />
        <SendButton type="submit">전송</SendButton>
      </Form>
    </ChatBoxContainer>
  );
};

export default ChatBox;