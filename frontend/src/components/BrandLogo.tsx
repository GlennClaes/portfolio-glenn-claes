import Link from 'next/link';

import { jumpTo } from '@/lib/navigation';

interface BrandLogoProps {
  footer?: boolean;
}

export function BrandLogo({ footer = false }: BrandLogoProps) {
  const content = (
    <>
      <span className="logo-mark">G</span>
      <span>Glenn Claes</span>
    </>
  );

  if (footer) {
    return <div className="foot-logo">{content}</div>;
  }

  return (
    <Link href="#top" className="logo" onClick={jumpTo('top')} aria-label="Glenn Claes home">
      {content}
    </Link>
  );
}
