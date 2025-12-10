import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 200,          // 동시에 50명
  duration: '30s',  // 30초 동안 공격
  thresholds: {
    http_req_failed: ['rate<0.01'],   // 실패율 1% 미만
    http_req_duration: ['p(95)<500'], // 95% 요청이 500ms 이하
  },
};

export default function () {
  const url = __ENV.API_BASE_URL || 'http://localhost:5001/api/auth/login';

  const payload = JSON.stringify({
    email: 'test@gmail.com',
    password: 'Test!1111'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  // 응답 체크
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // 실패 시 로그
  if (res.status !== 200) {
    console.error(`❌ Error ${res.status}: ${res.body}`);
  }

  sleep(1); // 사용자 행동 대기 시뮬레이션
}
