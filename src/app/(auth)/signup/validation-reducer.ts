import { useReducer, type RefObject } from "react";

type ValidationState = { senha: string, repass: string, valid: boolean };
type ValidationTask =
  { field: string, value?: any }
  |
  { field: "senha", value: string }
  |
  { field: "repass", value: string }
;
export function createValidationReducer(getFormValidity: () => boolean): (current: ValidationState, ...tasks: ValidationTask[]) => ValidationState {
  return function({ senha, repass }: ValidationState, ...tasks: ValidationTask[]): ValidationState {
    tasks.forEach(({ field, value }) => {
      switch (field) {
        case "senha":
          senha = value.trim();
          return;
        case "repass":
          repass = value.trim();
          return;
      }
    });
    const valid = (
      getFormValidity()
      &&
      senha != ""
      &&
      senha == repass
    );
    return { senha, repass, valid };
  }
}

export function useValidationReducer(formRef: RefObject<HTMLFormElement>, initialState?: ValidationState) {
  return useReducer(createValidationReducer(() => formRef.current.checkValidity()), initialState ?? { senha: "", repass: "", valid: false });
}
