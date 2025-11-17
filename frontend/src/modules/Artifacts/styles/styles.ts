export const inputClasses = (theme: string) => {
  const base =
    "w-[500px] border-solid border border-[#20B4F8] rounded-[5px] p-[5px]";
  return theme === "light" ? base : `${base} bg-[#020817]`;
};

export const textAreaClasses = (theme: string) => {
  const base =
    "resize-none w-[500px] h-[100px] border border-[#20B4F8] rounded-[5px] p-[5px]";
  return theme === "light" ? base : `${base} bg-[#020817]`;
};

export const stepClasses = (gap: number) =>
  `flex flex-col gap-[${gap}px] ml-[15px] mx-auto`;
export const buttonClasses = "bg-[#20B4F8] text-[#FFFFFF] p-2 rounded-[20px]";
