This is a proof of concept for a solution to the problem of checking the validity of data coming from the server
in a SPA.

It was inspired by clojure schema (https://github.com/Prismatic/schema) but, luckily, was much easier to implement
by leveraging JSON schema and the tv4 validator.

It also uses typson to generate the JSON Schema definitions from typescript types so that you can cast an arbitrary
JSON from the server to a typescript type knowing for sure that the JSON object is compliant with the type definition.

My idea is that, this should be used by an "API" module that interacts with the server and, from there on, the data can
be treated as a typed object.

It is not a complete implementation of the idea, just a proof that it is viable.