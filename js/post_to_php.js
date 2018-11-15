
const commentsDiv = document.getElementById('comments');
let result = '';
let counter = 0;

fetch('comments.php', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'sql=SELECT * FROM comments ORDER BY comment_id DESC;'
      }).then(response => response.json()).then(comments => {

          for (let comment of comments) {
               counter++;
               result += `<div id="comment_header"><div id="id">${counter}</div><div id="user_name">${comment.name}</div><div id="date">${comment.date}</div></div><div id="user_comment">${comment.comment}</div>`;             
          }
               commentsDiv.innerHTML = `<div id=counter>Comments(${counter})</div>${result}`;
});


const name = document.getElementById('name');
const comment = document.getElementById('comment');
const submit = document.getElementById('submit');

name.onkeydown = () => name.setCustomValidity('');
comment.onkeydown = () => comment.setCustomValidity('');

submit.onclick = () => {
    if (name.value.length == 0)
        name.setCustomValidity('The field with a name cannot be empty.');
    else
        name.setCustomValidity('');

    if (comment.value == 0)
        comment.setCustomValidity('The field with a comment cannot be empty.');
    else
        comment.setCustomValidity('');

    if (name.value.length == 0 || comment.value.length == 0) {
        submit.type = 'submit';
    }
    else {
    submit.type = 'button';

        fetch('comments.php', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `sql=INSERT INTO comments (name, comment, date) VALUES('${name.value}', '${comment.value}', '${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}');`
        }).then(response => response.json()).then(comments => {
      
            for (let comment of comments) {
                result = `<div id="comment_header"><div id="id">${comment.comment_id}</div><div id="user_name">${comment.name}</div><div id="date">${comment.date}</div></div><div id="user_comment">${comment.comment}</div>` + result;
                counter++;
            }
            commentsDiv.innerHTML = `<div id=counter>Comments(${counter})</div>${result}`;

        });
    }
}