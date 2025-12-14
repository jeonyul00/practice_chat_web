import Modal from "../modal";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Input, Label } from "./styles";

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteWorkspaceModal: (show: boolean) => void;
}

const InviteWorkspaceModal = ({
  show,
  onCloseModal,
  setShowInviteWorkspaceModal,
}: Props) => {
  const { workspace } = useParams<{ workspace: string }>();
  const [newMember, setNewMember] = useState("");

  const onChangeNewMember = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewMember(e.target.value);
    },
    []
  );

  const onInviteMember = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newMember || !newMember.trim() || !workspace) return;

      try {
        // TODO: API 연결
        console.log("Invite member:", newMember, "to workspace:", workspace);
        setNewMember("");
        setShowInviteWorkspaceModal(false);
        alert("초대 기능은 추후 구현 예정입니다.");
      } catch (error) {
        console.error("멤버 초대 실패:", error);
        alert("멤버 초대에 실패했습니다.");
      }
    },
    [newMember, workspace, setShowInviteWorkspaceModal]
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>이메일</span>
          <Input
            id="member"
            type="email"
            value={newMember}
            onChange={onChangeNewMember}
            placeholder="이메일을 입력하세요"
          />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
