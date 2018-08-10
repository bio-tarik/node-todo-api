const bcrypt = require('bcryptjs');

const password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (errHash, hash) => {
    console.log(`hash: ${hash}`);
  });
});

const hashedPassword = '$2a$10$VYEhh6.YSRqSm0oSNRfKFe.Bo4MLTZztSo7IW5Udk14TWrzVHdhyC';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(`result: ${res}`);
});
