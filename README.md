# Lotus Notes/Domino document -> REST data -> React

The example is quite simple and only GETs one document from Notes using Domino Access Service (DAS)
My setup is Domino Server 9.0.1



## Notes Database
Your database must be set up for DAS:
* ACL: allow anonymous read access  (but you can also use credentials, not shown here).
* Database properties: advanced properties, select Allow Domino Data Service: Views and documents.
* In designer open your view and access properties: in the advanced tab: select Allow Domino Data Services operations
* My test view has a column sorted by employee ID, so we can look for a specific entry using ?keys=ID000

## CORS setup on Domino 9.0.1

CORS must be setup on server:
  * Domino server document: Load internet configurations from Server: Enabled
  * Internet Sites documents: Enabled
  * Create the Internet Sites doc
    * On allowed methods section I left the defaults
    * On Domino Access Services: Enabled Services: Data
    * Click on Web Site...  button and Create a rule
       * Add your description (any text)
       * Type of Rule: HTTP Response Headers
       * Incoming URL pattern: the path to your test database (NSF)  /test/*
       * HTTP Response Codes: 200, 201, 204, 206, 304
       * Then add the Headers:
        ***
        * Access-Control-Allow-Origin   :  *
        * Access-Control-Allow-Headers  : Content-Type,X-HTTP-Method-Override
        * Access-Control-Expose-Headers : Location
        ***
  * restart your http task:    server console:    tell http restart

  * Since I'm not doing POST operations, I didn't use the Notes.ini setting: HTTPAdditionalRespHeader


*Note:* this setup is only for testing. For production servers you must configure your security correctly.

*Note2:* Domino 10 and up have a different CORS setup, where you only modify the server doc, and add a .json file with the headers. See HCL web site documentation.

## Accessing the DB with a browser

A sample database with employees was created with the view 'employees'. Then the URI for getting a row entry in our view uses the modifier 'keys='.
Example:
  * http://192.168.1.100/javadomino/json-testing.nsf/api/data/collections/name/employees?keys=ID4102

Once we get our row, we access document via the json element @link href.
 * http://192.168.1.100/javadomino/json-testing.nsf/api/data/documents/unid/E7617807F07C4A64862586930063AC0D

It's a two step action, if you know how to access directly the document, please comment.

In both cases you get a JSON response from the serer, if all goes well...
**like:**
[
  {
      "@href":"\/javadomino\/json-testing.nsf\/api\/data\/collections\/name\/employees\/unid\/E7617807F07C4A64862586930063AC0D",
      "@link":
      {
          "rel":"document",
          "href":"\/javadomino\/json-testing.nsf\/api\/data\/documents\/unid\/E7617807F07C4A64862586930063AC0D"
      },
      "@entryid":"2-E7617807F07C4A64862586930063AC0D",
      "@unid":"E7617807F07C4A64862586930063AC0D",
      "@noteid":"8F6",
      "@position":"2",
      "@read":true,
      "@siblings":3,
      "@form":"Employee",
      "$EMPID":"ID4102",
      "FirstName":"Diana",
      "LastName":"Rogers",
      "BirthDate":"1995-05-23T23:22:10Z",
      "EmployeeAge":26,
      "Address":"1334 N. Humming Pkwy. 90215. LA, CA",
      "Mobile":"2225154785",
      "Salary":215000
  }
]

Once you get this result, the rest is just coding your app in React. Performing CRUD operations can also be achieved but it's out of the reach of this example.


---
Many thanks to Mark Leusink for his [post](https://linqed.eu/2014/12/15/fun-with-domino-angularjs-and-cors-not-really/).
Also to Flavio Copes for his [tutorials](https://flaviocopes.com/).



##
