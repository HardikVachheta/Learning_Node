Create DataBase:
```
use companyDB
```

Sample Data
```
db.employees.insertMany([
{
name:"Hardik",
email:"hardik@gmail.com",
department:"IT",
salary:45000,
city:"Ahmedabad"
},
{
name:"Rahul",
email:"rahul@gmail.com",
department:"HR",
salary:35000,
city:"Surat"
},
{
name:"Priya",
email:"priya@gmail.com",
department:"Finance",
salary:50000,
city:"Vadodara"
},
{
name:"Neha",
email:"neha@gmail.com",
department:"IT",
salary:55000,
city:"Rajkot"
},
{
name:"Amit",
email:"amit@gmail.com",
department:"Sales",
salary:40000,
city:"Ahmedabad"
},
{
name:"Karan",
email:"karan@gmail.com",
department:"IT",
salary:60000,
city:"Surat"
},
{
name:"Riya",
email:"riya@gmail.com",
department:"HR",
salary:38000,
city:"Vadodara"
},
{
name:"Vikas",
email:"vikas@gmail.com",
department:"Finance",
salary:70000,
city:"Ahmedabad"
},
{
name:"Pooja",
email:"pooja@gmail.com",
department:"Sales",
salary:42000,
city:"Rajkot"
},
{
name:"Jay",
email:"jay@gmail.com",
department:"IT",
salary:65000,
city:"Surat"
}
])
```

1 createUser() Command
```
db.runCommand({
  createUser: "Hardik",
  pwd: "123456",
  roles: [
    { role: "readWrite", db: "companyDB" }
  ]
})
```
Output: 
```
{ ok: 1 }
```

2 grantRolesToUser()
```
db.runCommand({
  grantRolesToUser: "Hardik",
  roles: [
    {
      role: "read",
      db: "salesDB"
    }
  ]
})
```
Output
```
{ ok: 1 }
```


3 usersInfo()
```
db.runCommand({
  usersInfo: "Hardik"
})
```
Output
```
{
  users:[
    {
      user:"Hardik",
      db:"companyDB",
      roles:[
        {
          role:"readWrite",
          db:"companyDB"
        }
      ]
    }
  ]
}
```
```
db.runCommand({
  usersInfo: 1
})
```
Output
```
{
  users:[
    {...},
    {...},
    {...}
  ]
}
```

4 dropUser()
```
db.runCommand({
  dropUser: "Hardik"
})
```
Output
```
{ ok: 1 }
```

Create User
```
db.runCommand({
  createUser: "Hardik",
  pwd: "123456",
  roles: [
    {
      role: "readWrite",
      db: "companyDB"
    }
  ]
})
```
Check User 
```
db.runCommand({
  usersInfo: "Hardik"
})
```
Give Another Role
```
db.runCommand({
  grantRolesToUser: "Hardik",
  roles: [
    {
      role: "read",
      db: "salesDB"
    }
  ]
})
```

Delete User
```
db.runCommand({
  dropUser: "Hardik"
})
```

5 Find All Employess
```
db.employees.find()
```

6 Find IT Employess
```
db.employees.find({
  department:"IT"
})
```

7 Find Salary Greater Than 50000
```
db.employees.find({
  salary:{
    $gt:50000
  }
})
```

8 Update One Employee
```
db.employees.updateOne(
{
  name:"Hardik"
},
{
  $set:{
    salary:50000
  }
})
```

9 Update Many Employees
```
db.employees.updateMany(
{
  department:"IT"
},
{
  $inc:{
    salary:5000
  }
})
```

10 Delete One Employee
```
db.employees.deleteOne({
  name:"Rahul"
})
```

11 Delete Many Employees
```
db.employees.deleteMany({
  department:"HR"
})
```

12 Count Employees
```
db.employees.countDocuments()
```

13 Sort Salary High to Low
```
db.employees.find().sort({
  salary:-1
})
```
14 Aggregation Example
```
db.employees.aggregate([
{
  $group:{
    _id:"$department",
    avgSalary:{
      $avg:"$salary"
    }
  }
}
])
```

