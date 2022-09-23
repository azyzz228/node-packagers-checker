import axios from "axios";
import { useState } from "react";

function Home() {
  const [packages, setPackages] = useState([]);
  let arr = [];
  function package_info(name, description, dependencies, github, issues) {
    return {
      name,
      description,
      dependencies,
      github,
      issues,
    };
  }
  console.log(packages);
  const handleSubmit = async () => {
    const res = await axios.get(
      "https://raw.githubusercontent.com/azyzz228/hsl-color-picker/master/package.json"
    );
    if (res.status !== 200) {
      alert("You provided broken link");
    }

    console.log(Object.keys(res.data.dependencies));

    let npm_link = await axios.get(
      "https://api.npms.io/v2/package/tailwindcss"
    );

    let metadata = npm_link.data.collected.metadata;

    arr.push(
      package_info(
        metadata.name,
        metadata.description,
        Object.keys(metadata.dependencies),
        metadata.links.repository,
        metadata.links.bugs
      )
    );
    setPackages(arr);
    console.log(arr);

    //const $ = cheerio.load('<h2 class="title">Hello world</h2>');
  };
  return (
    <div>
      <div className="p-20 flex flex-col justify-start items-start gap-12 bg-slate-50">
        <h1 className="text-5xl font-bold text-neutral-900 uppercase">
          node packages checker
        </h1>
        <p className="text-gray-500 ">
          {" "}
          Click{" "}
          <span className="text-blue-500 font-medium uppercase">load </span>to
          load packages
        </p>
        <button
          className="p-4 text-blue-100 bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-900"
          onClick={() => handleSubmit()}
        >
          Load
        </button>
      </div>

      <div className="flex flex-row px-10 py-20 justify-start items-center container mx-auto">
        {packages.length === 0 ? (
          <p>Its empty</p>
        ) : (
          packages.map((item, index) => (
            <div
              key={index}
              class="max-w-md rounded-t-lg rounded-b-md border border-t-4 border-slate-100 border-t-blue-400 px-8 py-4 shadow-lg"
            >
              <div class="flex flex-row items-center justify-between border-b pb-4">
                <a href={`/package-dependencies/${item.name}`}>
                  <h1 class="text-2xl font-semibold text-slate-700 hover:underline">
                    {item.name}
                  </h1>
                </a>
                <div class="flex flex-col items-end">
                  <p class="text-sm text-slate-600">Last updated</p>
                  <p class="text-lg font-bold text-slate-800">10 days ago</p>
                </div>
              </div>

              <p class="border-b border-slate-100 py-4 text-slate-700">
                {item.description}
              </p>
              <div class="flex flex-row items-center justify-between py-4">
                <a href={`${item.issuesLink}`}>
                  {" "}
                  <p class="text-red-900">Issues</p>
                </a>
                <p class="text-xl font-bold text-red-700">78</p>
              </div>

              <p class="pb-3 text-slate-700">Dependencies:</p>
              <div class="grid grid-cols-3 place-items-start items-center gap-4">
                {item.dependencies.map((i, k) => (
                  <p
                    key={k}
                    class="col-span-1 rounded-full bg-slate-50 py-1 px-4 font-semibold text-slate-700"
                  >
                    {i}
                  </p>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
