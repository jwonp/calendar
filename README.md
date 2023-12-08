
이 프로젝트는 조직, 단체, 모임에서 각자의 일정을 등록하고, 다음 일정의 시간을 맞출 수 있게 도와주는 서비스를 제공하기 위해 만들었습니다.

배포링크 : https://www.ikiningyou.com
## 기술스택
### 프론트엔드
<table>
	<tr>
		<td>
			<image src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566879300/noticon/fvty9lnsbjol5lq9u3by.svg" width="80px" height="80px"/>		
		</td>
	  	<td>
			<image src="https://github.com/nextauthjs/next-auth/blob/main/docs/static/img/logo/logo.png?raw=true" width="80px" height="80px"/>			
		</td>
	  	<td>
			<image src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913457/noticon/eh4d0dnic4n1neth3fui.png" width="80px" height="80px"/>
		</td>
	  	<td>
			<image src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1691760811/noticon/mj67k1iwrb1vjrrntob2.png" width="80px" height="80px"/>
		</td>	
	  	<td>
			<image src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567749614/noticon/zgdaxpaif5ojeduonygb.png" width="80px" height="80px"/>
		</td>	
	</tr>
	<tr>
		<td>Next.js</td>
		<td>NextAuth</td>
	  	<td>Typescript</td>
	  	<td>SWR</td>
	  	<td>Redux</td>	
	</tr>
</table>

### 백엔드
<table>
	<tr>
		<td>
			<image src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/calendar/%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8F%E1%85%A9%E1%86%AB/lambda.png" width="80px" height="80px"/>		
		</td>
	  	<td>
			<image src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1694089639/noticon/ox4ngdartf1uzusjhcqx.png" width="80px" height="80px"/>			
		</td>
	  	<td>
			<image src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/calendar/%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8F%E1%85%A9%E1%86%AB/cognito.png" width="80px" height="80px"/>
		</td>
	  	<td>
			<image src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913958/noticon/uoqjdixts4lwsgtsa1pd.png" width="80px" height="80px"/>
		</td>
	</tr>
	<tr>
		<td>AWS Lambda</td>
	  	<td>AWS API Gateway</td>
	  	<td>AWS Cognito</td>	
	  	<td>Firebase</td>	
	</tr>
</table>

### 배포
<table>
	<tr>
		<td>
			<image src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566798146/noticon/lku5cppzh8r7awwsmmko.png" width="80px" height="80px"/>		
		</td>
		<td>
			<image src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566798146/noticon/lku5cppzh8r7awwsmmko.png" width="80px" height="80px"/>		
		</td>
		<td>
			<image src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568175385/noticon/iodu1jssf0kwe4oie2dt.png" width="80px" height="80px"/>		
		</td>
	</tr>
	<tr>
		<td>AWS EC2</td>
		<td>Nginx</td>
		<td>Docker</td>
	</tr>
</table>

