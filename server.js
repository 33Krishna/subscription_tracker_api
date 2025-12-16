import app from './app.js'
import { PORT } from './config/env.js';
import connectDB from './database/mongodb.js'
import log from './utils/logger.js'

connectDB();

app.listen(PORT, () => {
    log.success(`Server running on http://localhost:${PORT}`)
});