Output 
```
[
{
  _id:"IT",
  avgSalary:56250
},
{
  _id:"HR",
  avgSalary:36500
},
{
  _id:"Sales",
  avgSalary:41000
},
{
  _id:"Finance",
  avgSalary:60000
}
]
```

5.4 Write Operation Commands

Sample Collection 
```
db.students.insertMany([
{
rollNo: 101,
name: "Hardik",
age: 22,
course: "MERN",
city: "Ahmedabad"
},
{
rollNo: 102,
name: "Rahul",
age: 23,
course: "NodeJS",
city: "Surat"
},
{
rollNo: 103,
name: "Priya",
age: 21,
course: "React",
city: "Rajkot"
},
{
rollNo: 104,
name: "Neha",
age: 24,
course: "Python",
city: "Vadodara"
},
{
rollNo: 105,
name: "Amit",
age: 22,
course: "Java",
city: "Ahmedabad"
},
{
rollNo: 106,
name: "Riya",
age: 20,
course: "React",
city: "Surat"
},
{
rollNo: 107,
name: "Karan",
age: 25,
course: "NodeJS",
city: "Rajkot"
},
{
rollNo: 108,
name: "Pooja",
age: 23,
course: "Python",
city: "Vadodara"
},
{
rollNo: 109,
name: "Jay",
age: 21,
course: "MERN",
city: "Ahmedabad"
},
{
rollNo: 110,
name: "Vikas",
age: 24,
course: "Java",
city: "Surat"
}
])
```

1 Insert Command
```
db.students.insertOne({
rollNo: 111,
name: "Manan",
age: 22,
course: "React",
city: "Ahmedabad"
})
```
Output 
```
{
 acknowledged: true,
 insertedId: ObjectId(...)
}
```
Insert Multiple Documents
```
db.students.insertMany([
{
rollNo: 112,
name: "Nidhi",
age: 23
},
{
rollNo: 113,
name: "Yash",
age: 24
}
])
```
2 Find Command
```
db.students.find()
```

Find One Student 
```
db.students.find({
name: "Hardik"
})
```
Output 
```
{
rollNo:101,
name:"Hardik",
age:22
}
```

Projection Example
```
db.students.find(
{},
{
name:1,
course:1,
_id:0
}
)
```
Output 
```
{
name:"Hardik",
course:"MERN"
}
```

Sort Example
```
db.students.find().sort({
age:-1
})
```
Limit Example
```
db.students.find().limit(3)
```

Skip Example
```
db.students.find().skip(2)
```

3 findAndModify Command
```
db.students.findAndModify({
query:{
name:"Hardik"
},
update:{
$set:{
age:23
}
},
new:true
})
```
Before
```
{
name:"Hardik",
age:22
}
```
After 
```
{
name:"Hardik",
age:23
}
```

4 Update Command
Update One
```
db.students.updateOne(
{
name:"Hardik"
},
{
$set:{
city:"Gandhinagar"
}
}
)
```
Before 
```
{
name:"Hardik",
city:"Ahmedabad"
}
```
After 
```
{
name:"Hardik",
city:"Gandhinagar"
}
```

Update Many 
```
db.students.updateMany(
{
course:"React"
},
{
$inc:{
age:1
}
}
)
```
Before 
```
Priya 21
Riya 20
```
After 
```
Priya 22
Riya 21
```

5 Delete Command
Delete One 
```
db.students.deleteOne({
name:"Rahul"
})
```
Before 
```
Hardik
Rahul
Priya
```
After 
```
Hardik
Priya
```
Delete Many 
```
db.students.deleteMany({
city:"Surat"
})
```
Before 
```
Rahul
Riya
Vikas
```
After
```
All Surat students removed.
```

5.4.3 findAndModify()
Sample Data
```
[
  {
    account_id: 1001,
    name: "Hardik",
    limit: 2000
  },
  {
    account_id: 1002,
    name: "Rahul",
    limit: 3000
  }
]
```

