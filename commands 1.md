To Start MongoDb
```
mongosh
```
For Switch to DataBase
```
use collection_name
```

To Create Collection 
```
db.createcollectio("collection_name")
db.<collection_name>.drop()
```


**************************
Document (CRUD) Commands:

1.For insert a single document
```
db.collection_name.insertOne({field1: "value1", field2: "value2"})
```


2.For insert a many doucument
```
db.collection_name.insertMany([{field1: "value1"}, {field2: "value2"}])
```

3.Find all document
```
db.collection_name.find()
```

4.Find all documents(prettifield.output)
```
db.collection_name.find().pretty()
```

5.Find document matching a array
```
db.collection_name.find({field1: "value"})
```


6.To find a one value
```
db.collection_name.findOne({field1: "value"})
```

7.Update single document
```
db.collection_name.updateOne({query_name: "oldevalue"}, {$set: {update_field: "new value"}})
```

8.Update Multiple document
```
db.collection_name.updateMany({query_name: "oldevalue"}, {$set: {update_field: "new value"}})
```

9.Delete a single document

To delete mutiple document matching differnet conditons, you must use $or
```
(i) db.collection_name.deleteMany({field: "value"})
(ii) db.collection_name.deleteMany({$or [field: value]},{field: "value"})
```

********************************
Coparsion Operator

1.$gt
```
db.collection_name({age: {$gt:26}})
```

2.$eq
```
db.collection_name({age: {$eq:26}})
```

3.$gte
```
db.collection_name({age: {$gte:26}})
```

4.$in (Match any value in array)
```
db.collection_name({city: {$in:["Ahmedabad"]}})
```

5.$lt
```
db.collection_name({age: {$lt:24}})
```

6.$lte
```
db.collection_name({age: {$lte:24}})
```

7.$ne(Not IN)
```
db.collection_name({age: {$ne:26}})
```

8.$nin(Not In Arrya)
```
db.collection_name({city: {$nin:["Ahmedabad","Ghandhinagar"]}})
```


*******************************

Logical Operators

1.$and
```
db.collection_name.find({$and: [{age: {$gt: 26}},{course:"BE"}]})
```

2.$or
```
db.collection_name.find({$or: [{age: {$gt: 26}},{course:"ME"}]})
```

3.$nor
```
db.collection_name.find({$nor: [{age: {$gt: 26}},{course:"ME"}]})
```

4.$not
```
db.collection_name.find({age: {$not: {$gt: 21}}})
```

5.BONUS : Using $and without keyword (shortcut)
```
db.collection_name.find({age: {$gt: 20}, courser: "BE"})
```


*******************************
MongoDB Support Two Elements Operators

1.$exists
```
db.collection_name.find({fees: {$exists: true}})

db.collection_name.find({course: {$exists: false}})
```

2.$type
```
db.collection_name.find({age: {$type: "int"}})

***Or Using Type Number***
db.collection_name.find({age: {$type: [2,16]}})
```

Capped Collection
```
db.createCollection("logs", {
  capped: true,
  size: 1024 * 1024,   // 1MBmax: 100             // max 100 documents})
```

Time-Series Collection
```
db.createCollection("temperature_readings", {
  timeseries: {
    timeField: "timestamp",
    metaField: "sensorId",
    granularity: "seconds"  }
})
Example document:
{
  sensorId: "S-101",
  timestamp: new Date(),
  value: 32.5}
```

Clustered Collection
```
db.createCollection("orders", {
  clusteredIndex: {
    key: { orderId: 1 },
    unique: true,
    name: "order_clustered_index"  }
})
```

Collection with Schema Validation
```
db.createCollection("students", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "age", "email"],
      properties: {
        name: {
          bsonType: "string",
          description: "Name must be a string"        },
        age: {
          bsonType: "int",
          minimum: 18,
          description: "Age must be >= 18"        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+$"        }
      }
    }
  }
})
```

Create View (Virtual Collection)
```
db.createCollection("adult_students", {
  viewOn: "students",
  pipeline: [
    { $match: { age: { $gte: 18 } } }
  ]
})
```

Auto Index Collection
```
db.createCollection("users", {
  autoIndexId: true})
```

In MongoDB, the find() method expects the query (filter) as the 
first argument and the projection as the second argument.
```
db.accounts.find(
  // Argument 1: The Filter (Query)  
  {
    limit: { $gte: 10000 },
    products: { $in: ["InvestmentStock", "CurrencyService"] }
  },
  // Argument 2: The Projection (Fields to return)  
  {
    account_id: 1, 
    _id: 0 
  }
)
```

just show all limit data
```
db.accounts.find(
  {},
  { _id: 0, limit: 1 }
)
```

*******************************

Array operators

1.$all
```
db.product_delivery.find({
  delivered: { $all: ["Food", "Electronics"] }
})
```

2.$elemMatch
```
db.product_delivery.find({
  feedback: {
    $elemMatch: {
      product: "xyz",
      score: { $gte: 7 }
    }
  }
})
```

