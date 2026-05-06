# CooKeep FE

## 📌협업 규칙

1. 셀프 머지 금지 → 팀원 리뷰 후 머지
2. Git-Flow 전략 사용

   `git flow version`을 통해 Git-flow 자동화 도구 설치되었는지 확인(미설치 시 설치 진행)

   ```kotlin
   //사용 예시:
   git flow init -d //git flow 사용하도록 초기화(최초 1회 필수)
   git switch develop //develop을 base로 브랜치가 생성되도록
   git flow feature start onboarding //feature/onboarding이 생성됨
   ```

3. PR 템플릿, 이슈 템플릿, 커밋 컨벤션 지키기

   ```kotlin
   # 커밋 컨벤션
   feat: 새 기능 추가
   fix: 버그 수정
   docs: 문서 수정
   style: 코드 스타일 변경(들여쓰기 등 포맷, 세미콜론 추가)
   refactor: 코드 리팩토링
   test: 테스트 관련 코드 추가 및 수정
   chore: 설정 변경
   ```

4. 문제 발생한 경우 기능 별로 디스코드 스레드 파서 소통
   프론트 내에선 PR 댓글로 소통

5. version control
   ```bash
   //release 브랜치 생성 및 머지
   git switch develop
   git pull origin develop
   git flow release start v1.0.0
   git push origin release/v1.0.0
   ```
   ```bash
   //배포(main과 develop으로 머지)
   git flow release finish v1.0.0 //i 입력 후 에디터모드 진입, Esc로 :wq
   git push origin main
   git push origin develop
   git push origin --tags
   ```

## 👩‍💻Members

|                                 박소은                                  |                               신지예                                |
| :---------------------------------------------------------------------: | :-----------------------------------------------------------------: |
| <img src="https://github.com/soeun-727.png" width="180" height="180" /> | <img src="https://github.com/ji070.png" width="180" height="180" /> |
|               [@soeun-727](https://github.com/soeun-727)                |                 [@ji070](https://github.com/ji070)                  |
|                                 12기 FE                                 |                               12기 FE                               |
