const createUserQuery = (uuid, body) => {
    try {
    const query = `
        CREATE (u: Student:User 
            {
                uuid: "${uuid}", 
                totalExp: 0, 
                weeklyExp: 0, 
                email: "${body.email}", 
                userName: "${body.userName}", 
                password: "${body.password}"
            }
        );
    `;
    return query;
    } catch (err) {
        console.log(err, "over here");
    }
};

const deleteUserQuery = (params) => `
    MATCH (u: User {uuid: "${params.uuid}"})
    SET u:softDeleted;
`;

const findRegisteredUser = (body) => `MATCH (u: Student {email: "${body.email}"}) RETURN u;`;

const findUserQuery = (params) => `
    MATCH (u: User {uuid: "${params.uuid}"}) 
    WHERE NOT u:softDeleted 
    RETURN u;
`;

const updateUserQuery = (body) => {
    const query = `
        MATCH (u: Student {uuid: "${body.uuid}"})
        WHERE NOT u:softDeleted
        SET u.totalExp = "${body.totalExp}", 
            u.weeklyExp = "${body.weeklyExp}", 
            u.userName = "${body.userName}", 
            u.email = "${body.email}", 
            u.password = "${body.password}"
        RETURN u;
    `;

    return query;
};


module.exports = {
    createUserQuery,
    deleteUserQuery,
    findRegisteredUser,
    findUserQuery,
    updateUserQuery
};