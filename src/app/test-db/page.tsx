import { getTestData } from '@/lib/actions';
import Link from 'next/link';

export default async function TestDbPage() {
  const result = await getTestData();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Database Connection Test</h1>
      <p className="mb-4">
        Attempting to fetch data from the 'test' table to verify the database connection.
      </p>
      <div className="p-4 border rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-2">Query Result:</h2>
        {result.error ? (
          <div>
            <p className="text-destructive font-bold">An error occurred:</p>
            <p className="text-destructive">{result.error}</p>
          </div>
        ) : result.data && result.data.length > 0 ? (
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        ) : (
           <p className="text-muted-foreground">Query was successful, but the 'test' table is empty.</p>
        )}
      </div>
       <Link href="/" className="mt-8 inline-block text-primary hover:underline">
        &larr; Back to Home
      </Link>
    </div>
  );
}
