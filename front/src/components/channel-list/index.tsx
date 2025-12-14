import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChannelList } from "../../apis/channel";
import { CollapseButton, SectionHeader, ChannelItem } from "./styles";

interface Channel {
  id: number;
  name: string;
}

const ChannelList = () => {
  const { workspace, channel } = useParams<{
    workspace: string;
    channel: string;
  }>();
  const navigate = useNavigate();
  const [channelList, setChannelList] = useState<Channel[]>([]);
  const [channelCollapse, setChannelCollapse] = useState(false);

  const toggleChannelCollapse = () => {
    setChannelCollapse((prev) => !prev);
  };

  const handleGetChannelList = async () => {
    if (!workspace) return;
    try {
      const data = await getChannelList(workspace);
      setChannelList(data);
    } catch (error) {
      console.error("채널 목록 조회 실패:", error);
    }
  };

  useEffect(() => {
    handleGetChannelList();
  }, [workspace]);

  return (
    <>
      <SectionHeader>
        <CollapseButton
          collapse={channelCollapse}
          onClick={toggleChannelCollapse}
        />
        <span>Channels</span>
      </SectionHeader>
      <div>
        {!channelCollapse &&
          channelList.map((ch) => (
            <ChannelItem
              key={ch.id}
              isActive={channel === ch.name}
              onClick={() =>
                navigate(`/workspace/${workspace}/channel/${ch.name}`)
              }
            >
              {ch.name}
            </ChannelItem>
          ))}
      </div>
    </>
  );
};

export default ChannelList;
