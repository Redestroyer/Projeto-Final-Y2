"use client";

import type { GlobalAttributes } from "@/components";
import { formatYMD } from "@/lib/datetime";
import { createContext, useContext, useState, type ChangeEventHandler, type ComponentPropsWithRef, type Ref, type RefObject } from "react";
import type { JSX } from "react/jsx-runtime";

export type LabelProps = ComponentPropsWithRef<"label">;
export const NameContext = createContext<string | undefined>(undefined);
export function Label({ children, ...props }: LabelProps): JSX.Element {
  const name = props.htmlFor || useContext(NameContext);
  return (
    <label {...props}><NameContext value={name}>
      {children}
    </NameContext></label>
  );
}

export type DispatchInvalid = ((invalid: boolean) => void) | (() => boolean);
export const InvalidationContext = createContext<DispatchInvalid | undefined>(undefined);
export type InvalidationWrapperProps = ComponentPropsWithRef<"div">;
export function InvalidationWrapper(props: InvalidationWrapperProps): JSX.Element {
  const [invalid, setInvalid] = useState(false);
  return (
    <InvalidationContext value={(value?: boolean) => {
      if (value != null) setInvalid(value);
      else return invalid;
    }}>
      <div {...props} />
    </InvalidationContext>
  )
}

export type InvalidNoticeProps = ComponentPropsWithRef<"div">;
export function InvalidNotice({ hidden, ...props }: InvalidNoticeProps): JSX.Element {
  const invalid: boolean | undefined = (useContext(InvalidationContext) as any)?.();
  return <div hidden={!invalid || hidden} {...props}/>
}

export type ChangeHandler<E, T = E> = ChangeEventHandler<E, T>;
export type InputProps<V = string> = Omit<GlobalAttributes, "defaultValue" | "onChange"> & {
  ref?: RefObject<HTMLInputElement>,
  disabled?: boolean,
  form?: string,
  name?: string,
  required?: boolean,
} & ({ defaultValue?: V, setValue?: (newValue: V) => void, value?: undefined, onChange?: ChangeHandler<HTMLInputElement> } | { value: V, defaultValue?: undefined, setValue?: undefined, onChange?: undefined });

function extractPassedProps<V, P extends InputProps<V> = InputProps<V>>({ name, defaultValue, value, setValue, onChange: onChangeP, ...props }: P, parseValue: (view: string) => V, formatValue?: (value: V) => string) {
  formatValue ??= v => (v as any).toString();
  name = name || useContext(NameContext);
  const [valueProps, onChange] = (
    value
    ? [{ value: formatValue(value), readOnly: true }, _=>{}]
    : [{ defaultValue: defaultValue != null ? formatValue(defaultValue) : undefined, readOnly: false }, setValue ? e => {
      setValue(parseValue(e.target.value));
      onChangeP?.(e);
    } : onChangeP]
  ) satisfies [any, ChangeHandler<HTMLInputElement> | undefined];
  return { ...props, ...valueProps, onChange };
}

type BaseTextFieldProps = InputProps<string> & {
  minLength?: number,
  maxLength?: number,
  pattern?: RegExp,
  placeholder?: string,
  size?: number
};
export type TextFieldProps = BaseTextFieldProps & {
  list?: Ref<HTMLDataListElement>,
  spellcheck?: boolean
};
export function TextField({ pattern, ...props }: TextFieldProps): JSX.Element {
  const passedProps = extractPassedProps<string>(props, s=>s);
  return <input type="text" pattern={pattern?.source} {...passedProps} />
}

export type EmailFieldProps = BaseTextFieldProps & {
  list?: Ref<HTMLDataListElement>
};
export function EmailField({ pattern, ...props }: EmailFieldProps): JSX.Element {
  const passedProps = extractPassedProps<string>(props, s=>s);
  return <input type="email" pattern={pattern?.source} {...passedProps} />
}

export type PasswordFieldProps = BaseTextFieldProps;
export function PasswordField({ pattern, ...props }: PasswordFieldProps): JSX.Element {
  const passedProps = extractPassedProps<string>(props, s=>s);
  return <input type="password" pattern={pattern?.source} {...passedProps} />
}

export type TelephoneFieldProps = BaseTextFieldProps & {
  list?: Ref<HTMLDataListElement>
};
export function TelephoneField({ pattern, ...props }: TelephoneFieldProps): JSX.Element {
  const passedProps = extractPassedProps<string>(props, s=>s);
  return <input type="tel" pattern={pattern?.source} {...passedProps} />
}

export type DateFieldProps = InputProps<Date> & {
  min?: Date,
  max?: Date,
  step?: number | "any"
};
export function DateField({ min: minD, max: maxD, step, ...props }: DateFieldProps): JSX.Element {
  if (minD && maxD && minD >= maxD)
    throw new Error(`Minimal date ${minD} is larger than maximal ${maxD}!`);
  if (step == "any")
    step = 1;
  else if (step && (step <= 0 || !Number.isSafeInteger(step)))
    throw new Error(`Invalid step of ${step} days; must be a non-null natural!`);
  const passedProps = extractPassedProps<Date>({ ...props }, s => new Date(s), formatYMD);
  return <input type="date" {...passedProps} />
}

//type HTMLValue = string | number | readonly string[];
type SelectValueProps = { defaultValue?: string, value?: undefined, setValue?: (newValue: string) => void } | { value: string, defaultValue?: undefined, setValue?: undefined };
type SelectPropsOmitted = "defaultValue" | "value" | "disabled" | "multiple"
export type SelectProps = Omit<ComponentPropsWithRef<"select">, SelectPropsOmitted> & SelectValueProps;
export function Select({ name, children, defaultValue, value, setValue, onChange: onChangeP, ...props }: SelectProps): JSX.Element {
  name = name || useContext(NameContext);
  const [valueProps, onChangeV] = (
    value
    ? [{ value, disabled: true }, setValue ? e => {
      setValue(e.target.value)
    } : _=>{}]
    : [{ defaultValue, disabled: false }, _=>{}]
  ) satisfies [any, ChangeEventHandler<HTMLSelectElement, HTMLSelectElement>];
  const onChange: ChangeEventHandler<HTMLSelectElement, HTMLSelectElement> = function(e) {
    onChangeP?.(e);
    onChangeV(e);
  }
  return <select name={name} onChange={onChange} {...valueProps} {...props}>{children}</select>
}
