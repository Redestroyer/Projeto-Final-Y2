"use client";

import type { GlobalAttributes } from "components";
import { createContext, useContext, type ComponentPropsWithRef, type Ref, type RefObject } from "react";
import type { JSX } from "react/jsx-runtime";

export type LabelProps = ComponentPropsWithRef<"label">
export const NameContext = createContext<string | undefined>(undefined)
export function Label({ children, ...props }: LabelProps): JSX.Element {
  const name = props.htmlFor || useContext(NameContext);
  return (
    <label {...props}><NameContext value={name}>
      {children}
    </NameContext></label>
  );
}

export type InputProps<V> = Omit<GlobalAttributes, "defaultValue"> & {
  ref?: RefObject<HTMLInputElement>,
  disabled?: boolean,
  form?: string,
  name?: string,
  required?: boolean
} & ({ defaultValue?: V, value?: undefined } | { value: V, defaultValue?: undefined });

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
export function TextField({ name, defaultValue, value, pattern, ...props }: TextFieldProps): JSX.Element {
  name = name || useContext(NameContext);
  const valueProps = value ? { value, readOnly: true } : { defaultValue, readOnly: false };
  const passedProps = { id: props.id, required: props.required, className: props.className };
  return <input type="text" name={name} pattern={pattern?.source} {...valueProps} {...passedProps} />
}

export type EmailFieldProps = BaseTextFieldProps & {
  list?: Ref<HTMLDataListElement>
};
export function EmailField({ name, defaultValue, value, pattern, ...props }: EmailFieldProps): JSX.Element {
  name = name || useContext(NameContext);
  const valueProps = value ? { value, readOnly: true } : { defaultValue, readOnly: false };
  const passedProps = { id: props.id, required: props.required, className: props.className };
  return <input type="email" name={name} pattern={pattern?.source} {...valueProps} {...passedProps} />
}

export type PasswordFieldProps = BaseTextFieldProps;
export function PasswordField({ name, defaultValue, value, pattern, ...props }: PasswordFieldProps): JSX.Element {
  name = name || useContext(NameContext);
  const valueProps = value ? { value, readOnly: true } : { defaultValue, readOnly: false };
  const passedProps = { id: props.id, required: props.required, className: props.className };
  return <input type="password" name={name} pattern={pattern?.source} {...valueProps} {...passedProps} />
}

export type TelephoneFieldProps = BaseTextFieldProps & {
  list?: Ref<HTMLDataListElement>
};
export function TelephoneField({ name, defaultValue, value, pattern, ...props }: TelephoneFieldProps): JSX.Element {
  name = name || useContext(NameContext);
  const valueProps = value ? { value, readOnly: true } : { defaultValue, readOnly: false };
  const passedProps = { id: props.id, required: props.required, className: props.className };
  return <input type="tel" name={name} pattern={pattern?.source} {...valueProps} {...passedProps} />
}

export type DateFieldProps = InputProps<Date> & {
  min?: Date,
  max?: Date,
  step?: number | "any"
};
export function DateField({ name, defaultValue, value, min, max, step, ...props }: DateFieldProps): JSX.Element {
  if (min && max && min >= max)
    throw new Error(`Minimal date ${min} is larger than maximal ${max}!`);
  if (step == "any")
    step = 1;
  else if (step && (step <= 0 || !Number.isSafeInteger(step)))
    throw new Error(`Invalid step of ${step} days; must be a non-null natural!`);
  name = name || useContext(NameContext);
  const valueProps = value ? { value: value.toISOString().split("T")[0], readOnly: true } : { defaultValue: defaultValue?.toISOString().split("T")[0], readOnly: false };
  const passedProps = { id: props.id, required: props.required, className: props.className };
  return <input type="date" name={name}  {...valueProps} {...passedProps} />
}

export type SelectProps = ComponentPropsWithRef<"select">;
export function Select({ name, children, ...props }: SelectProps): JSX.Element {
  name = name || useContext(NameContext);
  return <select name={name} {...props}>{children}</select>
}
