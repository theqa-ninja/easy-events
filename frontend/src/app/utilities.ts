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
  dateStyle: "long",
  timeStyle: "short",
};
export const formatDateTime = (
  date: string | number,
  options: Intl.DateTimeFormatOptions = defaultDateTimeOptions
) => new Date(date).toLocaleString("en-US", options);

export const getToken = async () => {
  let token = "";
  if (typeof window === "undefined") {
    const { cookies: serverCookies } = await import("next/headers");
    const cookieStore = await serverCookies();
    token = cookieStore
      ? (await cookieStore.get("token")?.value.toString()) || ""
      : "";
  } else {
    const { getCookie: clientCookies } = await import("cookies-next");
    token = clientCookies("token")?.toString() || "";
  }
  return token;
};

export const validateToken = async () => {
  const { deleteCookie } = await import("cookies-next");

  return await fetch("http://localhost:3000/auth/validate_token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await getToken()) || "",
    },
  })
    .then((response: Response) => {
      if (response.statusText === "Unauthorized") {
        deleteCookie("token");
        return false;
      } else if (response.ok) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error: Error) => false);
};

export const validateOnBlur = async (
  event: React.ChangeEvent<HTMLInputElement>,
  validationSchema: any,
  setErrors: any
) => {
  const value = { [event.target.name]: event.target.value };

  try {
    await validationSchema.validate(value, { abortEarly: false });
    setErrors({});
  } catch (validationError: any) {
    const formattedError = validationError.inner.reduce(
      (acc: any, err: any) => {
        acc[err.path] = err.message;
        return acc;
      },
      {}
    );
    setErrors({ [event.target.name]: formattedError[event.target.name] });
  }
};
