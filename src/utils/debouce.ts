//any - не самый лучший вариант, но в данном случае это не играет большой роли,
// т.к все проверки мы делаем раньше
export const debounce = <T extends (...args: any[]) => ReturnType<T>>(
  callback: T,
  timeout: number = 500,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};
