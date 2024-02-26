const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const PORT = 2000;
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// 사용자 데이터를 저장할 객체
let users = {};

// 가상 사용자 생성 함수
function generateUsers(startId = 1, count = 100) {
    const initialCount = Object.keys(users).length;
    for (let i = startId; i < startId + count; i++) {
        const id = `user${i}`;
        const name = `User ${i}`;
        const email = `user${i}@example.com`;
        users[id] = {name, email};
    }
    console.log(`${count} users generated. Total users: ${initialCount + count}`);
}

function createInitialUsers() {
    for (let i = 1; i <= 100; i++) {
        const id = `user${i}`;
        const name = `User ${i}`;
        const email = `user${i}@example.com`;
        users[id] = {name, email};
    }
    console.log('100 initial users created.');
}

// Create (사용자 추가)
app.post('/users', (req, res) => {
    const {name, email} = req.body;

    // 이메일 중복 검사
    const existingUser = Object.values(users).find(user => user.email === email);
    if (existingUser) {
        return res.status(400).send({message: 'User already exists with the given email.'});
    }

    // 가장 큰 사용자 ID 찾기
    const userIds = Object.keys(users).map(id => parseInt(id.replace('user', '')));
    const maxId = userIds.length > 0 ? Math.max(...userIds) : 0;
    const id = `user${maxId + 1}`;

    users[id] = {name, email};
    const user = {id, name, email};
    console.log(`User created: ${id}`);
    // res.send({message: 'User created successfully.', user: users[newUserId]});
    res.send({message: 'User created successfully.', user: user});
});

// Read (특정 사용자 조회)
app.get('/users/:id', (req, res) => {
    const req_user = users[req.params.id];
    const user = {id: req.params.id, name: users[req.params.id].name, email: users[req.params.id].email};
    if (!req_user) {
        return res.status(404).send({message: 'User not found.'});
    }
    console.log(`Fetching user: ${req.params.id}`);
    res.send(req_user);
});

// Read (페이지네이션 및 정렬)
app.get('/users', (req, res) => {
    console.log('Fetching 페이지네이션');
    let {limit, offset, sortOrder} = req.query; // sort 매개변수 추가
    console.log(`limit: ${limit}, offset: ${offset}, sortOrder: ${sortOrder}`);
    console.log(`==================================================`);

    // 문자열을 숫자로 변환하고, 기본값 설정
    limit = parseInt(limit, 10) || 10;
    offset = parseInt(offset, 10) || 0;
    sortOrder = sortOrder || 'asc'; // 기본 정렬 방식을 오름차순으로 설정
    console.log(`limit: ${limit}, offset: ${offset}, sortOrder: ${sortOrder}`);
    // 사용자 ID 기준으로 정렬
    const sortedUserIds = Object.keys(users).sort((a, b) => {
        const idA = parseInt(a.replace('user', ''), 10);
        const idB = parseInt(b.replace('user', ''), 10);
        return sortOrder === 'asc' ? idA - idB : idB - idA;
    });

    // 정렬된 사용자 ID를 기반으로 사용자 목록 생성
    const usersArray = sortedUserIds
        .slice(offset, offset + limit) // offset과 limit에 따라 사용자 데이터 슬라이스
        .map(id => ({id, ...users[id]}));

    res.send(usersArray);
});

// Update (사용자 정보 업데이트)
app.put('/users/:id', (req, res) => {
    const {name, email} = req.body;
    if (!users[req.params.id]) {
        return res.status(404).send({message: 'User not found.'});
    }
    users[req.params.id] = {name, email};
    console.log(`User updated: ${req.params.id}`);
    // res.send({message: 'User updated successfully.', user: users[req.params.id]});
    res.send({message: 'User updated successfully.', user: users[req.params.id]});
});

// Delete (사용자 삭제)
app.delete('/users/:id', (req, res) => {
    if (!users[req.params.id]) {
        return res.status(404).send({message: 'User not found.'});
    }
    delete users[req.params.id];
    console.log(`User deleted: ${req.params.id}`);
    res.send({message: 'User deleted successfully.'});
});

// 가상 사용자 추가 요청 처리
app.post('/generate-users', (req, res) => {
    const startId = Object.keys(users).length + 1; // 기존 사용자 이후의 ID부터 시작
    generateUsers(startId);
    res.send({message: '100 users generated successfully.'});
});

// 서버 시작 시 100명의 사용자를 생성
createInitialUsers();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
