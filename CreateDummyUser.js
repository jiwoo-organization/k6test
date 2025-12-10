/**
 * 더미 유저 100명을 생성하는 스크립트
 * 
 * 사용법:
 *   frontend 디렉토리에 이 파일을 넣고 터미널을 열고 다음 명령어 실행:
 *   node CreateDummyUser.js
 * 
 * 이 스크립트는 로컬 서버의 /api/auth/register 엔드포인트에
 * 더미 유저 데이터를 POST 요청으로 전송하여 100명의 유저를 생성합니다.
 */

const axios = require("axios");

const API_URL = "http://localhost:5001/api/auth/register";

async function generateUsers() {
  return Array.from({ length: 100 }, (_, i) => ({
    name: `더미유저${i + 1}`,
    email: `dummy${i + 1}@example.com`,
    password: "Password123!"
  }));
}

async function main() {
  const users = await generateUsers();

  for (const user of users) {
    try {
      const res = await axios.post(API_URL, user, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(`✔ 등록 성공: ${user.email}`);
    } catch (err) {
      console.error(`❌ 등록 실패: ${user.email}`, err.response?.data);
    }
  }

  console.log("🎉 더미 유저 100명 생성 완료!");
}

main();
