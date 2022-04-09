const TicketManager = require('./TicketManager');
const EmailService = require('./EmailService');
const DatabaseService = require('./DatabaseService');

const ticketManager = new TicketManager(3);
const emailService = new EmailService();
const databaseService = new DatabaseService();

ticketManager.on('buy', (email, price, timestamp) => {
    emailService.send(email);
    databaseService.save(email, price, timestamp);
});

ticketManager.on('error', error => {
    console.error(`Gracefully handling our error: ${error}`);
});


ticketManager.on('buy', () => {
    console.log('I will be removed soon');
});

ticketManager.buy('test@mail.com', 20);

ticketManager.off('buy', () => {
    //not displayed
    console.log('Order!');
});
