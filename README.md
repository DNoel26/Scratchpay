<!-- @format -->

Software Engineer Challenge
The objective of this challenge is to call some endpoints containing a list of clinics and perform some actions on the result.
The list of clinics can be found at:
https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json
https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json

Create one RESTful API endpoint to allow search in multiple clinic providers and display results from all the available clinics by any of the following:

Clinic Name
State [ex: "CA" or "California"]
Availability [ex: from:09:00, to:20:00]

This is including search by multiple criteria in the same time like search by state and availability together.
Note: We need only one endpoint to search for all clinics.

ASSUMPTIONS:

-   Property names were different for both endpoints, but values were similar /
    identical. I identified these as alias keys in the codebase and queries were
    designed to find both original and alias keys.
-   Similarly to above, search by state code and state name were designed to be
    queried interchangeably (npm package was used to assist here).
-   The other possible option was to create a new array by combining and coercing all the 
    dental and vet clinic objects to have the same property names, and then
    query those results. 
-   Original and alias queries are not required to work simultaneously i.e.
    name=foo&clinicName=bar or clinicName=baz&StateName=buzz is invalid
-   Query params designed to ignore invalid query keys

NOTE:

- I did not create atomic commits for this challenge, only realising that the
  first real commit may be too large, I apologize for this.