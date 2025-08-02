export const Switch = ({
  id,
  defaultChecked,
  defaultValue,
  onChange,
  ...props
}: {
  id: string;
  defaultChecked: boolean;
  defaultValue?: string;
  onChange?: any;
}) => {
  return (
    <div className="relative w-full max-w-[55px] h-[30px] shadow-sm not-dark:shadow-slate-300 dark:shadow-slate-950 rounded-full">
      <input
        type="checkbox"
        id={`checkbox-${id}`}
        className="peer sr-only"
        defaultChecked={defaultChecked}
        defaultValue={defaultValue}
        onChange={onChange}
        {...props}
      />
      <label
        htmlFor={`checkbox-${id}`}
        aria-label="checkbox"
        className="flex items-center h-full w-full rounded-full not-dark:bg-slate-200 dark:bg-slate-600 px-[2px] cursor-pointer transition-colors duration-300 ease-in peer-checked:bg-[#34C759] peer-checked:justify-end justify-start"
      >
        <span className="w-[27px] h-[27px] not-dark:bg-white dark:bg-black rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.15),_0_3px_1px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-out" />
      </label>
    </div>
  );
};
