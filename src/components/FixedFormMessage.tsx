// components/fixed-form-message.tsx
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
}

export const FixedFormMessage = ({ name }: Props) => {
  const {
    formState: { errors },
  } = useFormContext();

  const message = errors[name]?.message as string | undefined;

  return (
    <p
      className={`text-sm text-destructive min-h-[20px] ${
        !message ? "invisible" : ""
      }`}
    >
      {message ?? "placeholder"}
    </p>
  );
};
