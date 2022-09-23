import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import convert_date from "../helpers/convert_date";
import package_info_object from "../helpers/package_info_object";


function PackageDependencies() {
  const { slug } = useParams();
  const [packages, setPackages] = useState(null);
  let metadata;

  const loading_handler = async () => {
    let npm_link = await axios.get(
      `https://api.npms.io/v2/package/${slug}`
    );
    if (npm_link.status !== 200) {
      alert("You provided broken link");
    }

    return npm_link.data;
    // metadata = npm_link.data.collected.metadata;
    // console.log(metadata);
  }

  useEffect(() => {

    fetch(`https://api.npms.io/v2/package/${slug}`).then(function (response) {
      return response.json();
    }).then((res) => {
      metadata = res.collected.metadata
      console.log(metadata);
      if (metadata.dependencies === undefined) {
        setPackages(
          package_info_object(
            metadata.name,
            metadata.description,
            [],
            metadata.links.repository,
            metadata.links.bugs,
            convert_date(metadata.date)
          ))
      }
      else {
        setPackages(
          package_info_object(
            metadata.name,
            metadata.description,
            Object.keys(metadata.dependencies),
            metadata.links.repository,
            metadata.links.bugs,
            convert_date(metadata.date)
          ))
      }


    })

    // loading_handler().then((res) => {
    //   metadata = res.metadata;
    //   setPackages(
    //     package_info_object(
    //       metadata.collected.metadata.name,
    //       metadata.collected.metadata.description,
    //       Object.keys(metadata.collected.metadata.dependencies),
    //       metadata.collected.metadata.links.repository,
    //       metadata.collected.metadata.links.bugs,
    //       convert_date(metadata.collected.metadata.date)
    //     ))
    // }
    // )


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

          <div

            className="max-w-2xl rounded-t-lg rounded-b-md border border-t-4 border-slate-100 border-t-blue-400 px-8 py-4 shadow-lg"
          >
            <div className="flex flex-row items-center justify-between border-b pb-4">

              <h1 className="text-2xl font-semibold text-slate-700 hover:underline">
                {packages.name}
              </h1>

              <div className="flex flex-col items-end">
                <p className="text-sm text-slate-600">Last updated</p>
                <p className="text-lg font-bold text-slate-800">{packages.date}</p>
              </div>
            </div>

            <p className="border-b border-slate-100 py-4 text-slate-700">
              {packages.description}
            </p>
            <div className="flex flex-row items-center justify-between py-4">
              <a href={`${packages.issuesLink}`}>
                {" "}
                <p className="text-red-900">Issues</p>
              </a>
              <p className="text-xl font-bold text-red-700">78</p>
            </div>

            <p className="pb-3 text-slate-700">Dependencies:</p>
            <div className="grid grid-cols-3 place-items-start items-center gap-4">
              {packages.dependencies.length == 0 ? (<p>No dependencies :smile:</p>) :
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

        )}
      </div>

    </div>
  );
}

export default PackageDependencies;
