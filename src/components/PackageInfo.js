import React from 'react'

function PackageInfo(name, description, issuesLink, dependencies, github) {
    return (
        <div class="max-w-lg rounded-t-lg rounded-b-md border border-t-4 border-slate-100 border-t-blue-400 px-8 py-4 shadow-lg">
            <div class="flex flex-row items-center justify-between border-b pb-4">
                <a href={`${github}`}></a>
                <h1 class="text-2xl font-semibold text-slate-700">{name}</h1>
                <div class="flex flex-col items-end">
                    <p class="text-sm text-slate-600">Last updated</p>
                    <p class="text-lg font-bold text-slate-800">10 days ago</p>
                </div>
            </div>

            <p class="border-b border-slate-100 py-4 text-slate-700">{description}</p>
            <div class="flex flex-row items-center justify-between py-4">
                <a href={`${issuesLink}`}>    <p class="text-red-900">Issues</p>
                </a>
                <p class="text-xl font-bold text-red-700">78</p>
            </div>

            <p class="pb-3 text-slate-700">Dependencies:</p>
            <div class="grid grid-cols-4 place-items-start items-center gap-8">
                {
                    dependencies.map((item) => (
                        <p class="col-span-1 rounded-full bg-slate-50 py-1 px-4 font-semibold text-slate-700">item</p>
                    ))
                }

            </div>
        </div>

    )
}

export default PackageInfo