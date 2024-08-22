import {
  Text,
  Flex,
  Switch,
  Button,
  Theme,
  Grid,
  Box,
  Container,
  // Slider,
  Tooltip as BasicTooltip,
  IconButton,
} from "@radix-ui/themes";
import React from "react";
import "@radix-ui/themes/styles.css";
import * as Slider from "@radix-ui/react-slider";
import * as Tooltip from "@radix-ui/react-tooltip";

const Section = ({ children }) => {
  return (
    <div className="m-4 p-4 rounded-md border border-black/5 ">{children}</div>
  );
};

const DecorativeBox = ({ children }) => {
  return (
    <div
      // className={"h-full bg-[var(--gray-a3)] border"}
      style={{
        height: "100%",
        backgroundColor: "var(--gray-a3)",
        backgroundClip: "padding-box",
        border: "1px solid var(--gray-a5)",
        borderRadius: "var(--radius-1)",
        backgroundImage:
          "url(&quot;data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E&quot;)",
      }}
    >
      {children}
    </div>
  );
};

const LayoutDemo = () => {
  return (
    <Grid columns="3" gap="3">
      <Flex direction="column" gap="3">
        <Box height="5">
          <DecorativeBox />
        </Box>
        <Box height="7">
          <DecorativeBox />
        </Box>
        <Box height="9">
          <DecorativeBox />
        </Box>
      </Flex>

      <Flex direction="column" gap="3">
        <Box grow="1">
          <DecorativeBox />
        </Box>
        <Box height="6">
          <DecorativeBox />
        </Box>
      </Flex>
    </Grid>
  );
};

const BoxDemo = () => {
  return (
    <Box
      style={{ background: "var(--gray-a2)", borderRadius: "var(--radius-3)" }}
      className="bg-black"
    >
      <Container size="1">
        <DecorativeBox>
          <Box py="9" />
        </DecorativeBox>
      </Container>
    </Box>
  );
};

const SliderDemo = () => {
  return (
    <Slider.Root
      className="relative flex items-center select-none touch-none w-[200px] h-5"
      defaultValue={[50]}
      max={100}
      // step={1}
    >
      <Slider.Track className="bg-blackA7 relative grow rounded-full h-[3px]">
        <Slider.Range className="absolute bg-white rounded-full h-full" />
      </Slider.Track>
      <Slider.Thumb
        className="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA5"
        aria-label="Volume"
      />
    </Slider.Root>
  );
};

const BaseTooltip = () => {
  return (
    <BasicTooltip content={"basic tooltip"}>
      <div>basic tooltip</div>
    </BasicTooltip>
  );
};

const LinkTooltip = () => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <a href="https://www.radix-ui.com/">Radix UI</a>
        </Tooltip.Trigger>
        <Tooltip.Content>link tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

const TooltipAll = () => {
  return (
    <Tooltip.Provider skipDelayDuration={1000} delayDuration={3000}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <a href="https://www.radix-ui.com/">Radix UI</a>
        </Tooltip.Trigger>
        <Tooltip.Content>link tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default function RadixUIPage() {
  return (
    <Theme appearance="dark">
      {/* <h1>RadixUIPage</h1>
      <Section>
        <LayoutDemo />
        <BoxDemo />
      </Section>
      <Section>
        <SliderDemo />
      </Section> */}
      <Section>
        <BaseTooltip />
        <LinkTooltip />
      </Section>
    </Theme>
  );
}
