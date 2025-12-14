import Modal from "../modal";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { createChannel, getChannelList } from "../../apis/channel";
import { Button, Input, Label } from "./styles";

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateChannelModal: (show: boolean) => void;
}

const CreateChannelModal = ({
  show,
  onCloseModal,
  setShowCreateChannelModal,
}: Props) => {
  const { workspace } = useParams<{ workspace: string }>();
  const [newChannel, setNewChannel] = useState("");

  const onChangeNewChannel = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewChannel(e.target.value);
    },
    []
  );

  const onCreateChannel = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newChannel || !newChannel.trim() || !workspace) return;

      try {
        await createChannel(workspace, { name: newChannel });
        setNewChannel("");
        setShowCreateChannelModal(false);
        await getChannelList(workspace);
      } catch (error) {
        console.error("채널 생성 실패:", error);
        alert("채널 생성에 실패했습니다.");
      }
    },
    [newChannel, workspace, setShowCreateChannelModal]
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="channel-label">
          <span>채널 이름</span>
          <Input
            id="channel"
            value={newChannel}
            onChange={onChangeNewChannel}
            placeholder="채널 이름을 입력하세요"
          />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;