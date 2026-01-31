Sample Data

```
db.students.insertMany([
  { name: "Robert", marks: 80, bonus: 5 },
  { name: "Oliver", marks: 70, bonus: 10 },
  { name: "Henry", marks: 90, bonus: 0 }
]);
```

Arithmetic Operators (Expression Operators)

1.$add – Addition

```
db.students.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      total: { $add: ["$marks", "$bonus"] }
    }
  }
])

Output
{ name: "Robert", total: 85 }
```

2.$subtract – Subtraction

```
{
  total: { $subtract: ["$marks", 10] }
}


Output
{ total: 70 }
```

3.$multiply – Multiplication

```
{
  score: { $multiply: ["$marks", 2] }
}


Output
{ score: 160 }
```

4.$divide – Division

```
{
  avg: { $divide: ["$marks", 2] }
}


Output
{ avg: 40 }
```

5.$mod – Remainder

```
{
  remainder: { $mod: ["$marks", 3] }
}


Output
{ remainder: 2 }
```

6.$abs – Absolute Value

```
{ diff: { $abs: { $subtract: ["$marks", 100] } } }


Output
{ diff: 20 }
```

7.$ceil – Round Up

```
{ value: { $ceil: 4.2 } }


Output
5
```

8.$floor – Round Down

```
{ value: { $floor: 4.9 } }

Output
4
```

9.$round – Round to Decimal

```
{ value: { $round: [4.567, 2] } }

Output
4.57
```

10.$pow – Power

```
{ square: { $pow: [2, 3] } }

Output
8
```

11.$sqrt – Square Root

```
{ root: { $sqrt: 81 } }

Output
9
```

12.$log, $log10, $ln, $exp

```
{ log10: { $log10: 100 } }   Output// 2
{ ln: { $ln: 1 } }          Output// 0
{ exp: { $exp: 1 } }        Output// 2.718
```

Combined Practical Example

```
db.students.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      finalScore: {
        $round: [
          { $divide: [{ $add: ["$marks", "$bonus"] }, 2] },
          0]
      }
    }
  }
])
```

Array Operator


Sample Data
``` 
db.Studentmarks.insertMany([
  { name: "Robert", age: 16, sub: 1, marks: [89, 78, 90] },
  { name: "Oliver", age: 17, sub: 1, marks: [78, 85, 89] },
  { name: "Henry", age: 15, sub: 1, marks: [88, 89, 76] },
  { name: "David", age: 16, sub: 2, marks: [86, 84, 66] },
  { name: "Emma", age: 14, sub: 2, marks: [91, 87, 93] },
  { name: "Sophia", age: 17, sub: 3, marks: [72, 80, 78] },
  { name: "Liam", age: 16, sub: 1, marks: [85, 88, 90] },
  { name: "Noah", age: 15, sub: 3, marks: [67, 74, 70] },
  { name: "Ava", age: 16, sub: 2, marks: [92, 90, 88] },
  { name: "Mason", age: 18, sub: 1, marks: [81, 79, 85] }
]);
```

All Operations in one Query
```
db.Studentmarks.aggregate([
  {
    $project:{
      _id:0,
      name:1,
     firstMark:{$first:"$marks"},
      lastMark:{$last:"$marks"},
      maxMark:{$max:"$marks"},
      minMark:{$min:"$marks"},
      totalMarks:{$size:"$marks"},
      firstTwo:{$slice:["$marks",2]},
      sortedMarks:{$sortArray:{input:"$marks",sortBy:1}},
      reversed:{$reverseArray:"$marks"},
      highMarks:{
        $filter:{
          input:"$marks",
          as:"m",
          cond:{$gte:["$$m",90]}
        }},
      secondMarks:{$arrayElemAt:["$marks",1]},
      has95:{$in:[95,"$marks"]}
    }
  }])
```

Boolean Operators
```
db.Studentmarks.aggregate([
  {
    $project: {
      _id:0,
      name:1,
      age:1
    }
  },
  {
    $addFields:{
      status:{$and:[{$eq:["$age",16]},{$eq:["$marks",88]}]}
    }
  }
])
```

