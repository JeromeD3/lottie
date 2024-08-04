import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import React from "react";

export default function EvervaultCardDemo() {
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">

      <EvervaultCard text="hover" />

    </div>
  );
}
