import { Header, Container } from "./styles";

const Channel = () => {
  return (
    <Container>
      <Header>
        <span>#채널이름</span>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <span>0</span>
          <button
            className="c-button-unstyled p-ia__view_header__button"
            aria-label="Add people to channel"
            type="button"
          >
            <i
              className="c-icon p-ia__view_header__button_icon c-icon--add-user"
              aria-hidden="true"
            />
          </button>
        </div>
      </Header>
      <div>채팅 리스트 영역</div>
      <div>채팅 입력 영역</div>
    </Container>
  );
};

export default Channel;
