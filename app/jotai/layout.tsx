// ./app/layout.js
import {JotaiProvider} from '../components/jotaiProvider';

export default function JotaiLayout({children}: {children: React.ReactNode}) {
  return <JotaiProvider>{children}</JotaiProvider>;
}
