const categoryTypes = [
  {
    label: "Income",
    value: 3,
  },

  {
    label: "Expense",
    value: 7,
  },
  
];
function CreateUserCategoryForm() {
  return (
    <form action="" className="p-2 md:p-5 space-y-4">
      <fieldset className="fieldset ">
        <legend className="fieldset-legend">Category name?</legend>
        <input type="text" className="input input-lg w-full" placeholder="Type here" />
      </fieldset>
      
 
      <fieldset className="fieldset ">
        <legend className="fieldset-legend">Type</legend>
        <select defaultValue="Pick a color" className="select select-lg w-full">
          <option disabled={true}>Pick a type</option>
          {categoryTypes.map((_) => (
            <option>{_.label}</option>
          ))}
        </select>
      </fieldset>

        <fieldset>
           <legend className="fieldset-legend">Description</legend>
            <textarea
              name="Description"
              className="textarea textarea-bordered w-full min-h-40"
              placeholder="notes about this category..."
            ></textarea>
          </fieldset>
      <button className="btn btn-primary w-full">Create</button>
    </form>
  );
}

export default CreateUserCategoryForm;