3.$size
```
db.product_delivery.find({
  delivered: { $size: 2 }
})
```

One Combined Example
```
db.product_delivery.find({
  delivered: { $all: ["Food", "Electronics"] },
  feedback: {
    $elemMatch: { product: "abc", score: { $gte: 8 } }
  }
})
```

**********************************

Projection Operators

1.$(What it does
Returns only the first matching element from an array based on the query condition.)
```
db.product_delivery.find(
  { delivered: "Food" },
  { "delivered.$": 1, _id: 0 }
)
Output
{ delivered: ["Food"] }
```

2.$elemMatch
(What it does
Returns the first array element that matches a condition)
```
db.product_delivery.find(
  {},
  {
    feedback: {
      $elemMatch: { product: "xyz", score: { $gte: 7 } }
    },
    _id: 0  }
)
Output
{
  feedback: [{ product: "xyz", score: 8 }]
}
```

3.$meta(What it does
Returns metadata, mainly used with text search.)
```
db.product_delivery.createIndex({ address: "text" })
db.product_delivery.find(
  { $text: { $search: "Garden" } },
  { score: { $meta: "textScore" }, address: 1 }
).sort({ score: { $meta: "textScore" } })
```

4.$slice(What it does
Limits the number of array elements returned.)
```
db.product_delivery.find(
  {},
  { delivered: { $slice: 2 }, _id: 0 }
)

Example 2: Return last 2 delivered items
db.product_delivery.find(
  {},
  { delivered: { $slice: -2 }, _id: 0 }
)

Example 3: Skip 1, return next 2
db.product_delivery.find(
  {},
  { delivered: { $slice: [1, 2] }, _id: 0 }
)
```

One Combined Example
```
db.product_delivery.find(
  { delivered: "Electronics" },
  {
    address: 1,
    delivered: { $slice: 1 },
    feedback: { $elemMatch: { product: "abc" } },
    _id: 0  }
)
```

***********************************

MongoDB Update Operators

1.$currentDate(Sets field to current date/time)
```
db.Studentmarks.updateOne(
  { name: "David" },
  { $currentDate: { Exam_Date: true } }
)
```

2.$inc(Increases / decreases numeric value)
```
db.Studentmarks.updateOne(
  { name: "Henry" },
  { $inc: { age: 2 } }
)
age = age + 2
```

3.$set(Adds or updates a field)
```
db.Studentmarks.updateMany(
  {},
  { $set: { credit: 0 } }
)
```

4.$unset(Removes a field)
```
db.Studentmarks.updateOne(
  { name: "Oliver" },
  { $unset: { credit: "" } }
)
```

5.$rename(Renames a field)
```
db.Studentmarks.updateOne(
  { name: "David" },
  { $rename: { credit: "unit" } }
)
```

6.$min(Updates value only if new value is smaller)
```
db.Studentmarks.updateOne(
  { name: "Robert" },
  { $min: { age: 15 } }
)
```

7.$max(Updates value only if new value is greater)
```
db.Studentmarks.updateOne(
  { name: "Robert" },
  { $max: { age: 18 } }
)
```

8.$mul(Multiplies numeric value)
```
db.Studentmarks.updateOne(
  { name: "Oliver" },
  { $mul: { age: 2 } }
)
```

9.$setOnInsert(Sets field only during insert (upsert))
```
db.Studentmarks.updateOne(
  { name: "Alex" },
  { $setOnInsert: { age: 16 } },
  { upsert: true }
)
```

10.$push(Adds element to array)
```
db.Studentmarks.updateOne(
  { name: "Robert" },
  { $push: { marks: 95 } }
)
```

11.$addToSet(Adds value only if not already present)
```
db.Studentmarks.updateOne(
  { name: "Robert" },
  { $addToSet: { marks: 95 } }
)
```

12.$pop(Removes element from array
-1 → first, 1 → last)
```
db.Studentmarks.updateOne(
  { name: "Oliver" },
  { $pop: { marks: -1 } }
)
```

13.$pull(Removes elements matching condition)
```
db.Studentmarks.updateOne(
  { name: "David" },
  { $pull: { marks: { $lt: 70 } } }
)
```

14.$pullAll(Removes multiple specific values)
```
db.Studentmarks.updateOne(
  { name: "Henry" },
  { $pullAll: { marks: [76, 88] } }
)
```

*******************************

Other Operators in MongoDB

1.$comment(Purpose
Adds a comment to a query (for debugging, logging, or understanding queries).)
```
db.Studentmarks.find(
  { age: { $gt: 16 } }
).comment("Find students older than 16")
```

2.$rand(Generates a random floating number between 0 and 1)
```
db.Studentmarks.find({
  $expr: { $gt: [{ $rand: {} }, 0.5] }
})
```

3.$natural(Purpose
Controls physical storage order of documents.
Value	Meaning
1	Natural order
-1	Reverse natural order)
```
Example: Natural Order
db.Studentmarks.find().sort({ $natural: 1 })

Example: Reverse Order
db.Studentmarks.find().sort({ $natural: -1 })
```