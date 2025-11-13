function DepositGoalForm() {
  return (
    <form action="" className="p-2 md:p-5 space-y-4">
      <fieldset className="fieldset ">
        <legend className="fieldset-legend">Enter Deposit Amount?</legend>
        <input
          type="number"
          defaultValue={100}
          className="input input-lg w-full"
          placeholder="Type here"
        />
      </fieldset>

      <button className="btn btn-primary w-full">Submit</button>
    </form>
  );
}

export default DepositGoalForm;
