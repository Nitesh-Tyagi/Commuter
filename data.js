let users,tags,calendar,BACKEND;

// Async function to read BASE URL from config file
// return none
export async function readConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const config = await response.json();
        BACKEND = config.BACKEND;
    } catch (error) {
        console.error('Error loading config', error);
    }
}

// F to return sum of tag1,tag2,tag3 of calendar [0,31]
export function getCalendarTotal(n) {
    let ans =  Number(calendar[n].tag1_price)+Number(calendar[n].tag2_price)+Number(calendar[n].tag3_price);
    if (isNaN(ans)) ans = 0;
    return ans;
}

// F to return as array, sum of all filled calendar tag price [0,1,2]
export async function getCalendarTag() {
    for(let i=0;i<3;i++){
        tags[i+1].count = 0;
        tags[i+1].total = 0;
    } 
    for(let i=0;i<calendar.length;i++){
        for(let j=1;j<=3;j++){
            if(calendar[i].tag1 == j){
                tags[j].count ++;
                tags[j].total += calendar[i].tag1_price;
            }
            if(calendar[i].tag2 == j){
                tags[j].count ++;
                tags[j].total += calendar[i].tag2_price;
            }
            if(calendar[i].tag3 == j){
                tags[j].count ++;
                tags[j].total += calendar[i].tag3_price;
            }
        }
    }

    const response = await callApi('PUT', `${BACKEND}/api/putTags`, tags);

    return tags;
}

export async function putTags(n) {
    tags = n;
    const response = await callApi('PUT', `${BACKEND}/api/putTags`, tags);
    return response;
}

export function getDate(n) {
    return calendar[n];
}
export async function putDate(date) {
    try {
        const response = await callApi('PUT', `${BACKEND}/api/putDate`, date);
        calendar[date.date]=date;
        return response;
    } catch (error) {
        // console.error('Error in putDate:', error);
        throw error;
    }
}

// F to return data from user/data.js
export function getUser () {
    return users[0];
}

export async function putUser(userData) {
    if (isNaN(userData.total)) {
        userData.total = 0;
    }
    try {
        const response = await callApi('PUT', `${BACKEND}/api/putUser`, userData);
        users[0] = userData;
        return response;
    } catch (error) {
        // console.error('Error in putUser:', error);
        throw error;
    }
}

// F to return data from tags/data.js
export function getTags () {
    return tags;
}

async function callApi(mode, url, requestData) {
    try {
        const response = await fetch(url, {
            method: mode,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        // console.error('Error calling API:', error);
    }
}

const requests = [
    { "table": "users" },
    { "table": "tags" },
    { "table": "calendar" }
];

// async F to getAll data from tables : users, tags, calendar
// store into variables : users, tags, calendar
// return none
export async function getAll() {
    try {
        const promises = requests.map(requestData => 
            callApi('POST', `${BACKEND}/api/getAll`, requestData)
        );
        const responses = await Promise.all(promises);
        responses.forEach((data, index) => {
            const requestData = requests[index];
            if (requestData.table === 'users') {
                users = data;
                // console.log("USERS : ",users);
            }
            if (requestData.table === 'tags') {
                tags = data;
                // console.log("TAGS : ",tags);
            }
            if (requestData.table === 'calendar') {
                calendar = data;
                // console.log("CALENDAR : ",calendar);
            }
        });
    } catch (error) {
        console.error('Error calling getAll APIs');
    }
}

