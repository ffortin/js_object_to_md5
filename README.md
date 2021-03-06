js_object_to_md5
================

Deeply scans and converts a javascript object to a md5 hash.

Warning: Will not work on JS objects that contain functions at any level of their hierarchy. Will ignore array ordering, such that [1,2] and [2,1] produce the same hash.

Why this function?
============
This is extremely useful to test the equivalence of two objects, or to store a hashed version for quick and indexed comparison (it's much easier to compare md5 strings than to a full recursive lookup to determine equivalence).

Requirements
============
Your project must include:
- Underscore.js
- CryptoJS

How to Install
============
Simply include object_to_md5.js to any web project. Produces a global object_to_md5(object) function.

How to Use
============
Call object_to_md5(object) where object is your javascript object.

Comments
===========
    Author: Francois Fortin
    Email: francois.fortin@adgear.com
    Date: January 15, 2014

    Requirements:
        - CryptoJS
        - UnderscoreJS

    Description:
        object_to_md5 will convert an array or JS object to a md5 hash, ignoring array ordering
        this is a deep hash calculation, that will parse the object recursively

        the object or array cannot contain function elements

    Exports:
        function object_to_md5(object): returns a md5 hash string
