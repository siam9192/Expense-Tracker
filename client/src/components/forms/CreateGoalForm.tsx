const deadlineOptions = [
  {
    label: "3 Days",
    value: 3,
  },

  {
    label: "7 Days",
    value: 7,
  },
  {
    label: "15 Days",
    value: 15,
  },
  {
    label: "1 Month",
    value: 30,
  },
  {
    label: "3 Month",
    value: 30 * 3,
  },
  {
    label: "6 Month",
    value: 30 * 6,
  },
  {
    label: "12 Month",
    value: 30 * 12,
  },
];
function CreateGoalForm() {
  return (
    <form action="" className="p-2 md:p-5 space-y-4">
      <fieldset className="fieldset ">
        <legend className="fieldset-legend">Enter your plan?</legend>
        <input type="text" className="input input-lg w-full" placeholder="Type here" />
      </fieldset>
      <fieldset className="fieldset ">
        <legend className="fieldset-legend">Target Amount</legend>
        <input type="text" className="input input-lg w-full" placeholder="Type here" />
      </fieldset>
      <fieldset className="fieldset ">
        <legend className="fieldset-legend">Current Amount</legend>
        <input
          type="text"
          defaultValue={0}
          className="input input-lg w-full"
          placeholder="Type here"
        />
      </fieldset>
      <fieldset className="fieldset ">
        <legend className="fieldset-legend">Deadline</legend>
        <select defaultValue="Pick a color" className="select select-lg w-full">
          <option disabled={true}>Pick a deadline</option>
          {deadlineOptions.map((_) => (
            <option>{_.label}</option>
          ))}
        </select>
      </fieldset>
      <button className="btn btn-primary w-full">Proceed</button>
    </form>
  );
}

export default CreateGoalForm;
