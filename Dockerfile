FROM node:18-alpine

WORKDIR /app

# 의존성 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# Next.js 개발 모드 (Turbopack 사용)
EXPOSE 3000

# 개발 서버 실행
CMD ["npm", "run", "dev"]