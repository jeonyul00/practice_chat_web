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
import { useCallback, useState } from "react";
import { useAuthStore } from "../../store/auth";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading, error } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });

  const [validationError, setValidationError] = useState("");
  const displayError = validationError || error;

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setValidationError("");
      if (
        !form.email ||
        !form.nickname ||
        !form.password ||
        !form.passwordCheck
      ) {
        setValidationError("모든 필드를 입력해주세요.");
        return;
      }
      if (form.password !== form.passwordCheck) {
        setValidationError("비밀번호가 일치하지 않습니다.");
        return;
      }
      try {
        await signup({
          email: form.email,
          nickname: form.nickname,
          password: form.password,
        });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
    [form, navigate, signup]
  );

  return (
    <div id="container">
      <Header>회원가입</Header>
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
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input
              type="text"
              id="nickname"
              name="nickname"
              value={form.nickname}
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
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="passwordCheck"
              value={form.passwordCheck}
              onChange={onChange}
            />
          </div>
          {displayError && <Error>{displayError}</Error>}
        </Label>
        <Button type="submit" disabled={loading}>
          {loading ? "회원가입 중..." : "회원가입"}
        </Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default Signup;
