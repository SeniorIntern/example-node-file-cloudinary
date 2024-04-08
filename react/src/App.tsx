import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import "./App.css";
import axios from "axios";

function App() {
  const schema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    file: z.any(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    axios.post("http://localhost:3000/foo", data);
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="border-black w-2/5 border-[1px] rounded-md p-8 flex flex-col gap-4"
      >
        <div>
          <label className="block" htmlFor="fname">
            Enter First Name
          </label>
          <input
            {...register("firstName")}
            id="fname"
            placeholder="Jimmy"
            className="border-black border-[1px] w-full rounded-md p-2"
          />
          <span className="text-red-400">
            {errors.firstName && errors.firstName.message}
          </span>
        </div>

        <div>
          <label className="block" htmlFor="lname">
            Enter Last Name
          </label>
          <input
            {...register("lastName")}
            id="lname"
            placeholder="Smith"
            className="border-black border-[1px] w-full rounded-md p-2"
          />
          <span className="text-red-400">
            {errors.lastName && errors.lastName.message}
          </span>
        </div>

        <div>
          <label className="block" htmlFor="image">
            Choose an image
          </label>
          <input
            {...register("file")}
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
