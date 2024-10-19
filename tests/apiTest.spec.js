const { test, expect } = require("@playwright/test");
const { Ajv } = require("ajv");

const ajv = new Ajv();

test('GET Request', async ({request}) => {
    const response = await request.get("https://reqres.in/api/users/2");
    const responseJson = await response.json();

    const valid = ajv.validate(require("./json-schema/get-object.schema.json"), responseJson);

    if (!valid) {
    console.error("AJV Validation Errors:", ajv.errorsText());
    }

    expect(valid).toBe(true);
})

test('POST Request', async ({request}) => {

    const reqHeaders = {
        Accept: 'application/json'
    }

    const body = {  
    "name": "morpheus",
    "job": "leader"
    }

    const response = await request.post("https://reqres.in/api/users", {
        headers: reqHeaders, 
        data: body,
    })

    expect(response.status()).toEqual(201)
    expect(response.ok()).toBeTruthy()

    const resBody = await response.json ()
    expect(resBody.name).toEqual('morpheus')

    const valid = ajv.validate(require("./json-schema/add-object.schema.json"), resBody);

    if (!valid) {
    console.error("AJV Validation Errors:", ajv.errorsText());
    }

    expect(valid).toBe(true);
})

test('DEL Request', async ({request}) => {
    const response = await request.get("https://reqres.in/api/users/2");
    const responseJson = await response.json();

    const valid = ajv.validate(require("./json-schema/del-object.schema.json"), responseJson);

    if (!valid) {
    console.error("AJV Validation Errors:", ajv.errorsText());
    }

    expect(valid).toBe(true);
})

test('PUT Request', async ({request}) => {

    const reqHeaders = {
        Accept: 'application/json'
    }

    const body = {  
    "name": "keiza",
    "job": "leader"
    }

    const response = await request.post("https://reqres.in/api/users", {
        headers: reqHeaders, 
        data: body,
    })

    expect(response.status()).toEqual(201)
    expect(response.ok()).toBeTruthy()

    const resBody = await response.json ()
    expect(resBody.name).toEqual('keiza')

    const valid = ajv.validate(require("./json-schema/put-object.schema.json"), resBody);

    if (!valid) {
    console.error("AJV Validation Errors:", ajv.errorsText());
    }

    expect(valid).toBe(true);
})