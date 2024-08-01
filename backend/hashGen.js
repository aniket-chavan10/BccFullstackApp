const bcrypt = require('bcryptjs');

async function generatePasswordHash() {
    const password = 'bcc@jaoli.com'; // Replace with your desired password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
}

generatePasswordHash();
