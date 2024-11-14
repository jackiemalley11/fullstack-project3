import { MongoClient, Collection, InsertOneResult, ObjectId, UpdateResult, DeleteResult } from "mongodb";
import { NextRequest, NextResponse } from 'next/server';
import sanitizeHtml from 'sanitize-html';
import { Technology, Course } from "@/tools/data.model";

// MongoDB constants
const MONGO_URL:string = "mongodb://mongo:27017/";
const MONGO_DB_NAME:string = "dbTechs";	
const MONGO_COLLECTION_TECHS:string = "technologies";

export async function getTechnologies() {
    // construct a MongoClient object
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    let techArray:Technology[];
    try {
        await mongoClient.connect();
        // get JSON data from mongoDB server (ASYNC task)
        techArray = await mongoClient.db(MONGO_DB_NAME).collection<Technology>(MONGO_COLLECTION_TECHS).find().toArray();
        // need to convert ObjectId objects to strings
        techArray.forEach((tech:Technology) => tech._id = tech._id.toString());
    } catch (error:any) {
        console.log(`>>> ERROR : ${error.message}`);
        throw error;
    } finally {
        mongoClient.close();
    }

    return techArray;
}

export async function createTechnology(request: NextRequest) {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);
    try {
        await mongoClient.connect(); 

        // fetch the body from the request (async task)
        const body:any = await request.json();

        // sanitizing input
        body.name = sanitizeHtml(body.name);
        body.description = sanitizeHtml(body.description);
        body.difficulty = sanitizeHtml(body.difficulty);
        body.courses.forEach((course:Course) => {
            course.code = sanitizeHtml(course.code);
            course.name = sanitizeHtml(course.name);
        });

        // insert new document into DB
        let result:InsertOneResult = await mongoClient.db(MONGO_DB_NAME).collection(MONGO_COLLECTION_TECHS).insertOne(body);

        // returning response and setting status code to 200
        return NextResponse.json(result, {status: 200});

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    } finally {
        mongoClient.close();
    }
}

export async function updateTechnology(request: NextRequest, id:string) {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);
    try {
        await mongoClient.connect(); 

        // sanitize id and convert to ObjectId
        let techID:ObjectId = new ObjectId(sanitizeHtml(id));

        // fetch the body from the request (async task)
        const body:any = await request.json();
        // sanitizing input
        body.name = sanitizeHtml(body.name);
        body.description = sanitizeHtml(body.description);
        body.difficulty = sanitizeHtml(body.difficulty);
        body.courses.forEach((course:Course) => {
            course.code = sanitizeHtml(course.code);
            course.name = sanitizeHtml(course.name);
        });

        // update document
        let techCollection:Collection = mongoClient.db(MONGO_DB_NAME).collection(MONGO_COLLECTION_TECHS);
        let selector:Object = { "_id": techID };
        let newValues:Object = { $set: body };
        let result:UpdateResult = await techCollection.updateOne(selector, newValues);

        // check if edited correctly
        if (result.matchedCount <= 0) {
            return NextResponse.json({error: "No technology documents found with ID"}, {status: 404});
        } else {
            // status code for deleted
            return NextResponse.json(result, {status: 200});
        }		
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    } finally {
        mongoClient.close();
    }
}

export async function deleteTechnology(request: NextRequest, id:string) {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);
    try {
        await mongoClient.connect(); 

        // sanitize id and convert to ObjectId
        let techID:ObjectId = new ObjectId(sanitizeHtml(id));

        // delete document
        let techCollection:Collection = mongoClient.db(MONGO_DB_NAME).collection(MONGO_COLLECTION_TECHS);
        let selector:Object = { "_id": techID };
        let result:DeleteResult = await techCollection.deleteOne(selector); 

        // check if deleted correctly
        if (result.deletedCount <= 0) {
            return NextResponse.json({error: "No technology documents found with ID"}, {status: 404});
        } else {
            // status code for deleted
            return NextResponse.json(result, {status: 200});
        }
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    } finally {
        mongoClient.close();
    }
}