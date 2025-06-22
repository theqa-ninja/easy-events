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
    <div className="relative w-full max-w-[55px] h-[30px] shadow-sm shadow-slate-300 rounded-full">
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
        className="flex items-center h-full w-full rounded-full bg-[#e9e9eb] px-[2px] cursor-pointer transition-colors duration-300 ease-in peer-checked:bg-[#34C759] peer-checked:justify-end justify-start"
      >
        <span className="w-[27px] h-[27px] bg-white rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.15),_0_3px_1px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-out" />
      </label>
    </div>
  );
};
