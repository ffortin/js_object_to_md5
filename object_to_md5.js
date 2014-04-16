/*
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
 */

var object_to_md5 = (function() {

    var fct = function(o) {
        if(typeof o === 'function') throw 'Invalid object type';

        return CryptoJS.MD5(JSON.stringify(deep_object_to_array(o))).toString();
    }

    // recursively convert an object to an array of arrays
    var deep_object_to_array = function(obj) {
        var result;
        obj = _.clone(obj);
        if(typeof obj === 'object' && (obj instanceof Array)) {
            result = array_of_objects_to_array(obj);
        } else if(typeof obj === 'object') {
            result = object_to_array(obj);
        } else {
            result = obj;
        }

        return result;
    }

    var object_to_array = function(obj) {
        if(typeof obj !== 'object') throw 'Invalid object type';
        var arr = [];

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                // it's a nested object
                if(typeof obj[key] === 'object' && !(obj[key] instanceof Array)) {
                    arr.push([key, object_to_array(obj[key])]);
                    continue;
                }

                // it's an array
                if(typeof obj[key] === 'object' && obj[key] instanceof Array) {
                    arr.push([key, array_of_objects_to_array(obj[key])]);
                    continue;
                }

                // it's a basic JS type
                if(typeof obj[key] !== 'object' && typeof obj[key] !== 'function') {
                    if(obj[key] === true || obj[key] === false) {
                        obj[key] = obj[key].toString();
                    }
                    arr.push([key,obj[key]]);
                }
            }
        }
        return arr.sort();
    }

    var array_of_objects_to_array = function(array_obj) {
        if(!(array_obj instanceof Array)) throw 'Invalid object type';

        var arr = [];

        for(var i=0; i<array_obj.length; i++)
        {
            var obj = array_obj[i];

            // it's a nested object
            if(typeof obj === 'object' && !(obj instanceof Array)) {
                arr.push(object_to_array(obj));
                continue;
            }

            // it's a nested array
            if(typeof obj === 'object') {
                arr.push(array_of_objects_to_array(obj));
                continue;
            }

            // it's a basic JS type
            if(typeof obj !== 'object' && typeof obj !== 'function') {
                if(obj === true || obj === false) {
                    obj = obj.toString();
                }
                arr.push(obj);
            }
        }
        return arr.sort();
    }

    return fct;
})();