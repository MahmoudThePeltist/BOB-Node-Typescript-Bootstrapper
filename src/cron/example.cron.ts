import cron from 'node-cron';

cron.schedule('*/10 * * * *', async () => {
    try {
        console.log("Example CRON every 10 minutes.")
    } catch(e) {
        throw(e);
    }
})