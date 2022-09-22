import React from "react";
import { useParams } from "react-router";
function PackageDependencies() {
  const { slug } = useParams();
  console.log(slug);

  return (
    <div>
      <section>
        <div className=" flex flex-col items-center px-5 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col w-full max-w-3xl mx-auto prose text-left prose-blue">
            <div className="w-full mx-auto">
              <h2 className="text-blue-500 text-3xl capitalize bg-gray-700 py-3 px-5 rounded border-3 m-3 text-center">
                {slug} dependencies
              </h2>
              <p>
                Right. Say that again. No, no, George, look, it's just an act,
                right? Okay, so 9:00 you're strolling through the parking lot,
                you see us struggling in the car, you walk up, you open the door
                and you say, your line, George. Stop it. We're gonna take a
                little break but we'll be back in a while so, don't nobody go no
                where.
              </p>
              <div className="flex flex-wrap justify-start flex-grow mt-8 text-left md:mt-0">
                <div className="w-full space-y-4 md:w-1/2">
                  <p>Product</p>
                  <nav className="mb-10 list-none">
                    <li>
                      <a href="#">Email Templates</a>
                    </li>
                    <li>
                      <a href=" #">Web Templates</a>
                    </li>
                    <li>
                      <a href="#">Figma Files</a>
                    </li>
                    <li>
                      <a href=" #">Sketch Files</a>
                    </li>
                  </nav>
                </div>
                <div className="w-full space-y-4 md:w-1/2">
                  <p>Company</p>
                  <nav className="mb-10 list-none">
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href=" #">About</a>
                    </li>
                    <li>
                      <a href="#">Carriers</a>
                    </li>
                    <li>
                      <a href=" #">Pricing</a>
                    </li>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PackageDependencies;
