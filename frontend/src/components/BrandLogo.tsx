import Link from 'next/link';

import { jumpTo } from '@/lib/navigation';

interface BrandLogoProps {
  footer?: boolean;
}

export function BrandLogo({ footer = false }: BrandLogoProps) {
  const content = (
    <>
      <span className="logo-mark">B</span>
      <span>Ben Baeyens</span>
    </>
  );

  if (footer) {
    return <div className="foot-logo">{content}</div>;
  }

  return (
    <Link href="#top" className="logo" onClick={jumpTo('top')} aria-label="Ben Baeyens home">
      {content}
    </Link>
  );
}
