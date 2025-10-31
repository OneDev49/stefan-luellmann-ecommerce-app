interface LegalContentProps {
  heading: string;
  children: React.ReactNode;
}

export default function LegalContent({ heading, children }: LegalContentProps) {
  return (
    <section className='max-w-7xl mx-auto flex px-4 py-8 min-h-screen'>
      <div className='basis-[65ch] space-y-8'>
        <h1 className='text-5xl'>{heading}</h1>
        {children}
      </div>
    </section>
  );
}
