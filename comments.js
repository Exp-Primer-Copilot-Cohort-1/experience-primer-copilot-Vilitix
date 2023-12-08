// Create Web server 
// 1. Create Web server
// 2. Read comment.html file
// 3. Read comment.json file
// 4. Create comments array
// 5. Create Web server
// 6. Create API
// 7. Create API for read comment
// 8. Create API for create comment
// 9. Create API for update comment
// 10. Create API for delete comment

// 1. Create Web server
const express = require('express');
const app = express();
const port = 3000;

// 2. Read comment.html file
const fs = require('fs');
const html = fs.readFileSync('comment.html', 'utf8');

// 3. Read comment.json file
const data = fs.readFileSync('comment.json', 'utf8');
const comments = JSON.parse(data);

// 4. Create comments array
// const comments = [
//   { id: 1, name: '홍길동', comment: '안녕하세요' },
//   { id: 2, name: '임꺽정', comment: '두번째 댓글입니다' },
// ];

// 5. Create Web server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// 6. Create API
// 7. Create API for read comment
app.get('/api/comments', (req, res) => {
  res.json(comments);
});

// 8. Create API for create comment
app.post('/api/comments', (req, res) => {
  const body = req.body;
  const name = body.name;
  const comment = body.comment;
  const id = Date.now();
  const commentObj = { id, name, comment };
  comments.push(commentObj);
  res.json(commentObj);
});

// 9. Create API for update comment
app.put('/api/comments/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const body = req.body;
  const name = body.name;
  const comment = body.comment;
  const commentObj = { id, name, comment };

  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === id) {
      comments[i] = commentObj;
      break;