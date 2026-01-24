Aggregation Pipeline Stages Commands
**********************************
Sample Data
```
db.business_inspections.insertMany([

  {

    id: "10001-2015-ENFO",

    certificate_number: 6007104,

    business_name: "LD BUSINESS SOLUTIONS",

    date: "Feb 25 2015",

    result: "Violation Issued",

    sector: "Tax Preparers",

    address: { city: "NEW YORK", zip: 10030, street: "FREDERICK DOUGLASS BLVD", number: 2655 }

  },

  {

    id: "10002-2015-ENFO",

    certificate_number: 9278806,

    business_name: "ATILXCO DELI GROCERY INC",

    date: "Feb 20 2015",

    result: "No Violation Issued",

    sector: "Cigarette Retail Dealer",

    address: { city: "RIDGEWOOD", zip: 11385, street: "MENAHAN ST", number: 1712 }

  },

  {

    id: "10003-2015-ENFO",

    certificate_number: 7123456,

    business_name: "GREEN MART",

    date: "Mar 10 2015",

    result: "Violation Issued",

    sector: "Cigarette Retail Dealer",

    address: { city: "BROOKLYN", zip: 11221, street: "BUSHWICK AVE", number: 900 }

  },

  {

    id: "10004-2015-ENFO",

    certificate_number: 8123901,

    business_name: "CITY TAX HELP",

    date: "Mar 12 2015",

    result: "No Violation Issued",

    sector: "Tax Preparers",

    address: { city: "NEW YORK", zip: 10025, street: "BROADWAY", number: 2200 }

  },

  {

    id: "10005-2015-ENFO",

    certificate_number: 6234512,

    business_name: "QUICK STOP",

    date: "Apr 01 2015",

    result: "Violation Issued",

    sector: "Cigarette Retail Dealer",

    address: { city: "QUEENS", zip: 11101, street: "JACKSON AVE", number: 88 }

  },

  {

    id: "10006-2015-ENFO",

    certificate_number: 9345678,

    business_name: "SMART ACCOUNTING",

    date: "Apr 05 2015",

    result: "No Violation Issued",

    sector: "Tax Preparers",

    address: { city: "BRONX", zip: 10458, street: "GRAND CONCOURSE", number: 3100 }

  },

  {

    id: "10007-2015-ENFO",

    certificate_number: 7778881,

    business_name: "CORNER DELI",

    date: "Apr 08 2015",

    result: "Violation Issued",

    sector: "Cigarette Retail Dealer",

    address: { city: "BROOKLYN", zip: 11206, street: "FLUSHING AVE", number: 501 }

  },

  {

    id: "10008-2015-ENFO",

    certificate_number: 8881112,

    business_name: "EASY TAX",

    date: "Apr 10 2015",

    result: "No Violation Issued",

    sector: "Tax Preparers",

    address: { city: "QUEENS", zip: 11373, street: "ROOSEVELT AVE", number: 7400 }

  },

  {

    id: "10009-2015-ENFO",

    certificate_number: 9992223,

    business_name: "NIGHT SHOP",

    date: "Apr 12 2015",

    result: "Violation Issued",

    sector: "Cigarette Retail Dealer",

    address: { city: "BRONX", zip: 10453, street: "UNIVERSITY AVE", number: 180 }

  },

  {

    id: "10010-2015-ENFO",

    certificate_number: 5556667,

    business_name: "BEST TAX SERVICE",

    date: "Apr 15 2015",

    result: "No Violation Issued",

    sector: "Tax Preparers",

    address: { city: "NEW YORK", zip: 10019, street: "8TH AVE", number: 500 }

  }

]);
```

*********************************
1.$match – Filter Data(Only Violation Issued)
```
db.business_inspections.aggregate([
  { $match: { result: "Violation Issued" } }
])


Output (sample)

{ business_name: "LD BUSINESS SOLUTIONS", result: "Violation Issued" }
{ business_name: "GREEN MART", result: "Violation Issued" }
```
 
2.$project – Show Required Fields Only
```
db.business_inspections.aggregate([
  {
    $project: {
      _id: 0,
      business_name: 1,
      sector: 1,
      "address.city": 1    }
  }
])

Output

{ business_name: "LD BUSINESS SOLUTIONS", sector: "Tax Preparers", address: { city: "NEW YORK" } }
```

3.$group – Count by Sector
```
db.business_inspections.aggregate([
  {
    $group: {
      _id: "$sector",
      total: { $sum: 1 }
    }
  }
])

Output

{ _id: "Tax Preparers", total: 5 }
{ _id: "Cigarette Retail Dealer", total: 5 }
```

4.$sort – Sort by Name
```
db.business_inspections.aggregate([
  { $sort: { business_name: 1 } }
])

Output

{ business_name: "ATILXCO DELI GROCERY INC" }
{ business_name: "BEST TAX SERVICE" }

Extra

db.business_inspections.aggregate([{$sort:{business_name:1}},{$project:{business_name:1,_id:0}}])
```

5.$limit – First 3 Records
```
db.business_inspections.aggregate([
  { $limit: 3 }
])

Output

{ business_name: "LD BUSINESS SOLUTIONS" }
{ business_name: "ATILXCO DELI GROCERY INC" }
{ business_name: "GREEN MART" }
```

