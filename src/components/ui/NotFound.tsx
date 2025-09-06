export default function NotFound({ message }: { message?: string }) {
  return (
    <div className='py-12 text-center'>
      <h1 className='text-3xl font-bold'>Page Not Found</h1>
      {message && <p className='mt-2 text-gray-400'>{message}</p>}
    </div>
  );
}
