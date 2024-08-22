// Provider :Wraps your app to provide global functionality to your tooltips.
// Root     :Contains all the parts of a tooltip.
// Trigger
// Portal
// Content

import Section from "@/basic/section";
import { Portal } from "@radix-ui/themes";
import React from "react";
import * as Tooltip from "@/components/custom/template";

const Demo1 = () => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={1000} skipDelayDuration={5000}>
        <Tooltip.Trigger>
          <div>demo1</div>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <div className="bg-black p-2">demo1 tooltip</div>
        </Tooltip.Content>
      </Tooltip.Root>
      <Tooltip.Root delayDuration={0} skipDelayDuration={500}>
        <Tooltip.Trigger>
          <div>demo1</div>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <div className="bg-black p-2">demo1 tooltip</div>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

// trigger 为 asChild
// Content 需要修改自身定位，
const Demo2 = () => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0} skipDelayDuration={500}>
        <Tooltip.Trigger asChild>
          <div className="relative">demo2</div>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <div className="bg-black p-2">demo2 tooltip</div>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default function TooltipDemo() {
  return (
    <div>
      {/* <Section>
        <Demo1 />
      </Section>
      <Section>
        <Demo2 />
      </Section> */}
      <Section>
        <Demo2 />
      </Section>
    </div>
  );
}
