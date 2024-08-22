import * as React from "react";
import { composeEventHandlers } from "@radix-ui/primitive";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { createContextScope } from "@radix-ui/react-context";
import { DismissableLayer } from "@radix-ui/react-dismissable-layer";
import { useId } from "@radix-ui/react-id";
import * as PopperPrimitive from "@radix-ui/react-popper";
import { createPopperScope } from "@radix-ui/react-popper";
import { Portal as PortalPrimitive } from "@radix-ui/react-portal";
import { Presence } from "@radix-ui/react-presence";
import { Primitive } from "@radix-ui/react-primitive";
import { Slottable } from "@radix-ui/react-slot";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden";

import type * as Radix from "@radix-ui/react-primitive";
import type { Scope } from "@radix-ui/react-context";

type ScopedProps<P = {}> = P & { __scopeTooltip?: Scope };

const [createTooltipContext, createTooltipScope] = createContextScope(
  "Tooltip",
  [createPopperScope]
);
const usePopperScope = createPopperScope();

interface TooltipProviderProps {
  children: React.ReactNode;
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened.
   * @defaultValue 700
   */
  delayDuration?: number;
  /**
   * How much time a user has to enter another trigger without incurring a delay again.
   * @defaultValue 300
   */
  skipDelayDuration?: number;
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   * @defaultValue false
   */
  disableHoverableContent?: boolean;
}

const PROVIDER_NAME = "TooltipProvider";
const DEFAULT_DELAY_DURATION = 700;
const TOOLTIP_OPEN = "tooltip.open";

type TooltipProviderContextValue = {
  isOpenDelayed: boolean;
  delayDuration: number;
  onOpen(): void;
  onClose(): void;
  onPointerInTransitChange(inTransit: boolean): void;
  isPointerInTransitRef: React.MutableRefObject<boolean>;
  disableHoverableContent: boolean;
};

const [TooltipProviderContextProvider, useTooltipProviderContext] =
  createTooltipContext<TooltipProviderContextValue>(PROVIDER_NAME);

const TooltipProvider: React.FC<TooltipProviderProps> = (
  props: ScopedProps<TooltipProviderProps>
) => {
  const {
    __scopeTooltip,
    delayDuration = DEFAULT_DELAY_DURATION,
    skipDelayDuration = 300,
    disableHoverableContent = false,
    children,
  } = props;

  const [isOpenDelayed, setIsOpenDelayed] = React.useState(true);
  const isPointerInTransitRef = React.useRef(false);
  const skipDelayTimerRef = React.useRef(0);

  React.useEffect(() => {
    const skipDelayTimer = skipDelayTimerRef.current;
    return () => window.clearTimeout(skipDelayTimer);
  }, []);

  return (
    <TooltipProviderContextProvider
      scope={__scopeTooltip}
      isOpenDelayed={isOpenDelayed}
      delayDuration={delayDuration}
      onOpen={React.useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        setIsOpenDelayed(false);
      }, [])}
      onClose={React.useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        skipDelayTimerRef.current = window.setTimeout(
          () => setIsOpenDelayed(true),
          skipDelayDuration
        );
      }, [skipDelayDuration])}
      isPointerInTransitRef={isPointerInTransitRef}
      onPointerInTransitChange={React.useCallback((inTransit: boolean) => {
        isPointerInTransitRef.current = inTransit;
      }, [])}
      disableHoverableContent={disableHoverableContent}
    >
      {children}
    </TooltipProviderContextProvider>
  );
};

const TOOLTIP_NAME = "Tooltip";
type TooltipTriggerElement = React.ElementRef<typeof Primitive.button>;

type TooltipContextValue = {
  contentId: string;
  open: boolean;
  stateAttribute: "closed" | "delayed-open" | "instant-open";
  trigger: TooltipTriggerElement | null;
  onTriggerChange(trigger: TooltipTriggerElement | null): void;
  onTriggerEnter(): void;
  onTriggerLeave(): void;
  onOpen(): void;
  onClose(): void;
  disableHoverableContent: boolean;
};

const [TooltipContextProvider, useTooltipContext] =
  createTooltipContext<TooltipContextValue>(TOOLTIP_NAME);

const Provider = TooltipProvider;
// const Root = Tooltip;
// const Trigger = TooltipTrigger;
// const Portal = TooltipPortal;
// const Content = TooltipContent;
// const Arrow = TooltipArrow;
