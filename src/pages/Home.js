import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import PackageInfo from "../components/PackageInfo";

function Home() {
  const [repos, setRepos] = useState([]);
  const [finished, setFinished] = useState(false);
  const githubLink = useRef();
  const branch = useRef();

  let arr = [];

  async function handleSubmit() {
    setRepos([]);
    setFinished(false);
    let username, repo;
    username = githubLink.current.value.split("/")[3];
    repo = githubLink.current.value.split("/")[4];

    const url = `https://raw.githubusercontent.com/${username}/${repo}/${branch.current.value}/package.json`;
    const resp = await fetch(url);
    if (resp.status !== 200) {
      alert("Please insert github repo link in right format");
      return;
    }
    localStorage.setItem("githubLink", githubLink.current.value);
    localStorage.setItem("branch", branch.current.value);

    const body = await resp.json();
    //const dependencies_array = Object.keys(body.dependencies)
    //setDependencies(dependencies_array);
    Object.keys(body.dependencies).map(async (item) => {
      if (item.includes("@")) {
        let p = item.split("/")[0].slice(1);
        const url = "https://api.npms.io/v2/package/" + p;
        const resp = await fetch(url);
        const body = await resp.json();
        if (!arr.includes(body.collected.metadata.name)) {
          arr.push(body.collected.metadata.name);
          setRepos((current) => [...current, body]);
        }
      } else if (!item.includes("@")) {
        const url = "https://api.npms.io/v2/package/" + item;
        const resp = await fetch(url);
        const body = await resp.json();
        if (!arr.includes(body.collected.metadata.name)) {
          arr.push(body.collected.metadata.name);
          setRepos((current) => [...current, body]);
        }
      }
    });

    setFinished(true);
  }

  const finishLine = async () => {
    await handleSubmit();
    const res = await Promise.all(repos);
    console.log(res);
  };

  useEffect(() => {
    if (
      localStorage.getItem("githubLink") !== null &&
      localStorage.getItem("branch") !== null
    ) {
      githubLink.current.value = localStorage.getItem("githubLink");
      branch.current.value = localStorage.getItem("branch");
      finishLine();
      return;
    }
  }, []);

  return (
    <>
      <div className="p-20 flex flex-col justify-start items-start gap-12 bg-slate-50">
        <h1 className="text-5xl text-neutral-900 ">Eye of Packages 👁</h1>
        <p className="text-lg text-neutral-800">
          Are you aware of what npm packages you have installed? What do they
          do? When they were updated? Their issues and dependencies?
          <br />
          Eye of Packages is a All-Seeing Eye for your npm packages. It is aimed
          at helping you identify potentially harmful and/or outdated packages
        </p>
        <p className="text-neutral-700">
          The project is developed by{" "}
          <a
            href="https://github.com/azyzz228"
            target={"_blank"}
            className="text-blue-700 hover:text-blue-900"
          >
            Aziz Abdullaev
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/Chukwuemeka-Mba"
            target={"_blank"}
            className="text-blue-700 hover:text-blue-900"
          >
            Chukwuemeka Mba
          </a>{" "}
          for MLH Fellowship Orientation Hackathon, Fall 2022. Github link is{" "}
          <a
            href="https://github.com/azyzz228/node-packagers-checker"
            target={"_blank"}
            className="text-orange-700 hover:text-orange-900"
          >
            here
          </a>
        </p>

        <div className=" container mx-auto flex flex-col  items-center mt-8">
          <p className="mb-4 text-sm text-neutral-800">
            Insert a link to your Github repo with package.json file as well as
            branch name.
          </p>
          <div className="flex flex-col sm:flex-col lg:flex-row gap-8">
            <div className="flex flex-col flex-start gap-5">
              <label for="githubLink">Enter repo name</label>
              <input
                type="text"
                ref={githubLink}
                className="outline-none border border-blue-200 shadow-md p-2 rounded-lg w-[300px] lg:w-[450px]"
                name="githubLink"
                id=""
                placeholder="https://github.com/azyzz228/hsl-color-picker"
              />
            </div>
            <div className="flex flex-col flex-start gap-5">
              <label for="branch">Enter branch name</label>
              <input
                type="text"
                ref={branch}
                className="outline-none border border-blue-200 shadow-md p-2 rounded-lg w-[100%]"
                name="branch"
                id=""
                placeholder="master"
              />
            </div>

            <button
              className="p-4 text-blue-100 bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-900"
              onClick={() => finishLine()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="px-10 pb-20 pt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-12 container mx-auto">
        {finished ? (
          repos.map((item, index) => (
            <PackageInfo item={item} key={index} />
            // <h1 key={index}>{JSON.stringify(item)}</h1>
          ))
        ) : (
          <p>Packages you have used will appear here.</p>
        )}
      </div>
    </>
  );
}

export default Home;
