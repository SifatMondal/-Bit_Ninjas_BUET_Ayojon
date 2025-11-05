import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
  // Try to get locale from cookie, default to 'en'
  const headersList = headers();
  const cookie = headersList.get('cookie') || '';
  const localeCookie = cookie
    .split(';')
    .find((c) => c.trim().startsWith('NEXT_LOCALE='));
  
  const locale = localeCookie ? localeCookie.split('=')[1] : 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
