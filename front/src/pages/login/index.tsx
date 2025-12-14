import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Label,
  Input,
  LinkContainer,
  Button,
  Header,
  Error,
} from "./style";
import { useCallback, useState, useEffect } from "react";
import { useAuthStore } from "../../store/auth";

const LogIn = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();
  const [form, setForm] = useState({
    email: "test@test.com",
    password: "123456789",
  });

  useEffect(() => {
    console.log("로그인 페이지 마운트됨");
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("로그인 시도:", {
        email: form.email,
        password: form.password,
      });
      try {
        await login({ email: form.email, password: form.password });
        navigate("/");
      } catch (error: any) {}
    },
    [form, navigate, login]
  );

  return (
    <div id="container">
      <Header>로그인</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={onChange}
            />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={onChange}
            />
          </div>
          {error && <Error>{error}</Error>}
        </Label>
        <Button type="submit" disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
