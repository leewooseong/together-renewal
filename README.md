<h1 style="border-bottom: none;"> 1. 프로젝트 소개 </h1>

<div align="center">
  <h2>같이 달램 서비스</h2>
</div>

  https://github.com/user-attachments/assets/748b134b-b28b-4f4a-bd0b-58fc5d4329b3

<br>

같이 달램은 현대인의 바쁜 일상 속에서 부족한 휴식을 보완하고, 자신에게 맞는 휴식과 소셜 모임을 쉽게 찾고 참여할 수 있도록 돕는 플랫폼입니다.

<br>

<div align="center">

 👉 [서비스 확인하러 가기](together-gilt.vercel.app)

</div>

<br/>
<br/>


<!-- # 3. 기술 스택 및 개발 환경 -->
<h1 style="border-bottom: none;"> 기술 스택 및 개발 환경 </h1>

<!-- <h2>기술 스택 및 개발 환경<span style="color:#ea580c">.</span></h2> -->

<br>

<div align="center">

| | |
| --- | --- |
| **Frameworks** | NextJS 14+, ReactJS 18+ |
| **Programming Languages** | TypeScript 
| **State managing Libraries** | Client state: Context Api + zustand <br> Server State: react-query v5+ |
| **Styling Libraries** | CSS: TailwindCSS <br> Animation: Framer motion |
| **Deployment Tools** | Github Actions |
| **Cloud Services** | Vercel |
| **Version Control** | Git/GitHub |
| **Collaboration Tools** | Jira |
| | |
</div>

<br>
<br>

<!-- # 4. 주요 기능 및 화면 구성 -->
<h1 style="border-bottom: none;"> 주요 기능 및 화면 구성 </h1>

<br>
<br>

<!-- # 5. 프로젝트 폴더 구조 -->
<h1 style="border-bottom: none;">프로젝트 폴더 구조</h1>


• `gathering`, `reviews`, `user`, `common`으로 도메인 별로 구분하여 작성하였습니다. <br>
• `route` 폴더는 route-handler를 담당하는 폴더로 사용되었습니다.(기존 apis 폴더와의 혼동을 막기 위한 목적) <br>
• `queries` 부분의 common에선 query key factory pattern이 적용된 방식의 queryKey들이 관리됩니다. <br>

<br>

```
📦 Together Service
┣  📂app
┃  ┣ 📂(pages)
┃  ┃ ┣ 📂(auth)
┃  ┃ ┃ ┗  📂(guest-only)
┃  ┃ ┃   ┣ 📂login
┃  ┃ ┃   ┗ 📂signup
┃  ┃ ┣ 📂gatherings
┃  ┃ ┃ ┗ 📂[id]
┃  ┃ ┣ 📂liked
┃  ┃ ┣ 📂mypage
┃  ┃ ┗ 📂reviews
┃  ┣ 📂apis
┃  ┣ 📂components
┃  ┃ ┣ 📂GNB
┃  ┃ ┣ 📂common
┃  ┃ ┃ ┣ 📂filter
┃  ┃ ┃ ┣ 📂form
┃  ┃ ┃ ┣ 📂modal
┃  ┃ ┣ 📂gatherings
┃  ┃ ┣ 📂reviews
┃  ┃ ┗ 📂users
┃  ┣ 📂constants
┃  ┣ 📂fonts
┃  ┣ 📂hooks
┃  ┣ 📂queries
┃  ┃ ┣ 📂common
┃  ┃ ┣ 📂gathering
┃  ┃ ┣ 📂reviews
┃  ┃ ┗ 📂user
┃  ┣ 📂route
┃  ┣ 📂store
┃  ┃ ┣ 📂gathering
┃  ┃ ┣ 📂types
┃  ┣ 📂types
┃  ┃ ┣ 📂common
┃  ┃ ┣ 📂gatherings
┃  ┃ ┣ 📂users
┃  ┃ ┣ 📂reviews
┃  ┃ ┗ 📂util
┃  ┣ 📂utils
┃  ┣ 📜favicon.ico
┃  ┗ 📜globals.css
┣ 📜middleware.ts
┗ 📂middlewares

```

<br>
<br>

<!-- # 6. git 브랜치 전략 -->
<h1 style="border-bottom: none;">git 브랜치 전략</h1>



Jira를 도입하며 Jira의 애픽, 스토리 단위를 브랜치에 녺여내려 노력했습니다. 브랜치 관리 전략을 통해 조금이라도 편한 코드 리뷰 작성 환경을 구성하고자 했습니다.

👉 [자세한 브랜치 전략 보러가기](https://scratched-cephalopod-eb9.notion.site/Git-19ee1d6ada4f804c9e9cd9ba37847488?pvs=74)

<br>
<br>

<!-- # 7. 시스템 아키텍쳐 -->
<h1 style="border-bottom: none;">시스템 아키텍쳐</h1>

<br>
<br>

<!-- # 8. 회고 -->
<h1 style="border-bottom: none;">회고</h1>

### **건희** <br>
### **우성** <br>
  개발 초기에 제대로 알아보지 않고 내린 잘못된 선택은, 나중의 바쁜 개발 일정에 있어 이를 해결하기 위한 많은 추가 업무를 만들어낸다는 걸 프로젝트의 FetchInstance를 개발하면서 느낄 수 있었습니다. <br>
  프로젝트를 통해 기술 선택에 있어서도 왜 이 기술이 나오게 됐는지, 다른 기술 스택과는 왜 잘 어울리는지, 기술을 적용한다면 왜 이런 방법, 이런 구조로 관리 및 사용해야하는지 등.. 이러한 질문들을 스스로 물어보지 못한 채 그저 기능 구현에 급급했던 자신을 돌아보며 기술 선택에 있어 "왜"를 고민하는 것이 어떤 걸 의미하는지 다시 생각해보게 되었습니다.

### **은진** <br>
  이번 프로젝트에서 쿼리스트링을 직접 다뤄봤습니다. 라이브러리를 사용하지 않고 구현하는 과정에서 많은 것을 배울 수 있었지만, 팀 프로젝트에서는 정해진 기간 내에 완성하는 것이 중요하다는 점을 깨달았습니다. 학습하며 구현하는 것도 좋지만, 적절한 라이브러리를 사용하여 개발 속도를 높이는 것도 필요하다는 것을 배우게 됐습니다.
###  **새환** <br>

<br>
<br>

<!-- # 2. 팀 소개 -->
<h1 style="border-bottom: none;">팀 소개</h1>


<br>

<div align="center">

김건희                                      |                                  이우성                                      |                                    장은진                                      |                                   한새환                                      |                                    
| :-----------------------------------------------------------------------------: | :------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/132315752?v=4" height = 100px> | <img src="https://avatars.githubusercontent.com/u/42796944?v=4" height = 100px> | <img src="https://avatars.githubusercontent.com/u/81504945?v=4" height = 100px> | <img src="https://avatars.githubusercontent.com/u/127942524?v=4" height = 100px> |
|[@gunhee0000](https://github.com/gunhee0000)           |    [@leewooseong](https://github.com/leewooseong)                   |         [@eundin](https://github.com/eundin)         |                [@Sidan00](https://github.com/Sidan00)                |

</div>
