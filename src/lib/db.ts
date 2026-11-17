import postgres from 'postgres';

let sql: ReturnType<typeof postgres> | null = null;

if (process.env.DATABASE_URL) {
  sql = postgres(process.env.DATABASE_URL, {
    ssl: 'require',
    transform: {
      undefined: null,
    },
  });
}

// Export sql if available, otherwise export a stub that throws when called
export default (sql || (() => {
  throw new Error('Database connection not available');
}) as any);
