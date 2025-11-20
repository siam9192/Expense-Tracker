import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import goalValidation from "../../validations/goal.validation";
import { useState, useEffect } from "react";
import { useCreateUserGoalMutation } from "../../redux/api/goal.api";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/constant";
import { toast } from "sonner";

const deadlineOptions = [
  { label: "3 Days", value: 3 },
  { label: "7 Days", value: 7 },
  { label: "15 Days", value: 15 },
  { label: "1 Month", value: 30 },
  { label: "3 Months", value: 90 },
  { label: "6 Months", value: 180 },
  { label: "12 Months", value: 360 },
];

interface Props {
  onSuccess?(): void;
}

function CreateGoalForm({ onSuccess }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(goalValidation.createUserGoalPayloadValidation),
    defaultValues: {
      initial_amount: 0,
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [deadlineDays, setDeadlineDays] = useState(deadlineOptions[0].value);

  const [mutate, { isLoading }] = useCreateUserGoalMutation();

  // update deadline date whenever deadlineDays changes
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + deadlineDays);

    const formatted = d.toISOString(); // YYYY-MM-DD
    console.log(formatted);
    setValue("deadline", formatted); // register to form
  }, [deadlineDays, setValue]);

  const submit = handleSubmit(async (value) => {
    try {
      const res = await mutate(value);

      if ("error" in res) {
        throw res.error;
      }

      reset();
      onSuccess && onSuccess();
      toast.success("Goal created successfully!");
    } catch (error: any) {
      setErrorMessage(error?.data?.message || DEFAULT_ERROR_MESSAGE);
    }
  });

  return (
    <form onSubmit={submit} className="p-2 md:p-5 space-y-4">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Enter your plan?</legend>
        <input
          type="text"
          {...register("title")}
          className="input input-lg w-full"
          placeholder="Type here"
        />
        {errors.title && <p className="text-sm text-error mt-1">{errors.title.message}</p>}
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Target Amount</legend>
        <input
          type="number"
          {...register("target_amount")}
          className="input input-lg w-full"
          placeholder="Type here"
        />
        {errors.target_amount && (
          <p className="text-sm text-error mt-1">{errors.target_amount.message}</p>
        )}
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Initial Amount</legend>
        <input
          type="number"
          {...register("initial_amount")}
          defaultValue={0}
          className="input input-lg w-full"
          placeholder="Type here"
        />

        {errors.initial_amount && (
          <p className="text-sm text-error mt-1">{errors.initial_amount.message}</p>
        )}
      </fieldset>

      {/* Hidden but correctly submitted deadline */}
      <input type="date" {...register("deadline")} className="hidden" />

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Deadline</legend>
        <select
          onChange={(e) => setDeadlineDays(Number(e.target.value))}
          defaultValue={deadlineOptions[0].value}
          className="select select-lg w-full"
        >
          {deadlineOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        {errors.deadline && <p className="text-sm text-error mt-1">{errors.deadline.message}</p>}
      </fieldset>

      <button disabled={isLoading} className="btn btn-primary w-full">
        {isLoading ? "Processing..." : "Proceed"}
      </button>

      {errorMessage && <p className="text-error mt-2">{errorMessage}</p>}
    </form>
  );
}

export default CreateGoalForm;
