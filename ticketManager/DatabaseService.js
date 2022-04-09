const  { createHash } = require('crypto');

class DatabaseService {
    save(email, price, timestamp) {
        const data = email + price + timestamp;
        const hash = createHash('sha256')
                        .update(data)
                        .digest('hex');
        console.log(
            `Running query: INSERT INTO orders VALUES ${hash}`
            );
    }
}

module.exports = DatabaseService;