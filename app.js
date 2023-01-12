const express = require('express');
const app = express();
const port = 4000;

// Sequelize for MySQL ORM
const { sequelize } = require('./models/index.js');
async function main() {
  // await sequelize.sync({ force: true }); // DB 밀어버리고 재생성
  await sequelize.sync(); // sequelize에 테이블들이 존재하지 않는 경우 태이블을 생성합니다.
}
main();

const cookieParser = require('cookie-parser');
const router = require('./routes');

app.use(cookieParser());
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸습니다...');
});
