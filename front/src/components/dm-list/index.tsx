import { useParams } from "react-router-dom";
import { useState } from "react";
import { CollapseButton, SectionHeader, EmptyMessage } from "./styles";

const DMList = () => {
  const { workspace } = useParams<{ workspace: string }>();
  const [channelCollapse, setChannelCollapse] = useState(false);

  const toggleChannelCollapse = () => {
    setChannelCollapse((prev) => !prev);
  };

  return (
    <>
      <SectionHeader>
        <CollapseButton
          collapse={channelCollapse}
          onClick={toggleChannelCollapse}
        />
        <span>Direct Messages</span>
      </SectionHeader>
      <div>
        {!channelCollapse && (
          <EmptyMessage>DM 목록은 추후 구현 예정입니다.</EmptyMessage>
        )}
      </div>
    </>
  );
};

export default DMList;
