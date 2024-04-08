import { FormEvent } from "react";
import "./App.css";

function App() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="border-black w-2/5 border-[1px] rounded-md p-8 flex flex-col gap-4"
      >
        <div>
          <label className="block" htmlFor="fname">
            Enter First Name
          </label>
          <input
            name="fname"
            id="fname"
            placeholder="Jim"
            className="border-black border-[1px] w-full rounded-md p-2"
          />
        </div>

        <div>
          <label className="block" htmlFor="lname">
            Enter Last Name
          </label>
          <input
            name="lname"
            id="lname"
            placeholder="Smith"
            className="border-black border-[1px] w-full rounded-md p-2"
          />
        </div>

        <div>
          <label className="block" htmlFor="image">
            Choose an image
          </label>
          <input
            name="image"
            id="image"
            type="file"
            placeholder="Select Image"
            className="border-black border-[1px] w-full rounded-md p-2"
          />
        </div>

        <button className="bg-black text-white rounded-md w-full py-2 my-6">
          Submit
        </button>
      </form>
    </main>
  );
}

export default App;
