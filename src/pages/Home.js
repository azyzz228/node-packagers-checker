import axios from "axios";
import { useRef, useState } from "react";
import convert_date from "../helpers/convert_date";
import package_info_object from "../helpers/package_info_object";

function Home() {
  const [packages, setPackages] = useState([]);
  const githubLink = useRef()
  const branch = useRef()
  let arr = [];
  let p_arr = [];
  let github, metadata;

  async function jsonData(url) { // (1)
    let res = await fetch(url); // (2)

    if (res.status == 200) {
      let json = await res.json(); // (3)
      return json;
    }

    throw new Error(res.status);
  }

  async function dependencies(item) {
    if (item.includes("@")) {
      let p = item.split("/")[0].slice(1)
      if (!p_arr.includes(p)) {
        return await jsonData(`https://api.npms.io/v2/package/${p}`);
      }
    } else if (!item.includes("@")) {
      return await jsonData(`https://api.npms.io/v2/package/${item}`);
    }
  }

  const handleSubmit = async () => {
    let username, repo;
    username = githubLink.current.value.split("/")[3];
    repo = githubLink.current.value.split("/")[4];

    fetch(`https://raw.githubusercontent.com/${username}/${repo}/${branch.current.value}/package.json`)
      .then(function (response) {

        return response.json()
      }
      ).then(res => {
        let array_dependencies = Object.keys(res.dependencies);

        Promise.all(array_dependencies.map(dependencies)
        ).then(data => {

          setPackages(data)
          console.log(data);

        });


      })

  }

  return (
    <div>
      <div className="p-20 flex flex-col justify-start items-start gap-12 bg-slate-50">

        <h1 className="text-5xl text-neutral-900 ">Hello</h1>
        <div className="flex flex-row gap-8">
          <input type="text" ref={githubLink} className="outline-none border border-blue-200 shadow-md p-2 rounded-lg w-[450px]" name="githubLink" id="" placeholder="https://github.com/azyzz228/hsl-color-picker" />

          <input type="text" ref={branch} className="outline-none border border-blue-200 shadow-md p-2 rounded-lg w-24" name="branch" id="" placeholder="master" />

          <button
            className="p-4 text-blue-100 bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-900"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        </div>

      </div>

      <h1 className="px-20 text-3xl text-neutral-900 mt-10">List of your packages:</h1>
      <div className=" px-10 pb-20 pt-10 grid grid-cols-3 gap-12 container mx-auto">

        {packages.length === 0 ? (
          <p>Its empty</p>
        ) : (
          packages.map((item, index) => (
            <div
              key={index}
              class="max-w-3xl rounded-t-lg rounded-b-md border border-t-4 border-slate-100 border-t-blue-400 px-8 py-4 shadow-lg"
            >
              <div class="flex flex-row items-center justify-between border-b pb-4">
                <a href={`/package-dependencies/${item.name}`}>
                  <h1 class="text-2xl font-semibold text-slate-700 hover:underline">
                    {item.name}
                  </h1>
                </a>
                <div class="flex flex-col items-end">
                  <p class="text-sm text-slate-600">Last updated</p>
                  <p class="text-lg font-bold text-slate-800">{item.date}</p>
                </div>
              </div>

              <p class="border-b border-slate-100 py-4 text-slate-700">
                {item.description}
              </p>
              <p className="text-slate-600 py-4 flex justify-center">
                Github Stats
              </p>
              <div class="flex flex-row items-center justify-between py-4 text-xs text-slate-700" >
                <p className="flex flex-row items-center gap-1"><i className="fa-solid fa-star text-base text-[#9c7140]"></i><span className="text-yellow-900 text-lg font-semibold">{item.starsCount}</span></p>

                <p className="flex flex-row items-center gap-1"><i className="fa-solid fa-code-commit text-base text-[#9c7140]"></i><span className="text-yellow-900 text-lg font-semibold">{item.forksCount}</span></p>

                <p className="flex flex-row items-center gap-1"><i className="fa-solid fa-user-group text-base text-[#9c7140]"></i><span className="text-yellow-900 text-lg font-semibold">{item.subscribersCount}</span></p>
              </div>

              <div class="flex flex-row items-center justify-between py-4">
                <a href={`${item.issues}`} target="_blank">

                  <p class="text-red-900">Issues</p>
                </a>
                <p class="text-xl font-bold text-red-700">78</p>
              </div>

              <p class="pb-3 text-slate-700">Dependencies:</p>
              <div class="grid grid-cols-2 place-items-start items-center gap-4">
                {item.dependencies.map((i, k) => {

                  if (i.includes('@')) {

                    return (
                      <a href={`/package-dependencies/${i.split("/")[0].slice(1)}`} key={k}>
                        <p

                          class="col-span-1 rounded-full bg-slate-50 py-1 px-4 font-semibold text-slate-700"
                        >
                          {i}
                        </p>
                      </a>
                    )
                  }
                  else {
                    return (
                      <a href={`/package-dependencies/${i}`} key={k}>
                        <p

                          class="col-span-1 rounded-full bg-slate-50 py-1 px-4 font-semibold text-slate-700"
                        >
                          {i}
                        </p>
                      </a>
                    )
                  }


                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div >
  );
}
export default Home;