## 아키텍쳐
![[https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/calendar/Calender+%E1%84%8B%E1%85%A1%E1%84%8F%E1%85%B5%E1%84%90%E1%85%A6%E1%86%A8%E1%84%8E%E1%85%A7.jpg]

## 주요 라이브러리

- redux-toolkit (redux v4.2.1)
- axois v1.5.1
- dayjs v1.11.10
- next-auth v4.23.2
- sass v1.68.0
- sharp 0.32.6
- swr v2.2.4


## REST APIs
모든 400, 500번대 response는 body를 반환하지 않습니다.
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
            NO BODY
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
    POST /users/user
</summary>
    <p>새로운 유저를 등록합니다.</p>
    <tr>
    <td>
        <p>params</p>
        <pre>
            {
                NO PARAMS
            }
        </pre>
    </td>
    <td>
        <p>body</p>
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
    <td>
        <p>return</p>
        <pre>
            {
                    "docId": "user/9zyKWii8ZTREpIX89Ila"
            }
        </pre>
    </td>
    </tr>
</details>
<details>
<summary>
    GET /users/friend/{userId}
</summary>
    <p>해당 User ID에 맞는 유저의 친구들의 모든 정보를 불러옵니다.</p>
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
            NO BODY
        </pre>
    </td>
    <td>
        <p>return</p>
        <pre>
            [
                {
                    "id": "userId10",
                    "name": "userName10",
                    "email": "userId10@example.com",
                    "picture": "https://www.image.com/123"
                },
                {
                    "id": "userId1000",
                    "name": "userName1000",
                    "email": "userId1000example.com",
                    "picture": "https://www.image.com/123"
                }
            ]
        </pre>
    </td>
    </tr>
</details>
<details>
<summary>
    GET /users/search/{email}
</summary>
    <p>해당 email의 문자열을 포함하고 있는 모든 유저들의 정보를 불러옵니다.</p>
    <tr>
    <td>
        <p>params</p>
        <pre>
            {
                "email": "100"
            }
        </pre>
    </td>
    <td>
        <p>body</p>
        <pre>
            NO BODY
        </pre>
    </td>
    <td>
        <p>return</p>
        <pre>
            [
                {
                    "docId": "MevisOHVgIrWtP1GCD4M",
                    "id": "userId100",
                    "name": "userName100",
                    "email": "userId100example.com",
                    "picture": "https://www.image.com/123"
                },
                {
                    "docId": "NX0XL1FdNy6xyP12zjJN",
                    "id": "userId1000",
                    "name": "userName1000",
                    "email": "userId1000example.com",
                    "picture": "https://www.image.com/123"
                },
                {
                    "docId": "RVNbHjjuJxerR920xzLg",
                    "id": "userId10000",
                    "name": "userName10000",
                    "email": "userId10000example.com",
                    "picture": "https://www.image.com/123"
                }
            ]
        </pre>
    </td>
    </tr>
</details>
<details>
<summary>
    GET /users/request/{docId}
</summary>
    <p>해당 Document ID 에 맞는 유저에게 온 친구 요청 정보를 불러옵니다.</p>
    <tr>
    <td>
        <p>params</p>
        <pre>
            {
                "docId": "LwRwe9oWbCNlSELYB1Ig"
            }
        </pre>
    </td>
    <td>
        <p>body</p>
        <pre>
            NO BODY
        </pre>
    </td>
    <td>
        <p>return</p>
        <pre>
            [
                {
                    "docId": "CKalWN2VAQOFHv3oBZjo",
                    "id": "userId10",
                    "name": "userName10",
                    "email": "userId10@example.com",
                    "picture": "https://www.image.com/123"
                },
                {
                    "docId": "NX0XL1FdNy6xyP12zjJN",
                    "id": "userId1000",
                    "name": "userName1000",
                    "email": "userId1000example.com",
                    "picture": "https://www.image.com/123"
                }
            ]
        </pre>
    </td>
    </tr>
</details>
<details>
<summary>
    POST /users/request/
</summary>
    <p>친구 요청 정보를 등록합니다.</p>
    <tr>
    <td>
        <p>params</p>
        <pre>
            {
                NO PARAMS
            }
        </pre>
    </td>
    <td>
        <p>body</p>
        <pre>
            {
                "fromDocId":"NX0XL1FdNy6xyP12zjJN",
                "toDocId":"LwRwe9oWbCNlSELYB1Ig"
            }   
        </pre>
    </td>
    <td>
        <p>return</p>
        <pre>
            {
                "docId": "user/LwRwe9oWbCNlSELYB1Ig/friendRequest/nmgUOFoMN3wEKodIUa3n"
            }
        </pre>
    </td>
    </tr>
</details>
<details>
<summary>
    PATCH /users/request
</summary>
    <p>받은 친구 요청에 대해 승낙 혹은 거절을 합니다. 승낙한 경우에는 유저의 친구 목록이 업데이트 됩니다.</p>
    <tr>
    <td>
        <p>params</p>
        <pre>
            {
                NO PARAMS
            }
        </pre>
    </td>
    <td>
        <p>body</p>
        <pre>
            {
                "userDocId": "LwRwe9oWbCNlSELYB1Ig",
                "applicantDocId": "NX0XL1FdNy6xyP12zjJN",
                "isRejected": false,
                "isAccepted": true
            }
        </pre>
    </td>
    <td>
        <p>return</p>
        <pre>
            {
                NO RETURN
            }
        </pre>
    </td>
    </tr>
</details>
<details>
<summary>
    DElETE /users/request
</summary>
    <p>친구를 삭제합니다.</p>
    <tr>
    <td>
        <p>params</p>
        <pre>
            {
                NO PARAMS
            }
        </pre>
    </td>
    <td>
        <p>body</p>
        <pre>
            {
                "userDocId":"CKalWN2VAQOFHv3oBZjo",
                "friendId":"userId1"
            }
        </pre>
    </td>
    <td>
        <p>return</p>
        <pre>
            {
                NO RETURN
            }
        </pre>
    </td>
    </tr>
</details>
<details>
<summary>
    GET /groups/group/{docId}
</summary>
    <p>해당 Document ID에 맞는 그룹에 소속된 모든 유저들의 정보를 불러옵니다.</p>
    <tr>
    <td>
        <p>params</p>
        <pre>
            {
                "docId": "MNhtBTzi353c7LnrbX15"
            }
        </pre>
    </td>
    <td>
        <p>body</p>
        <pre>
            {
                NO BODY
            }
        </pre>
    </td>
    <td>
        <p>return</p>
        <pre>
            [
                {
                    "docId": "MNhtBTzi353c7LnrbX15",
                    "title": "new Group",
                    "members": [
                        {
                                    "docId": "NX0XL1FdNy6xyP12zjJN",
                                    "id": "userId1000",
                                    "name": "userName1000",
                                    "email": "userId1000example.com",
                                    "picture": "https://www.image.com/123"
                                },
                                {
                                    "docId": "CKalWN2VAQOFHv3oBZjo",
                                    "id": "userId10",
                                    "name": "userName10",
                                    "email": "userId10@example.com",
                                    "picture": "https://www.image.com/123"
                                }
                    ]
                }
            ]
        </pre>
    </td>
    </tr>
</details>
<details>
<summary>
    POST /groups/group
</summary>
    <p>새로운 그룹을 등록합니다.</p>
    <tr>
    <td>
        <p>params</p>
        <pre>
            {
                NO PARAMS
            }
        </pre>
    </td>
    <td>
        <p>body</p>
        <pre>
            {
                "host": "LwRwe9oWbCNlSELYB1Ig",
                "title":"doc group"
            }
        </pre>
    </td>
    <td>
        <p>return</p>
        <pre>
            {
                "docId": "xXBVDQaaJS4jRfWShnUt"
            }
        </pre>
    </td>
    </tr>
</details>
<details>
<summary>
    DELETE /groups/group
</summary>
    <p>그룹을 삭제합니다.</p>
    <tr>
    <td>
        <p>params</p>
        <pre>
            {
                NO PARAMS
            }
        </pre>
    </td>
    <td>
        <p>body</p>
        <pre>
            {
                "groupDocId": "MNhtBTzi353c7LnrbX15",
                "memberDocId": "RVNbHjjuJxerR920xzLg"
            }
        </pre>
    </td>
    <td>
        <p>return</p>
        <pre>
            {
                NO RETURN
            }
        </pre>
    </td>
    </tr>
</details>
<details>
<summary>
    GET /schedules/user/{docId}
</summary>
    <p>해당 Document ID에 맞는 유저의 일정을 모두 불러옵니다.</p>
    <p>schedules 의 길이는 96으로 고정되어 있습니다.</p>
    <tr>
    <td>
        <p>params</p>
        <pre>
            {
                "docId": "LwRwe9oWbCNlSELYB1Ig"
            }
        </pre>
    </td>
    <td>
        <p>body</p>
        <pre>
            {
                NO BODY
            }
        </pre>
    </td>
    <td>
        <p>return</p>
        <pre>
            [
                {
                    "userDocId": "LwRwe9oWbCNlSELYB1Ig",
                    "date": {
                        "year": 2023,
                        "month": 10,
                        "date": 9,
                        "day": 5
                    },
                    "schedule": [
                        0,0,0, ... ,0
                    ]
                },
                {
                    "userDocId": "LwRwe9oWbCNlSELYB1Ig",
                    "date": {
                        "year": 2023,
                        "month": 10,
                        "date": 10,
                        "day": 6
                    },
                    "schedule": [
                        0,0,0, ... ,0
                    ]
                }
            ]
        </pre>
    </td>
    </tr>
</details>
<details>
<summary>
    GET /schedules/user/{docId}/{year}/{month}
</summary>
    <p>해당 Document ID에 맞는 유저의 일정 중, 년, 월 조건에 맞는 모든 일정을 불러옵니다.</p>
    <tr>
    <td>
        <p>params</p>
        <pre>
            {
                "docId": "LwRwe9oWbCNlSELYB1Ig",
                "year": "2023",
                "month": "9",
            }
        </pre>
    </td>
    <td>
        <p>body</p>
        <pre>
            {
                NO BODY
            }
        </pre>
    </td>
    <td>
        <p>return</p>
        <pre>
            [
                {
                    "userDocId": "LwRwe9oWbCNlSELYB1Ig",
                    "date": {
                        "year": 2023,
                        "month": 9,
                        "date": 30,
                        "day": 6
                    },
                    "schedule": [
                        0,0,0, ... ,0
                    ]
                }
            ]
        </pre>
    </td>
    </tr>
</details>
<details>
<summary>
    POST /schedules/user
</summary>
    <p>새로운 일정을 등록합니다.</p>
    <p>schedules 의 길이는 96으로 고정되어 있습니다.</p>
    <tr>
    <td>
        <p>params</p>
        <pre>
            {
            NO PARAMS
            }
        </pre>
    </td>
    <td>
        <p>body</p>
        <pre>
            {
                "userDocId":"LwRwe9oWbCNlSELYB1Ig",
                "year":2023,
                "month":10,
                "date":10,
                "day":6,
                "schedule":[
                    0,0,0, ... ,0
                ]
            }
        </pre>
    </td>
    <td>
        <p>return</p>
        <pre>
            {
                "docId": "xtDwKF1NOBCGIL2PUDbn"
            }
        </pre>
    </td>
    </tr>
</details>
<details>
<summary>
    PATCH /schedules/user
</summary>
    <p>일정을 수정합니다.</p>
    <p>schedules 의 길이는 96으로 고정되어 있습니다.</p>
    <tr>
    <td>
        <p>params</p>
        <pre>
            {
                NO PARAMS
            }
        </pre>
    </td>
    <td>
        <p>body</p>
        <pre>
            {
                "userDocId":"LwRwe9oWbCNlSELYB1Ig",
                "year":2023,
                "month":10,
                "date":10,
                "day":6,
                "schedule":[
                    0,0,0, ... ,0
                ]
            }
        </pre>
    </td>
    <td>
        <p>return</p>
        <pre>
            {
                NO RETURN
            }
        </pre>
    </td>
    </tr>
</details>
<details>
<summary>
    GET /schedules/group/{docId}
</summary>
    <p>해당 Document ID에 맞는 그룹의 모든 일정을 불러옵니다.</p>
    <tr>
    <td>
        <p>params</p>
        <pre>
            {
                "docId": "xXBVDQaaJS4jRfWShnUt"
            }
        </pre>
    </td>
    <td>
        <p>body</p>
        <pre>
            {
                NO BODY
            }
        </pre>
    </td>
    <td>
        <p>return</p>
        <pre>
            [
                {
                    "userDocId": "LwRwe9oWbCNlSELYB1Ig",
                    "date": {
                        "year": 2023,
                        "month": 10,
                        "date": 9,
                        "day": 5
                    },
                    "schedule": [
                        0,0,0, ... ,0
                    ]
                },
                {
                    "userDocId": "LwRwe9oWbCNlSELYB1Ig",
                    "date": {
                        "year": 2023,
                        "month": 9,
                        "date": 30,
                        "day": 6
                    },
                    "schedule": [
                        0,0,0, ... ,0
                    ]
                },
                {
                    "userDocId": "LwRwe9oWbCNlSELYB1Ig",
                    "date": {
                        "year": 2023,
                        "month": 10,
                        "date": 10,
                        "day": 6
                    },
                    "schedule": [
                        0,0,0, ... ,0
                    ]
                }
            ]
        </pre>
    </td>
    </tr>
</details>
<details>
<summary>
    GET /schedules/group/{docId}/{year}/{month}
</summary>
    <p>해당 Document ID에 맞는 그룹의 일정 중, 년, 월 조건에 맞는 모든 일정을 불러옵니다. </p>
    <tr>
    <td>
        <p>params</p>
        <pre>
            {
                "docId": "LwRwe9oWbCNlSELYB1Ig",
                    "year": "2023",
                    "month": "9",
            }
        </pre>
    </td>
    <td>
        <p>body</p>
        <pre>
            {
                NO BODY
            }
        </pre>
    </td>
    <td>
        <p>return</p>
        <pre>
            [
                {
                    "userDocId": "LwRwe9oWbCNlSELYB1Ig",
                    "date": {
                        "year": 2023,
                        "month": 9,
                        "date": 30,
                        "day": 6
                    },
                    "schedule": [
                        0,0,0, ... ,0
                    ]
                }
            ]
        </pre>
    </td>
    </tr>
</details>


### 페이지 소개

#### 그룹 생성
<div>
    <image src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/calendar/%E1%84%80%E1%85%B3%E1%84%85%E1%85%AE%E1%86%B8%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC.png" height="540px"/>
</div>

#### 그룹 선택
<div>
    <image src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/calendar/%E1%84%80%E1%85%B3%E1%84%85%E1%85%AE%E1%86%B8%E1%84%89%E1%85%A5%E1%86%AB%E1%84%90%E1%85%A2%E1%86%A8.png" height="540px"/>
</div>

#### 친구 목록
<div>
    <image src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/calendar/%E1%84%8E%E1%85%B5%E1%86%AB%E1%84%80%E1%85%AE%E1%84%86%E1%85%A9%E1%86%A8%E1%84%85%E1%85%A9%E1%86%A8.png" height="540px"/>
</div>

#### 친구 추가
<div>
    <image src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/calendar/%E1%84%8E%E1%85%B5%E1%86%AB%E1%84%80%E1%85%AE%E1%84%8E%E1%85%AE%E1%84%80%E1%85%A1.png" height="540px"/>
</div>
<div>
    <image src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/calendar/%E1%84%8E%E1%85%B5%E1%86%AB%E1%84%80%E1%85%AE%E1%84%8E%E1%85%AE%E1%84%80%E1%85%A12.png" height="540px"/>
</div>

#### 일정 확인
<div>
    <image src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/calendar/%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%92%E1%85%AA%E1%86%A8%E1%84%8B%E1%85%B5%E1%86%AB.png" height="540px"/>
</div>

#### 연도별 달력
<div>
    <image src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/calendar/%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%83%E1%85%A9%E1%84%87%E1%85%A7%E1%86%AF.png" height="540px"/>
</div>


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
