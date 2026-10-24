import React from "react";

type Props = {
  children: React.ReactNode;
};
function BaseTable({ children }: Props) {
  return (
    <div className=" w-full grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="rounded-2xl border border-border bg-card p-4  w-full shadow-sm">
        {children }
      </div>
    </div>
  );
}

export default BaseTable;
