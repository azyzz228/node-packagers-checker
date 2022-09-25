import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import convert_date from "../helpers/convert_date";
import package_info_object from "../helpers/package_info_object";
import PackageInfo from "./PackageInfo";


function PackageDependencies() {
  const { slug } = useParams();
  const [packages, setPackages] = useState(null);

  const encode = async (obj) => {
    console.log(obj);

    let metadata, github
    metadata = obj.collected.metadata
    github = obj.collected.github;
    let starsCount_c = "", forksCount_c = "", subscribersCount_c = "";
    const name_c = obj.collected.metadata.name === undefined ? "undefined" : obj.collected.metadata.name;
    const description_c = obj.collected.metadata.description === undefined ? "undefined" : obj.collected.metadata.description;
    const dependencies_c = obj.collected.metadata.dependencies === undefined ? [] : Object.keys(obj.collected.metadata.dependencies);
    const date_c = obj.collected.metadata.date === undefined ? "undefined" : convert_date(obj.collected.metadata.date);

    if (obj.collected.github === undefined) {
      starsCount_c = "undefined";
      forksCount_c = "undefined";
      subscribersCount_c = "undefined";
    } else {
      starsCount_c = obj.collected.github.starsCount === undefined ? "undefined" : obj.collected.github.starsCount;
      forksCount_c = obj.collected.github.forksCount === undefined ? "undefined" : obj.collected.github.forksCount;
      subscribersCount_c = obj.collected.github.subscribersCount === undefined ? "undefined" : obj.collected.github.subscribersCount;
    }

    const repository_c = obj.collected.metadata.links.repository === undefined ? "undefined" : obj.collected.metadata.links.repository;
    const bugs_c = obj.collected.metadata.links.bugs === undefined ? "undefined" : obj.collected.metadata.links.bugs;


    let data = package_info_object(
      name_c, description_c, dependencies_c, repository_c, bugs_c, date_c, starsCount_c, forksCount_c, subscribersCount_c
    )
    console.log(data);
    return data;
    //   setPackages(
    // )

  }


  useEffect(() => {

    const fetch_details = async () => {
      const url = `https://api.npms.io/v2/package/${slug}`
      const resp = await fetch(url);
      const body = await resp.json();
      return body
    }
    fetch_details().then(async res => {
      const results = await encode(res);
      console.error(results);
      setPackages(results);
      console.warn(packages);
    })

  }, [])


  return (
    <div>
      <div className="p-20 flex flex-col justify-start items-start gap-12 bg-slate-50">
        <h1 className="text-5xl text-neutral-900 ">{slug}</h1>
      </div>

      <div className="flex flex-row px-10 py-20 justify-center items-center container mx-auto">
        {packages === null ? (
          <p>Loading...</p>
        ) : (
          <>

            <div

              className="max-w-2xl rounded-t-lg rounded-b-md border border-t-4 border-slate-100 border-t-blue-400 px-8 py-4 shadow-lg"
            >
              <div className="flex flex-row items-center justify-between border-b pb-4">

                {
                  packages.github === "undefined" ? (

                    <h1 className="text-2xl font-semibold text-slate-700">
                      {packages.name}
                    </h1>

                  ) : (
                    <a href={packages.github} target={"_blank"}>
                      <h1 className="text-2xl font-semibold text-slate-700 hover:underline">
                        {packages.name}
                      </h1>
                    </a>
                  )
                }



                <div className="flex flex-col items-end">
                  <p className="text-sm text-slate-600">Last updated</p>
                  <p className="text-lg font-bold text-slate-800">{packages.date}</p>
                </div>
              </div>

              <p className="border-b border-slate-100 py-4 text-slate-700">
                {packages.description}
              </p>
              <p className="text-slate-600 py-4 flex justify-center">
                Github Stats
              </p>
              <div class="flex flex-row items-center justify-between py-4 text-xs text-slate-700" >
                <p className="flex flex-row items-center gap-1"><i className="fa-solid fa-star text-base text-[#9c7140]"></i><span className="text-yellow-900 text-lg font-semibold">{packages.starsCount}</span></p>

                <p className="flex flex-row items-center gap-1"><i className="fa-solid fa-code-commit text-base text-[#9c7140]"></i><span className="text-yellow-900 text-lg font-semibold">{packages.forksCount}</span></p>

                <p className="flex flex-row items-center gap-1"><i className="fa-solid fa-user-group text-base text-[#9c7140]"></i><span className="text-yellow-900 text-lg font-semibold">{packages.subscribersCount}</span></p>
              </div>

              {
                packages.issues === "undefined" ? (
                  <div class="flex flex-row items-center justify-start gap-2 hover:gap-3 py-4">
                    <p class="text-slate-700 ">Welp... Can't seems to find its github page</p>
                  </div>
                ) : (
                  <a href={`${packages.issues}`} target="_blank" className="cursor-pointer">
                    <div class="flex flex-row items-center justify-start gap-2 hover:gap-3 py-4">
                      <p class="text-red-900 font-semibold">See all issues</p>
                      <i class="fa-solid fa-arrow-right text-base text-[#632c2c]"></i>
                    </div>
                  </a>
                )
              }



              <p className=" mt-4 pb-3 text-slate-700">Dependencies:</p>
              <div className="grid grid-cols-3 place-items-start items-center overflow-auto gap-4">
                {packages.dependencies.length === 0 ? (<p>No dependencies found</p>) :
                  (
                    packages.dependencies.map((i, k) => {
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

                    })
                  )
                }

              </div>
            </div>

          </>
        )}
      </div>

    </div>
  );
}

export default PackageDependencies;