6.$addFields – Add New Field
```
db.business_inspections.aggregate([
  {
    $addFields: {
      city_zip: { $concat: ["$address.city", "-", { $toString: "$address.zip" }] }
    }
  },
  { $project: { _id: 0, business_name: 1, city_zip: 1 } }
])

Output

{ business_name: "LD BUSINESS SOLUTIONS", city_zip: "NEW YORK-10030" }
```

Combined Example (Most Important)
```
db.business_inspections.aggregate([
  { $match: { result: "Violation Issued" } },
  { $group: { _id: "$sector", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])

Output

{ _id: "Cigarette Retail Dealer", count: 4 }
{ _id: "Tax Preparers", count: 1 }
```

7.$merge

For this only the sample data are as follows:

```
[
  { business_id: 1, sector: "Tax Preparers", city: "NEW YORK", violations: 2 },
  { business_id: 2, sector: "Tax Preparers", city: "QUEENS", violations: 0 },
  { business_id: 3, sector: "Cigarette Retail Dealer", city: "BRONX", violations: 3 },
  { business_id: 4, sector: "Cigarette Retail Dealer", city: "BROOKLYN", violations: 1 }
]
```

Basic $merge Syntax
```
{
  $merge: {
    into: "<collection>",
    on: "<field>",
    whenMatched: "<action>",
    whenNotMatched: "<action>"  }
}
```

Example 1: Insert Aggregation Result into New Collection
Count businesses per sector
```
db.business_inspections.aggregate([
  {
    $group: {
      _id: "$sector",
      totalBusinesses: { $sum: 1 }
    }
  },
  {
    $merge: {
      into: "sector_summary",
      on: "_id",
      whenMatched: "replace",
      whenNotMatched: "insert"    }
  }
])

Output (sector_summary)

[
  { _id: "Tax Preparers", totalBusinesses: 2 },
  { _id: "Cigarette Retail Dealer", totalBusinesses: 2 }
]
```

Example 2: Update Existing Document (merge)
Add new count value instead of replacing
```
db.business_inspections.aggregate([
  {
    $group: {
      _id: "$sector",
      violationsCount: { $sum: "$violations" }
    }
  },
  {
    $merge: {
      into: "sector_summary",
      on: "_id",
      whenMatched: "merge",
      whenNotMatched: "insert"    }
  }
])

Output (sector_summary)

[
  { _id: "Tax Preparers", totalBusinesses: 2, violationsCount: 2 },
  { _id: "Cigarette Retail Dealer", totalBusinesses: 2, violationsCount: 4 }
]
```

Example 3: Ignore New Documents (discard)
```
db.business_inspections.aggregate([
  { $group: { _id: "$city", count: { $sum: 1 } } },
  {
    $merge: {
      into: "city_summary",
      on: "_id",
      whenMatched: "replace",
      whenNotMatched: "discard"    }
  }
])
```

To get an array of all cities in each sector:
Use "$push" to collect every city found within that sector.

```
db.business_inspections.aggregate([
  {
    $group: {
      _id: "$sector",
      addressCities: { $push: "$address.city" }
    }
  },
  {
    $merge: {
      into: "sector_summary",
      on: "_id",
      whenMatched: "merge",
      whenNotMatched: "insert"    }
  }
])
```

Option A: Update the whole collection (Persistent)

If you want to physically add this field to every document in the database, use "updateMany" with an aggregation pipeline:
```
db.business_inspections.updateMany(
  {}, // Match all documents  [
    {
      $set: {
        city_zip: { $concat: ["$address.city", "-", { $toString: "$address.zip" }] }
      }
    }
  ]
)
```
 
Option B: Output to a new collection

If you want to keep the original collection clean but save the results of your work elsewhere, use the $out or $merge stage at the end of your pipeline:
```
db.business_inspections.aggregate([
  {
    $addFields: {
      city_zip: { $concat: ["$address.city", "-", { $toString: "$address.zip" }] }
    }
  },
  { $project: { _id: 0, business_name: 1, city_zip: 1 } },
  { $out: "business_inspections_summary" } // Saves results to a new collection])
  ```
 
8.$limit – Limit Output
```
db.business_inspections.aggregate([
  { $limit: 3 }
])

Output

[
  { business_name: "LD BUSINESS SOLUTIONS", ... },
  { business_name: "ATILXCO DELI GROCERY INC", ... },
  { business_name: "GREEN MART", ... }
]
```

9.$skip – Skip Documents
```
db.business_inspections.aggregate([
  { $skip: 5 }
])

Output

[
  { business_name: "SMART ACCOUNTING", ... },
  { business_name: "CORNER DELI", ... },
  ...
]
```

10.$unset – Remove Field
```
db.business_inspections.aggregate([
  { $unset: "certificate_number" }
])

Output

{
  business_name: "LD BUSINESS SOLUTIONS",
  sector: "Tax Preparers",
  ...
}
```

11.$count – Count Documents(Total inspections)
```
db.business_inspections.aggregate([
  { $count: "totalInspections" }
])


Output

[{ totalInspections: 10 }]
```