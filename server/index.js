const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const e = require('express');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mordayw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kvy0n2p.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function verifyJWT(req, res, next) {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('unauthorized access');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'forbidden access' })
        }
        req.decoded = decoded;
        next();
    })

}

async function run() {
    try {
        const usersCollection = client.db("usc-crm").collection("users");
        const personalDataCollection = client.db("usc-crm").collection("personal-data");
        const admissitionsCollection = client.db("usc-crm").collection("admisstion-data");
        const closeCollection = client.db("usc-crm").collection("close-data");
        const onlineAdmissitionsCollection = client.db("usc-crm").collection("online-admission-data");
        const offlineAdmissitionsCollection = client.db("usc-crm").collection("offline-admission-data");
        const seminarInterestedCollection = client.db("usc-crm").collection("seminar-interested-data");
        const userSettingCollection = client.db("usc-crm").collection("user-name-setting");
        const headSettingCollection = client.db("usc-crm").collection("head-name-setting");
        const courseSettingCollection = client.db("usc-crm").collection("course-name-setting");
        const batchSettingCollection = client.db("usc-crm").collection("batch-name-setting");


        const verifyAdmin = async (req, res, next) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail };
            const user = await usersCollection.findOne(query);

            if (user?.role !== 'Admin') {
                return res.status(403).send({ message: 'forbidden access' })
            }
            next();
        }

        const verifySeller = async (req, res, next) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail };
            const user = await usersCollection.findOne(query);

            if (user?.role !== 'Department Head') {
                return res.status(403).send({ message: 'forbidden access' })
            }
            next();
        }

        // JWT
        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '24h' })
                return res.send({ accessToken: token });
            }
            res.status(403).send({ accessToken: '' })
        });

        // --------------------------------------------


        //User post
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.post('/personal-data-add', async (req, res) => {
            const personalData = req.body.data;
            const courseName = req.body.courseName;
            const batchName = req.body.batchName;
            const employeeName = req.body.employeeName;
            const headName = req.body.headName;
            const existingEmployee = await personalDataCollection.findOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName });
            console.log(existingEmployee);
            if (existingEmployee) {
                const existingData = existingEmployee.data;
                const newArr = [...existingData, ...personalData];
                const updateEmployee = await personalDataCollection.updateOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName }, { $set: { data: newArr } }, { new: true });
                return res.send(updateEmployee);
            }
            else {
                const existingEmployee = await personalDataCollection.insertOne(
                    {
                        courseName: courseName,
                        batchName: batchName,
                        employeeName: employeeName,
                        headName: headName,
                        data: personalData
                    });
                return res.send(existingEmployee);
            }
        })

        //get user lead
        app.get('/leads/:name', async (req, res) => {
            const name = req.params.name;
            const query = { employeeName: name };
            const users = await personalDataCollection.find(query).toArray()
            res.send(users);
        })




        //Update put
        app.put('/leads/:name', async (req, res) => {
            const name = req.params.name;
            // console.log(id);
            const filter = { employeeName: name }
            const updateLead = req.body;
            // console.log(updateLead);
            const option = { upsert: true };
            const updatedUser = {
                $set: {
                    data: updateLead
                }
            }
            const resulted = await personalDataCollection.updateOne(filter, updatedUser, option)
            res.send(resulted);
        })

        // Admission Post 
        app.post('/user-admission-add', async (req, res) => {
            const admissionData = [req.body.data];
            // console.log(admissionData);
            const courseName = req.body.courseName;
            const batchName = req.body.batchName;
            const employeeName = req.body.employeeName;
            const headName = req.body.headName;
            const existingEmployee = await admissitionsCollection.findOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName });
            let updateEmployee;
            if (existingEmployee) {
                const existingData = existingEmployee.data;
                const newArr = [...existingData, ...closeData];
                await admissitionsCollection.updateOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName }, { $set: { data: newArr } }, { new: true });

            }
            else {
                await admissitionsCollection.insertOne(
                    {
                        courseName: courseName,
                        batchName: batchName,
                        employeeName: employeeName,
                        headName: headName,
                        data: closeData
                    });
            }

            const idData = await personalDataCollection.findOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName: headName })
            if (idData) {
                const newData = idData.data.filter(data => data.Id !== req.body.data.Id)
                updateEmployee = await personalDataCollection.updateOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName }, { $set: { data: newData } }, { new: true });

            }
            return res.send(updateEmployee);
        })

        //User Admissions get
        app.get('/user/admissions/:name', async (req, res) => {
            const name = req.params.name;
            const query = { employeeName: name }
            const users = await admissitionsCollection.find(query).toArray()
            res.send(users)
        })

        // Head admission
        app.get('/head/admissions/:name', async (req, res) => {
            const name = req.params.name;
            const query = { headName: name }
            const users = await admissitionsCollection.find(query).toArray()
            res.send(users)
        })

        // Total Students
        app.get('/user/total-admissions', async (req, res) => {
            let query = {};
            const cursors = admissitionsCollection.find(query);
            const TotalAdmission = await cursors.toArray();
            res.send(TotalAdmission)
        })
        // app.get('/user/total-admissions', async (req, res) => {
        //     const search = req.query.search
        //     console.log(search)
        //     let query = {};
        //     if (search.length) {
        //         query = {
        //             $text: { $search: search }
        //         }
        //     }
        //     // let query = {
        //     //     // "$or": [
        //     //     //     { Name: { $regex: search } },
        //     //     //     { Email: { $regex: search } }
        //     //     // ]

        //     // };
        //     // if(search.length){
        //     //     query = {
        //     //         $text: {
        //     //             $search: search
        //     //         }
        //     //     }
        //     // }
        //     const cursors = admissitionsCollection.find(query);
        //     const TotalAdmission = await cursors.toArray();
        //     res.send(TotalAdmission)
        // })

        // Student Close or delete

        app.post('/user-close-add', async (req, res) => {
            const closeData = [req.body.data];
            const courseName = req.body.courseName;
            const batchName = req.body.batchName;
            const employeeName = req.body.employeeName;
            const headName = req.body.headName;
            const existingEmployee = await closeCollection.findOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName: headName });
            let updateEmployee;
            if (existingEmployee) {
                const existingData = existingEmployee.data;
                const newArr = [...existingData, ...closeData];
                await closeCollection.updateOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName }, { $set: { data: newArr } }, { new: true });

            }
            else {
                await closeCollection.insertOne(
                    {
                        courseName: courseName,
                        batchName: batchName,
                        employeeName: employeeName,
                        headName: headName,
                        data: closeData
                    });
            }

            const idData = await personalDataCollection.findOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName: headName })
            if (idData) {
                const newData = idData.data.filter(data => data.Id !== req.body.data.Id)
                updateEmployee = await personalDataCollection.updateOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName }, { $set: { data: newData } }, { new: true });

            }
            return res.send(updateEmployee);
        })

        // Admin Total Close
        app.get('/user/total-close', async (req, res) => {
            const query = {};
            const cursors = closeCollection.find(query)
            const TotalAdmission = await cursors.toArray()
            res.send(TotalAdmission)
        })

        //User Close get
        app.get('/user/close/:name', async (req, res) => {
            const name = req.params.name;
            const query = { employeeName: name }
            const users = await closeCollection.find(query).toArray()
            res.send(users)
        })

        //Head Close get
        app.get('/head/close/:name', async (req, res) => {
            const name = req.params.name;
            const query = { headName: name }
            const users = await closeCollection.find(query).toArray()
            res.send(users)
        })

        app.delete('/user-close-delete/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { Id: id };
            // console.log(query);
            const result = await personalDataCollection.deleteOne(query);
            // console.log(result);
            res.send(result);
        })



        // Online Admission Post 
        app.post('/user-online-admission-add', async (req, res) => {
            const onlineAdmissionData = [req.body.data];
            const courseName = req.body.courseName;
            const batchName = req.body.batchName;
            const employeeName = req.body.employeeName;
            const headName = req.body.headName;
            const existingEmployee = await onlineAdmissitionsCollection.findOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName });
            if (existingEmployee) {
                const existingData = existingEmployee.data;
                // console.log(existingData);
                const newArr = [...existingData, ...onlineAdmissionData];
                // console.log(newArr);
                const updateEmployee = await onlineAdmissitionsCollection.updateOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName }, { $set: { data: newArr } }, { new: true });
                return res.send(updateEmployee);
            }
            else {
                const existingEmploye = await onlineAdmissitionsCollection.insertOne(
                    {
                        courseName: courseName,
                        batchName: batchName,
                        employeeName: employeeName,
                        headName: headName,
                        data: onlineAdmissionData
                    });
                return res.send(existingEmploye);
            }
        })


        // Online Admission Post 
        app.post('/user-offline-admission-add', async (req, res) => {
            const offlineAdmissionData = [req.body.data];
            const courseName = req.body.courseName;
            const batchName = req.body.batchName;
            const employeeName = req.body.employeeName;
            const headName = req.body.headName;
            const existingEmployee = await offlineAdmissitionsCollection.findOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName });
            if (existingEmployee) {
                const existingData = existingEmployee.data;
                // console.log(existingData);
                const newArr = [...existingData, ...offlineAdmissionData];
                // console.log(newArr);
                const updateEmployee = await offlineAdmissitionsCollection.updateOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName }, { $set: { data: newArr } }, { new: true });
                return res.send(updateEmployee);
            }
            else {
                const existingEmploye = await offlineAdmissitionsCollection.insertOne(
                    {
                        courseName: courseName,
                        batchName: batchName,
                        employeeName: employeeName,
                        headName: headName,
                        data: offlineAdmissionData
                    });
                return res.send(existingEmploye);
            }
        })

        //User Admissions get
        app.get('/user/online-admissions/:name', async (req, res) => {
            const name = req.params.name;
            const query = { employeeName: name }
            const users = await onlineAdmissitionsCollection.find(query).toArray()
            res.send(users)
        })

        //Head Admissions get
        app.get('/head/online-admissions/:name', async (req, res) => {
            const name = req.params.name;
            const query = { headName: name }
            const users = await onlineAdmissitionsCollection.find(query).toArray()
            res.send(users)
        })

        //User Admissions get
        app.get('/user/offline-admissions/:name', async (req, res) => {
            const name = req.params.name;
            const query = { employeeName: name }
            const users = await offlineAdmissitionsCollection.find(query).toArray()
            res.send(users)
        })


        //Head offline get
        app.get('/head/offline-admissions/:name', async (req, res) => {
            const name = req.params.name;
            const query = { headName: name }
            const users = await offlineAdmissitionsCollection.find(query).toArray()
            res.send(users)
        })

        // Admin Total online-student
        app.get('/user/total-online-student', async (req, res) => {
            const query = {};
            const cursors = onlineAdmissitionsCollection.find(query)
            const TotalAdmission = await cursors.toArray()
            res.send(TotalAdmission)
        })

        // Admin Total offline-student
        app.get('/user/total-offline-student', async (req, res) => {
            const query = {};
            const cursors = offlineAdmissitionsCollection.find(query)
            const TotalAdmission = await cursors.toArray()
            res.send(TotalAdmission)
        })




        // Online Admission Post 
        app.post('/user-seminar-interested-add', async (req, res) => {
            const seminarInterestedData = [req.body.data];
            const courseName = req.body.courseName;
            const batchName = req.body.batchName;
            const employeeName = req.body.employeeName;
            const headName = req.body.headName;
            const existingEmployee = await seminarInterestedCollection.findOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName });
            if (existingEmployee) {
                const existingData = existingEmployee.data;
                // console.log(existingData);
                const newArr = [...existingData, ...seminarInterestedData];
                // console.log(newArr);
                const updateEmployee = await seminarInterestedCollection.updateOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName }, { $set: { data: newArr } }, { new: true });
                return res.send(updateEmployee);
            }
            else {
                const existingEmploye = await seminarInterestedCollection.insertOne(
                    {
                        courseName: courseName,
                        batchName: batchName,
                        employeeName: employeeName,
                        headName: headName,
                        data: seminarInterestedData
                    });
                return res.send(existingEmploye);
            }
        })


        app.get('/user/seminar-interested/:name', async (req, res) => {
            const name = req.params.name;
            const query = { employeeName: name }
            const users = await seminarInterestedCollection.find(query).toArray()
            res.send(users)
        })

        function formatedDate(date) {
            const newDate = new Date(date);
            return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
        }

        app.get('/followup/:name/:date', async (req, res) => {
            const name = req.params.name;
            const date = req.params.date;
            const query = {}; //employeeName: name
            console.log(query);
            const users = await personalDataCollection.find(query).toArray()
            console.log(users);
            let lData = users.map(lead => {

                const lds = lead.data.filter(ld => formatedDate(ld.FirstFollowup) === formatedDate(date) || formatedDate(ld.SecondFollowup) === formatedDate(date) || formatedDate(ld.ThirdFollowup) === formatedDate(date) || formatedDate(ld.NextFollowupDate) === formatedDate(date))
                console.log("LDS", lds);
                lead.data = lds
                return lead;

            })
            let namee = lData.filter(d => d.employeeName)
            console.log("Farvez", namee);
            if (name) {
                let data = lData.filter(d => d.data.length > 0)
            }
            // console.log("Farvez", lData.filter(d => d.employeeName));
            let data = lData.filter(d => d.data.length > 0)
            console.log("Last Date", data);
            res.send(data)
        })

        // const existingEmployee = await seminarInterestedCollection.findOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName });
        // if (existingEmployee) {
        //     const existingData = existingEmployee.data;
        //     // console.log(existingData);
        //     const newArr = [...existingData, ...seminarInterestedData];
        //     // console.log(newArr);
        //     const updateEmployee = await seminarInterestedCollection.updateOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName }, { $set: { data: newArr } }, { new: true });
        //     return res.send(updateEmployee);
        // }
        // else {
        //     const existingEmploye = await seminarInterestedCollection.insertOne(
        //         {
        //             courseName: courseName,
        //             batchName: batchName,
        //             employeeName: employeeName,
        //             headName: headName,
        //             data: seminarInterestedData
        //         });
        //     return res.send(existingEmploye);
        // }



        // ''''''''''''''''''''''''''''''''''''''''''''''''''''

        //All User 
        app.get('/users', async (req, res) => {
            const query = {}
            const users = await usersCollection.find(query).toArray()
            res.send(users)
        })

        //All User
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const users = await usersCollection.findOne(query)
            res.send(users)
        })

        app.get('/allUser/:role', async (req, res) => {
            const role = req.params.role;
            const query = { role: role };
            const users = await usersCollection.find(query).toArray()
            res.send(users);
        })

        // User get Admin permistion
        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await usersCollection.findOne(query);
            res.send({ isAdmin: user?.role === 'Admin' });
        })

        //User get Seller permistion
        app.get('/users/dhead/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await usersCollection.findOne(query);
            res.send({ isDHead: user?.role === 'Department Head' });
        })

        // Update user role Admin
        app.put('/users/admin/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })


        // Update seller role verify
        app.put('/users/seller/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    varify: 'verified'
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })


        // Buyer delete
        app.delete('/buyers/:id', verifyJWT, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })

        // Seller delete
        app.delete('/sellers/:id', verifyJWT, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })


        // user Setting 
        app.post('/user-name-setting', async (req, res) => {
            const userName = req.body;
            const result = await userSettingCollection.insertOne(userName);
            res.send(result);
        })

        app.post('/head-name-setting', async (req, res) => {
            const userName = req.body;
            const result = await headSettingCollection.insertOne(userName);
            res.send(result);
        })

        app.post('/course-name-setting', async (req, res) => {
            const userName = req.body;
            const result = await courseSettingCollection.insertOne(userName);
            res.send(result);
        })

        app.post('/batch-name-setting', async (req, res) => {
            const userName = req.body;
            const result = await batchSettingCollection.insertOne(userName);
            res.send(result);
        })

        app.get('/user-name-setting', async (req, res) => {
            const query = {}
            const users = await userSettingCollection.find(query).toArray()
            res.send(users)
        })

        app.get('/head-name-setting', async (req, res) => {
            const query = {}
            const users = await headSettingCollection.find(query).toArray()
            res.send(users)
        })

        app.get('/course-name-setting', async (req, res) => {
            const query = {}
            const users = await courseSettingCollection.find(query).toArray()
            res.send(users)
        })

        app.get('/batch-name-setting', async (req, res) => {
            const query = {}
            const users = await batchSettingCollection.find(query).toArray()
            res.send(users)
        })



    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('USC CRM Software is Running')
})

app.listen(port, () => {
    console.log(`USC CRM Software running on Server ${port}`);
})