1 Update Example
```
db.runCommand({
  findAndModify: "accounts",
  query: { account_id: 1001 },
  update: { $set: { limit: 2500 } },
  new: true
})
```
Output
```
{
  account_id: 1001,
  name: "Hardik",
  limit: 2500
}
```

2 Delete Example
```
db.runCommand({
  findAndModify: "accounts",
  query: { account_id: 1002 },
  remove: true
})
```
Output 
```
{
  account_id: 1002,
  name: "Rahul",
  limit: 3000
}
```

3 Upsert Example 
```
db.runCommand({
  findAndModify: "accounts",
  query: { account_id: 1003 },
  update: {
    $set: {
      name: "Amit",
      limit: 5000
    }
  },
  upsert: true,
  new: true
})
```
Output 
```
{
  account_id: 1003,
  name: "Amit",
  limit: 5000
}
```


5.4.4 update Command
Sample Data
```
[
  { name: "Hardik", city: "Ahmedabad" },
  { name: "Rahul", city: "Ahmedabad" },
  { name: "Amit", city: "Surat" }
]
```

1 Update One Document 
```
db.runCommand({
  update: "users",
  updates: [
    {
      q: { name: "Hardik" },
      u: { $set: { city: "Rajkot" } }
    }
  ]
})
```
Output 
Before 
```
{
  name: "Hardik",
  city: "Ahmedabad"
}
```
After 
```
{
  name: "Hardik",
  city: "Rajkot"
}
```


2 Update Mutiple Document 
```
db.runCommand({
  update: "users",
  updates: [
    {
      q: { city: "Ahmedabad" },
      u: { $set: { state: "Gujarat" } },
      multi: true
    }
  ]
})
```
Output 
```
[
  {
    name: "Hardik",
    city: "Ahmedabad",
    state: "Gujarat"
  },
  {
    name: "Rahul",
    city: "Ahmedabad",
    state: "Gujarat"
  }
]
```

3 Increment Example
```
db.runCommand({
  update: "employees",
  updates: [
    {
      q: { department: "IT" },
      u: { $inc: { salary: 5000 } },
      multi: true
    }
  ]
})
```


delete Command
Sample Data
```
[
  { name: "Hardik", city: "Ahmedabad" },
  { name: "Rahul", city: "Ahmedabad" },
  { name: "Amit", city: "Surat" }
]
```

1 Delete One Document
```
db.runCommand({
  delete: "users",
  deletes: [
    {
      q: { name: "Hardik" },
      limit: 1
    }
  ]
})
```

Output 
```
[
  { name: "Rahul", city: "Ahmedabad" },
  { name: "Amit", city: "Surat" }
]
```

2 Delete Mutiple Documents 
```
db.runCommand({
  delete: "users",
  deletes: [
    {
      q: { city: "Ahmedabad" },
      limit: 0
    }
  ]
})
```

Output 
Before 
```
[
  { name: "Hardik", city: "Ahmedabad" },
  { name: "Rahul", city: "Ahmedabad" },
  { name: "Amit", city: "Surat" }
]
```
After 
```
[
  { name: "Amit", city: "Surat" }
]
```


count Command

Syntax
```
db.runCommand({
   count: "employees",
   query: { salary: { $gt: 50000 } }
})
```

Sample Data
```
[
  { name: "Hardik", salary: 40000 },
  { name: "Rahul", salary: 60000 },
  { name: "Amit", salary: 70000 },
  { name: "Jay", salary: 80000 }
]
```

Example 1
Count employees whose salary is greater than 50000.
```
db.runCommand({
  count: "employees",
  query: {
    salary: { $gt: 50000 }
  }
})
```

Output
```
{
  n: 3,
  ok: 1
}
```

Example 2 (Using limit)
Count only first 2 matching documents.
```
db.runCommand({
  count: "employees",
  query: { salary: { $gt: 30000 } },
  limit: 2
})
```

