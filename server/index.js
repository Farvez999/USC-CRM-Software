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
        const productsCollection = client.db("used-products-resale-portal").collection("products");
        const bookingsCollection = client.db("used-products-resale-portal").collection("bookings");
        const wishlistsCollection = client.db("used-products-resale-portal").collection("wishlists");
        const paymentsCollection = client.db("used-products-resale-portal").collection("payments");

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
            console.log(admissionData);
            const courseName = req.body.courseName;
            const batchName = req.body.batchName;
            const employeeName = req.body.employeeName;
            const headName = req.body.headName;
            const existingEmployee = await admissitionsCollection.findOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName });
            if (existingEmployee) {
                const existingData = existingEmployee.data;
                console.log(existingData);
                const newArr = [...existingData, ...admissionData];
                console.log(newArr);
                const updateEmployee = await admissitionsCollection.updateOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName }, { $set: { data: newArr } }, { new: true });
                return res.send(updateEmployee);
            }
            else {
                const existingEmploye = await admissitionsCollection.insertOne(
                    {
                        courseName: courseName,
                        batchName: batchName,
                        employeeName: employeeName,
                        headName: headName,
                        data: admissionData
                    });
                return res.send(existingEmploye);
            }
        })

        //User Admissions get
        app.get('/user/admissions/:name', async (req, res) => {
            const name = req.params.name;
            const query = { employeeName: name }
            const users = await admissitionsCollection.find(query).toArray()
            res.send(users)
        })


        // Total Students
        app.get('/user/total-admissions', async (req, res) => {
            const query = {};
            const cursors = admissitionsCollection.find(query)
            const TotalAdmission = await cursors.toArray()
            res.send(TotalAdmission)
        })

        // Student Close or delete

        app.post('/user-close-add', async (req, res) => {
            const closeData = [req.body.data];
            console.log(closeData);
            const courseName = req.body.courseName;
            const batchName = req.body.batchName;
            const employeeName = req.body.employeeName;
            const headName = req.body.headName;
            const existingEmployee = await closeCollection.findOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName });
            if (existingEmployee) {
                const existingData = existingEmployee.data;
                console.log(existingData);
                const newArr = [...existingData, ...closeData];
                console.log(newArr);
                const updateEmployee = await closeCollection.updateOne({ employeeName: employeeName, courseName: courseName, batchName: batchName, headName, headName }, { $set: { data: newArr } }, { new: true });
                return res.send(updateEmployee);
            }
            else {
                const existingEmploye = await closeCollection.insertOne(
                    {
                        courseName: courseName,
                        batchName: batchName,
                        employeeName: employeeName,
                        headName: headName,
                        data: closeData
                    });
                return res.send(existingEmploye);
            }
        })

        //User Close get
        app.get('/user/close/:name', async (req, res) => {
            const name = req.params.name;
            const query = { employeeName: name }
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
            res.send({ isSeller: user?.role === 'Department Head' });
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




        // --------------------------------------------

        //All category
        app.get('/categories', async (req, res) => {
            const query = {};
            const cursors = categoriesCollection.find(query)
            const categorie = await cursors.toArray()
            res.send(categorie)
        })

        app.get('/categorie/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const categorie = await categoriesCollection.findOne(query)
            res.send(categorie)
        })

        app.get('/categories/:name', async (req, res) => {
            const name = req.params.name;
            const query = {
                category: name
            }

            const products = await productsCollection.find(query).toArray()

            // -----------booking paid == Category product dekhabe na--------------- 
            const remainingProduct = products.filter(product => product.paid !== true)
            // -----------booking paid == Category product dekhabe na--------------- 

            res.send(remainingProduct)
        })



        //All product get
        app.get('/products', async (req, res) => {
            const query = {};
            const result = await productsCollection.find(query).toArray()
            res.send(result);
        });




        //Seller add product
        app.post('/addProduct', verifyJWT, verifySeller, async (req, res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            const id =
                res.send(result);
        })

        //Get Advertise
        app.get('/advertise', async (req, res) => {
            const query = { advertise: true };
            const result = await productsCollection.find(query).toArray()
            res.send(result);
        });

        //advertise data update
        app.put('/addProduct/addAdvertisement/:id', async (req, res) => {

            const id = req.params.id;
            const ProductQuery = {
                _id: ObjectId(id)
            }
            const updatedDoc = {
                $set: {
                    advertise: true,
                }
            }
            const result = await productsCollection.updateOne(ProductQuery, updatedDoc);
            res.send(result);

        })

        //advertise data remove
        app.put('/addProduct/removeAdvertisement/:id', async (req, res) => {

            const id = req.params.id;
            const ProductQuery = {
                _id: ObjectId(id)
            }
            const updatedDoc = {
                $set: {
                    advertise: false,
                }
            }
            const result = await productsCollection.updateOne(ProductQuery, updatedDoc);
            res.send(result);

        })

        // Seller delete
        app.delete('/products/:id', verifyJWT, verifySeller, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        })






        //get bookings my product
        app.get('/bookings', verifyJWT, async (req, res) => {
            const email = req.query.email;

            const decodedEmail = req.decoded.email;

            if (email !== decodedEmail) {
                return res.status(403).send({ message: 'forbidden access' })
            }
            // console.log('token', req.headers.authorization)

            const query = { email: email };
            const bookings = await bookingsCollection.find(query).toArray();
            res.send(bookings);
        })

        // bookings post (submit data)
        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            // console.log(booking)

            // const query = {
            //     appointmentDate: booking.appointmentDate,
            //     email: booking.email,
            //     treatment: booking.treatment

            // }

            // const alreadyBooked = await bookingsCollection.find(query).toArray();

            // if (alreadyBooked.length) {
            //     const message = `You have already Booking on ${booking.appointmentDate}`
            //     return res.send({ acknowledged: false, message });
            // }

            const result = await bookingsCollection.insertOne(booking)
            res.send(result);
        })

        // Wishlist post add wishlist
        app.post('/wishlist', async (req, res) => {
            const wishlist = req.body;
            // console.log(wishlist)
            const result = await wishlistsCollection.insertOne(wishlist)
            res.send(result);
        })

        //get wishlist my wishlist
        app.get('/wishlists', verifyJWT, async (req, res) => {
            const email = req.query.email;

            const decodedEmail = req.decoded.email;

            if (email !== decodedEmail) {
                return res.status(403).send({ message: 'forbidden access' })
            }
            // console.log('token', req.headers.authorization)

            const query = { email: email };
            const wishlists = await wishlistsCollection.find(query).toArray();
            res.send(wishlists);
        })


        // Payment booking api
        app.get('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const booking = await bookingsCollection.findOne(query)
            res.send(booking);
        })


        // Payment Api
        app.post("/create-payment-intent", async (req, res) => {
            const booking = req.body;
            // console.log(booking)
            const resalePrice = booking.resalePrice
            const amount = resalePrice * 100

            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                currency: 'usd',
                amount: amount,
                "payment_method_types": [
                    "card"
                ]
            });
            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        })

        app.post('/payments', async (req, res) => {
            const payment = req.body;
            const result = await paymentsCollection.insertOne(payment);
            const id = payment.bookingId
            const filter = { _id: ObjectId(id) }
            const updatedDoc = {
                $set: {
                    paid: true,
                    transactionId: payment.transactionId
                }
            }
            const updatedResult = await bookingsCollection.updateOne(filter, updatedDoc)

            //------------Order update hole paid true --------
            const orderData = await bookingsCollection.findOne(filter)
            const productQuery = {
                _id: ObjectId(orderData.productId)
            };
            const productUpdateDoc = {
                $set: {
                    paid: true
                }
            }
            const productUpdateResult = await productsCollection.updateOne(productQuery, productUpdateDoc);
            const updatedProduct = await productsCollection.findOne(productQuery)
            //------------Order update hole paid true --------

            res.send(result);
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