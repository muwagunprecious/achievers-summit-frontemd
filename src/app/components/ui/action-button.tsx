import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "./utils";

const ACTION_BUTTON_ARROW_PATH =
  "M1.41421 4.70711L0.707107 4L0 4.70711L0.707107 5.41421L1.41421 4.70711ZM13.4142 5.70711C13.9665 5.70711 14.4142 5.25939 14.4142 4.70711C14.4142 4.15482 13.9665 3.70711 13.4142 3.70711V4.70711V5.70711ZM5.41421 0.707107L4.70711 0L0.707107 4L1.41421 4.70711L2.12132 5.41421L6.12132 1.41421L5.41421 0.707107ZM1.41421 4.70711L0.707107 5.41421L4.70711 9.41421L5.41421 8.70711L6.12132 8L2.12132 4L1.41421 4.70711ZM1.41421 4.70711V5.70711H13.4142V4.70711V3.70711H1.41421V4.70711Z";

const ACTION_BUTTON_BASE_CLASSNAME =
  "relative inline-flex shrink-0 appearance-none items-center justify-center border-0 p-0 no-underline outline-none transition-[transform,box-shadow,filter,background-color,border-color,color] duration-150 ease-out motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60";

const ACTION_BUTTON_INTERACTION_CLASSNAME =
  "cursor-pointer hover:-translate-y-px hover:brightness-[1.03] active:translate-y-0 active:brightness-100 focus-visible:ring-2 focus-visible:ring-[#ffd966] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050b11]";

type ButtonActionButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  href?: undefined;
};

type LinkActionButtonProps = {
  href: string;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "className" | "href"
>;

type BaseActionButtonProps = {
  className?: string;
  label: string;
  textClassName?: string;
};

type FilledActionButtonProps = BaseActionButtonProps &
  (ButtonActionButtonProps | LinkActionButtonProps) & {
    backgroundClassName?: string;
    withArrow?: boolean;
  };

type OutlinedActionButtonProps = BaseActionButtonProps &
  (ButtonActionButtonProps | LinkActionButtonProps) & {
    borderClassName?: string;
  };

type ActionButtonProps =
  | ({ variant?: "filled" } & FilledActionButtonProps)
  | ({ variant: "outline" } & OutlinedActionButtonProps);

function ActionButtonArrow() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Arrow_alt_lright">
      <div className="absolute bottom-[33.33%] flex items-center justify-center left-1/4 right-1/4 top-[33.33%]">
        <div className="-scale-y-100 flex-none h-[8px] rotate-180 w-[12px]">
          <div className="relative size-full">
            <div className="absolute inset-[-8.84%_-8.33%_-8.84%_-11.79%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 14.4142 9.41421"
              >
                <path
                  d={ACTION_BUTTON_ARROW_PATH}
                  fill="var(--stroke-0, #050B11)"
                  id="Vector 9"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ActionButton(props: ActionButtonProps) {
  if (props.variant === "outline") {
    const outlineContent = (
      <>
        <div
          aria-hidden="true"
          className={cn(
            "absolute border border-solid inset-0 pointer-events-none",
            props.borderClassName ?? "border-[#ffd966]",
          )}
        />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex h-full items-center justify-center px-[28px] py-[14px] relative">
            <div
              className={cn(
                "flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[19px] text-center tracking-[-1.14px] whitespace-nowrap",
                props.textClassName ?? "text-[#ffd966]",
              )}
            >
              <p className="leading-[1.02]">{props.label}</p>
            </div>
          </div>
        </div>
      </>
    );

    if (props.href !== undefined) {
      const {
        borderClassName: _borderClassName,
        className,
        href,
        label: _label,
        rel,
        target,
        textClassName: _textClassName,
        ...linkProps
      } = props;

      return (
        <a
          className={cn(
            ACTION_BUTTON_BASE_CLASSNAME,
            ACTION_BUTTON_INTERACTION_CLASSNAME,
            "h-full bg-transparent",
            className,
          )}
          href={href}
          rel={rel}
          target={target}
          {...linkProps}
        >
          {outlineContent}
        </a>
      );
    }

    const {
      borderClassName: _borderClassName,
      className,
      label: _label,
      textClassName: _textClassName,
      type = "button",
      ...buttonProps
    } = props;

    return (
      <button
        className={cn(
          ACTION_BUTTON_BASE_CLASSNAME,
          ACTION_BUTTON_INTERACTION_CLASSNAME,
          "h-full bg-transparent",
          className,
        )}
        type={type}
        {...buttonProps}
      >
        {outlineContent}
      </button>
    );
  }

  const filledContent = (
    <>
      <div
        className={cn(
          "flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[19px] text-center tracking-[-1.14px] whitespace-nowrap",
          props.textClassName ?? "text-[#050b11]",
        )}
      >
        <p className="leading-[1.02]">{props.label}</p>
      </div>
      {props.withArrow ?? true ? <ActionButtonArrow /> : null}
    </>
  );

  if (props.href !== undefined) {
    const {
      backgroundClassName: _backgroundClassName,
      className,
      href,
      label: _label,
      rel,
      target,
      textClassName: _textClassName,
      withArrow: _withArrow,
      ...linkProps
    } = props;

    return (
      <a
        className={cn(
          ACTION_BUTTON_BASE_CLASSNAME,
          ACTION_BUTTON_INTERACTION_CLASSNAME,
          "content-stretch gap-[10px] px-[28px] py-[14px]",
          props.backgroundClassName ?? "bg-[#a4c6e6]",
          className,
        )}
        href={href}
        rel={rel}
        target={target}
        {...linkProps}
      >
        {filledContent}
      </a>
    );
  }

  const {
    backgroundClassName: _backgroundClassName,
    className,
    label: _label,
    textClassName: _textClassName,
    type = "button",
    withArrow: _withArrow,
    ...buttonProps
  } = props;

  return (
    <button
      className={cn(
        ACTION_BUTTON_BASE_CLASSNAME,
        ACTION_BUTTON_INTERACTION_CLASSNAME,
        "content-stretch gap-[10px] px-[28px] py-[14px]",
        props.backgroundClassName ?? "bg-[#a4c6e6]",
        className,
      )}
      type={type}
      {...buttonProps}
    >
      {filledContent}
    </button>
  );
}

export function FilledActionButton(props: FilledActionButtonProps) {
  return <ActionButton {...props} variant="filled" />;
}

export function OutlinedActionButton(props: OutlinedActionButtonProps) {
  return <ActionButton {...props} variant="outline" />;
}

export function HeaderActionButtons({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "content-stretch flex gap-4 items-center relative shrink-0",
        className,
      )}
    >
      <FilledActionButton href="/tickets" label="Get your ticket" />
      <div className="flex flex-row items-center self-stretch">
        <OutlinedActionButton
          borderClassName="border-[#f0f1f4]"
          href="/get-involved#become-a-sponsor"
          label="Become a sponsor"
          textClassName="text-[#f0f1f4]"
        />
      </div>
    </div>
  );
}
