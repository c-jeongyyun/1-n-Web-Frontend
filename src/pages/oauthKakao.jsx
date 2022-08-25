import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import oauthDataAtom from "./../recoil/oauthData/atom";
import isLoginDataAtom from "../recoil/isLogin/atom";
const OauthKakao = (props) => {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(isLoginDataAtom);
  const setAuthCode = useSetRecoilState(oauthDataAtom);

  let code = new URL(window.location.href).searchParams.get("code");
  //const auth = localStorage.getItem("user");
  useEffect(() => {
    console.log(code);
    const fetchId = async () => {
      try {
        await axios
          .get(`http://localhost:8080/user/oauth/kakao?code=${code}`)
          .then((res) => {
            console.log(res);
            localStorage.setItem("Authorization", res.headers.authorization);
            alert("로그인에 성공했습니다");
            setIsLogin(true);
            navigate("/");
          });
      } catch (e) {
        const errorKey = e.response.data.errorCode;

        setAuthCode(code);
        switch (errorKey) {
          case "U006":
            alert(
              "가입되어있지 않은 회원입니다. 회원가입 페이지로 이동합니다."
            );
            console.log(e.response);
            break;
          default:
        }
        navigate("/signup/oauth/kakao");
      }
    };
    fetchId();
  }, []);

  return <h1>Waiting for KAKAO Authorization...</h1>;
};

export default OauthKakao;