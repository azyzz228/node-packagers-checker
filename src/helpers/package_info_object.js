function package_info_object(name, description, dependencies, github, issues, date, starsCount, forksCount, subscribersCount) {
    return {
        name,
        description,
        dependencies,
        github,
        issues,
        date,
        starsCount,
        forksCount,
        subscribersCount
    };
}

export default package_info_object;