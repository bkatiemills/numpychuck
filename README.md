#Numpychuck

Currently, numpychuck is a super fast hack to explore starting with a numpy-generated .npy file, and seeing what magic needs to happen to get the contents of that file into a JavaScript object in a browser somewhere.  Strategy as follows:

 - Tornado server serves the .npy file as a raw binary blob
 - Receiving client requests this data as an arraybuffer      
 - Client makes a dataview out of the array buffer, and unpacks it for all its front end needs.

`dumdumServer.py` is the aforementioned tornado server; after a `sudo pip install tornado`, set this going with `python dumdumServer.py`.  `numpydump.npy` contains the array [1,3,3,7], and `helpers.js` contains some minimal JavaScript for fetching and unpacking 
the binary data.  Use them something like:

```
XHR('http://127.0.0.1:8888', unpackNPY, false, true, true)
```

and the guts of the numpy array get laid out in the console, with the original contents 1,3,3,7 clearly visible.

Obviously this is hilariously inadequate for any real purpose at the moment, but it shows that this should be possible, and all that's really needed (as far as I can tell from this test) is a properly written unpacker.
