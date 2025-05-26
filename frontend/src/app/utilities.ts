/**
 * format the date by Intl DateTimeFormatOptions
 * @function
 * @param {string} date
 * @param {Intl.DateTimeFormatOptions} options
 * @example
 * const options: Intl.DateTimeFormatOptions = {
 *   weekday: "long",
 *   year: "numeric",
 *   month: "long",
 *   day: "numeric",
 * };
 * formatDate({ date: date, options: options })
 * Thursday, December 20, 2012
 */

const defaultDateTimeOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'long',
    timeStyle: 'short',
  };
  export const formatDateTime = (
    date: string | number,
    options: Intl.DateTimeFormatOptions = defaultDateTimeOptions,
  ) => new Date(date).toLocaleString('en-US', options);


  export const getToken = async () => {
    let token = '';
    if (typeof window === 'undefined') {
      const { cookies: serverCookies } = await import('next/headers');
      const cookieStore = await serverCookies();
      token = cookieStore ? await cookieStore.get('token')?.value.toString() || '' : '';
    } else {
      const { getCookie: clientCookies } = await import('cookies-next');
      token = clientCookies('token')?.toString() || '';
    }
    return token;
  };
  