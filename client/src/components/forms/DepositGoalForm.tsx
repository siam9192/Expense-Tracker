import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import goalValidation from "../../validations/goal.validation";
import { useState } from "react";
import { useDepositUserGoalMutation } from "../../redux/api/goal.api";
import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/constant";

const DEFAULT_AMOUNT = 100

interface Props {
  goal_id:number
  onSuccess?():void
}

function DepositGoalForm({goal_id,onSuccess}:Props) {
 const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(goalValidation.depositUserGoalPayloadValidation),
    defaultValues:{
     amount:DEFAULT_AMOUNT,
     goal_id
    },
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [mutate, { isLoading }] = useDepositUserGoalMutation();

 

  const submit = handleSubmit(async (value) => {
    
    try {
      const res = await mutate(value);

      if ("error" in res) {
        throw res.error;
      }

      reset();
      onSuccess && onSuccess();
      toast.success("Deposit successful!");
    } catch (error: any) {
      setErrorMessage(error?.data?.message || DEFAULT_ERROR_MESSAGE);
    }
  });
  return (
    <form action="" onSubmit={submit} className="p-2 md:p-5 space-y-4">
      <fieldset className="fieldset ">
        <legend className="fieldset-legend">Enter Deposit Amount?</legend>
        <input
          {...register("amount")}
          type="number"
          
          className="input input-lg w-full"
          placeholder="Type here"
        />
      </fieldset>

      <button disabled={isLoading} className="btn btn-primary w-full">Submit</button>
      
      {errorMessage && <p className="text-error mt-2">{errorMessage}</p>}
    </form>
  );
}

export default DepositGoalForm;
