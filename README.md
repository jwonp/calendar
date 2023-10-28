이 프로젝트는 조직, 단체, 모임에서 각자의 일정을 등록하고, 다음 일정의 시간을 맞출 수 있게 도와주는 서비스를 제공하기 위해 만들었습니다.

배포링크 : https://...



<details>
<summary>
    Rest API 문서 
</summary>
  <details>
    <summary>
      GET /users/user/{userId}
    </summary>
     <p>해당 유저 ID의 정보를 불러옵니다.</p>
      <tr>
        <td>
            <p>params</p>
            <pre>
                {
                    "userId": "userId1"
                }
            </pre>
        </td>
        <td>
            <p>body</p>
            <pre>
                {
                
                }
            </pre>
        </td>
        <td>
            <p>return</p>
            <pre>
                {
                    "docId": "LwRwe9oWbCNlSELYB1Ig",
                    "friends": [],
                    "picture": "https://www.image.com/123",
                    "id": "userId1",
                    "name": "userName1",
                    "email": "userId1@example.com"
                }
            </pre>
        </td>
      </tr>
  </details> 
  <details>
    <summary>
      GET /users/user/{userId}
    </summary>
     <p>해당 유저 ID의 정보를 불러옵니다.</p>
      <tr>
        <td>
            <p>params</p>
            <pre>
                {
                    "userId": "userId1"
                }
            </pre>
        </td>
        <td>
            <p>body</p>
            <pre>
                {
                    "userId": "userId1"
                }
            </pre>
        </td>
        <td>
            <p>return</p>
            <pre>
                {
                    "userId": "userId1"
                }
            </pre>
        </td>
      </tr>
  </details>  
</details>


주요 기능 

개발 주요 로드맵

제작자 : 박주원

Contact : tkdel222@gmail.com
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
