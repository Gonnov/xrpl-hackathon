import { InfoIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";

export const HeaderSection = (): JSX.Element => {
  return (
    <header className="w-full shadow-md z-10 bg-gradient-to-r from-[#00BFFF] via-[#0066CC] to-[#00BFFF]">
      <div className="flex h-14 items-center justify-between px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src="/Logo.png"
            alt="KAYP"
            className="h-8 w-8 object-contain"
          />
        </div>

        {/* Notification Bar */}
        <div className="flex h-9 items-center gap-2 pl-2 pr-1 py-0 bg-white/10 rounded-xl border border-solid border-white/20">
          <InfoIcon className="w-4 h-4 text-white" />

          <div className="font-body-default font-[number:var(--body-default-font-weight)] text-white/80 text-[length:var(--body-default-font-size)] text-justify tracking-[var(--body-default-letter-spacing)] leading-[var(--body-default-line-height)] [font-style:var(--body-default-font-style)]">
            Ask KAYP anything about your transactions...
          </div>

          <div className="inline-flex items-center gap-1">
            <Button
              variant="ghost"
              className="h-[30px] px-2 py-0 bg-white/10 rounded-lg hover:bg-white/20 text-white"
            >
              <span className="font-button font-[number:var(--button-font-weight)] text-white text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] whitespace-nowrap [font-style:var(--button-font-style)]">
                Clear
              </span>
            </Button>

            <Button className="h-[30px] px-2 py-0 bg-white/20 rounded-lg hover:bg-white/30">
              <span className="font-button font-[number:var(--button-font-weight)] text-white text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] whitespace-nowrap [font-style:var(--button-font-style)]">
                Ask KAYP
              </span>
            </Button>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 p-0.5 rounded-lg">
          <div className="relative w-8 h-8 bg-white/20 rounded-lg overflow-hidden">
            <div className="absolute w-8 h-5 top-[5px] left-0 font-button font-[number:var(--button-font-weight)] text-white text-[length:var(--button-font-size)] text-center tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
              CN
            </div>
          </div>

          <div className="inline-flex flex-col items-start">
            <div className="self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-semibold text-white text-[13px] text-justify tracking-[0] leading-5">
              Company&apos;s name
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};