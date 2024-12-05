# 리소스 최적화

- 이미지, 폰트 등등등...
- /public 은 원본을 유지한다.
- /src 는 압축한다. (웹브라우저에 보관하고 있다.)
- 용도에 맞게 판단하도록 하자.
- 그냥 `/src`에 보관하고 사용하자.

## 2.font 파일

- font 는 가능하면 웹폰트 URL 을 사용하자.
- 구글 폰트 또는 눈누에 웹폰트 URL 이 없으면 직접 파일을 설정하자.
- 파일인 경우 public 폴더에 넣어두고 활용하자.
- /src/assets 에 두면 설정할게 제법 많음.
- https://noonnu.cc/font_page/pick
- https://fonts.google.com/

### 2.1. public/ 폴더에 파일 배치

- /src/index.css : 모든 기본적인 적용

```css
/* 글꼴 설정 */
@font-face {
  font-family: "chab_chab";
  src: url("/chab.ttf");
}

@font-face {
  font-family: "ddag_ddag";
  src: url("/ddag.ttf");
}
body {
  font-family: chab_chab;
  font-size: var(--font-size-base);
  color: var(--primary-color);
}
```

# 빌드하기

- 배포 버전 생성 : `npm run build`
- 배포 버전 테스트 : `npm run preview`