Comparison Operators

Sample Collection
```
{
  name: "Robert",
  age: 18,
  marks: [88, 78, 90]
}
```

1.$eq – Equal
```
{ is18: { $eq: ["$age", 18] } }


Output
{ is18: true }
```

2.$gt – Greater Than
```
{ above16: { $gt: ["$age", 16] } }


Output
{ above16: true }
```

3.$gte – Greater Than or Equal
```
{ passAge: { $gte: ["$age", 18] } }
```

4.$lt – Less Than
```
{ isMinor: { $lt: ["$age", 18] } }
```

5.$lte – Less Than or Equal
```
{ eligible: { $lte: ["$age", 18] } }
```

6.$ne – Not Equal
```
{ not16: { $ne: ["$age", 16] } }
```

7.$cmp – Compare Two Values
```
{ ageCompare: { $cmp: ["$age", 18] } }


Output
0   // equal
1   // greater
-1  // smaller
```

```
db.Studentmarks.aggregate([
  {
    $project: {
      is18: { $eq: ["$age", 18] },
      above16: { $gt: ["$age", 16] },
      passAge: { $gte: ["$age", 18] },
      isMinor: { $lt: ["$age", 18] },
      eligible: { $lte: ["$age", 18] },
      not16: { $ne: ["$age", 16] },
      ageCompare: { $cmp: ["$age", 18] }
    }
  }
])
```

String Operators 

Sample Data
```
db.string_demo.insertMany([
  {
    name: "Robert",
    city: " New York ",
    email: "robert@gmail.com",
    role: "Developer",
    company: "OpenAI"
  },
  {
    name: "Oliver",
    city: " London",
    email: "oliver@yahoo.com",
    role: "Tester",
    company: "Google"
  },
  {
    name: "Henry",
    city: "Paris ",
    email: "henry@outlook.com",
    role: "Manager",
    company: "Microsoft"
  },
  {
    name: "David",
    city: " Berlin ",
    email: "david@gmail.com",
    role: "Developer",
    company: "Amazon"
  },
  {
    name: "Emma",
    city: " Tokyo",
    email: "emma@gmail.com",
    role: "Designer",
    company: "Adobe"
  },
  {
    name: "Sophia",
    city: " Sydney ",
    email: "sophia@yahoo.com",
    role: "HR",
    company: "Infosys"
  },
  {
    name: "Liam",
    city: " Toronto",
    email: "liam@gmail.com",
    role: "Developer",
    company: "Meta"
  },
  {
    name: "Noah",
    city: " Mumbai ",
    email: "noah@outlook.com",
    role: "Support",
    company: "TCS"
  },
  {
    name: "Ava",
    city: " Dubai ",
    email: "ava@gmail.com",
    role: "Tester",
    company: "IBM"
  },
  {
    name: "Mason",
    city: " San Francisco ",
    email: "mason@yahoo.com",
    role: "Developer",
    company: "Netflix"
  }
]);
```

1.$concat – Join Strings
```
{
  fullName: { $concat: ["Mr. ", "$name"] }
}


Output
{ fullName: "Mr. Robert" }
```

2.$toUpper
```
{ upper: { $toUpper: "$name" } }

Output
"ROBERT"
```

3.$toLower
```
{ lower: { $toLower: "$name" } }

Output
"robert"
```

4.$trim
```
{ cleanCity: { $trim: { input: "$city" } } }

Output
"New York"
```

5.$strLenCP – String Length
```
{ nameLength: { $strLenCP: "$name" } }

Output
6
```

6.$substrBytes
```
{ short: { $substrBytes: ["$name", 0, 3] } }

Output
"Rob"
```

7.$regexMatch
```
{ startsWithR: { $regexMatch: { input: "$name", regex: /^R/ } } }

Output
true
```


![alt text](image.png)

![alt text](image-1.png)