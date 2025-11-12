import { Metadata } from 'next';
import LegalContent from '../_components/LegalContent';
import clsx from 'clsx';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our Privacy Policy.',

  openGraph: {
    title: 'Privacy Policy',
    description: 'Our Privacy Policy',
  },

  twitter: {
    title: 'Privacy Policy',
    description: 'Our Privacy Policy',
  },
};

export default function Datenschutz() {
  /* CSS ClassNames */
  const headingTwoClassName = clsx('text-2xl mb-3');

  return (
    <LegalContent heading='Datenschutz'>
      <div className='space-y-8'>
        <div>
          <h2 className={headingTwoClassName}>Example 1</h2>
          <div className='space-y-2'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro
              illo accusamus iure dicta facere, soluta aspernatur fugit eius,
              culpa sit eos enim debitis obcaecati nam quidem asperiores.
              Quidem, ducimus labore?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo hic
              ex cum exercitationem repellendus dignissimos consectetur harum
              distinctio impedit maxime quas, eius quaerat est veritatis tempore
              totam eos. Cum, at!
            </p>
          </div>
        </div>
        <div>
          <h2 className={headingTwoClassName}>Example 2</h2>
          <div className='space-y-2'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro
              illo accusamus iure dicta facere, soluta aspernatur fugit eius,
              culpa sit eos enim debitis obcaecati nam quidem asperiores.
              Quidem, ducimus labore?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo hic
              ex cum exercitationem repellendus dignissimos consectetur harum
              distinctio impedit maxime quas, eius quaerat est veritatis tempore
              totam eos. Cum, at!
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptatibus placeat dolor, assumenda, atque laborum quo dolores
              reiciendis, facilis pariatur deserunt tempora ut et exercitationem
              distinctio amet enim beatae? Labore, magnam? Quod nostrum omnis
              rem maiores repellat praesentium eligendi pariatur excepturi quia
              laborum magni veritatis ad dolore vitae, dicta minus sint sit
              quisquam id maxime laboriosam voluptatum quo. Doloremque, suscipit
              eveniet?
            </p>
          </div>
        </div>
        <div>
          <h2 className={headingTwoClassName}>Example 3</h2>
          <div className='space-y-2'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro
              illo accusamus iure dicta facere, soluta aspernatur fugit eius,
              culpa sit eos enim debitis obcaecati nam quidem asperiores.
              Quidem, ducimus labore?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo hic
              ex cum exercitationem repellendus dignissimos consectetur harum
              distinctio impedit maxime quas, eius quaerat est veritatis tempore
              totam eos. Cum, at!
            </p>
          </div>
        </div>
        <div>
          <h2 className={headingTwoClassName}>Example 4</h2>
          <div className='space-y-2'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro
              illo accusamus iure dicta facere, soluta aspernatur fugit eius,
              culpa sit eos enim debitis obcaecati nam quidem asperiores.
              Quidem, ducimus labore?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo hic
              ex cum exercitationem repellendus dignissimos consectetur harum
              distinctio impedit maxime quas, eius quaerat est veritatis tempore
              totam eos. Cum, at!
            </p>
          </div>
        </div>
      </div>
    </LegalContent>
  );
}
