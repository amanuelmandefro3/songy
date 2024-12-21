import { createApp } from './config/app';
import { connectToDatabase } from './config/database';

const startServer = async (): Promise<void> => {
  await connectToDatabase();
  const app = createApp();
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});