import { useForm } from "react-hook-form";
import { CategoryType } from "../../types/category.type";
import { zodResolver } from "@hookform/resolvers/zod";
import categoryValidation from "../../validations/category.validation";
import { useCreateUserCategoryMutation } from "../../redux/api/category.api";
import { useState } from "react";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/constant";
import { toast } from "sonner";

const categoryTypes = [
  {
    label: "Income",
    value: CategoryType.INCOME,
  },

  {
    label: "Expense",
    value: CategoryType.EXPENSE,
  },
];

interface Props {
  onSuccess?: () => void;
}
function CreateUserCategoryForm({ onSuccess }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(categoryValidation.createCurrentUserCategoryValidation),
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [mutate, { isLoading }] = useCreateUserCategoryMutation();
  const submit = handleSubmit(async (value) => {
    try {
      const { error } = await mutate(value);
      if (error) throw error;
      reset();
      onSuccess && onSuccess();
      toast.success("Category created successfully!");
    } catch (error: any) {
      setErrorMessage((error as any)?.data?.message || DEFAULT_ERROR_MESSAGE);
    }
  });

  return (
    <form action="" onSubmit={submit} className="p-2 md:p-5 space-y-4">
      <fieldset className="fieldset ">
        <legend className="fieldset-legend">Category name?</legend>
        <input
          type="text"
          {...register("name")}
          className="input input-lg w-full"
          placeholder="Type here"
        />
        {errors.name && <p className="text-sm text-error mt-1">{errors.name.message}</p>}
      </fieldset>

      <fieldset className="fieldset ">
        <legend className="fieldset-legend">Type</legend>
        <select
          {...register("type")}
          defaultValue={CategoryType.INCOME}
          className="select select-lg w-full"
        >
          {categoryTypes.map((_) => (
            <option value={_.value}>{_.label}</option>
          ))}
        </select>
        {errors.type && <p className="text-sm text-error mt-1">{errors.type.message}</p>}
      </fieldset>

      <fieldset>
        <legend className="fieldset-legend">Description</legend>
        <textarea
          {...register("description")}
          className="textarea textarea-bordered w-full min-h-40"
          placeholder="notes about this category..."
        ></textarea>
        {errors.description && (
          <p className="text-sm text-error mt-1">{errors.description.message}</p>
        )}
      </fieldset>
      <button
        type="submit"
        onClick={submit}
        disabled={isLoading}
        className="btn btn-primary w-full"
      >
        Submit
      </button>
      {errorMessage && <p className=" text-error mt-2">{errorMessage}</p>}
    </form>
  );
}

export default CreateUserCategoryForm;
