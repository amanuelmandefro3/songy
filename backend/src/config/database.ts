  import { MongoDB } from '../infrastructure/database/MongoDB';

  export const connectToDatabase = async (): Promise<void> => {
    const mongodb = MongoDB.getInstance();
    await mongodb.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/SONGY');
  };