Output:
```
{
  n: 2,
  ok: 1
}
```

aggregate Command
Sample Data
```
[
  { product: "Laptop", category: "Electronics", price: 50000 },
  { product: "Mobile", category: "Electronics", price: 30000 },
  { product: "Shirt", category: "Clothing", price: 2000 },
  { product: "Jeans", category: "Clothing", price: 3000 }
]
```

Example 1: Count Products by Category
```
db.runCommand({
  aggregate: "products",
  pipeline: [
    {
      $group: {
        _id: "$category",
        totalProducts: { $sum: 1 }
      }
    }
  ],
  cursor: {}
})
```

Output
```
[
  {
    _id: "Electronics",
    totalProducts: 2
  },
  {
    _id: "Clothing",
    totalProducts: 2
  }
]
```

Example 2: Calculate Total Sales
Collection:
```
[
  { product: "Laptop", amount: 50000 },
  { product: "Mobile", amount: 30000 },
  { product: "Laptop", amount: 40000 }
]
```

Query
```
db.runCommand({
  aggregate: "sales",
  pipeline: [
    {
      $group: {
        _id: "$product",
        totalSales: { $sum: "$amount" }
      }
    }
  ],
  cursor: {}
})
```
Output 
```
[
  {
    _id: "Laptop",
    totalSales: 90000
  },
  {
    _id: "Mobile",
    totalSales: 30000
  }
]
```

distinct Command
Sample Data
```
[
  { name: "Hardik", city: "Ahmedabad" },
  { name: "Rahul", city: "Surat" },
  { name: "Amit", city: "Ahmedabad" },
  { name: "Jay", city: "Rajkot" }
]
```

Example
Get unique cities.
```
db.runCommand({
  distinct: "users",
  key: "city"
})
```


Output
```
{
  values: [
    "Ahmedabad",
    "Surat",
    "Rajkot"
  ]
}
```

hint

Example 1: Create an Index
Suppose we have an employees collection:
```
[
  { name: "Hardik", email: "hardik@gmail.com", salary: 50000 },
  { name: "Rahul", email: "rahul@gmail.com", salary: 60000 }
]
```

Create an index on email:
```
db.employees.createIndex({ email: 1 })
```

Query Using Hint
```
db.employees.find(
  { email: "hardik@gmail.com" }
).hint({ email: 1 })
```


Meaning
```
MongoDB:
"Use the email index for this query."
```

Example 2: Count Command with Hint
```
db.runCommand({
  count: "employees",
  query: {
    salary: { $gt: 50000 }
  },
  hint: { salary: 1 }
})
```


Meaning
```
Count employees with salary > 50000
using salary index.
```

Example 3: Aggregate with Hint
Create index:
```
db.employees.createIndex({ department: 1 })
```

Aggregation:
```
db.runCommand({
  aggregate: "employees",
  pipeline: [
    {
      $match: {
        department: "IT"
      }
    }
  ],
  hint: { department: 1 },
  cursor: {}
})
```


Meaning
```
Use department index while filtering IT employees.
```


count Command

Syntax
```
db.runCommand({
   count: "employees",
   query: { salary: { $gt: 50000 } }
})
```

Sample Data
```
[
  { name: "Hardik", salary: 40000 },
  { name: "Rahul", salary: 60000 },
  { name: "Amit", salary: 70000 },
  { name: "Jay", salary: 80000 }
]
```

Example 1
Count employees whose salary is greater than 50000.
```
db.runCommand({
  count: "employees",
  query: {
    salary: { $gt: 50000 }
  }
})
```


Output
```
{
  n: 3,
  ok: 1
}
```


Explanation
```
Rahul  → 60000
Amit   → 70000
Jay    → 80000
Total = 3
```


Example 2 (Using limit)
Count only first 2 matching documents.
```
db.runCommand({
  count: "employees",
  query: { salary: { $gt: 30000 } },
  limit: 2
})
```

Output:
```
{
  n: 2,
  ok: 1
}
```